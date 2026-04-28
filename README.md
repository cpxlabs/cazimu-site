# Cazimu

Site institucional da Cazimu com arquitetura pública orientada a **artistas**, **lançamentos**, **conteúdo editorial** e **imprensa**.

## Estrutura pública

O frontend foi reorganizado para expor uma navegação pública baseada em conteúdo versionado:

- `/` — página inicial
- `/quem-somos` — apresentação institucional
- `/servicos` — frentes de atuação da casa
- `/artistas` — roster público
- `/artistas/:artistSlug` — detalhe de artista
- `/lancamentos` — catálogo de lançamentos
- `/lancamentos/:releaseSlug` — detalhe de lançamento
- `/conteudo` — frente editorial
- `/imprensa` — materiais e contatos para imprensa
- `/catalogo` e `/portfolio` — catálogo público com embeds dos lançamentos
- `/contato` — canais de contato
- `/admin` — ferramenta interna de prototipação

## Fonte de conteúdo

Os dados públicos do site ficam centralizados em `src/content/siteContent.ts`, incluindo:

- navegação pública
- SEO por página
- roster de artistas
- lançamentos em destaque
- conteúdo editorial
- recursos de imprensa

O catálogo público não depende mais do painel admin nem de `localStorage` para renderização.

## Shuffle e deduplicação

Todas as páginas que exibem listas de conteúdo (`/artistas`, `/lancamentos`, `/catalogo`, `/conteudo`, `/imprensa`) aplicam automaticamente dois comportamentos ao montar:

1. **Deduplicação** — entradas com a mesma chave (`slug` ou `title`) são removidas, mantendo apenas a primeira ocorrência. Isso protege contra duplicatas acidentais em `siteContent.ts`.
2. **Shuffle** — a ordem de exibição é aleatorizada a cada visita usando o algoritmo Fisher-Yates, garantindo que nenhum item fique preso sempre na primeira ou última posição.

Esses comportamentos ficam centralizados em `src/utils/shuffleUnique.ts`.

## Painel admin

A rota `/admin` permanece como ferramenta interna de prototipação e ainda usa `localStorage` para cadastrar obras temporárias. Ela não é a fonte de dados da experiência pública.

## Responsividade

O layout é adaptativo para todos os tamanhos de tela, com os seguintes breakpoints principais:

| Breakpoint | Comportamento |
|---|---|
| `≥ 1280px` | Largura máxima expandida para 1240px; padding interno aumentado |
| `≥ 801px` | Nav horizontal visível; grids de 3 e 2 colunas explícitas; stats do hero em 4 colunas |
| `561px – 800px` | `card-grid.cols-3` passa para 2 colunas |
| `≤ 800px` | Menu hambúrguer ativo; drawer lateral com backdrop e scroll lock |
| `≤ 900px` | Footer empilhado em coluna única |
| `≤ 1024px` | Hero sem altura mínima fixa |
| `≤ 560px` | Todos os grids em coluna única; padding da seção reduzido; imagem de release passa para 16/9 |
| `≤ 400px` | Botões de CTA do hero empilhados em largura total |

**Menu mobile** — ao abrir o drawer, o scroll do `body` é bloqueado e um backdrop semitransparente é renderizado sobre o conteúdo. Clicar no backdrop fecha o menu.

## Stack

- [React](https://react.dev/)
- [Vite](https://vite.dev/)
- [react-router-dom](https://reactrouter.com/)
- [framer-motion](https://www.framer.com/motion/)
- [Vitest](https://vitest.dev/)
- [ESLint](https://eslint.org/)

## Desenvolvimento local

```bash
npm install
npm run dev
```

Abra `http://localhost:5173`.

## Validação

```bash
npm run lint
npm test
npm run build
```

## Deploy na Vercel

O repositório inclui `vercel.json` com a configuração necessária para:

- detectar o framework Vite
- executar `npm run build`
- publicar a pasta `dist`
- aplicar rewrite SPA para rotas públicas em acesso direto

Isso garante que URLs como `/artistas/luna-mare` e `/lancamentos/mar-aberto` funcionem corretamente em produção.
