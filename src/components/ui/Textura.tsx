import type { Material } from "@/content/materiais";

/**
 * Textura desenhada de cada material, até chegarem as fotos reais
 * ([[FOTO DE TEXTURA REAL: PENDENTE]]). Madeira: veio por ruído esticado
 * na horizontal. MDF: a chapa com o topo à mostra. Metalon: o tubo em
 * corte sobre aço escovado. Tudo SVG, sem imagem baixada.
 */
export function Textura({ material }: { readonly material: Material["nome"] }) {
  if (material === "Madeira") {
    /* Ruído esticado vira o desenho do veio; a tabela de alfa dá contraste
       de anel de crescimento: madeira clara com o veio escuro por cima. */
    return (
      <svg viewBox="0 0 400 300" aria-hidden preserveAspectRatio="none" className="h-full w-full">
        <filter id="veio" x="0" y="0" width="100%" height="100%">
          <feTurbulence type="turbulence" baseFrequency="0.0035 0.085" numOctaves="4" seed="11" result="ruido" />
          <feColorMatrix in="ruido" type="luminanceToAlpha" result="luz" />
          <feComponentTransfer in="luz" result="anel">
            <feFuncA type="table" tableValues="0 0.05 0.35 0.85 1" />
          </feComponentTransfer>
          <feFlood floodColor="#6b4226" />
          <feComposite in2="anel" operator="in" />
        </filter>
        <rect width="400" height="300" fill="#c89466" />
        <rect width="400" height="300" filter="url(#veio)" />
      </svg>
    );
  }
  if (material === "MDF") {
    return (
      <svg viewBox="0 0 400 300" aria-hidden className="h-full w-full">
        <filter id="fibra" x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="3" />
          <feColorMatrix values="0 0 0 0 0.83  0 0 0 0 0.79  0 0 0 0 0.72  0 0 0 0.35 0" />
        </filter>
        <rect width="400" height="300" fill="#e8e1d6" />
        <rect width="400" height="300" filter="url(#fibra)" />
        {/* a chapa vista de topo: face revestida e o miolo de fibra */}
        <rect x="0" y="196" width="400" height="34" fill="#c9b79e" />
        <rect x="0" y="196" width="400" height="3" fill="#8c6a4c" />
        <rect x="0" y="227" width="400" height="3" fill="#8c6a4c" />
        <rect x="0" y="230" width="400" height="70" fill="#f1ece4" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 400 300" aria-hidden className="h-full w-full">
      <defs>
        <linearGradient id="escovado" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#5d5d5c" />
          <stop offset="0.45" stopColor="#8d8c8a" />
          <stop offset="1" stopColor="#4a4948" />
        </linearGradient>
        <pattern id="riscos" width="400" height="3" patternUnits="userSpaceOnUse">
          <rect width="400" height="1" fill="rgb(255 255 255 / 0.06)" />
        </pattern>
      </defs>
      <rect width="400" height="300" fill="url(#escovado)" />
      <rect width="400" height="300" fill="url(#riscos)" />
      {/* o tubo quadrado em corte */}
      <rect x="150" y="100" width="100" height="100" rx="8" fill="none" stroke="#d9d6d0" strokeWidth="10" />
    </svg>
  );
}
