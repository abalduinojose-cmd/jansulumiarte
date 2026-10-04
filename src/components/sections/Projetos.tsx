import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import type { CSSProperties } from "react";

import { projetos } from "@/content/projetos";
import { MENSAGENS, PERFIL_GOOGLE, PROJETOS_TEXTO, PROVA_GOOGLE, site } from "@/content/site";
import { waLink } from "@/lib/whatsapp";

import { Button } from "../ui/Button";
import { LinhaPlaina } from "../ui/LinhaPlaina";
import { Pendente } from "../ui/Pendente";
import { Prancha } from "../ui/Prancha";
import { SectionHeading } from "../ui/SectionHeading";
import { StarRating } from "../ui/StarRating";

/**
 * Grade 3×2 de cartões arredondados com a imagem embutida. Os cartões
 * entram em cascata por coluna ao rolar (--d). O cartão inteiro é o link de
 * WhatsApp com o nome do projeto. Sem foto real, a prancha desenhada.
 * Fecha com a prova social encostada no CTA.
 */
export function Projetos() {
  return (
    <section id="projetos" aria-labelledby="titulo-projetos" className="bg-surface py-20 md:py-28">
      <div className="container-page">
        <div className="grid items-end gap-6 lg:grid-cols-[1.1fr_1fr]">
          <SectionHeading id="titulo-projetos" eyebrow={PROJETOS_TEXTO.eyebrow} titulo={PROJETOS_TEXTO.titulo} fino={PROJETOS_TEXTO.fino} />
          <LinhaPlaina className="hidden lg:block" />
        </div>

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {projetos.map((p, i) => (
            <li key={p.slug} className="revela" style={{ "--d": i % 3 } as CSSProperties}>
              <a href={waLink(MENSAGENS.projeto(p.titulo))} target="_blank" rel="noopener noreferrer" className="cartao cartao-vivo group flex h-full flex-col p-2">
                <div className="relative aspect-[4/3] overflow-hidden rounded-[1.1rem]">
                  {p.foto ? (
                    <Image
                      src={p.foto.src}
                      alt={p.foto.alt}
                      fill
                      quality={90}
                      sizes="(min-width: 1024px) 24rem, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-700 ease-[var(--ease-plaina)] group-hover:scale-[1.05]"
                    />
                  ) : (
                    <>
                      <Prancha desenho={p.desenho} titulo={`Desenho em vista: ${p.titulo.toLowerCase()}`} className="absolute inset-0 p-4 transition-transform duration-700 ease-[var(--ease-plaina)] group-hover:scale-[1.04]" />
                      <Pendente marcador="[[FOTO REAL: PENDENTE]]" className="absolute bottom-3 left-3" />
                    </>
                  )}
                  <span aria-hidden className="absolute right-3 top-3 grid size-10 place-items-center rounded-full bg-noite text-accent-claro transition duration-500 group-hover:rotate-45 group-hover:bg-accent group-hover:text-ink">
                    <ArrowUpRight className="size-4" strokeWidth={2.2} />
                  </span>
                </div>
                <div className="flex flex-1 flex-col px-4 pb-4 pt-6">
                  <span aria-hidden className="fino font-display text-[2.4rem] leading-none text-brand">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="t-h3 mt-3 text-ink">{p.titulo}</h3>
                  <p className="mt-2 flex-1 text-muted">{p.descricao}</p>
                  <span className="mt-5 text-[0.95rem] font-bold text-brand">{PROJETOS_TEXTO.cta}</span>
                </div>
              </a>
            </li>
          ))}
        </ul>

        <div className="revela cartao mt-10 flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:justify-between sm:rounded-full sm:py-3 sm:pl-8 sm:pr-3">
          <a href={PERFIL_GOOGLE} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 flex-wrap items-center gap-3 text-ink underline-offset-4 hover:underline">
            <StarRating nota={site.avaliacoes.nota} />
            <strong className="font-bold">{PROVA_GOOGLE}</strong>
          </a>
          <Button href={waLink(MENSAGENS.portfolio)} whatsapp seta>
            {PROJETOS_TEXTO.rodape}
          </Button>
        </div>
      </div>
    </section>
  );
}
