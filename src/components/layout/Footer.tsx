import { MapPin } from "lucide-react";

import { MENSAGENS, NAV, PERFIL_GOOGLE, RODAPE, site } from "@/content/site";
import { waLink } from "@/lib/whatsapp";

import { IconeGoogle, IconeInstagram } from "../ui/IconesRedes";
import { IconeWhatsApp } from "../ui/IconeWhatsApp";
import { LinhaPlaina } from "../ui/LinhaPlaina";
import { Logo } from "../ui/Logo";
import { Pendente } from "../ui/Pendente";

/**
 * Rodapé centrado na noite: logo, o slogan em Clash 200 com o caramelo
 * polido, contatos em ícones circulares, menu numa fileira, NAP idêntico ao
 * Google, a linha legal e, no chão, o nome JanSu gigante que sobe com a
 * rolagem (textura, aria-hidden).
 */
export function Footer() {
  const circulo = "grid size-12 place-items-center rounded-full border border-surface/20 text-surface-alt transition hover:border-accent hover:bg-accent hover:text-ink";
  return (
    <footer className="no-escuro grao relative isolate overflow-hidden bg-noite pt-16 text-center text-surface">
      <div aria-hidden className="absolute inset-x-0 top-0 -z-10 h-96 bg-[radial-gradient(ellipse_at_top,rgb(200_155_98/0.16),transparent_65%)]" />
      <div className="container-page flex flex-col items-center">
        <Logo cor="branco" sizes="200px" className="h-auto w-40" />
        <p className="caramelo-metalico fino mt-8 max-w-[18ch] font-display text-[clamp(2rem,1.4rem+2.4vw,3.4rem)] leading-[1.02]">{site.slogan}</p>

        <ul className="mt-10 flex gap-3">
          <li>
            <a href={waLink(MENSAGENS.contato)} target="_blank" rel="noopener noreferrer" aria-label={`WhatsApp ${site.whatsappDisplay}`} title="WhatsApp" className={circulo}>
              <IconeWhatsApp className="size-5" />
            </a>
          </li>
          <li>
            <a href={site.instagram} target="_blank" rel="noopener noreferrer" aria-label={`Instagram ${site.instagramArroba}`} title="Instagram" className={circulo}>
              <IconeInstagram className="size-5" />
            </a>
          </li>
          <li>
            <a href={PERFIL_GOOGLE} target="_blank" rel="noopener noreferrer" aria-label="Perfil no Google" title="Google" className={circulo}>
              <IconeGoogle className="size-5" />
            </a>
          </li>
        </ul>

        <nav aria-label="Rodapé" className="mt-8">
          <ul className="flex flex-wrap justify-center gap-x-2">
            {NAV.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="rotulo inline-flex min-h-11 items-center px-2.5 text-surface/75 transition hover:text-accent-claro">
                  {l.rotulo}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <LinhaPlaina escuro className="my-10 w-full max-w-4xl" />

        <address className="max-w-xl not-italic leading-relaxed text-surface/80">
          <span className="flex items-center justify-center gap-2 font-bold text-surface-alt">
            <MapPin aria-hidden className="size-4 text-accent" />
            {site.nome}
          </span>
          {site.endereco.rua} - {site.endereco.bairro}, {site.endereco.cidade} - {site.endereco.uf}, <span className="whitespace-nowrap">{site.endereco.cep}</span>
          <br />
          {site.horario} ·{" "}
          <a href={`tel:${site.whatsapp}`} className="inline-flex min-h-11 items-center font-bold text-surface-alt hover:underline">
            {site.whatsappDisplay}
          </a>
        </address>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[0.9rem] text-surface/70">
          <span>© {new Date().getFullYear()} {site.nome}</span>
          <span className="flex items-center gap-2">
            CNPJ <Pendente marcador={site.cnpj} />
          </span>
          <Pendente marcador={RODAPE.politica} />
          <a href={RODAPE.credito.href} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center hover:text-surface-alt hover:underline">
            {RODAPE.credito.rotulo}
          </a>
        </div>
      </div>

      <div aria-hidden className="nome-sobe pointer-events-none mt-6 select-none whitespace-nowrap font-display text-[24vw] font-semibold leading-[0.74] tracking-[-0.06em] text-surface/[0.06] after:content-['JanSu']" />
    </footer>
  );
}
