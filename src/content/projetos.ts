/**
 * §6.5: os seis projetos, com título e descrição literais do cliente. Cada
 * card leva o próprio link de WhatsApp com o nome do projeto na mensagem.
 * Foto só quando existe uma foto real daquele projeto; sem ela o card mostra
 * a prancha desenhada do móvel (ui/Prancha) e a etiqueta de pendência.
 */
import type { StaticImageData } from "next/image";

import puxadorCava from "@/assets/fotos/gaveteiro-puxador-cava.jpg";

export type Desenho = "banheiro" | "closet" | "ripado" | "biombo" | "cava" | "cristal";

export type Projeto = {
  slug: string;
  titulo: string;
  descricao: string;
  desenho: Desenho;
  foto?: { src: StaticImageData; alt: string };
};

export const projetos: Projeto[] = [
  {
    slug: "banheiros",
    titulo: "Banheiros planejados",
    descricao: "Móveis personalizados para aproveitar cada espaço com funcionalidade e acabamento sofisticado.",
    desenho: "banheiro",
  },
  {
    slug: "closets",
    titulo: "Closets",
    descricao: "Closets sob medida pensados para organização, praticidade e aproveitamento do ambiente.",
    desenho: "closet",
  },
  {
    slug: "paineis-ripados",
    titulo: "Painéis ripados",
    descricao: "Painéis e revestimentos ripados que trazem personalidade, elegância e aconchego aos espaços.",
    desenho: "ripado",
  },
  {
    slug: "biombos",
    titulo: "Biombos",
    descricao: "Soluções personalizadas para dividir e transformar ambientes sem perder a estética.",
    desenho: "biombo",
  },
  {
    slug: "puxador-cava",
    titulo: "Puxador cava",
    descricao: "Detalhes planejados que unem praticidade e um acabamento moderno e minimalista.",
    desenho: "cava",
    foto: { src: puxadorCava, alt: "Gaveteiro suspenso grafite com puxador cava nas gavetas e nas portas, sob bancada de granito cinza" },
  },
  {
    slug: "cristal",
    titulo: "Detalhes em cristal",
    descricao: "Acabamentos e elementos em cristal para acrescentar sofisticação e exclusividade aos móveis.",
    desenho: "cristal",
  },
];

/** Opções do select do formulário: os seis projetos e "Outro". */
export const AMBIENTES_FORM: [string, ...string[]] = [projetos[0].titulo, ...projetos.slice(1).map((p) => p.titulo), "Outro"];
