import { ArrowRight } from "lucide-react";
import Image from "next/image";
import type { CSSProperties } from "react";

import { materiais } from "@/content/materiais";
import { MATERIAIS_TEXTO, MENSAGENS } from "@/content/site";
import { waLink } from "@/lib/whatsapp";

import { Pendente } from "../ui/Pendente";
import { SectionHeading } from "../ui/SectionHeading";
import { Textura } from "../ui/Textura";

/**
 * Três cartões de material. A textura abre como cortina ao entrar na tela
 * e corre em parallax dentro da moldura. Sem especificação inventada.
 */
export function Materiais() {
  return (
    <section id="materiais" aria-labelledby="titulo-materiais" className="bg-surface py-20 md:py-28">
      <div className="container-page">
        <SectionHeading id="titulo-materiais" eyebrow={MATERIAIS_TEXTO.eyebrow} titulo={MATERIAIS_TEXTO.titulo} fino={MATERIAIS_TEXTO.fino} texto={MATERIAIS_TEXTO.texto} />
        <ul className="mt-14 grid gap-5 md:grid-cols-3">
          {materiais.map((m, i) => (
            <li key={m.nome} className="revela cartao flex flex-col p-2" style={{ "--d": i } as CSSProperties}>
              <div className="cortina relative aspect-[4/3] overflow-hidden rounded-[1.1rem]">
                <div className="deriva absolute inset-0">
                  {m.foto ? <Image src={m.foto.src} alt={m.foto.alt} fill quality={90} sizes="(min-width: 768px) 24rem, 100vw" className="object-cover" /> : <Textura material={m.nome} />}
                </div>
              </div>
              <div className="flex flex-1 flex-col px-4 pb-4 pt-6">
                <h3 className="t-h3 text-ink">{m.nome}</h3>
                <p className="mt-2 flex-1 text-muted">{m.uso}</p>
                <p className="mt-4">
                  <Pendente marcador={m.pendencia} />
                </p>
              </div>
            </li>
          ))}
        </ul>
        <a href={waLink(MENSAGENS.contato)} target="_blank" rel="noopener noreferrer" className="link-traco mt-10">
          {MATERIAIS_TEXTO.cta}
          <ArrowRight aria-hidden className="size-4" strokeWidth={2} />
        </a>
      </div>
    </section>
  );
}
