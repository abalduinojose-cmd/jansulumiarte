import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const alt = "Marcenaria JanSu Lumiarte, em Teresópolis: do detalhe ao ambiente completo";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const raiz = process.cwd();
const clashFino = await readFile(join(raiz, "src/assets/og/ClashDisplay-200.ttf"));
const clash = await readFile(join(raiz, "src/assets/og/ClashDisplay-600.ttf"));
const satoshi = await readFile(join(raiz, "src/assets/og/Satoshi-700.ttf"));
const logo = `data:image/png;base64,${(await readFile(join(raiz, "src/assets/og/logo-og.png"))).toString("base64")}`;

/** Cartão de compartilhamento: a noite da oficina, logo branco, o H1 nas duas vozes da Clash e a linha da plaina. */
export default function Image() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", background: "#16100B", color: "#FFFFFF" }}>
        <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 70, padding: "0 84px" }}>
          {/* eslint-disable-next-line @next/next/no-img-element -- o ImageResponse (satori) só aceita <img> */}
          <img src={logo} width={300} height={184} alt="" />
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div style={{ fontFamily: "Satoshi", fontSize: 22, letterSpacing: 4, color: "#C89B62" }}>MARCENARIA · TERESÓPOLIS/RJ</div>
            <div style={{ display: "flex", flexDirection: "column", fontSize: 84, lineHeight: 0.98, letterSpacing: -3 }}>
              <span style={{ fontFamily: "ClashFino" }}>Do detalhe</span>
              <span style={{ fontFamily: "Clash" }}>ao ambiente</span>
              <span style={{ fontFamily: "Clash", color: "#E2C08F" }}>completo.</span>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", margin: "0 84px 56px" }}>
          <div style={{ flex: 1, height: 2, background: "#C89B62", display: "flex" }} />
          <div style={{ width: 300, height: 2, display: "flex", backgroundImage: "repeating-linear-gradient(90deg, rgba(245,241,234,0.5) 0 8px, transparent 8px 15px)" }} />
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "ClashFino", data: clashFino, style: "normal", weight: 200 },
        { name: "Clash", data: clash, style: "normal", weight: 600 },
        { name: "Satoshi", data: satoshi, style: "normal", weight: 700 },
      ],
    },
  );
}
