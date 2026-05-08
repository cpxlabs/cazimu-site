/**
 * Fallback handler — invoked when the gov.br integration is unavailable.
 *
 * Steps:
 *   1. Send the contract PDF directly to all signers via email (as attachment)
 *   2. Send an internal alert to the team
 *   3. Update Airtable record status to "fallback"
 */

import type { VercelRequest, VercelResponse } from "@vercel/node";
import { updateContractRecord } from "../lib/airtable";
import { sendFallbackPdfEmail } from "../lib/notifications";

export interface FallbackInput {
  contractId: string;
  airtableRecordId: string;
  pdfBase64: string;
  signers: Array<{ name: string; email: string }>;
  internalEmail: string;
}

export async function handleFallback(input: FallbackInput): Promise<void> {
  // 1 & 2: Email PDF to signers + internal alert
  await sendFallbackPdfEmail({
    contractId: input.contractId,
    signers: input.signers,
    pdfBase64: input.pdfBase64,
    internalEmail: input.internalEmail,
  });

  // 3: Update Airtable status
  await updateContractRecord(input.airtableRecordId, { Status: "fallback" });
}

// ---------------------------------------------------------------------------
// HTTP handler (for manual retrigger of the fallback, e.g. from an admin tool)
// ---------------------------------------------------------------------------

interface FallbackBody {
  contractId: string;
  airtableRecordId: string;
  pdfBase64: string;
  signers: Array<{ name: string; email: string }>;
}

function validateBody(body: unknown): body is FallbackBody {
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

  const internalEmail = process.env.INTERNAL_NOTIFY_EMAIL;
  if (!internalEmail) {
    res.status(500).json({ error: "Missing INTERNAL_NOTIFY_EMAIL" });
    return;
  }

  try {
    await handleFallback({ ...req.body, internalEmail });
    res.status(200).json({ ok: true, message: "Fallback email sent." });
  } catch (err) {
    console.error("[fallback] error:", err);
    res.status(500).json({
      error: err instanceof Error ? err.message : "Internal server error",
    });
  }
}
