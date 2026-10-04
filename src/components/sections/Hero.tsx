import { ArrowUpRight, MapPin } from "lucide-react";
import Image from "next/image";

import cozinha from "@/assets/fotos/cozinha-amadeirada-grafite.jpg";
import { projetos } from "@/content/projetos";
import { HERO, MENSAGENS, PERFIL_GOOGLE, PROVA_GOOGLE, site } from "@/content/site";
import { cx } from "@/lib/cx";
import { waLink } from "@/lib/whatsapp";

import { Button } from "../ui/Button";
import { StarRating } from "../ui/StarRating";

/** Atalho: cada projeto abre o WhatsApp com a mensagem pronta. */
function Atalho({ className }: { readonly className?: string }) {
  return (
    <div className={cx("rounded-[1.25rem] border border-surface/15 bg-noite/65 p-5 backdrop-blur-xl sm:p-6", className)}>
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
      <p className="mt-4 text-[0.88rem] text-surface/75">{HERO.atalhoApoio}</p>
    </div>
  );
}

/**
 * Hero de tela cheia, borda a borda (pedido de 04/10: nada de moldura em
 * volta). Desktop: exatamente a altura da tela, título em duas vozes da
 * Clash à esquerda e a foto real preenchendo a coluna direita de cima a
 * baixo, sem véu sobre o móvel, com o atalho em vidro por cima do pé da
 * foto. Celular: a foto vira o fundo da tela inteira e um degradê da noite
 * sobe por trás do texto. Ao rolar, o hero recua até virar cartão e a foto
 * desce por dentro dele (CSS scroll-driven).
 */
export function Hero() {
  const [, resto] = site.h1.split(HERO.h1Fino);
  const [antesBrilho] = resto.split(HERO.h1Brilho);
  return (
    <section id="topo" aria-labelledby="titulo-hero" className="no-escuro relative bg-noite">
      <div className="hero-cartao grao relative isolate overflow-hidden bg-noite-2 lg:grid lg:h-svh lg:min-h-[40rem] lg:grid-cols-[1.15fr_0.85fr]">
        {/* luz quente de oficina atrás do título */}
        <div aria-hidden className="absolute -left-40 top-1/3 -z-10 size-[34rem] rounded-full bg-accent/20 blur-[120px]" />

        {/* A foto: fundo da tela no celular, coluna inteira no desktop. */}
        <div className="absolute inset-x-0 top-0 h-svh overflow-hidden lg:relative lg:order-2 lg:h-full">
          <div className="zoom-entrada absolute inset-0">
            <Image
              src={cozinha}
              alt="Cozinha planejada com armários aéreos amadeirados até o teto, nichos brancos e gaveteiro suspenso grafite com puxador cava"
              priority
              fill
              quality={90}
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="hero-foto object-cover object-[50%_40%]"
            />
          </div>
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-noite-2 from-35% via-noite-2/80 to-noite-2/30 lg:hidden" />
          <div aria-hidden className="absolute inset-y-0 left-0 hidden w-28 bg-gradient-to-r from-noite-2 to-transparent lg:block" />
          <Atalho className="absolute inset-x-6 bottom-6 hidden lg:block xl:inset-x-8 xl:bottom-8" />
        </div>

        <div className="relative z-10 flex min-h-svh flex-col justify-end px-5 pb-10 pt-28 sm:px-10 lg:order-1 lg:min-h-0 lg:justify-center lg:px-14 lg:pb-12 xl:pl-[max(3.5rem,calc((100vw-78rem)/2+3rem))]">
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

          <p className="t-lead mt-7 max-w-[46ch] text-surface/85">{HERO.subtitulo}</p>

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
              <span className="text-surface/75"> · {HERO.regiao}</span>
            </span>
          </a>
        </div>

        {/* No celular o atalho vem logo abaixo da primeira tela. */}
        <div className="relative z-10 px-3 pb-3 lg:hidden">
          <Atalho />
        </div>
      </div>
    </section>
  );
}
