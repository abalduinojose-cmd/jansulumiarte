import type { CSSProperties } from "react";

import { MENSAGENS, PERSONALIZACAO } from "@/content/site";
import { waLink } from "@/lib/whatsapp";

import { Button } from "../ui/Button";
import { Pendente } from "../ui/Pendente";
import { Prancha } from "../ui/Prancha";

/**
 * O momento de rolagem do site: a seção é alta e o conteúdo fica preso na
 * tela enquanto a frase do cliente acende palavra por palavra (cada uma tem
 * a sua fatia da linha do tempo --frase). Muda só a cor, não a posição,
 * então vale também com "reduzir movimento". A cor apagada ainda passa de
 * 3:1 (texto grande). Ao lado, o detalhe do acabamento em corte técnico.
 */
export function Personalizacao() {
  const palavras = PERSONALIZACAO.titulo.split(" ");
  return (
    <section aria-labelledby="titulo-personalizacao" className="frase-trilho no-escuro grao relative bg-noite lg:h-[220vh]">
      <div className="lg:sticky lg:top-0 lg:flex lg:h-svh lg:items-center">
        <div className="container-page grid gap-12 py-20 lg:grid-cols-[1.35fr_0.65fr] lg:items-center lg:gap-16 lg:py-0">
          <div>
            <p className="rotulo flex items-center gap-2.5 text-accent">
              <span aria-hidden className="size-1.5 rounded-full bg-accent" />
              {PERSONALIZACAO.eyebrow}
            </p>
            <h2 id="titulo-personalizacao" className="t-h1 mt-6 text-surface-alt">
              {palavras.map((p, i) => (
                <span key={`${p}-${i}`} className="frase-palavra" style={{ "--i": i, "--n": palavras.length } as CSSProperties}>
                  {p}{" "}
                </span>
              ))}
            </h2>
            <p className="t-lead mt-8 max-w-[48ch] text-surface/80">{PERSONALIZACAO.texto}</p>
            <Button href={waLink(MENSAGENS.contato)} variante="caramelo" whatsapp seta className="mt-9">
              {PERSONALIZACAO.cta}
            </Button>
          </div>
          <figure className="revela">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] border border-surface/10">
              <Prancha desenho="corte-cava" titulo="Corte do puxador cava: duas frentes e o perfil entre elas" className="absolute inset-0 p-6" />
              <Pendente marcador="[[FOTO DE DETALHE DE ACABAMENTO: PENDENTE]]" className="absolute bottom-3 left-3 right-3 text-center" />
            </div>
            <figcaption className="rotulo mt-4 text-accent">{PERSONALIZACAO.detalhe}</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
