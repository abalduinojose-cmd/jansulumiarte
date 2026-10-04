import { ArrowRight } from "lucide-react";

import { MENSAGENS, SOBRE, site } from "@/content/site";
import { waLink } from "@/lib/whatsapp";

import { Button } from "../ui/Button";
import { IconeInstagram } from "../ui/IconesRedes";
import { Logo } from "../ui/Logo";
import { Pendente } from "../ui/Pendente";
import { SectionHeading } from "../ui/SectionHeading";

/**
 * Texto do cliente (só a pontuação corrigida) e o slogan como assinatura em
 * Clash 200, grande e discreto. Até chegar a foto da oficina, o quadro é a
 * plaina da marca sobre o marrom com grão, abrindo como cortina.
 */
export function Sobre() {
  return (
    <section id="sobre" aria-labelledby="titulo-sobre" className="bg-surface-alt py-20 md:py-28">
      <div className="container-page grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="revela lg:col-span-5">
          <div className="cortina no-escuro grao relative grid aspect-[4/5] place-items-center overflow-hidden rounded-[2rem] bg-brand">
            <div aria-hidden className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-brand-700 to-transparent" />
            <Logo cor="branco" tipo="plaina" sizes="260px" decorativo className="relative h-auto w-3/5" />
            <Pendente marcador={SOBRE.foto} className="absolute bottom-4 left-4 right-4 text-center" />
          </div>
        </div>
        <div className="lg:col-span-7">
          <SectionHeading id="titulo-sobre" eyebrow={SOBRE.eyebrow} titulo={SOBRE.titulo} fino={SOBRE.fino} />
          <p className="revela t-lead mt-7 max-w-[52ch] text-ink/80">{SOBRE.texto}</p>
          <p className="revela fino mt-10 border-l-2 border-accent pl-6 font-display text-[clamp(1.8rem,1.3rem+1.8vw,3rem)] leading-[1.05] text-brand">{site.slogan}</p>
          <div className="revela mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
            <Button href={waLink(MENSAGENS.contato)} whatsapp seta>
              {SOBRE.cta}
            </Button>
            <a href={site.instagram} target="_blank" rel="noopener noreferrer" className="link-traco">
              <IconeInstagram className="size-5" />
              {site.instagramArroba}
              <ArrowRight aria-hidden className="size-4" strokeWidth={2} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
