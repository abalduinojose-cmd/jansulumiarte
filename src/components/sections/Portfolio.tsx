import { ArrowRight } from "lucide-react";

import { porAmbiente, portfolio } from "@/content/portfolio";
import { MENSAGENS, PORTFOLIO_TEXTO, site } from "@/content/site";
import { waLink } from "@/lib/whatsapp";

import { Button } from "../ui/Button";
import { IconeInstagram } from "../ui/IconesRedes";
import { LinhaPlaina } from "../ui/LinhaPlaina";
import Lightbox from "../ui/Lightbox";
import { Pendente } from "../ui/Pendente";
import { SectionHeading } from "../ui/SectionHeading";

/**
 * Galeria agrupada por ambiente, fotos abrindo como cortina, lightbox
 * acessível. Lista vazia vira estado vazio funcional que leva ao Instagram.
 */
export function Portfolio() {
  const grupos = porAmbiente(portfolio);
  return (
    <section id="portfolio" aria-labelledby="titulo-portfolio" className="bg-surface py-20 md:py-28">
      <div className="container-page">
        <div className="grid items-end gap-6 lg:grid-cols-[1.1fr_1fr]">
          <SectionHeading id="titulo-portfolio" eyebrow={PORTFOLIO_TEXTO.eyebrow} titulo={PORTFOLIO_TEXTO.titulo} fino={PORTFOLIO_TEXTO.fino} texto={grupos.length ? PORTFOLIO_TEXTO.texto : undefined} />
          <LinhaPlaina className="hidden lg:block" />
        </div>

        <div className="mt-14">{grupos.length ? <Lightbox grupos={grupos} /> : null}</div>

        <div className="revela cartao mt-6 flex flex-col gap-4 border-dashed border-brand/30 p-6 sm:flex-row sm:items-center sm:justify-between md:p-8">
          <div>
            <p className="max-w-[52ch] text-ink">{PORTFOLIO_TEXTO.vazio}</p>
            <p className="mt-3">
              <Pendente marcador="[[FOTOS DE PORTFÓLIO: mínimo 12, por ambiente, com legenda]]" />
            </p>
          </div>
          <a href={site.instagram} target="_blank" rel="noopener noreferrer" className="link-traco shrink-0">
            <IconeInstagram className="size-5" />
            {PORTFOLIO_TEXTO.instagram}
            <ArrowRight aria-hidden className="size-4" strokeWidth={2} />
          </a>
        </div>

        <Button href={waLink(MENSAGENS.portfolio)} whatsapp seta className="mt-10">
          {PORTFOLIO_TEXTO.cta}
        </Button>
      </div>
    </section>
  );
}
