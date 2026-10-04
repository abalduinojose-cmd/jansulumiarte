import { cx } from "@/lib/cx";

import { Logo } from "./Logo";

/**
 * Assinatura do site: a plaina da logo corre um fio. À frente dela o fio é
 * tracejado (madeira bruta); por onde passou, fica liso e dourado. A plaina
 * anda com a rolagem (scroll-driven, CSS puro). Decorativa: aria-hidden.
 */
export function LinhaPlaina({ escuro = false, className }: { readonly escuro?: boolean; readonly className?: string }) {
  return (
    <div aria-hidden className={cx("plaina-trilho", className)}>
      <span className="plaina-bruto" />
      <span className="plaina-liso" />
      <span className="plaina-cursor">
        <Logo cor={escuro ? "branco" : "marrom"} tipo="plaina" sizes="72px" decorativo className="block h-auto w-full" />
      </span>
    </div>
  );
}
