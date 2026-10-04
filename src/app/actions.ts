"use server";

import { validar, type EstadoOrcamento } from "@/lib/validacao";

/**
 * Pedido de orçamento. [[DESTINO DO FORMULÁRIO: Resend / Formspree / e-mail]]
 * Enquanto o destino não é definido, o lead vai para o log da Vercel, para
 * nenhum pedido se perder. Na prévia do GitHub Pages (sem servidor) este
 * arquivo é trocado por actions-estatico.ts no build (scripts/pages.mjs).
 */
export async function enviarOrcamento(_anterior: EstadoOrcamento, form: FormData): Promise<EstadoOrcamento> {
  const r = validar(form);
  if (!r.ok) {
    if (r.robo) return { status: "ok" };
    return { status: "erro", erros: r.erros, valores: r.valores };
  }
  console.info("[orcamento]", JSON.stringify({ ...r.dados, empresa: undefined, em: new Date().toISOString() }));
  return { status: "ok" };
}
