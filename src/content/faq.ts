/**
 * §6.12: perguntas do briefing. Respostas = [[PENDENTE]] até o cliente
 * responder: resposta inventada vira promessa comercial no Google. O
 * JSON-LD FAQPage só é gerado quando nenhuma resposta tiver marcador.
 */
export type Pergunta = { pergunta: string; resposta: string };

export const faq: Pergunta[] = [
  { pergunta: "Vocês atendem em quais cidades?", resposta: "[[RESPOSTA: PENDENTE]]" },
  { pergunta: "Quanto tempo leva um projeto do orçamento à instalação?", resposta: "[[RESPOSTA: PENDENTE]]" },
  { pergunta: "Trabalham com que materiais?", resposta: "[[RESPOSTA: PENDENTE]]" },
  { pergunta: "Fazem a visita técnica e a medição no local?", resposta: "[[RESPOSTA: PENDENTE]]" },
  { pergunta: "É possível repaginar um móvel que já tenho?", resposta: "[[RESPOSTA: PENDENTE]]" },
  { pergunta: "Como funciona o pagamento?", resposta: "[[RESPOSTA: PENDENTE]]" },
];

export const faqCompleto = faq.every((f) => !f.resposta.includes("[["));
