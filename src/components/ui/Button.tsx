import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";

import { cx } from "@/lib/cx";

import { IconeWhatsApp } from "./IconeWhatsApp";

type Variante = "madeira" | "caramelo" | "vidro" | "contorno";
type Tamanho = "md" | "lg";

type Props = {
  readonly href: string;
  readonly children: ReactNode;
  readonly variante?: Variante;
  readonly tamanho?: Tamanho;
  readonly whatsapp?: boolean;
  /** Chip de seta no fim da pílula, que gira 45° no hover. */
  readonly seta?: boolean;
  readonly cheio?: boolean;
  readonly className?: string;
};

const VARIANTES: Record<Variante, string> = {
  madeira: "btn-madeira",
  caramelo: "btn-caramelo",
  vidro: "btn-vidro",
  contorno: "btn-contorno",
};

const TAMANHOS: Record<Tamanho, string> = {
  md: "h-12 px-6 text-[0.95rem]",
  lg: "h-14 px-7 text-[1rem]",
};

/** Com seta, o lado direito encosta menos na borda para o chip respirar. */
const TAMANHOS_SETA: Record<Tamanho, string> = {
  md: "h-12 pl-6 pr-1.5 text-[0.95rem]",
  lg: "h-14 pl-7 pr-2 text-[1rem]",
};

/** Pílula de ação (padrão Celebrare/Cabana). Link externo abre em nova aba. Server Component. */
export function Button({ href, children, variante = "madeira", tamanho = "md", whatsapp = false, seta = false, cheio = false, className }: Props) {
  const externo = href.startsWith("http");
  return (
    <a
      href={href}
      {...(externo ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={cx("btn", VARIANTES[variante], seta ? TAMANHOS_SETA[tamanho] : TAMANHOS[tamanho], cheio && "w-full", className)}
    >
      {whatsapp ? <IconeWhatsApp className="size-[1.15rem] shrink-0" /> : null}
      {children}
      {seta ? (
        <span aria-hidden className="btn-seta">
          <ArrowUpRight className="size-4" strokeWidth={2.2} />
        </span>
      ) : null}
    </a>
  );
}
