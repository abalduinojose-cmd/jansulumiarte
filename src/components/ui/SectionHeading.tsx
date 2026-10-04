import { cx } from "@/lib/cx";

type Props = {
  readonly id: string;
  readonly eyebrow: string;
  /** Título; o trecho em `fino` sai em Clash 200, o resto em 600. */
  readonly titulo: string;
  readonly fino?: string;
  readonly texto?: string;
  readonly escuro?: boolean;
  readonly centro?: boolean;
  readonly className?: string;
};

/**
 * Rótulo com o ponto caramelo, H2 com o contraste de extremos da Clash
 * (o trecho fino em 200, o resto em 600) e apoio. Um tamanho de H2 só.
 */
export function SectionHeading({ id, eyebrow, titulo, fino, texto, escuro = false, centro = false, className }: Props) {
  const partes = fino && titulo.includes(fino) ? titulo.split(fino) : null;
  return (
    <div className={cx("revela max-w-3xl", centro && "mx-auto flex flex-col items-center text-center", className)}>
      <p className={cx("rotulo flex items-center gap-2.5", escuro ? "text-accent" : "text-brand")}>
        <span aria-hidden className="size-1.5 rounded-full bg-accent" />
        {eyebrow}
      </p>
      <h2 id={id} className={cx("t-h2 mt-5", escuro ? "text-surface-alt" : "text-ink")}>
        {partes ? (
          <>
            {partes[0]}
            <span className={cx("fino", escuro && "caramelo-metalico")}>{fino}</span>
            {partes[1]}
          </>
        ) : (
          titulo
        )}
      </h2>
      {texto ? <p className={cx("t-lead mt-6 max-w-[54ch]", escuro ? "text-surface/80" : "text-muted")}>{texto}</p> : null}
    </div>
  );
}
