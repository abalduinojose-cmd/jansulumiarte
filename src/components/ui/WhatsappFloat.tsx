"use client";

import { useEffect, useRef } from "react";

import { MENSAGENS, NOTA, site } from "@/content/site";
import { waLink } from "@/lib/whatsapp";

import { IconeWhatsApp } from "./IconeWhatsApp";

/**
 * CTA fixo (padrão Cabana/Celebrare): pílula clara com a prova (5,0 com as
 * 4 avaliações) e o botão de WhatsApp. Só aparece depois que o hero sai da
 * tela (IntersectionObserver no #topo), acima do safe-area do iPhone, e
 * some com o menu aberto.
 */
export function WhatsappFloat() {
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const hero = document.getElementById("topo");
    const botao = ref.current;
    if (!hero || !botao) return;
    const obs = new IntersectionObserver(([e]) => {
      botao.dataset.visivel = e.isIntersecting ? "0" : "1";
    });
    obs.observe(hero);
    return () => obs.disconnect();
  }, []);

  return (
    <a ref={ref} href={waLink(MENSAGENS.hero)} target="_blank" rel="noopener noreferrer" aria-label={`Pedir orçamento no WhatsApp. ${NOTA} no Google, ${site.avaliacoes.total} avaliações`} className="cta-fixo">
      <span aria-hidden className="hidden items-center gap-1.5 text-[0.9rem] sm:flex">
        <span className="text-accent-fundo">★</span>
        <strong className="font-bold">{NOTA}</strong>
        <span className="text-muted">· {site.avaliacoes.total} avaliações</span>
      </span>
      <span aria-hidden className="cta-zap">
        <IconeWhatsApp className="size-[1.1rem]" />
        Orçamento
      </span>
    </a>
  );
}
