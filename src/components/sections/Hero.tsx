import { ArrowUpRight, MapPin } from "lucide-react";
import Image from "next/image";

import cozinha from "@/assets/fotos/cozinha-amadeirada-grafite.jpg";
import { projetos } from "@/content/projetos";
import { HERO, MENSAGENS, PERFIL_GOOGLE, PROVA_GOOGLE, site } from "@/content/site";
import { waLink } from "@/lib/whatsapp";

import { Button } from "../ui/Button";
import { StarRating } from "../ui/StarRating";

/**
 * Hero em cartão dentro da noite (estrutura da Celebrare): à esquerda o
 * título em duas vozes da Clash ("Do detalhe" em 200, o resto em 600 com
 * "completo." em caramelo polido), a pílula de vidro com o lugar, os botões
 * e a microprova; à direita a foto real em pé, sem véu por cima do móvel,
 * e o atalho: cada projeto abre o WhatsApp com a mensagem pronta.
 * Ao rolar, o cartão recua e a foto desce por dentro dele (CSS puro).
 */
export function Hero() {
  const [, resto] = site.h1.split(HERO.h1Fino);
  const [antesBrilho] = resto.split(HERO.h1Brilho);
  return (
    <section id="topo" aria-labelledby="titulo-hero" className="no-escuro relative bg-noite p-2 sm:p-3">
      <div className="hero-cartao grao relative isolate grid overflow-hidden rounded-[1.5rem] bg-noite-2 sm:rounded-[2rem] lg:min-h-[calc(100svh-1.5rem)] lg:grid-cols-[1.2fr_0.8fr]">
        {/* luz quente de oficina atrás do título */}
        <div aria-hidden className="absolute -left-40 top-1/3 -z-10 size-[34rem] rounded-full bg-accent/20 blur-[120px]" />

        <div className="flex flex-col justify-end px-5 pb-10 pt-28 sm:px-10 lg:px-14 lg:pb-14">
          <p className="sobe inline-flex w-fit items-center gap-3 rounded-full border border-surface/20 bg-surface/10 py-1.5 pl-1.5 pr-4 text-[0.85rem] text-surface-alt backdrop-blur-md">
            <span className="grid size-7 place-items-center rounded-full bg-accent text-ink">
              <MapPin aria-hidden className="size-3.5" strokeWidth={2.2} />
            </span>
            <span className="font-bold">{HERO.local}</span>
            <span aria-hidden className="hidden h-3.5 w-px bg-surface/30 sm:block" />
            <span className="hidden text-surface/75 sm:inline">{HERO.localApoio}</span>
          </p>

          {/* Título e subtítulo sem animação de entrada: no celular um dos dois é o LCP. */}
          <h1 id="titulo-hero" className="t-h1 mt-7 text-surface-alt">
            <span className="fino block">{HERO.h1Fino}</span>
            {antesBrilho}
            <span className="caramelo-metalico">{HERO.h1Brilho}</span>
          </h1>

          <p className="t-lead mt-7 max-w-[46ch] text-surface/80">
            {HERO.subtitulo}
          </p>

          <div className="sobe mt-9 flex flex-col gap-3 sm:flex-row sm:items-center" style={{ animationDelay: "200ms" }}>
            <Button href={waLink(MENSAGENS.hero)} variante="caramelo" tamanho="lg" whatsapp seta>
              {HERO.ctaPrincipal}
            </Button>
            <Button href="#projetos" variante="vidro" tamanho="lg">
              {HERO.ctaSecundario}
            </Button>
          </div>

          <a
            href={PERFIL_GOOGLE}
            target="_blank"
            rel="noopener noreferrer"
            className="sobe mt-8 inline-flex min-h-11 w-fit flex-wrap items-center gap-x-3 gap-y-1 text-surface-alt underline-offset-4 hover:underline"
            style={{ animationDelay: "280ms" }}
          >
            <StarRating nota={site.avaliacoes.nota} />
            <span>
              <strong className="font-bold">{PROVA_GOOGLE}</strong>
              <span className="text-surface/70"> · {HERO.regiao}</span>
            </span>
          </a>
        </div>

        <div className="relative flex flex-col gap-2 p-2 lg:pl-0">
          <div className="relative min-h-[26rem] flex-1 overflow-hidden rounded-[1.1rem] sm:rounded-[1.5rem]">
            <div className="zoom-entrada absolute inset-0">
              <Image
                src={cozinha}
                alt="Cozinha planejada com armários aéreos amadeirados até o teto, nichos brancos e gaveteiro suspenso grafite com puxador cava"
                priority
                fill
                quality={90}
                sizes="(min-width: 1024px) 36vw, 100vw"
                className="hero-foto object-cover object-[50%_45%]"
              />
            </div>
          </div>

          <div className="sobe rounded-[1.1rem] border border-surface/12 bg-noite/70 p-5 backdrop-blur-xl sm:rounded-[1.5rem] sm:p-6" style={{ animationDelay: "360ms" }}>
            <p className="font-display text-[1.3rem] leading-tight text-surface-alt">{HERO.atalhoTitulo}</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {projetos.map((p) => (
                <li key={p.slug}>
                  <a
                    href={waLink(MENSAGENS.projeto(p.titulo))}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex min-h-11 items-center gap-1.5 rounded-full border border-surface/20 bg-surface/5 px-3.5 text-[0.88rem] font-normal text-surface-alt transition hover:border-accent hover:bg-accent hover:text-ink"
                  >
                    {p.titulo}
                    <ArrowUpRight aria-hidden className="size-3.5 opacity-60 transition group-hover:rotate-45 group-hover:opacity-100" strokeWidth={2} />
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-[0.88rem] text-surface/70">{HERO.atalhoApoio}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
