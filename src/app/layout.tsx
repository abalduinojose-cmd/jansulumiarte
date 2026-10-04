import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";

import { SITE_URL, site } from "@/content/site";
import { schemaNegocio } from "@/lib/schema";

import "./globals.css";

/* Guia de estética do cookbook: uma display marcante usada nos extremos
   (Clash Display 600 contra 200) e uma sem-serifa de texto com caráter
   (Satoshi). As duas da Fontshare (licença gratuita ITF), self-hosted pelo
   next/font, subset latin conferido (todos os acentos do português). */
const clash = localFont({
  src: [
    { path: "../assets/fontes/ClashDisplay-200.woff2", weight: "200" },
    { path: "../assets/fontes/ClashDisplay-600.woff2", weight: "600" },
  ],
  display: "swap",
  variable: "--font-clash",
  fallback: ["system-ui", "Arial", "sans-serif"],
});

const satoshi = localFont({
  src: [
    { path: "../assets/fontes/Satoshi-400.woff2", weight: "400" },
    { path: "../assets/fontes/Satoshi-700.woff2", weight: "700" },
  ],
  display: "swap",
  variable: "--font-satoshi",
  fallback: ["system-ui", "Arial", "sans-serif"],
});

const descricao =
  "Marcenaria artesanal em Teresópolis: repaginação de ambientes e móveis planejados sob medida em madeira, MDF e Metalon. Atendemos a região serrana do RJ.";

export const metadata: Metadata = {
  metadataBase: new URL(new URL(SITE_URL).origin),
  title: {
    default: "Marcenaria em Teresópolis | Móveis Planejados Sob Medida · JanSu Lumiarte",
    template: "%s · Marcenaria JanSu Lumiarte",
  },
  description: descricao,
  alternates: { canonical: SITE_URL },
  applicationName: site.nome,
  keywords: [
    "marcenaria Teresópolis",
    "móveis planejados Teresópolis",
    "marceneiro sob medida Teresópolis",
    "closet planejado Teresópolis",
    "painel ripado Teresópolis",
    "marcenaria região serrana RJ",
  ],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: SITE_URL,
    siteName: site.nome,
    title: "Marcenaria JanSu Lumiarte, em Teresópolis",
    description: descricao,
  },
  twitter: { card: "summary_large_image", title: "Marcenaria JanSu Lumiarte, em Teresópolis", description: descricao },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#16100b",
};

/* Cabeçalho que ganha fundo depois de 80px de rolagem: um flag no <html>
   lido pelo CSS. Script de 200 bytes em vez de Client Component, roda antes
   da hidratação, então não pisca. */
const scriptRolagem = `(()=>{const d=document.documentElement;let p=0;const f=()=>{d.dataset.rolou=scrollY>80?"1":"0";p=0};f();addEventListener("scroll",()=>{p||(p=requestAnimationFrame(f))},{passive:!0})})()`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${clash.variable} ${satoshi.variable}`} suppressHydrationWarning>
      <body>
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-brand focus:px-4 focus:py-2 focus:text-surface-alt"
        >
          Pular para o conteúdo
        </a>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaNegocio()) }} />
        <script dangerouslySetInnerHTML={{ __html: scriptRolagem }} />
      </body>
    </html>
  );
}
