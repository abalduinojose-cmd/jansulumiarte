"use client";

import { useEffect, useRef } from "react";

import { MENSAGENS } from "@/content/site";
import { waLink } from "@/lib/whatsapp";

import { IconeWhatsApp } from "./IconeWhatsApp";

/**
 * Botão flutuante redondo do WhatsApp, verde que todo mundo reconhece (no
 * lugar da pílula de orçamento, pedido de 04/10). Só aparece depois que o
 * hero sai da tela (IntersectionObserver no #topo), fica acima do
 * safe-area do iPhone e some com o menu aberto. Um anel pulsa devagar,
 * só com movimento permitido.
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
    <a
      ref={ref}
      href={waLink(MENSAGENS.hero)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Conversar com a JanSu Lumiarte no WhatsApp"
      title="WhatsApp"
      className="whats-flutuante fixed bottom-[calc(1rem+env(safe-area-inset-bottom))] right-4 z-40 grid size-14 place-items-center rounded-full bg-[#25d366] text-white shadow-[0_14px_30px_-10px_rgb(18_140_70/0.65)] ring-4 ring-surface/80 md:bottom-7 md:right-7 md:size-16"
    >
      <span aria-hidden className="whats-pulso absolute inset-0 rounded-full bg-[#25d366]" />
      <IconeWhatsApp className="relative size-7 md:size-8" />
    </a>
  );
}
