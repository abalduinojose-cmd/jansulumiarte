# Pendências · Marcenaria JanSu Lumiarte

O que falta o cliente mandar ou confirmar. No código cada item tem um
marcador `[[...]]`; na página ele aparece como etiqueta tracejada
(`<Pendente>`) para o cliente ver o que falta na prévia. No JSON-LD e nos
metadados o `semMarcador` tira tudo.

Já resolvido sem o cliente (dados reais, conferidos em 04/10/2026):
nome, endereço, telefone, horário e coordenadas do Perfil no Google; as 4
avaliações (Giovanna Dos Anjos, Hayssa Rodrigues, Suellen Teixeira e
Cleison Lopes, este só com nota) com nome, data e foto; uma foto real de
obra (cozinha do Perfil no Google, usada no hero, no card "Puxador cava",
no portfólio e no bloco MDF).

## Por seção

| Seção | Pendência | Onde está |
| --- | --- | --- |
| Geral | **Logo** em arquivo final. Hoje usamos o PNG branco enviado no chat (funciona, mas confirmar se há versão vetorial). | `midia/logo-original.png`, `npm run logo` |
| Geral | **Domínio definitivo** (canonical, sitemap, imagem de compartilhamento). Hoje `www.jansulumiarte.com.br`. | `SITE_URL` em `src/content/site.ts` |
| Geral | **Raio de atendimento**: confirmar Petrópolis e Nova Friburgo (o Instagram fala em "toda região serrana e grande rio"). | `site.atendimento` |
| Oferta | **Condições e validade dos 15%**: vale para qualquer projeto? valor mínimo? prazo? | `OFERTA.condicoes` |
| Projetos | **Fotos reais** de banheiro, closet, painel ripado, biombo e detalhe em cristal. Hoje são pranchas desenhadas. Só o puxador cava tem foto. | `src/content/projetos.ts` (campo `foto`) |
| Personalização | **Foto de detalhe de acabamento** (veio, cava, encaixe). Hoje é o corte técnico do puxador cava. | `Personalizacao.tsx` |
| Materiais | **Espécies de madeira** e foto real da textura. | `src/content/materiais.ts` |
| Materiais | **Linhas e padrões de MDF**; confirmar que as portas amadeiradas da foto são MDF. | idem |
| Materiais | **Acabamento do Metalon** e foto real. | idem |
| Processo | **Confirmar as 4 etapas** e se há projeto 3D (há post de 2024 oferecendo 3D com parceiro). | `PROCESSO` em `site.ts` |
| Portfólio | **Mínimo 12 fotos** por ambiente, com legenda. | `src/content/portfolio.ts` + `scripts/fotos.mjs` |
| Sobre | **Foto da oficina ou da equipe.** | `SOBRE.foto` |
| FAQ | **As 6 respostas.** O JSON-LD FAQPage só é gerado quando todas forem reais. | `src/content/faq.ts` |
| Contato | **Destino do formulário**: e-mail, Resend ou webhook. Hoje o pedido vai para o log do servidor; na prévia estática abre o WhatsApp com o pedido escrito. | `src/app/actions.ts` |
| Rodapé | **CNPJ** e razão social. | `site.cnpj` |
| Rodapé | **Política de privacidade.** | `RODAPE.politica` |

## Fotos do Instagram

O @jansu_lumiarte tem 46 posts, quase todos reels (vídeo). A busca pelo
Apify trouxe a lista, mas o download das imagens foi bloqueado nesta
sessão. Com as fotos em `midia/`, basta incluí-las na `CURADORIA` de
`scripts/fotos.mjs` (poucas e boas, pedido do Anderson) e rodar
`npm run fotos`.
