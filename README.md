# Cazimu - Editora Musical

Site institucional da Cazimu, editora musical para artistas independentes.

## Funcionalidades

- **Página inicial** com animação de entrada (framer-motion)
- **Bio** — apresentação da editora
- **Serviços** — distribuição digital, produção musical e gestão de carreira
- **Portfólio** — player de YouTube para obras cadastradas
- **Contato** — Instagram e WhatsApp
- **Painel Admin** — adicione obras (título + link embed do YouTube) salvas em `localStorage`

## Tecnologias

- [React](https://react.dev/) + [Vite](https://vite.dev/)
- [react-router-dom](https://reactrouter.com/) — roteamento client-side
- [framer-motion](https://www.framer.com/motion/) — animações

## Como rodar

```bash
npm install
npm run dev
```

Acesse `http://localhost:5173` no navegador.

## Build de produção

```bash
npm run build
```

## Dados

As obras do portfólio são armazenadas no `localStorage` do navegador via o Painel Admin (`/admin`). Não há backend — tudo funciona no próprio browser.
