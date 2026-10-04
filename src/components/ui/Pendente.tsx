import { cx } from "@/lib/cx";

/**
 * Etiqueta tracejada para o que ainda depende do cliente. Fica visível na
 * prévia de propósito (briefing: "[[placeholder]] visível"), para o cliente
 * ver o que falta. Recebe o marcador cru e mostra o texto de dentro.
 */
export function Pendente({ marcador, className }: { readonly marcador: string; readonly className?: string }) {
  const texto = marcador.match(/\[\[([^\]]*)\]\]/)?.[1] ?? marcador;
  return <span className={cx("pendente", className)}>{texto}</span>;
}
