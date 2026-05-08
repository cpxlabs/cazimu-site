/**
 * Google Drive client — fetches contract template files and uploads signed PDFs.
 *
 * Env vars required:
 *   GOOGLE_SERVICE_ACCOUNT_JSON – full JSON of the service account key file
 *   GDRIVE_TEMPLATE_ID          – Drive file id of the contract template (.docx or .pdf)
 */

import { createSign } from "crypto";

interface ServiceAccount {
  client_email: string;
  private_key: string;
  token_uri: string;
}

let cachedToken: { value: string; expiresAt: number } | null = null;

function getServiceAccount(): ServiceAccount {
  const raw = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  if (!raw) throw new Error("Missing GOOGLE_SERVICE_ACCOUNT_JSON");
  return JSON.parse(raw) as ServiceAccount;
}

/** Obtain (or reuse) a short-lived OAuth2 access token via JWT assertion. */
async function getAccessToken(): Promise<string> {
  if (cachedToken && Date.now() < cachedToken.expiresAt) {
    return cachedToken.value;
  }

  const sa = getServiceAccount();
  const now = Math.floor(Date.now() / 1000);
  const exp = now + 3600;

  const header = Buffer.from(JSON.stringify({ alg: "RS256", typ: "JWT" })).toString("base64url");
  const payload = Buffer.from(
    JSON.stringify({
      iss: sa.client_email,
      scope: "https://www.googleapis.com/auth/drive",
      aud: sa.token_uri,
      exp,
      iat: now,
    })
  ).toString("base64url");

  const sigInput = `${header}.${payload}`;
  const sign = createSign("RSA-SHA256");
  sign.update(sigInput);
  const signature = sign.sign(sa.private_key, "base64url");
  const jwt = `${sigInput}.${signature}`;

  const res = await fetch(sa.token_uri, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Google token exchange failed: ${err}`);
  }

  const json = (await res.json()) as { access_token: string; expires_in: number };
  cachedToken = { value: json.access_token, expiresAt: Date.now() + (json.expires_in - 60) * 1000 };
  return cachedToken.value;
}

/** Download the contract template as a Buffer (exported as PDF if it's a Google Doc). */
export async function fetchTemplateBuffer(): Promise<Buffer> {
  const fileId = process.env.GDRIVE_TEMPLATE_ID;
  if (!fileId) throw new Error("Missing GDRIVE_TEMPLATE_ID");

  const token = await getAccessToken();

  // Export Google Docs/Sheets as PDF; for native files use regular download
  const exportUrl = `https://www.googleapis.com/drive/v3/files/${fileId}/export?mimeType=application/pdf`;
  const res = await fetch(exportUrl, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Google Drive export failed: ${err}`);
  }

  const arrayBuffer = await res.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

/** Upload a PDF buffer to Drive and return the new file id. */
export async function uploadPdf(filename: string, pdfBuffer: Buffer): Promise<string> {
  const token = await getAccessToken();

  const metadata = JSON.stringify({ name: filename, mimeType: "application/pdf" });
  const boundary = "cazimu_boundary";

  const body = Buffer.concat([
    Buffer.from(`--${boundary}\r\nContent-Type: application/json\r\n\r\n${metadata}\r\n`),
    Buffer.from(`--${boundary}\r\nContent-Type: application/pdf\r\n\r\n`),
    pdfBuffer,
    Buffer.from(`\r\n--${boundary}--`),
  ]);

  const res = await fetch(
    "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": `multipart/related; boundary=${boundary}`,
      },
      body,
    }
  );

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Google Drive upload failed: ${err}`);
  }

  const json = (await res.json()) as { id: string };
  return json.id;
}
