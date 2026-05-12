# Configuração do Airtable para o Sistema de Contratos

Este guia cobre todos os passos para criar a base, a tabela e as chaves de API necessárias para o pipeline de contratos.

---

## 1. Criar uma conta / acessar o workspace

1. Acesse [airtable.com](https://airtable.com) e faça login.
2. Certifique-se de estar no workspace correto (ex.: **Cazimu**). Se precisar criar um novo workspace, clique em **+ Add a workspace** no painel lateral.

---

## 2. Criar a base `Contracts`

1. No workspace desejado, clique em **+ Create** → **Start from scratch**.
2. Nomeie a base: `Contracts`.
3. A tabela padrão criada pode ser renomeada para `Contracts` também (clique duas vezes no nome da aba).

---

## 3. Configurar os campos da tabela `Contracts`

Delete todos os campos padrão e crie os seguintes:

| Campo | Tipo no Airtable | Observação |
|---|---|---|
| `ContractId` | **Single line text** | ID único do contrato (ex.: `CTR-2026-001`) |
| `Status` | **Single select** | Opções: `pending`, `partial`, `signed`, `fallback` |
| `Signers` | **Long text** | JSON dos signatários (gerenciado pela API) |
| `PdfDriveId` | **Single line text** | ID do documento no gov.br ou Google Drive |
| `CreatedAt` | **Date** | Ativar "Include time" → ISO 8601 |

> **Dica:** Mantenha os nomes exatamente como acima — a API usa esses nomes literalmente.

---

## 4. Obter o `AIRTABLE_BASE_ID`

1. Abra a base `Contracts` no browser.
2. A URL terá o formato:
   ```
   https://airtable.com/appXXXXXXXXXXXXXX/tblYYYYYYYYYYYYYY/...
   ```
3. O trecho que começa com `app` é o **Base ID**.
   - Exemplo: `appABC123DEF456GH`
4. Copie e salve como `AIRTABLE_BASE_ID`.

---

## 5. Criar um Personal Access Token (`AIRTABLE_API_KEY`)

> Os tokens OAuth pessoais substituem as antigas API Keys de conta.

1. Acesse **[airtable.com/create/tokens](https://airtable.com/create/tokens)**.
2. Clique em **+ Create token**.
3. Preencha:
   - **Name:** `cazimu-contracts`
   - **Scopes** — marque:
     - `data.records:read`
     - `data.records:write`
   - **Access** → selecione **Only specific bases** → escolha `Contracts`.
4. Clique em **Create token**.
5. **Copie o token imediatamente** — ele só é exibido uma vez.
6. Salve como `AIRTABLE_API_KEY`.

---

## 6. (Opcional) Configurar automação para disparar o pipeline

Se você quiser que o preenchimento do formulário Airtable dispare automaticamente o endpoint `/api/contracts/create`:

1. Na base `Contracts`, clique em **Automations** (ícone de raio no topo).
2. Clique em **+ Create automation**.
3. **Trigger:** `When record is created` → tabela `Contracts`.
4. **Action:** `Run a script` (requer plano Team ou superior) **ou** `Send a webhook`.
   - Para webhook: URL = `https://seu-dominio.vercel.app/api/contracts/create`
   - Method: `POST`
   - Headers: adicione um header `x-api-secret: <seu segredo interno>` (recomendado para autenticar chamadas do Airtable).
   - Body (JSON):
     ```json
     {
       "contractId": "{{Record ID}}",
       "signers": [
         { "name": "{{Nome Signatário 1}}", "email": "{{Email Signatário 1}}" }
       ]
     }
     ```
5. Clique em **Save** e teste com um registro de exemplo.

---

## 7. Adicionar as variáveis de ambiente no Vercel

1. No painel do projeto no Vercel, vá em **Settings → Environment Variables**.
2. Adicione:

| Nome da variável | Valor |
|---|---|
| `AIRTABLE_API_KEY` | Token copiado no passo 5 |
| `AIRTABLE_BASE_ID` | Base ID copiado no passo 4 |

3. Clique em **Save** e faça um redeploy (ou as variáveis entram no próximo deploy automático).

---

## 8. Resumo das variáveis de ambiente do projeto completo

Para referência, todas as env vars que o sistema precisa:

```env
# Airtable
AIRTABLE_API_KEY=pat_xxxxxxxxxxxxxxxxxxxxx
AIRTABLE_BASE_ID=appXXXXXXXXXXXXXX

# Google Drive (service account JSON em uma única linha)
GOOGLE_SERVICE_ACCOUNT_JSON={"type":"service_account","project_id":"..."}
GDRIVE_TEMPLATE_ID=1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgVE2upms

# gov.br / ITI Assinatura Digital
GOVBR_CLIENT_ID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
GOVBR_CLIENT_SECRET=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
GOVBR_API_URL=https://api.assinador.iti.br
GOVBR_WEBHOOK_URL=https://seu-dominio.vercel.app/api/contracts/webhook

# Resend (email)
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxx
NOTIFICATION_FROM=Cazimu <contracts@cazimu.com>
INTERNAL_NOTIFY_EMAIL=equipe@cazimu.com
```

---

## Referências

- [Airtable API Docs](https://airtable.com/developers/web/api/introduction)
- [Airtable Personal Access Tokens](https://airtable.com/developers/web/guides/personal-access-tokens)
- [Airtable Automations](https://support.airtable.com/docs/getting-started-with-airtable-automations)
