import { cx } from "@/lib/cx";

/** Estrelas em dourado, decorativas; o valor vai no aria-label. */
export function StarRating({ nota, className = "size-4" }: { readonly nota: number; readonly className?: string }) {
  return (
    <span role="img" aria-label={`${nota.toLocaleString("pt-BR", { minimumFractionDigits: 1 })} de 5 estrelas`} className="inline-flex gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} viewBox="0 0 20 20" aria-hidden className={cx(className, i < Math.round(nota) ? "text-accent" : "text-line")} fill="currentColor">
          <path d="M10 1.5l2.6 5.5 6 .8-4.4 4.1 1.1 5.9L10 15l-5.3 2.8 1.1-5.9L1.4 7.8l6-.8z" />
        </svg>
      ))}
    </span>
  );
}
