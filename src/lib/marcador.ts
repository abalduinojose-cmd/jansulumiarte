/** Tira os marcadores [[pendência]] do texto exibido: eles ficam só no código. */
export const semMarcador = (t: string) => t.replace(/\s*\[\[[^\]]*\]\]/g, "").trim();
