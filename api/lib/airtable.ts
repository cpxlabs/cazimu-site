/**
 * Airtable client wrapper.
 *
 * Env vars required:
 *   AIRTABLE_API_KEY   – personal access token or OAuth token
 *   AIRTABLE_BASE_ID   – the base that holds the Contracts table
 */

const BASE_URL = "https://api.airtable.com/v0";

function headers(): Record<string, string> {
  const key = process.env.AIRTABLE_API_KEY;
  if (!key) throw new Error("Missing AIRTABLE_API_KEY");
  return {
    Authorization: `Bearer ${key}`,
    "Content-Type": "application/json",
  };
}

function baseId(): string {
  const id = process.env.AIRTABLE_BASE_ID;
  if (!id) throw new Error("Missing AIRTABLE_BASE_ID");
  return id;
}

export interface ContractRecord {
  id?: string;
  contractId: string;
  status: "pending" | "partial" | "signed" | "fallback";
  signers: string; // JSON-encoded Signer[]
  pdfDriveId?: string;
  createdAt?: string;
}

export interface Signer {
  name: string;
  email: string;
  signed: boolean;
  signedAt?: string;
}

/** Create a new contract record; returns the Airtable record id. */
export async function createContractRecord(
  data: Omit<ContractRecord, "id">
): Promise<string> {
  const res = await fetch(`${BASE_URL}/${baseId()}/Contracts`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({
      fields: {
        ContractId: data.contractId,
        Status: data.status,
        Signers: data.signers,
        PdfDriveId: data.pdfDriveId ?? "",
        CreatedAt: new Date().toISOString(),
      },
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Airtable createContractRecord failed: ${err}`);
  }

  const json = (await res.json()) as { id: string };
  return json.id;
}

/** Update fields on an existing contract record by its Airtable record id. */
export async function updateContractRecord(
  recordId: string,
  fields: Partial<{
    Status: ContractRecord["status"];
    Signers: string;
    PdfDriveId: string;
  }>
): Promise<void> {
  const res = await fetch(`${BASE_URL}/${baseId()}/Contracts/${recordId}`, {
    method: "PATCH",
    headers: headers(),
    body: JSON.stringify({ fields }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Airtable updateContractRecord failed: ${err}`);
  }
}

/** Fetch a contract record by the app-level contractId (not the Airtable record id). */
export async function findContractByContractId(
  contractId: string
): Promise<{ recordId: string; data: ContractRecord } | null> {
  const filter = encodeURIComponent(`{ContractId} = "${contractId}"`);
  const res = await fetch(
    `${BASE_URL}/${baseId()}/Contracts?filterByFormula=${filter}&maxRecords=1`,
    { headers: headers() }
  );

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Airtable findContractByContractId failed: ${err}`);
  }

  const json = (await res.json()) as {
    records: Array<{
      id: string;
      fields: Record<string, string>;
    }>;
  };

  if (!json.records.length) return null;

  const rec = json.records[0];
  return {
    recordId: rec.id,
    data: {
      id: rec.id,
      contractId: rec.fields["ContractId"],
      status: rec.fields["Status"] as ContractRecord["status"],
      signers: rec.fields["Signers"],
      pdfDriveId: rec.fields["PdfDriveId"],
      createdAt: rec.fields["CreatedAt"],
    },
  };
}
