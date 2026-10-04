import { MENSAGENS, NAV, site } from "@/content/site";
import { waLink } from "@/lib/whatsapp";

import { IconeWhatsApp } from "../ui/IconeWhatsApp";
import { Logo } from "../ui/Logo";
import { MobileNav } from "./MobileNav";

/**
 * Fixo e claro sobre a noite do hero; depois de 80px de rolagem ganha o
 * creme translúcido com blur e o texto escuro (flag data-rolou do <html>,
 * lido pelo CSS). O logo troca de cor junto.
 */
export function Header() {
  const escuroNoTopo = "[html:not([data-rolou='1'])_&]:block [html[data-menu='1']_&]:block";
  return (
    <header className="cabecalho fixed inset-x-0 top-0 z-50">
      <div className="container-page flex h-[4.75rem] items-center gap-6">
        <a href="#topo" aria-label={`${site.nome}, voltar ao início`} className="shrink-0">
          <Logo cor="branco" sizes="96px" decorativo className={`hidden h-12 w-auto ${escuroNoTopo}`} />
          <Logo cor="marrom" sizes="96px" decorativo className="h-12 w-auto [html:not([data-rolou='1'])_&]:hidden [html[data-menu='1']_&]:hidden" />
        </a>
        <nav aria-label="Principal" className="ml-auto hidden lg:block">
          <ul className="flex items-center gap-1 rounded-full border border-current/15 px-2 py-1 backdrop-blur-md">
            {NAV.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="inline-flex min-h-10 items-center rounded-full px-4 text-[0.92rem] font-normal opacity-85 transition hover:bg-current/10 hover:opacity-100">
                  {l.rotulo}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="ml-auto flex items-center gap-3 lg:ml-3">
          <a href={waLink(MENSAGENS.hero)} target="_blank" rel="noopener noreferrer" className="btn btn-caramelo hidden h-11 px-5 text-[0.9rem] sm:inline-flex">
            <IconeWhatsApp className="size-4" />
            Falar no WhatsApp
          </a>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
