"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { MENSAGENS, NAV, site } from "@/content/site";
import { waLink } from "@/lib/whatsapp";

import { IconeWhatsApp } from "../ui/IconeWhatsApp";

/**
 * Drawer de tela cheia, irmão visual do header. Aberto: trava a rolagem,
 * deixa main/footer inertes (o foco fica preso entre o botão e o menu),
 * fecha no Esc devolvendo o foco ao botão, ao tocar num link e ao girar
 * para largura de desktop.
 */
export function MobileNav() {
  const [aberto, setAberto] = useState(false);
  const botao = useRef<HTMLButtonElement>(null);
  const painel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const raiz = document.documentElement;
    raiz.dataset.menu = aberto ? "1" : "0";
    raiz.style.overflow = aberto ? "hidden" : "";
    document.querySelectorAll<HTMLElement>("main, footer, .cta-fixo").forEach((el) => {
      el.inert = aberto;
    });
    if (!aberto) return;
    painel.current?.querySelector<HTMLElement>("a")?.focus();
    const tecla = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setAberto(false);
        botao.current?.focus();
      }
    };
    const largo = window.matchMedia("(min-width: 1024px)");
    const girou = () => largo.matches && setAberto(false);
    window.addEventListener("keydown", tecla);
    largo.addEventListener("change", girou);
    return () => {
      window.removeEventListener("keydown", tecla);
      largo.removeEventListener("change", girou);
    };
  }, [aberto]);

  const fechar = () => setAberto(false);

  return (
    <div className="lg:hidden">
      <button
        ref={botao}
        type="button"
        onClick={() => setAberto((v) => !v)}
        aria-expanded={aberto}
        aria-controls="menu-celular"
        aria-label={aberto ? "Fechar menu" : "Abrir menu"}
        className="relative z-[60] grid size-11 place-items-center rounded-full border border-current/30"
      >
        {aberto ? <X aria-hidden className="size-5" /> : <Menu aria-hidden className="size-5" />}
      </button>

      <div ref={painel} id="menu-celular" className={`${aberto ? "flex" : "hidden"} no-escuro grao fixed inset-0 z-[55] flex-col bg-noite pt-[4.75rem] text-surface`}>
        <nav aria-label="Menu do celular" className="container-page flex-1 overflow-y-auto py-4">
          {NAV.map((l) => (
            <a key={l.href} href={l.href} onClick={fechar} className="block border-b border-white/10 py-4 font-display text-[2.2rem] font-semibold leading-tight tracking-[-0.03em] text-surface-alt transition hover:text-accent-claro">
              {l.rotulo}
            </a>
          ))}
        </nav>
        <div className="container-page space-y-3 border-t border-white/10 py-6 pb-[calc(1.5rem+env(safe-area-inset-bottom))]">
          <a href={waLink(MENSAGENS.hero)} target="_blank" rel="noopener noreferrer" onClick={fechar} className="btn btn-caramelo h-14 w-full text-base">
            <IconeWhatsApp className="size-5" />
            Falar no WhatsApp
          </a>
          <p className="text-center text-surface/80">{site.whatsappDisplay}</p>
        </div>
      </div>
    </div>
  );
}
