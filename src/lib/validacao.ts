import { z } from "zod";

import { AMBIENTES_FORM } from "@/content/projetos";

const TELEFONE_BR = /^\(([1-9][1-9])\) (9\d{4}|[2-8]\d{3})-\d{4}$/;

/** Validação do pedido de orçamento: roda no servidor (Server Action). */
export const schemaOrcamento = z.object({
  nome: z.string().trim().min(2, "Escreva seu nome, com pelo menos 2 letras."),
  whatsapp: z.string().trim().regex(TELEFONE_BR, "Confira o número com DDD, no formato (21) 99999-9999."),
  ambiente: z.enum(AMBIENTES_FORM, "Escolha o ambiente na lista."),
  mensagem: z.string().trim().max(600, "A mensagem passou de 600 caracteres. Resuma um pouco."),
  /* Honeypot: invisível para pessoas, preenchido por robô. */
  empresa: z.string().max(0),
});

export type CampoOrcamento = "nome" | "whatsapp" | "ambiente" | "mensagem";

export type EstadoOrcamento =
  | { status: "inicial" }
  | { status: "erro"; erros: Partial<Record<CampoOrcamento, string>>; valores: Record<string, string> }
  | { status: "ok"; whatsapp?: string };

export function lerFormulario(form: FormData) {
  const pega = (k: string) => String(form.get(k) ?? "");
  return { nome: pega("nome"), whatsapp: pega("whatsapp"), ambiente: pega("ambiente"), mensagem: pega("mensagem"), empresa: pega("empresa") };
}

export function validar(form: FormData) {
  const valores = lerFormulario(form);
  const r = schemaOrcamento.safeParse(valores);
  if (r.success) return { ok: true as const, dados: r.data };
  const erros: Partial<Record<CampoOrcamento, string>> = {};
  for (const issue of r.error.issues) {
    const campo = issue.path[0] as CampoOrcamento | "empresa";
    if (campo !== "empresa" && !erros[campo]) erros[campo] = issue.message;
  }
  return { ok: false as const, erros, valores, robo: valores.empresa !== "" };
}
