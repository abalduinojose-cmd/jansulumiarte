/**
 * Fonte única dos dados do negócio. Header, rodapé, contato, formulário,
 * JSON-LD e todo link de WhatsApp importam daqui; nenhum componente escreve
 * telefone, endereço ou horário à mão.
 *
 * NAP conferido no Perfil da Empresa no Google em 04/10/2026 (Apify):
 * "Marcenaria JanSu Lumiarte", "Estr. Fonte Santa, 233 - Fonte Santa,
 * Teresópolis - RJ, 25976-700", +55 21 98241-1802, seg a sex 8h às 18h,
 * 5,0 com 4 avaliações. A rua vai abreviada como no perfil ("Estr."): o NAP
 * tem de bater caractere por caractere.
 *
 * Marcadores [[assim]] são pendências do cliente (ver PENDENCIAS.md). Na
 * página eles aparecem como etiqueta tracejada (<Pendente>); no JSON-LD e
 * nos metadados o semMarcador os tira.
 */
export const site = {
  nome: "Marcenaria JanSu Lumiarte",
  nomeCurto: "JanSu Lumiarte",
  slogan: "Realizamos sonhos através da marcenaria",
  h1: "Do detalhe ao ambiente completo.",
  descricao: "Marcenaria artesanal em Teresópolis. Repaginação de ambientes e móveis planejados em madeira, MDF e Metalon.",
  whatsapp: "+5521982411802",
  whatsappDisplay: "(21) 98241-1802",
  instagram: "https://www.instagram.com/jansu_lumiarte/",
  instagramArroba: "@jansu_lumiarte",
  google: "https://share.google/Qi4074QjAbuMr6Q6E",
  placeId: "ChIJ8V1g6sVNmAARBAlDgmOk4k0",
  endereco: {
    rua: "Estr. Fonte Santa, 233",
    bairro: "Fonte Santa",
    cidade: "Teresópolis",
    uf: "RJ",
    cep: "25976-700",
  },
  geo: { lat: -22.391352, lng: -42.953761 },
  horario: "Segunda a sexta, 8h às 18h",
  horarioSchema: ["Mo-Fr 08:00-18:00"],
  /* [[CONFIRMAR RAIO DE ATENDIMENTO]]: o Instagram fala em "toda região
     serrana e grande rio" e mostra obras em Petrópolis. */
  atendimento: "Teresópolis, Petrópolis, Nova Friburgo e região serrana do RJ",
  avaliacoes: { nota: 5, total: 4 },
  cnpj: "[[CNPJ: PENDENTE]]",
} as const;

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.jansulumiarte.com.br"; // [[DOMÍNIO DEFINITIVO]]

export const NOTA = site.avaliacoes.nota.toLocaleString("pt-BR", { minimumFractionDigits: 1 });
/** A nota nunca aparece sem o volume: 5,0 com 4 avaliações, exposto. */
export const PROVA_GOOGLE = `${NOTA} no Google · ${site.avaliacoes.total} avaliações`;
export const ENDERECO_LINHA = `${site.endereco.rua} - ${site.endereco.bairro}, ${site.endereco.cidade} - ${site.endereco.uf}, ${site.endereco.cep}`;
export const PERFIL_GOOGLE = `https://www.google.com/maps/place/?q=place_id:${site.placeId}`;
export const ROTA = `https://www.google.com/maps/dir/?api=1&destination=${site.geo.lat},${site.geo.lng}&destination_place_id=${site.placeId}`;

/** Mensagens pré-preenchidas por origem (§1.1): qualificam o lead antes da resposta. */
export const MENSAGENS = {
  hero: "Olá! Vim pelo site e quero repaginar um ambiente.",
  oferta: "Olá! Vim pelo site e quero solicitar meu orçamento com os 15% de desconto.",
  projeto: (nome: string) => `Olá! Tenho interesse em ${nome.toLowerCase()}.`,
  portfolio: "Olá! Vi os projetos no site e gostaria de um orçamento.",
  contato: "Olá! Gostaria de conversar sobre um projeto.",
} as const;

export const NAV = [
  { href: "#projetos", rotulo: "Projetos" },
  { href: "#materiais", rotulo: "Materiais" },
  { href: "#processo", rotulo: "Processo" },
  { href: "#portfolio", rotulo: "Portfólio" },
  { href: "#sobre", rotulo: "Sobre" },
  { href: "#contato", rotulo: "Contato" },
] as const;

/* ---- Copy por seção. Onde diz "literal", é texto do cliente: não reescrever. */

export const HERO = {
  eyebrow: "Marcenaria em Teresópolis",
  /* literal */
  subtitulo: "Criamos soluções sob medida para transformar espaços, unindo marcenaria, funcionalidade e acabamento em cada projeto.",
  ctaPrincipal: "Solicitar orçamento",
  ctaSecundario: "Ver projetos",
  regiao: "Teresópolis e região serrana",
  /* O H1 (site.h1) em duas vozes: o começo em Clash 200, o resto em 600. */
  h1Fino: "Do detalhe",
  h1Brilho: "completo.",
  local: "Fonte Santa, Teresópolis",
  localApoio: "Região serrana do RJ",
  atalhoTitulo: "Qual ambiente você quer repaginar?",
  atalhoApoio: "Toque e a conversa no WhatsApp já começa com o ambiente.",
} as const;

/* literal */
export const TRUST = ["Artesãos marceneiros", "Madeira, MDF e Metalon", "Projeto sob medida", "Teresópolis e região serrana"] as const;

export const OFERTA = {
  selo: "15% de desconto",
  /* literal */
  texto: "Solicite seu orçamento e receba 15% de desconto no seu projeto.",
  cta: "Quero meu orçamento",
  condicoes: "[[CONDIÇÕES E VALIDADE DA OFERTA: PENDENTE]]",
} as const;

