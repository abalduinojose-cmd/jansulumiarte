import { ArrowRight, Plus } from "lucide-react";

import { faq } from "@/content/faq";
import { FAQ_TEXTO, MENSAGENS } from "@/content/site";
import { schemaFaq } from "@/lib/schema";
import { waLink } from "@/lib/whatsapp";

import { Pendente } from "../ui/Pendente";
import { SectionHeading } from "../ui/SectionHeading";

/**
 * <details>/<summary> nativo, zero JS, em cartões arredondados. Resposta
 * pendente aparece como etiqueta; o JSON-LD FAQPage só entra quando todas
 * as respostas forem reais.
 */
export function Faq() {
  const schema = schemaFaq();
  return (
    <section id="faq" aria-labelledby="titulo-faq" className="bg-surface-alt py-20 md:py-28">
      <div className="container-page grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading id="titulo-faq" eyebrow={FAQ_TEXTO.eyebrow} titulo={FAQ_TEXTO.titulo} fino={FAQ_TEXTO.fino} />
          <a href={waLink(MENSAGENS.contato)} target="_blank" rel="noopener noreferrer" className="link-traco mt-8">
            {FAQ_TEXTO.whatsapp}
            <ArrowRight aria-hidden className="size-4 shrink-0" strokeWidth={2} />
          </a>
        </div>
        <div className="space-y-3">
          {faq.map((f) => (
            <details key={f.pergunta} name="faq" className="revela group rounded-[1.25rem] border border-line bg-surface transition-colors open:border-accent/60 open:bg-surface-alt">
              <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 px-6 py-5 [&::-webkit-details-marker]:hidden">
                <h3 className="font-body text-[1.0625rem] font-bold tracking-normal text-ink">{f.pergunta}</h3>
                <span aria-hidden className="faq-mais grid size-10 shrink-0 place-items-center rounded-full bg-noite text-accent-claro transition-[rotate,background-color] duration-300 group-open:bg-accent group-open:text-ink">
                  <Plus className="size-4" strokeWidth={2.2} />
                </span>
              </summary>
              <div className="px-6 pb-6 pr-16 text-muted">{f.resposta.includes("[[") ? <Pendente marcador={f.resposta} /> : <p>{f.resposta}</p>}</div>
            </details>
          ))}
        </div>
      </div>
      {schema ? <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} /> : null}
    </section>
  );
}
