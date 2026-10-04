import type { ReactNode } from "react";

import type { Desenho } from "@/content/projetos";
import { cx } from "@/lib/cx";

/* Cota de desenho técnico: linha com os dois traços de ponta. */
function Cota({ x1, y1, x2, y2 }: { x1: number; y1: number; x2: number; y2: number }) {
  const vertical = x1 === x2;
  const t = 6;
  return (
    <g className="stroke-wood" strokeWidth={1}>
      <line x1={x1} y1={y1} x2={x2} y2={y2} />
      {vertical ? (
        <>
          <line x1={x1 - t} y1={y1} x2={x1 + t} y2={y1} />
          <line x1={x2 - t} y1={y2} x2={x2 + t} y2={y2} />
        </>
      ) : (
        <>
          <line x1={x1} y1={y1 - t} x2={x1} y2={y1 + t} />
          <line x1={x2} y1={y2 - t} x2={x2} y2={y2 + t} />
        </>
      )}
    </g>
  );
}

const DESENHOS: Record<Desenho | "corte-cava", ReactNode> = {
  /* Gabinete suspenso com cuba de apoio e espelho. */
  banheiro: (
    <>
      <rect x="150" y="36" width="100" height="84" rx="8" />
      <line x1="166" y1="52" x2="186" y2="72" className="stroke-wood" />
      <rect x="88" y="150" width="224" height="8" />
      <rect x="168" y="134" width="64" height="16" rx="8" />
      <path d="M200 134v-12h12" />
      <rect x="96" y="158" width="208" height="72" />
      <line x1="200" y1="158" x2="200" y2="230" />
      <line x1="102" y1="164" x2="194" y2="164" strokeWidth={3} className="stroke-accent" />
      <line x1="206" y1="164" x2="298" y2="164" strokeWidth={3} className="stroke-accent" />
      <line x1="60" y1="272" x2="340" y2="272" strokeDasharray="4 5" />
      <Cota x1={96} y1={250} x2={304} y2={250} />
    </>
  ),
  /* Três módulos: cabideiro, prateleiras com gavetas e cabideiro longo com sapateira. */
  closet: (
    <>
      <rect x="70" y="36" width="260" height="228" />
      <line x1="157" y1="36" x2="157" y2="264" />
      <line x1="243" y1="36" x2="243" y2="264" />
      <line x1="76" y1="74" x2="151" y2="74" strokeWidth={2} className="stroke-accent" />
      {[90, 108, 126].map((x) => (
        <path key={x} d={`M${x} 74v6l-12 14h24l-12-14`} />
      ))}
      <line x1="70" y1="150" x2="157" y2="150" />
      {[84, 122, 160].map((y) => (
        <line key={y} x1="157" y1={y} x2="243" y2={y} />
      ))}
      <rect x="163" y="190" width="74" height="32" />
      <rect x="163" y="226" width="74" height="32" />
      <line x1="185" y1="198" x2="215" y2="198" strokeWidth={2.5} className="stroke-accent" />
      <line x1="185" y1="234" x2="215" y2="234" strokeWidth={2.5} className="stroke-accent" />
      <line x1="249" y1="64" x2="324" y2="64" strokeWidth={2} className="stroke-accent" />
      {[264, 292].map((x) => (
        <path key={x} d={`M${x} 64v6l-12 14h24l-12-14`} />
      ))}
      <path d="M243 236l87-14M243 258l87-14" />
      <Cota x1={48} y1={36} x2={48} y2={264} />
    </>
  ),
  /* Painel ripado com aparador suspenso. */
  ripado: (
    <>
      {Array.from({ length: 17 }, (_, i) => (
        <rect key={i} x={84 + i * 14} y="30" width="8" height="238" />
      ))}
      <rect x="118" y="176" width="164" height="30" className="fill-surface" />
      <line x1="124" y1="184" x2="276" y2="184" strokeWidth={2.5} className="stroke-accent" />
      <Cota x1={84} y1={18} x2={106} y2={18} />
      <line x1="60" y1="268" x2="340" y2="268" strokeDasharray="4 5" />
    </>
  ),
  /* Biombo de três folhas, em perspectiva, com o ripado nas folhas. */
  biombo: (
    <>
      <path d="M86 64l70 18v170l-70-12zM156 82l88-18v176l-88 12zM244 64l70 18v170l-70-12z" />
      {[104, 122, 140].map((x, i) => (
        <line key={x} x1={x} y1={69 + i * 4.5} x2={x} y2={243 + i * 2.5} className="stroke-wood" />
      ))}
      {[178, 200, 222].map((x, i) => (
        <line key={x} x1={x} y1={78 - i * 4.5} x2={x} y2={249 - i * 2.5} className="stroke-wood" />
      ))}
      {[262, 280, 298].map((x, i) => (
        <line key={x} x1={x} y1={69 + i * 4.5} x2={x} y2={243 + i * 2.5} className="stroke-wood" />
      ))}
      <path d="M156 82v170" strokeWidth={2} className="stroke-accent" />
      <path d="M244 64v176" strokeWidth={2} className="stroke-accent" />
      <line x1="60" y1="272" x2="340" y2="272" strokeDasharray="4 5" />
    </>
  ),
  /* Gaveteiro com puxador cava (fallback, o card tem foto real). */
  cava: (
    <>
      <rect x="90" y="70" width="220" height="176" />
      {[70, 128, 186].map((y) => (
        <g key={y}>
          <line x1="90" y1={y} x2="310" y2={y} />
          <line x1="96" y1={y + 6} x2="304" y2={y + 6} strokeWidth={3} className="stroke-accent" />
        </g>
      ))}
      <rect x="80" y="60" width="240" height="10" />
      <Cota x1={90} y1={268} x2={310} y2={268} />
    </>
  ),
  /* Cristaleira: portas de cristal com o reflexo, prateleiras ao fundo e o
     fio de luz no alto. */
  cristal: (
    <>
      <rect x="110" y="30" width="180" height="236" />
      <line x1="200" y1="30" x2="200" y2="210" />
      <rect x="110" y="210" width="180" height="56" />
      <line x1="180" y1="232" x2="220" y2="232" strokeWidth={2.5} className="stroke-accent" />
      {[90, 150].map((y) => (
        <line key={y} x1="114" y1={y} x2="286" y2={y} className="stroke-wood" />
      ))}
      <line x1="118" y1="38" x2="282" y2="38" strokeWidth={2} strokeDasharray="2 4" className="stroke-accent" />
      <path d="M128 70l26-26M136 86l34-34M220 70l26-26M228 86l34-34" className="stroke-accent" />
      <Cota x1={88} y1={30} x2={88} y2={266} />
    </>
  ),
  /* Detalhe em corte do puxador cava: duas frentes e o perfil entre elas. */
  "corte-cava": (
    <>
      <rect x="150" y="30" width="44" height="100" />
      <rect x="150" y="170" width="44" height="100" />
      <path d="M150 130h44v12h-26v16h26v12" strokeWidth={2.5} className="stroke-accent" />
      <path d="M194 142c22 0 34 4 40 16" className="stroke-wood" strokeDasharray="3 4" />
      <circle cx="172" cy="150" r="58" className="stroke-wood" strokeDasharray="2 5" />
      <line x1="230" y1="150" x2="300" y2="150" className="stroke-wood" />
      <line x1="194" y1="80" x2="300" y2="80" className="stroke-wood" />
      <line x1="194" y1="220" x2="300" y2="220" className="stroke-wood" />
      <text x="306" y="84">frente</text>
      <text x="306" y="154">cava</text>
      <text x="306" y="224">frente</text>
      <Cota x1={124} y1={30} x2={124} y2={270} />
    </>
  ),
};

type Props = { readonly desenho: Desenho | "corte-cava"; readonly titulo: string; readonly className?: string };

/**
 * Prancha: o móvel desenhado em vista, sobre papel de desenho, no lugar de
 * foto de banco. Fica até chegar a foto real do projeto.
 */
export function Prancha({ desenho, titulo, className }: Props) {
  return (
    <div className={cx("papel grid place-items-center bg-surface", className)}>
      <svg viewBox="0 0 400 300" role="img" aria-label={titulo} className="h-full w-full text-brand" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinejoin="round" strokeLinecap="round">
        <g className="[&_text]:fill-brand [&_text]:stroke-none [&_text]:font-sans [&_text]:text-[13px] [&_text]:font-semibold">{DESENHOS[desenho]}</g>
      </svg>
    </div>
  );
}
