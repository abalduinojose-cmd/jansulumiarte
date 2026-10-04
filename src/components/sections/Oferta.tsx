import { MENSAGENS, OFERTA } from "@/content/site";
import { waLink } from "@/lib/whatsapp";

import { Button } from "../ui/Button";
import { Pendente } from "../ui/Pendente";

/**
 * A oferta num cartão da noite sobre o creme. O 15% gigante em Clash 200
 * conta de 0 a 15 enquanto o cartão entra na tela (um @property inteiro
 * lido por counter(); sem suporte, mostra 15 parado). O número visível é
 * decorativo; o texto real vem no H2. Condições à vista como pendência.
 */
export function Oferta() {
  return (
    <section aria-labelledby="titulo-oferta" className="bg-surface px-2 pt-16 sm:px-3 md:pt-24">
      <div className="container-page px-0">
        <div className="revela no-escuro grao relative isolate grid items-center gap-8 overflow-hidden rounded-[2rem] bg-noite p-7 sm:p-10 lg:grid-cols-[auto_1fr_auto] lg:gap-14 lg:p-14">
          <div aria-hidden className="absolute -right-24 -top-24 -z-10 size-80 rounded-full bg-accent/25 blur-[100px]" />
          <p aria-hidden className="caramelo-metalico font-display text-[clamp(5.5rem,3rem+10vw,10rem)] leading-[0.8] tracking-[-0.06em]">
            <span className="contador fino" />
            <span className="fino">%</span>
          </p>
          <div>
            <p className="rotulo inline-flex rounded-full bg-accent px-3.5 py-1.5 text-ink">{OFERTA.selo}</p>
            <h2 id="titulo-oferta" className="mt-5 max-w-[22ch] text-[clamp(1.6rem,1.2rem+1.4vw,2.4rem)] text-surface-alt">
              {OFERTA.texto}
            </h2>
            <p className="mt-5">
              <Pendente marcador={OFERTA.condicoes} />
            </p>
          </div>
          <Button href={waLink(MENSAGENS.oferta)} variante="caramelo" tamanho="lg" whatsapp seta className="self-start lg:self-center">
            {OFERTA.cta}
          </Button>
        </div>
      </div>
    </section>
  );
}
