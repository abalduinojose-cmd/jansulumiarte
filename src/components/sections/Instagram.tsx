import { ArrowRight } from "lucide-react";
import type { StaticImageData } from "next/image";
import type { CSSProperties } from "react";

import closet from "@/assets/videos/closet-iluminado.jpg";
import loja from "@/assets/videos/loja-planejada.jpg";
import quarto from "@/assets/videos/quarto-bom-retiro.jpg";
import { INSTAGRAM, MENSAGENS, site } from "@/content/site";
import { asset } from "@/lib/asset";
import { waLink } from "@/lib/whatsapp";

import { Button } from "../ui/Button";
import { IconeInstagram } from "../ui/IconesRedes";
import { SectionHeading } from "../ui/SectionHeading";

const CAPAS: Record<(typeof INSTAGRAM.videos)[number]["id"], StaticImageData> = {
  "loja-planejada": loja,
  "quarto-bom-retiro": quarto,
  "closet-iluminado": closet,
};

/**
 * Reels reais do @jansu_lumiarte numa seção-cartão da noite (padrão Reels
 * da Cabana). <video controls preload="none">: nada baixa até o play, sem
 * autoplay e sem JavaScript; a capa é um quadro de 540px. No celular os
 * vídeos correm num trilho com scroll-snap (CSS puro); no desktop, grade de
 * três com o convite para seguir ao lado.
 */
export function Instagram() {
  return (
    <section id="instagram" aria-labelledby="titulo-instagram" className="bg-surface px-2 sm:px-3">
      <div className="no-escuro grao relative isolate overflow-clip rounded-[2rem] bg-noite py-20 md:py-28">
        <div aria-hidden className="absolute -left-40 -top-40 -z-10 size-[30rem] rounded-full bg-accent/15 blur-[120px]" />
        <div className="container-page">
          <div className="grid items-end gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <SectionHeading id="titulo-instagram" eyebrow={INSTAGRAM.eyebrow} titulo={INSTAGRAM.titulo} fino={INSTAGRAM.fino} texto={INSTAGRAM.texto} escuro />
            <a href={site.instagram} target="_blank" rel="noopener noreferrer" className="link-traco justify-self-start lg:justify-self-end">
              <IconeInstagram className="size-5" />
              {site.instagramArroba}
              <ArrowRight aria-hidden className="size-4" strokeWidth={2} />
            </a>
          </div>
        </div>

        <ul className="scrollbar-none mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-[max(1rem,calc((100%-78rem)/2+1rem))] pb-2 sm:px-[max(2rem,calc((100%-78rem)/2+3rem))] lg:grid lg:grid-cols-4 lg:overflow-visible">
          {INSTAGRAM.videos.map((v, i) => (
            <li key={v.id} className="revela w-[72vw] max-w-[19rem] shrink-0 snap-start lg:w-auto lg:max-w-none" style={{ "--d": i } as CSSProperties}>
              <figure className="flex h-full flex-col">
                <div className="relative aspect-[9/16] overflow-hidden rounded-[1.5rem] border border-surface/10 bg-noite-2">
                  <video
                    controls
                    preload="none"
                    playsInline
                    poster={CAPAS[v.id].src}
                    aria-label={`Vídeo: ${v.titulo}. ${v.legenda}`}
                    className="absolute inset-0 size-full object-cover"
                  >
                    <source src={asset(`/videos/${v.id}.mp4`)} type="video/mp4" />
                  </video>
                </div>
                <figcaption className="px-1 pt-4">
                  <span className="block font-display text-[1.3rem] font-semibold leading-tight text-surface-alt">{v.titulo}</span>
                  <span className="mt-1.5 block text-[0.95rem] leading-snug text-surface/75">{v.legenda}</span>
                  <span className="rotulo mt-3 block text-accent">{v.data}</span>
                </figcaption>
              </figure>
            </li>
          ))}

          <li className="revela w-[72vw] max-w-[19rem] shrink-0 snap-start lg:w-auto lg:max-w-none" style={{ "--d": 3 } as CSSProperties}>
            <div className="flex aspect-[9/16] flex-col justify-between rounded-[1.5rem] border border-accent/40 bg-[linear-gradient(160deg,rgb(200_155_98/0.22),rgb(22_16_11/0.2)_60%)] p-7">
              <span className="grid size-14 place-items-center rounded-full bg-accent text-ink">
                <IconeInstagram className="size-6" strokeWidth={1.8} />
              </span>
              <div>
                <p className="font-display text-[1.9rem] font-semibold leading-[1.02] text-surface-alt">{INSTAGRAM.conviteTitulo}</p>
                <p className="mt-3 text-surface/80">{INSTAGRAM.conviteTexto}</p>
                <div className="mt-7 flex flex-col gap-3">
                  <Button href={site.instagram} variante="caramelo" seta>
                    {INSTAGRAM.conviteCta}
                  </Button>
                  <Button href={waLink(MENSAGENS.portfolio)} variante="vidro" whatsapp>
                    {INSTAGRAM.whatsapp}
                  </Button>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
}
