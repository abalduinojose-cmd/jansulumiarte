import { Clock, MapPin, Navigation } from "lucide-react";

import { CONTATO, MAPA_EMBED, MENSAGENS, ROTA, site } from "@/content/site";
import { waLink } from "@/lib/whatsapp";

import { Button } from "../ui/Button";
import { IconeInstagram } from "../ui/IconesRedes";
import { SectionHeading } from "../ui/SectionHeading";
import { FormOrcamento } from "./FormOrcamento";

/**
 * Orçamento em duas metades de um mesmo cartão (estrutura da Celebrare): à
 * esquerda a noite, com o WhatsApp grande (o CTA principal), o NAP, o
 * horário, o Instagram, "Como chegar" e o mapa, que começa como fachada
 * dentro de um <details> e só carrega o iframe do Google depois do clique
 * (zero JS). À direita o formulário, a alternativa.
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

            <details className="group mt-8 overflow-hidden rounded-[1.25rem] border border-surface/12">
              <summary className="relative grid h-44 cursor-pointer list-none place-items-center bg-[linear-gradient(rgb(245_241_234/0.05)_1px,transparent_1px),linear-gradient(90deg,rgb(245_241_234/0.05)_1px,transparent_1px)] bg-[size:22px_22px] [&::-webkit-details-marker]:hidden">
                <span className="flex flex-col items-center gap-3 text-center group-open:hidden">
                  <span className="grid size-12 place-items-center rounded-full bg-accent text-ink">
                    <MapPin aria-hidden className="size-5" />
                  </span>
                  <span className="font-bold text-surface-alt underline decoration-accent underline-offset-4">{CONTATO.mapa}</span>
                </span>
                <span className="hidden font-bold text-accent-claro group-open:inline">Fechar o mapa</span>
              </summary>
              <iframe title={`Mapa: ${site.nome}`} src={MAPA_EMBED} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="block h-72 w-full border-0" />
            </details>
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
