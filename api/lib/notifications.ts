/**
 * Email notification helpers powered by Resend.
 *
 * Env vars required:
 *   RESEND_API_KEY       – Resend API key
 *   NOTIFICATION_FROM    – verified sender address (e.g. "Cazimu <contracts@cazimu.com>")
 *   INTERNAL_NOTIFY_EMAIL – internal team address for final notifications
 */

const RESEND_URL = "https://api.resend.com/emails";

function resendKey(): string {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error("Missing RESEND_API_KEY");
  return key;
}

function fromAddress(): string {
  return process.env.NOTIFICATION_FROM ?? "Cazimu <no-reply@cazimu.com>";
}

async function sendEmail(payload: {
  to: string[];
  subject: string;
  html: string;
  attachments?: Array<{ filename: string; content: string }>;
}): Promise<void> {
  const res = await fetch(RESEND_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendKey()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ from: fromAddress(), ...payload }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Resend email failed: ${err}`);
  }
}

/** Send signing-link email to a single signer. */
export async function sendSigningLinkEmail(opts: {
  name: string;
  email: string;
  signingUrl: string;
  contractId: string;
}): Promise<void> {
  await sendEmail({
    to: [opts.email],
    subject: `Assinatura digital solicitada – Contrato ${opts.contractId}`,
    html: `
      <p>Olá, <strong>${opts.name}</strong>.</p>
      <p>Você foi solicitado(a) a assinar digitalmente o contrato <strong>${opts.contractId}</strong>.</p>
      <p><a href="${opts.signingUrl}" style="background:#1a1a1a;color:#fff;padding:12px 24px;border-radius:4px;text-decoration:none;">
        Assinar agora
      </a></p>
      <p>Se o botão não funcionar, copie e cole o link abaixo no seu navegador:</p>
      <p>${opts.signingUrl}</p>
      <hr/>
      <p style="color:#666;font-size:12px;">Cazimu — Sistema de contratos</p>
    `,
  });
}

/** Send signed-confirmation email to a single signer. */
export async function sendIndividualConfirmationEmail(opts: {
  name: string;
  email: string;
  contractId: string;
}): Promise<void> {
  await sendEmail({
    to: [opts.email],
    subject: `Confirmação de assinatura – Contrato ${opts.contractId}`,
    html: `
      <p>Olá, <strong>${opts.name}</strong>.</p>
      <p>Sua assinatura no contrato <strong>${opts.contractId}</strong> foi registrada com sucesso.</p>
      <p>Você receberá o contrato finalizado assim que todos os envolvidos assinarem.</p>
      <hr/>
      <p style="color:#666;font-size:12px;">Cazimu — Sistema de contratos</p>
    `,
  });
}

/** Send internal notification when all parties have signed. */
export async function sendAllSignedInternalNotification(opts: {
  contractId: string;
  signers: Array<{ name: string; email: string }>;
}): Promise<void> {
  const internalEmail = process.env.INTERNAL_NOTIFY_EMAIL;
  if (!internalEmail) throw new Error("Missing INTERNAL_NOTIFY_EMAIL");

  const signerList = opts.signers
    .map((s) => `<li>${s.name} &lt;${s.email}&gt;</li>`)
    .join("");

  await sendEmail({
    to: [internalEmail],
    subject: `✅ Contrato totalmente assinado – ${opts.contractId}`,
    html: `
      <p>O contrato <strong>${opts.contractId}</strong> foi assinado por todos os envolvidos.</p>
      <ul>${signerList}</ul>
      <hr/>
      <p style="color:#666;font-size:12px;">Cazimu — Sistema de contratos</p>
    `,
  });
}

/** Fallback: send PDF directly to all parties when gov.br is unavailable. */
export async function sendFallbackPdfEmail(opts: {
  contractId: string;
  signers: Array<{ name: string; email: string }>;
  pdfBase64: string;
  internalEmail: string;
}): Promise<void> {
  const toAddresses = opts.signers.map((s) => s.email);
  const signerList = opts.signers
    .map((s) => `<li>${s.name} &lt;${s.email}&gt;</li>`)
    .join("");

  // Send to all signers
  await sendEmail({
    to: toAddresses,
    subject: `Contrato para assinatura – ${opts.contractId}`,
    html: `
      <p>Prezado(a),</p>
      <p>O contrato <strong>${opts.contractId}</strong> está pronto para assinatura.</p>
      <p>Como o serviço de assinatura digital gov.br está temporariamente indisponível,
         enviamos o PDF em anexo. Por favor, assine e devolva por email.</p>
      <hr/>
      <p style="color:#666;font-size:12px;">Cazimu — Sistema de contratos</p>
    `,
    attachments: [
      { filename: `contrato-${opts.contractId}.pdf`, content: opts.pdfBase64 },
    ],
  });

  // Internal alert
  await sendEmail({
    to: [opts.internalEmail],
    subject: `⚠️ Fallback ativado – Contrato ${opts.contractId}`,
    html: `
      <p>O serviço gov.br estava indisponível ao processar o contrato <strong>${opts.contractId}</strong>.</p>
      <p>O PDF foi enviado manualmente para os seguintes envolvidos:</p>
      <ul>${signerList}</ul>
      <hr/>
      <p style="color:#666;font-size:12px;">Cazimu — Sistema de contratos</p>
    `,
  });
}
