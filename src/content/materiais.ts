/**
 * §6.7: três materiais, uma frase de uso cada. Nenhuma especificação de
 * fornecedor (espessura, marca, linha): isso fica para o cliente confirmar.
 * Com foto real, a foto; sem ela, a textura desenhada (ui/Textura).
 */
import type { StaticImageData } from "next/image";

import mdfAmadeirado from "@/assets/fotos/textura-mdf-amadeirado.jpg";

export type Material = { nome: "Madeira" | "MDF" | "Metalon"; uso: string; pendencia: string; foto?: { src: StaticImageData; alt: string } };

export const materiais: Material[] = [
  {
    nome: "Madeira",
    uso: "Para as peças em que o veio fica à vista: tampos, painéis ripados e detalhes de acabamento.",
    pendencia: "[[ESPÉCIES DE MADEIRA E FOTO DA TEXTURA: PENDENTE]]",
  },
  {
    nome: "MDF",
    uso: "A base dos planejados: armários, closets e gabinetes, na cor e no padrão definidos no projeto.",
    /* Recorte real das portas da cozinha do Perfil no Google. [[CONFIRMAR QUE É MDF]] */
    pendencia: "[[LINHAS E PADRÕES DE MDF: PENDENTE]]",
    foto: { src: mdfAmadeirado, alt: "Portas de armário em padrão amadeirado, com o veio aparente e as juntas entre as portas" },
  },
  {
    nome: "Metalon",
    uso: "Tubo de aço para estruturas, pés e prateleiras, quando o móvel pede um desenho mais leve.",
    pendencia: "[[ACABAMENTO DO METALON E FOTO DA TEXTURA: PENDENTE]]",
  },
];
