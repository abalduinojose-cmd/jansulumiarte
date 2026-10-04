import { site } from "@/content/site";

/** Link wa.me com a mensagem pré-preenchida da seção de origem. Nenhum componente monta URL de WhatsApp na mão. */
export const waLink = (mensagem: string) => `https://wa.me/${site.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(mensagem)}`;

/** Máscara progressiva: (21) 2641-1802 para fixo, (21) 98241-1802 para celular. */
export function mascararTelefone(valor: string): string {
  const d = valor.replace(/\D/g, "").slice(0, 11);
  if (d.length === 0) return "";
  if (d.length <= 2) return `(${d}`;
  const resto = d.slice(2);
  if (resto.length <= 4) return `(${d.slice(0, 2)}) ${resto}`;
  const corte = d.length === 11 ? 5 : 4;
  return `(${d.slice(0, 2)}) ${resto.slice(0, corte)}-${resto.slice(corte)}`;
}
