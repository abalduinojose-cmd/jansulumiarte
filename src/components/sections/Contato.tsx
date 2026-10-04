import { Clock, MapPin, Navigation } from "lucide-react";
import Image from "next/image";

import mapa from "@/assets/mapa/fonte-santa.jpg";
import { CONTATO, MENSAGENS, PERFIL_GOOGLE, ROTA, site } from "@/content/site";
import { waLink } from "@/lib/whatsapp";

import { Button } from "../ui/Button";
import { IconeInstagram } from "../ui/IconesRedes";
import { SectionHeading } from "../ui/SectionHeading";
import { FormOrcamento } from "./FormOrcamento";

/**
 * Orçamento em duas metades de um mesmo cartão (estrutura da Celebrare): à
 * esquerda a noite, com o WhatsApp grande (o CTA principal), o NAP, o
 * horário, o Instagram, o mapa na paleta da marca (imagem local, sem
 * iframe) e "Como chegar". À direita o formulário, a alternativa.
 */
export function Contato() {
  const item = "flex gap-3.5 text-surface/85";
  return (
    <section id="contato" aria-labelledby="titulo-contato" className="bg-surface py-20 md:py-28">
      <div className="container-page">
        <div className="revela grid grid-cols-1 overflow-hidden rounded-[2rem] border border-ink/8 bg-surface-alt shadow-[0_40px_80px_-50px_rgb(22_16_11/0.55)] lg:grid-cols-[0.95fr_1.05fr]">
          <div className="no-escuro grao relative isolate min-w-0 overflow-hidden bg-noite p-7 sm:p-10 lg:p-12">
            <div aria-hidden className="absolute -right-24 -top-24 -z-10 size-72 rounded-full bg-accent/20 blur-[90px]" />
            <SectionHeading id="titulo-contato" eyebrow={CONTATO.eyebrow} titulo={CONTATO.titulo} fino={CONTATO.fino} texto={CONTATO.texto} escuro className="[&_.t-h2]:text-[clamp(2.1rem,1.5rem+2.2vw,3.25rem)]" />
            <Button href={waLink(MENSAGENS.contato)} variante="caramelo" tamanho="lg" whatsapp seta className="mt-9">
              {CONTATO.ctaWhatsapp}
            </Button>

            <ul className="mt-10 space-y-4 border-t border-surface/12 pt-8">
              <li className={item}>
                <MapPin aria-hidden className="mt-1 size-5 shrink-0 text-accent" />
                <address className="not-italic">
                  <span className="block font-bold text-surface-alt">{site.nome}</span>
                  {site.endereco.rua} - {site.endereco.bairro}, {site.endereco.cidade} - {site.endereco.uf}, <span className="whitespace-nowrap">{site.endereco.cep}</span>
                </address>
              </li>
              <li className={item}>
                <Clock aria-hidden className="mt-1 size-5 shrink-0 text-accent" />
                <span>{site.horario}</span>
              </li>
              <li className="flex items-center gap-3.5">
                <IconeInstagram className="size-5 shrink-0 text-accent" />
                <a href={site.instagram} target="_blank" rel="noopener noreferrer" className="link-traco">
                  {site.instagramArroba}
                </a>
              </li>
            </ul>

            {/* Mapa na identidade da marca: tiles do OpenStreetMap recoloridos
                (scripts/mapa.py), imagem local, zero iframe e zero cookie. O
                pino fica no centro exato, que é o endereço. */}
            <figure className="relative mt-8 overflow-hidden rounded-[1.25rem] border border-surface/12">
              <Image src={mapa} alt="Mapa da região da Fonte Santa, em Teresópolis, com a marcenaria marcada no centro, perto da Rodovia Santos Dumont" sizes="(min-width: 1024px) 32rem, 100vw" quality={90} className="h-60 w-full object-cover md:h-72" />
              <span aria-hidden className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full">
                <span className="absolute left-1/2 top-[1.15rem] size-12 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/35 [animation:pulso_2.4s_ease-out_infinite] motion-reduce:hidden" />
                <span className="relative flex flex-col items-center">
                  <span className="grid size-10 rotate-45 place-items-center rounded-full rounded-br-none bg-accent shadow-[0_8px_20px_-6px_rgb(0_0_0/0.7)] ring-4 ring-noite/60">
                    <span className="size-3 -rotate-45 rounded-full bg-noite" />
                  </span>
                </span>
              </span>
              <span aria-hidden className="absolute left-1/2 top-1/2 mt-3 -translate-x-1/2 whitespace-nowrap rounded-full bg-noite/85 px-3 py-1 text-[0.85rem] font-bold text-surface-alt backdrop-blur">
                {site.nomeCurto}
              </span>
              <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer" className="absolute right-2 top-2 inline-flex min-h-11 items-center rounded-full bg-noite/80 px-3 text-[0.75rem] text-surface/85 hover:text-surface-alt">
                © OpenStreetMap
              </a>
              <figcaption className="absolute bottom-3 left-3">
                <a href={PERFIL_GOOGLE} target="_blank" rel="noopener noreferrer" className="btn btn-vidro h-11 bg-noite/60 px-4 text-[0.88rem]">
                  <MapPin aria-hidden className="size-4" />
                  {CONTATO.mapa}
                </a>
              </figcaption>
            </figure>
            <Button href={ROTA} variante="vidro" className="mt-4">
              <Navigation aria-hidden className="size-4" />
              {CONTATO.comoChegar}
            </Button>
          </div>

          <div className="min-w-0 p-6 sm:p-10 lg:p-12">
            <h3 className="t-h3 text-ink">{CONTATO.formTitulo}</h3>
            <div className="mt-7">
              <FormOrcamento />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
