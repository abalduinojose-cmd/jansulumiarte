"use client";

import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";

import type { FotoPortfolio } from "@/content/portfolio";
import { cx } from "@/lib/cx";

type Grupo = { readonly ambiente: string; readonly fotos: readonly FotoPortfolio[] };

/**
 * Grade do portfólio agrupada por ambiente + lightbox. O lightbox é um
 * <dialog> nativo aberto com showModal(): o navegador prende o foco, deixa o
 * fundo inerte (aria-modal implícito) e fecha no Esc; as setas do teclado
 * navegam. Lazy em tudo, menos nas 2 primeiras fotos.
 */
export default function Lightbox({ grupos }: { readonly grupos: readonly Grupo[] }) {
  const todas = grupos.flatMap((g) => g.fotos);
  const [aberta, setAberta] = useState<number | null>(null);
  const gatilho = useRef<HTMLButtonElement | null>(null);
  /* Fechou: o foco volta à miniatura que abriu, depois que o <dialog> sai. */
  useEffect(() => {
    if (aberta === null) gatilho.current?.focus();
  }, [aberta]);
  let indice = 0;

  return (
    <>
      <div className="space-y-12">
        {grupos.map((g) => (
          <div key={g.ambiente}>
            <h3 className="rotulo flex items-center gap-3 text-brand">
              {g.ambiente}
              <span aria-hidden className="h-px flex-1 bg-line" />
              <span className="font-normal tracking-[0.08em] text-ink">{g.fotos.length} {g.fotos.length === 1 ? "foto" : "fotos"}</span>
            </h3>
            <ul className={cx("mt-5 columns-1 gap-4 sm:columns-2", g.fotos.length >= 3 && "lg:columns-3")}>
              {g.fotos.map((f) => {
                const i = indice++;
                return (
                  <li key={f.alt} className="mb-4 break-inside-avoid">
                    <button
                      type="button"
                      onClick={(e) => {
                        gatilho.current = e.currentTarget;
                        setAberta(i);
                      }}
                      aria-label={`Ampliar: ${f.alt}`}
                      className="cortina group relative block w-full overflow-hidden rounded-[1.25rem]"
                    >
                      <Image
                        src={f.src}
                        alt={f.alt}
                        quality={90}
                        sizes="(min-width: 1024px) 24rem, (min-width: 640px) 50vw, 100vw"
                        loading={i < 2 ? "eager" : "lazy"}
                        className="h-auto w-full transition-transform duration-700 ease-[var(--ease-plaina)] group-hover:scale-[1.03]"
                      />
                      <span aria-hidden className="absolute right-3 top-3 grid size-10 place-items-center rounded-full bg-surface-alt/90 text-brand opacity-0 transition group-hover:opacity-100 group-focus-visible:opacity-100">
                        <Expand className="size-4" />
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
      {aberta !== null ? (
        <Dialogo
          fotos={todas}
          inicial={aberta}
          aoFechar={() => setAberta(null)}
        />
      ) : null}
    </>
  );
}

function Dialogo({ fotos, inicial, aoFechar }: { readonly fotos: readonly FotoPortfolio[]; readonly inicial: number; readonly aoFechar: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  const [i, setI] = useState(inicial);
  const total = fotos.length;
  const foto = fotos[i];

  useEffect(() => {
    const d = ref.current;
    if (d && !d.open) d.showModal();
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, []);

  const ir = (passo: number) => setI((v) => (v + passo + total) % total);
  const tecla = (e: KeyboardEvent<HTMLDialogElement>) => {
    if (e.key === "ArrowRight") ir(1);
    if (e.key === "ArrowLeft") ir(-1);
  };
  const botao = "grid size-12 place-items-center rounded-full border border-white/25 bg-black/30 text-white transition hover:bg-white hover:text-ink";

  return (
    <dialog
      ref={ref}
      aria-label="Fotos ampliadas do portfólio"
      aria-modal="true"
      onKeyDown={tecla}
      onCancel={(e) => {
        e.preventDefault();
        aoFechar();
      }}
      className="galeria no-escuro m-0 h-dvh max-h-none w-screen max-w-none bg-transparent p-0 text-white"
    >
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between px-5 py-4">
          <p className="text-sm tabular-nums text-white/80" aria-live="polite">{`${i + 1} de ${total} · ${foto.ambiente}`}</p>
          <button type="button" autoFocus onClick={aoFechar} aria-label="Fechar" className={botao}>
            <X className="size-5" aria-hidden />
          </button>
        </div>
        <figure className="relative min-h-0 flex-1">
          <Image key={foto.alt} quality={90} src={foto.src} alt={foto.alt} fill sizes="100vw" className="object-contain px-3 md:px-20" />
          {total > 1 ? (
            <>
              <button type="button" onClick={() => ir(-1)} aria-label="Foto anterior" className={cx(botao, "absolute left-3 top-1/2 -translate-y-1/2 md:left-6")}>
                <ChevronLeft className="size-5" aria-hidden />
              </button>
              <button type="button" onClick={() => ir(1)} aria-label="Próxima foto" className={cx(botao, "absolute right-3 top-1/2 -translate-y-1/2 md:right-6")}>
                <ChevronRight className="size-5" aria-hidden />
              </button>
            </>
          ) : null}
        </figure>
        <p className="mx-auto max-w-3xl px-5 py-5 text-center text-sm text-white/80">{foto.alt}</p>
      </div>
    </dialog>
  );
}
