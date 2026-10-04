import { TRUST } from "@/content/site";

import { Logo } from "../ui/Logo";

function Itens({ oculto = false }: { readonly oculto?: boolean }) {
  return (
    <ul aria-hidden={oculto || undefined} className="faixa-lista flex shrink-0 items-center gap-12 pr-12">
      {TRUST.map((t) => (
        <li key={t} className="flex items-center gap-12 whitespace-nowrap">
          <span className="font-display text-[clamp(1.6rem,1.1rem+2vw,2.75rem)] text-surface-alt">
            <span className="fino">{t}</span>
          </span>
          <Logo cor="branco" tipo="plaina" sizes="56px" decorativo className="h-auto w-12 opacity-70" />
        </li>
      ))}
    </ul>
  );
}

/**
 * Os quatro diferenciais numa faixa corrida, separados pela plaina. Ela
 * anda para o lado enquanto a página desce (scroll-driven); a segunda
 * cópia é só visual, para a faixa nunca acabar.
 */
export function TrustBar() {
  return (
    <section aria-label="Diferenciais" className="no-escuro overflow-hidden bg-noite py-10 md:py-14">
      <div className="faixa">
        <Itens />
        <Itens oculto />
      </div>
    </section>
  );
}
