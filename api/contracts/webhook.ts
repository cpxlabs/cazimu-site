/**
 * POST /api/contracts/webhook
 *
 * Called by gov.br when a signer completes (or declines) their digital signature.
 *
 * Expected JSON body (gov.br callback format):
 * {
 *   externalId: string,   // our contractId
 *   signerEmail: string,
 *   status: "signed" | "declined",
 *   signedAt: string      // ISO 8601
 * }
 *
 * Steps:
 *   1. Find the contract in Airtable by contractId
 *   2. Update the signer's "signed" flag in the Signers JSON field
 *   3. Send individual confirmation email to the signer (if signed)
 *   4. If ALL signers have signed → update status to "signed" and send
 *      internal notification
 */

import type { VercelRequest, VercelResponse } from "@vercel/node";
import {
  findContractByContractId,
  updateContractRecord,
  type Signer,
} from "../lib/airtable";
import {
  sendIndividualConfirmationEmail,
  sendAllSignedInternalNotification,
} from "../lib/notifications";

interface WebhookBody {
  externalId: string;
  signerEmail: string;
  status: "signed" | "declined";
  signedAt: string;
}

function validateBody(body: unknown): body is WebhookBody {
  if (!body || typeof body !== "object") return false;
  const b = body as Record<string, unknown>;
  return (
    typeof b.externalId === "string" &&
    typeof b.signerEmail === "string" &&
    (b.status === "signed" || b.status === "declined") &&
    typeof b.signedAt === "string"
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
        "Invalid body. Required: { externalId, signerEmail, status, signedAt }",
    });
    return;
  }

  const { externalId: contractId, signerEmail, status, signedAt } = req.body;

  // 1. Look up the contract
  const contract = await findContractByContractId(contractId);
  if (!contract) {
    // Return 200 to prevent gov.br from retrying for unknown contracts
    console.warn(`[webhook] Unknown contractId: ${contractId}`);
    res.status(200).json({ ok: true, message: "Unknown contract — ignored." });
    return;
  }

  let signers: Signer[];
  try {
    signers = JSON.parse(contract.data.signers) as Signer[];
  } catch {
    res.status(500).json({ error: "Corrupt signers data in Airtable" });
    return;
  }

  // 2. Update the matching signer
  const signerIndex = signers.findIndex(
    (s) => s.email.toLowerCase() === signerEmail.toLowerCase()
  );

  if (signerIndex === -1) {
    console.warn(`[webhook] Signer not found: ${signerEmail} in contract ${contractId}`);
    res.status(200).json({ ok: true, message: "Signer not found — ignored." });
    return;
  }

  if (status === "signed") {
    signers[signerIndex].signed = true;
    signers[signerIndex].signedAt = signedAt;

    // 3. Individual confirmation email
    try {
      await sendIndividualConfirmationEmail({
        name: signers[signerIndex].name,
        email: signerEmail,
        contractId,
      });
    } catch (err) {
      // Non-fatal: log but don't fail the webhook
      console.error("[webhook] Individual confirmation email failed:", err);
    }
  }

  const allSigned = signers.every((s) => s.signed);
  const newStatus = allSigned ? "signed" : "partial";

  // Persist updated signers + status
  await updateContractRecord(contract.recordId, {
    Signers: JSON.stringify(signers),
    Status: newStatus,
  });

  // 4. Final internal notification when everyone has signed
  if (allSigned) {
    try {
      await sendAllSignedInternalNotification({
        contractId,
        signers: signers.map((s) => ({ name: s.name, email: s.email })),
      });
    } catch (err) {
      console.error("[webhook] Final internal notification failed:", err);
    }
  }

  res.status(200).json({ ok: true, allSigned });
}
