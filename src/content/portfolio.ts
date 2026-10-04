/**
 * Portfólio agrupado por ambiente, com alt descritivo obrigatório. Curadoria
 * curta de propósito: só as melhores fotos (npm run fotos). Grupo sem foto
 * não aparece; lista vazia vira estado vazio na seção, sem quebrar o build.
 *
 * Hoje: a foto do Perfil da Empresa no Google. [[FOTOS DE PORTFÓLIO: mínimo
 * 12, por ambiente, com legenda (banheiro, closet, painel ripado, biombo,
 * puxador cava, cristal)]]
 */
import type { StaticImageData } from "next/image";

import cozinhaAmadeiradaGrafite from "@/assets/fotos/cozinha-amadeirada-grafite.jpg";
import gaveteiroPuxadorCava from "@/assets/fotos/gaveteiro-puxador-cava.jpg";

export type FotoPortfolio = { src: StaticImageData; alt: string; ambiente: string };

export const portfolio: FotoPortfolio[] = [
  {
    src: cozinhaAmadeiradaGrafite,
    ambiente: "Cozinha",
    alt: "Cozinha planejada com armários aéreos amadeirados até o teto, nichos brancos e gaveteiro suspenso grafite sob bancada de granito",
  },
  {
    src: gaveteiroPuxadorCava,
    ambiente: "Cozinha",
    alt: "Detalhe do gaveteiro suspenso grafite com puxador cava, três gavetas e portas sem puxador aparente",
  },
];

/** Agrupa na ordem em que o ambiente aparece pela primeira vez. */
export function porAmbiente(lista: readonly FotoPortfolio[]) {
  const grupos = new Map<string, FotoPortfolio[]>();
  for (const f of lista) grupos.set(f.ambiente, [...(grupos.get(f.ambiente) ?? []), f]);
  return [...grupos].map(([ambiente, fotos]) => ({ ambiente, fotos }));
}