export const PROJETOS_TEXTO = {
  eyebrow: "Projetos",
  titulo: "Nossos projetos",
  fino: "projetos",
  cta: "Quero um assim",
  rodape: "Pedir orçamento no WhatsApp",
} as const;

export const PERSONALIZACAO = {
  eyebrow: "Personalização",
  /* literal, dividido em título e parágrafo sem trocar uma palavra */
  titulo: "Personalize cada detalhe do seu espaço.",
  texto: "Desde a escolha dos materiais até o acabamento final, você pode criar um ambiente que reflita sua personalidade e estilo.",
  cta: "Conversar sobre o meu projeto",
  detalhe: "Detalhe do puxador cava, em corte",
} as const;

export const MATERIAIS_TEXTO = {
  eyebrow: "Materiais",
  titulo: "Madeira, MDF e Metalon.",
  fino: "MDF e Metalon.",
  texto: "Cada material entra onde funciona melhor. A escolha é feita com você, no projeto.",
  cta: "Tirar dúvida sobre material",
} as const;

export const PROCESSO = {
  eyebrow: "Processo",
  titulo: "Do primeiro contato à instalação.",
  fino: "à instalação.",
  /* literal; [[CONFIRMAR COM O CLIENTE SE O FLUXO É ESSE E SE HÁ PROJETO 3D]]
     (o Instagram tem um post de 2024 oferecendo projeto 3D com parceiro) */
  etapas: ["Conversa e visita técnica", "Projeto e definição de materiais", "Execução na marcenaria", "Instalação e acabamento final"],
  pendencia: "[[CONFIRMAR COM O CLIENTE SE O FLUXO É ESSE E SE HÁ PROJETO 3D]]",
  cta: "Começar pela conversa",
} as const;

export const PORTFOLIO_TEXTO = {
  eyebrow: "Portfólio",
  titulo: "Ambientes entregues.",
  fino: "entregues.",
  texto: "Toque em uma foto para ver maior.",
  vazio: "As fotos dos próximos ambientes entram aqui. Enquanto isso, as obras recentes estão no Instagram.",
  cta: "Quero um orçamento",
  instagram: "Ver obras no Instagram",
} as const;

export const SOBRE = {
  eyebrow: "Sobre",
  titulo: "Quem faz o seu projeto.",
  fino: "o seu projeto.",
  /* literal, só com a pontuação corrigida */
  texto: "A Marcenaria JanSu é especialista em repaginação de ambientes e móveis planejados em madeira, MDF e Metalon. Contamos com uma equipe de artesãos marceneiros experientes e dedicados à realização do seu sonho.",
  foto: "[[FOTO DA OFICINA OU DA EQUIPE: PENDENTE]]",
  cta: "Falar com a marcenaria",
} as const;

export const DEPOIMENTOS_TEXTO = {
  eyebrow: "Avaliações",
  titulo: "Quem já tem móveis da JanSu.",
  fino: "móveis da JanSu.",
  link: "Ver no Google",
  semTexto: "Avaliou com 5 estrelas, sem comentário escrito.",
  cta: "Solicitar orçamento",
  vazio: "As avaliações do Google aparecem aqui.",
} as const;

export const CONTATO = {
  eyebrow: "Contato",
  titulo: "Vamos conversar sobre o seu projeto.",
  fino: "sobre o seu projeto.",
  texto: "O caminho mais rápido é o WhatsApp. Se preferir, deixe seus dados no formulário e a gente responde por lá.",
  ctaWhatsapp: "Chamar no WhatsApp",
  comoChegar: "Como chegar",
  mapa: "Abrir no Google Maps",
  formTitulo: "Prefere que a gente chame você?",
  enviar: "Enviar pedido",
  sucessoTitulo: "Pedido recebido.",
  sucessoTexto: `Vamos responder pelo WhatsApp que você informou. Se preferir, chame agora no ${site.whatsappDisplay}.`,
  /* [[DEFINIR DESTINO DO FORMULÁRIO: e-mail, Resend ou webhook]] */
} as const;

/* Sem crédito de desenvolvedor no rodapé (pedido de 04/10). */
export const RODAPE = {
  politica: "[[POLÍTICA DE PRIVACIDADE: PENDENTE]]",
} as const;

/** Reels do @jansu_lumiarte (npm run videos). Legendas descrevem o que se vê, sem especificar material. */
export const INSTAGRAM = {
  eyebrow: "Instagram",
  titulo: "Obras em vídeo.",
  fino: "em vídeo.",
  texto: "Ambientes entregues pela JanSu, filmados na entrega. Toque para assistir com som.",
  videos: [
    { id: "loja-planejada", titulo: "Loja planejada", legenda: "Prateleiras amadeiradas do piso ao teto e fita de LED embutida.", data: "julho de 2026" },
    { id: "quarto-bom-retiro", titulo: "Quarto no Bom Retiro", legenda: "Armários até o teto, painel amadeirado e criados suspensos iluminados. Teresópolis.", data: "julho de 2026" },
    { id: "closet-iluminado", titulo: "Closet iluminado", legenda: "Nichos, cabideiros e gavetas brancos, com luz no rodapé.", data: "março de 2026" },
  ],
  conviteTitulo: "Acompanhe as obras",
  conviteTexto: "Projetos entregues, bastidores da marcenaria e novidades toda semana.",
  conviteCta: "Seguir no Instagram",
  whatsapp: "Quero um assim",
} as const;

export const FAQ_TEXTO = {
  eyebrow: "Dúvidas",
  titulo: "Perguntas frequentes",
  fino: "frequentes",
  whatsapp: "Não achou sua dúvida? Pergunte no WhatsApp",
} as const;
