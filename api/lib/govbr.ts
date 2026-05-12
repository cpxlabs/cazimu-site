/**
 * gov.br / ITI Assinatura Digital client.
 *
 * Uses the ITI/Serpro Assina Brasil REST API.
 * Reference: https://manual.assinador.iti.br/
 *
 * Env vars required:
 *   GOVBR_CLIENT_ID     – OAuth2 client id
 *   GOVBR_CLIENT_SECRET – OAuth2 client secret
 *   GOVBR_API_URL       – base URL (default: https://api.assinador.iti.br)
 *   GOVBR_WEBHOOK_URL   – public URL of /api/contracts/webhook (for callbacks)
 */

const DEFAULT_API_URL = "https://api.assinador.iti.br";

function apiUrl(): string {
  return (process.env.GOVBR_API_URL ?? DEFAULT_API_URL).replace(/\/$/, "");
}

function webhookUrl(): string {
  const url = process.env.GOVBR_WEBHOOK_URL;
  if (!url) throw new Error("Missing GOVBR_WEBHOOK_URL");
  return url;
}

let cachedToken: { value: string; expiresAt: number } | null = null;

async function getAccessToken(): Promise<string> {
  if (cachedToken && Date.now() < cachedToken.expiresAt) {
    return cachedToken.value;
  }

  const clientId = process.env.GOVBR_CLIENT_ID;
  const clientSecret = process.env.GOVBR_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    throw new Error("Missing GOVBR_CLIENT_ID or GOVBR_CLIENT_SECRET");
  }

  const res = await fetch(`${apiUrl()}/oauth/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "client_credentials",
      client_id: clientId,
      client_secret: clientSecret,
      scope: "sign",
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`gov.br token exchange failed: ${err}`);
  }

  const json = (await res.json()) as { access_token: string; expires_in: number };
  const now = Date.now();
  cachedToken = {
    value: json.access_token,
    expiresAt: now + (json.expires_in - 60) * 1000,
  };
  return cachedToken.value;
}

export interface SignerRequest {
  name: string;
  email: string;
  cpf?: string;
}

export interface GovBrSignResponse {
  /** gov.br internal document id */
  documentId: string;
  /** Map of email → signing URL */
  signingUrls: Record<string, string>;
}

/**
 * Submit a PDF document to gov.br for digital signature by multiple signers.
 * Returns the document id and per-signer signing URLs.
 */
export async function submitForSignature(opts: {
  contractId: string;
  pdfBase64: string;
  signers: SignerRequest[];
}): Promise<GovBrSignResponse> {
  const token = await getAccessToken();

  const res = await fetch(`${apiUrl()}/v1/documents`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: `Contrato-${opts.contractId}.pdf`,
      content: opts.pdfBase64,
      mimeType: "application/pdf",
      signers: opts.signers.map((s) => ({
        name: s.name,
        email: s.email,
        cpf: s.cpf,
      })),
      callbackUrl: webhookUrl(),
      externalId: opts.contractId,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`gov.br submitForSignature failed: ${err}`);
  }

  const json = (await res.json()) as {
    id: string;
    signers: Array<{ email: string; signingUrl: string }>;
  };

  const signingUrls: Record<string, string> = {};
  for (const s of json.signers) {
    signingUrls[s.email] = s.signingUrl;
  }

  return { documentId: json.id, signingUrls };
}

/**
 * Check if the gov.br API is reachable and credentials are valid.
 * Returns true if healthy, false otherwise (never throws).
 */
export async function checkHealth(): Promise<boolean> {
  try {
    await getAccessToken();
    const token = cachedToken!.value;
    const res = await fetch(`${apiUrl()}/v1/health`, {
      headers: { Authorization: `Bearer ${token}` },
      signal: AbortSignal.timeout(5000),
    });
    return res.ok;
  } catch {
    return false;
  }
}
