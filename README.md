# Marcenaria JanSu Lumiarte

One-page de conversão (WhatsApp) da marcenaria artesanal em Teresópolis/RJ.
Next.js 15.5 (App Router, 100% estático) + React 19 + TypeScript strict +
Tailwind v4. Base de código da Santos Siqueira; estrutura visual da
Celebrare / Cabana Afrodite com a marca da JanSu (noite de madeira, creme,
acento caramelo, Clash Display + Satoshi, silhueta e linha da plaina).

```bash
npm run dev          # http://localhost:5248
npm run build        # confere a rota / como estática (○)
npm run fotos        # midia/ -> src/assets/fotos + avatares
npm run logo         # midia/logo-original.png -> public/marca + ícones
npm run build:pages  # prévia estática em docs/ (GitHub Pages)
```

- Dados do negócio só em `src/content/site.ts`; link de WhatsApp só por `waLink()`.
- `use client` em 4 arquivos: MobileNav, Lightbox, FormOrcamento, WhatsappFloat.
- Efeitos de rolagem em CSS scroll-driven (globals.css). Com "reduzir
  movimento" ligado no sistema, nada se desloca: só fades, a frase que
  acende e o contador.
- Testes: `node material/testes-jansu.mjs` (com o dev de pé) e
  `node material/efeitos.mjs 1440|375 [reduce]` para ver os efeitos.
- Pendências do cliente: `PENDENCIAS.md`.
