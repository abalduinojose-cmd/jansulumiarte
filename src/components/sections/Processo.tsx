import type { CSSProperties } from "react";

import { MENSAGENS, PROCESSO } from "@/content/site";
import { waLink } from "@/lib/whatsapp";

import { Button } from "../ui/Button";
import { Pendente } from "../ui/Pendente";
import { SectionHeading } from "../ui/SectionHeading";

/**
 * Seção-cartão da noite dentro do creme. O título fica preso à esquerda
 * enquanto as quatro etapas descem à direita, e o fio caramelo que liga as
 * etapas se preenche com a rolagem. Número em #111 dentro do disco
 * caramelo (7,4:1).
 */
export function Processo() {
  return (
    <section id="processo" aria-labelledby="titulo-processo" className="bg-surface px-2 sm:px-3">
      <div className="no-escuro grao relative isolate overflow-clip rounded-[2rem] bg-noite py-20 md:py-28">
        <div aria-hidden className="absolute -bottom-40 -right-40 -z-10 size-[30rem] rounded-full bg-accent/15 blur-[120px]" />
        <div className="container-page grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionHeading id="titulo-processo" eyebrow={PROCESSO.eyebrow} titulo={PROCESSO.titulo} fino={PROCESSO.fino} escuro />
            <p className="mt-6">
              <Pendente marcador={PROCESSO.pendencia} />
            </p>
            <Button href={waLink(MENSAGENS.hero)} variante="caramelo" whatsapp seta className="mt-10">
              {PROCESSO.cta}
            </Button>
          </div>

          <ol className="processo-trilho relative">
            <span aria-hidden className="absolute bottom-10 left-7 top-10 w-px bg-surface/15" />
            <span aria-hidden className="processo-linha absolute bottom-10 left-7 top-10 w-px bg-accent" />
            {PROCESSO.etapas.map((e, i) => (
              <li key={e} className="revela relative flex items-center gap-7 py-7" style={{ "--d": 0 } as CSSProperties}>
                <span className="relative grid size-14 shrink-0 place-items-center rounded-full bg-accent font-display text-[1.5rem] font-semibold text-ink ring-8 ring-noite">
                  <span className="sr-only">Etapa </span>
                  {i + 1}
                </span>
                <h3 className="text-[clamp(1.5rem,1.2rem+1.3vw,2.4rem)] text-surface-alt">{e}</h3>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
