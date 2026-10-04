/**
 * Fotos: originais em midia/ -> src/assets/fotos, com nome de cena. Curadoria
 * curta de propósito (pedido do cliente: só as melhores). O alt mora no
 * catálogo (src/content/portfolio.ts e projetos.ts).
 *
 * Fonte hoje: a foto de capa do Perfil da Empresa no Google. [[FOTOS DO
 * INSTAGRAM @jansu_lumiarte: entram aqui assim que forem baixadas]]
 *
 *   npm run fotos
 */
import { mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const RAIZ = path.resolve(import.meta.dirname, "..");
const DESTINO = path.join(RAIZ, "src", "assets", "fotos");

/** origem -> [destino, recorte em fração {topo, altura}] */
const CURADORIA = [
  /* Cozinha inteira: aéreos amadeirados e gaveteiro grafite. Corta o chão. */
  ["midia/google-capa.jpg", "cozinha-amadeirada-grafite", { topo: 0.03, altura: 0.86 }],
  /* Detalhe do gaveteiro com puxador cava, da mesma foto. */
  ["midia/google-capa.jpg", "gaveteiro-puxador-cava", { topo: 0.5, altura: 0.38 }],
  /* Textura real das portas amadeiradas (bloco MDF da seção Materiais). */
  ["midia/google-capa.jpg", "textura-mdf-amadeirado", { esquerda: 370, topoPx: 520, largura: 380, alturaPx: 285 }],
];

await mkdir(DESTINO, { recursive: true });
for (const [origem, nome, recorte] of CURADORIA) {
  let img = sharp(path.join(RAIZ, origem)).rotate();
  if (recorte) {
    const buf = await img.toBuffer();
    const { width, height } = await sharp(buf).metadata();
    img = sharp(buf).extract(
      "esquerda" in recorte
        ? { left: recorte.esquerda, top: recorte.topoPx, width: recorte.largura, height: recorte.alturaPx }
        : { left: 0, top: Math.round(height * recorte.topo), width, height: Math.round(height * recorte.altura) },
    );
  }
  const { size, width, height } = await img
    .resize(recorte && "esquerda" in recorte ? { width: 800 } : { width: 1800, height: 1800, fit: "inside", withoutEnlargement: true })
    .sharpen({ sigma: 0.8, m1: 0.35, m2: 0.9 })
    .jpeg({ quality: 92, mozjpeg: true })
    .toFile(path.join(DESTINO, `${nome}.jpg`));
  console.log(`${nome.padEnd(32)} ${width}x${height} ${(size / 1024).toFixed(0)}KB`);
}

/* Fotos de perfil das 4 avaliações do Google (Apify, personalData). */
const AVATARES = ["giovanna", "hayssa", "suellen", "cleison"];
await mkdir(path.join(RAIZ, "public", "avaliacoes"), { recursive: true });
for (const a of AVATARES) {
  await sharp(path.join(RAIZ, "midia", `${a}.jpg`))
    .resize(96, 96)
    .webp({ quality: 82 })
    .toFile(path.join(RAIZ, "public", "avaliacoes", `${a}.webp`));
}
console.log("avatares:", AVATARES.length);
