/**
 * POST /api/contracts/sign
 *
 * Called internally by /api/contracts/create (not exposed as a public standalone
 * endpoint, though it can be called directly for retries).
 *
 * Steps:
 *   1. Check if gov.br is healthy
 *   2a. If healthy → submit to gov.br, store documentId, send signing-link emails
 *   2b. If not healthy → invoke fallback handler
 */

import type { VercelRequest, VercelResponse } from "@vercel/node";
import { checkHealth, submitForSignature } from "../lib/govbr";
import { updateContractRecord } from "../lib/airtable";
import { sendSigningLinkEmail } from "../lib/notifications";
import { handleFallback } from "./fallback";

export interface SignatureInput {
  contractId: string;
  airtableRecordId: string;
  pdfBase64: string;
  signers: Array<{ name: string; email: string; cpf?: string }>;
}

/**
 * Core signature logic — shared between the HTTP handler and the internal
 * call from /api/contracts/create.
 */
export async function processSignature(input: SignatureInput): Promise<void> {
  const healthy = await checkHealth();

  if (!healthy) {
    await handleFallbackFlow(input);
    return;
  }

  const { documentId, signingUrls } = await submitForSignature({
    contractId: input.contractId,
    pdfBase64: input.pdfBase64,
    signers: input.signers,
  });

  // Persist the gov.br document id in Airtable
  await updateContractRecord(input.airtableRecordId, {
    PdfDriveId: documentId,
  });

  // Send each signer their unique signing link
  for (const signer of input.signers) {
    const signingUrl = signingUrls[signer.email];
    if (signingUrl) {
      await sendSigningLinkEmail({
        name: signer.name,
        email: signer.email,
        signingUrl,
        contractId: input.contractId,
      });
    }
  }
}

/** Delegate to the fallback flow and mark the record accordingly. */
async function handleFallbackFlow(input: SignatureInput): Promise<void> {
  const internalEmail = process.env.INTERNAL_NOTIFY_EMAIL;
  if (!internalEmail) throw new Error("Missing INTERNAL_NOTIFY_EMAIL");

  await handleFallback({
    contractId: input.contractId,
    airtableRecordId: input.airtableRecordId,
    pdfBase64: input.pdfBase64,
    signers: input.signers,
    internalEmail,
  });
}

// ---------------------------------------------------------------------------
// HTTP handler (for direct / retry calls)
// ---------------------------------------------------------------------------

interface SignBody {
  contractId: string;
  airtableRecordId: string;
  pdfBase64: string;
  signers: Array<{ name: string; email: string; cpf?: string }>;
}

function validateBody(body: unknown): body is SignBody {
  if (!body || typeof body !== "object") return false;
  const b = body as Record<string, unknown>;
  return (
    typeof b.contractId === "string" &&
    typeof b.airtableRecordId === "string" &&
    typeof b.pdfBase64 === "string" &&
    Array.isArray(b.signers) &&
    b.signers.length > 0
  );
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
): Promise<void> {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  if (!validateBody(req.body)) {
    res.status(400).json({
      error:
        "Invalid body. Required: { contractId, airtableRecordId, pdfBase64, signers }",
    });
    return;
  }

  try {
    await processSignature(req.body);
    res.status(202).json({ ok: true, message: "Signature process initiated." });
  } catch (err) {
    console.error("[sign] error:", err);
    res.status(500).json({
      error: err instanceof Error ? err.message : "Internal server error",
    });
  }
}
