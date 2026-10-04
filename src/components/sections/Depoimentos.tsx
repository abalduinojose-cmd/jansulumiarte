import Image from "next/image";
import type { CSSProperties } from "react";

import reviews from "@/content/reviews.json";
import { DEPOIMENTOS_TEXTO, MENSAGENS, NOTA, PERFIL_GOOGLE, site } from "@/content/site";
import { asset } from "@/lib/asset";
import { waLink } from "@/lib/whatsapp";

import { Button } from "../ui/Button";
import { IconeGoogle } from "../ui/IconesRedes";
import { SectionHeading } from "../ui/SectionHeading";
import { StarRating } from "../ui/StarRating";

type Review = { autor: string; nota: number; data: string; texto: string; foto: `/${string}` };

const MESES = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];
const mesAno = (iso: string) => {
  const [ano, mes] = iso.split("-").map(Number);
  return `${MESES[mes - 1]} de ${ano}`;
};

/**
 * As 4 avaliações reais do perfil no Google (todas as que existem). O
 * resumo fica num cartão da noite com o 5,0 em Clash 200, sempre com
 * "4 avaliações" ao lado, e o CTA encostado na prova. A avaliação que no
 * Google é só nota aparece como só nota.
 */
export function Depoimentos() {
  const lista = reviews as Review[];
  return (
    <section id="depoimentos" aria-labelledby="titulo-depoimentos" className="bg-surface py-20 md:py-28">
      <div className="container-page">
        <SectionHeading id="titulo-depoimentos" eyebrow={DEPOIMENTOS_TEXTO.eyebrow} titulo={DEPOIMENTOS_TEXTO.titulo} fino={DEPOIMENTOS_TEXTO.fino} />

        <div className="mt-14 grid gap-5 lg:grid-cols-12">
          <div className="revela no-escuro grao relative isolate flex flex-col overflow-hidden rounded-[2rem] bg-noite p-8 lg:col-span-4">
            <div aria-hidden className="absolute -right-20 -top-20 -z-10 size-64 rounded-full bg-accent/25 blur-[90px]" />
            <IconeGoogle className="size-8" />
            <p className="mt-8 flex items-end gap-4">
              <span className="caramelo-metalico fino font-display text-[6rem] leading-[0.8] tracking-[-0.05em]">{NOTA}</span>
              <span className="pb-1">
                <StarRating nota={site.avaliacoes.nota} className="size-5" />
                <span className="mt-1 block font-bold text-surface-alt">{site.avaliacoes.total} avaliações no Google</span>
              </span>
            </p>
            <div className="mt-auto flex flex-col gap-3 pt-10">
              <Button href={waLink(MENSAGENS.hero)} variante="caramelo" whatsapp seta>
                {DEPOIMENTOS_TEXTO.cta}
              </Button>
              <Button href={PERFIL_GOOGLE} variante="vidro">
                {DEPOIMENTOS_TEXTO.link}
              </Button>
            </div>
          </div>

          <ul className="grid gap-5 sm:grid-cols-2 lg:col-span-8">
            {lista.length === 0 ? <li className="cartao p-8 text-muted">{DEPOIMENTOS_TEXTO.vazio}</li> : null}
            {lista.map((r, i) => (
              <li key={r.autor} className="revela" style={{ "--d": i % 2 } as CSSProperties}>
                <figure className="cartao flex h-full flex-col p-7">
                  <StarRating nota={r.nota} />
                  {r.texto ? (
                    <blockquote className="mt-5 flex-1 font-display text-[1.3rem] font-semibold leading-[1.2] tracking-[-0.015em] text-ink">
                      <p>“{r.texto}”</p>
                    </blockquote>
                  ) : (
                    <p className="mt-5 flex-1 text-muted">{DEPOIMENTOS_TEXTO.semTexto}</p>
                  )}
                  <figcaption className="mt-7 flex items-center gap-3 border-t border-line pt-5">
                    <Image src={asset(r.foto)} alt="" width={44} height={44} unoptimized className="size-11 shrink-0 rounded-full bg-line object-cover" />
                    <span className="min-w-0">
                      <span className="block font-bold text-ink">{r.autor}</span>
                      <span className="block text-muted">
                        Google · <time dateTime={r.data}>{mesAno(r.data)}</time>
                      </span>
                    </span>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
