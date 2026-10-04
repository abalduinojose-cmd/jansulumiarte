import { MENSAGENS } from "@/content/site";
import { validar, type EstadoOrcamento } from "@/lib/validacao";
import { waLink } from "@/lib/whatsapp";

/**
 * Versão da prévia estática (GitHub Pages não executa Server Action). Mesma
 * assinatura e mesma validação, mas roda no navegador e devolve o link do
 * WhatsApp com o pedido escrito, que o formulário abre.
 */
export async function enviarOrcamento(_anterior: EstadoOrcamento, form: FormData): Promise<EstadoOrcamento> {
  const r = validar(form);
  if (!r.ok) {
    if (r.robo) return { status: "ok" };
    return { status: "erro", erros: r.erros, valores: r.valores };
  }
  const { nome, whatsapp, ambiente, mensagem } = r.dados;
  const texto = [MENSAGENS.contato, "", `Nome: ${nome}`, `WhatsApp: ${whatsapp}`, `Ambiente: ${ambiente}`, mensagem ? `\n${mensagem}` : null]
    .filter((l): l is string => l !== null)
    .join("\n");
  return { status: "ok", whatsapp: waLink(texto) };
}
