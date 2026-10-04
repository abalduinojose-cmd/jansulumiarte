/**
 * Logo da JanSu Lumiarte: o arquivo do cliente (midia/logo-original.png) é
 * branco com fundo transparente, a plaina em cima e o "jansulumiarte" em
 * letra redonda embaixo. Daqui saem o logo completo e só a plaina, em branco
 * (para o fundo marrom) e em marrom #6B4226 (para o claro), e os ícones.
 *
 *   npm run logo
 */
import path from "node:path";
import sharp from "sharp";

const RAIZ = path.resolve(import.meta.dirname, "..");
const ORIGEM = path.join(RAIZ, "midia", "logo-original.png");
const MARCA = path.join(RAIZ, "public", "marca");
const MARROM = { r: 0x6b, g: 0x42, b: 0x26 };

/* O arquivo traz um contorno cinza de antialias em volta do branco: a cor sai
   do alfa, então todo pixel vira branco puro e só a opacidade conta. */
async function pinta(buf, cor) {
  const { width, height } = await sharp(buf).metadata();
  const alfa = await sharp(buf).ensureAlpha().extractChannel(3).toBuffer();
  return sharp({ create: { width, height, channels: 3, background: cor } }).joinChannel(alfa).png().toBuffer();
}

const BRANCO = { r: 255, g: 255, b: 255 };
const completo = await sharp(ORIGEM).trim({ threshold: 1 }).toBuffer();
/* A plaina ocupa o arquivo da linha 200 à 790 (medido pelo alfa); a base dela
   termina antes do texto. extract e trim em cadeias separadas. */
const recorte = await sharp(ORIGEM).extract({ left: 40, top: 200, width: 1300, height: 590 }).toBuffer();
const plaina = await sharp(recorte).trim({ threshold: 1 }).toBuffer();

const salva = (buf, nome, largura) => sharp(buf).resize({ width: largura }).webp({ quality: 90, alphaQuality: 95 }).toFile(path.join(MARCA, nome));

await salva(await pinta(completo, BRANCO), "logo-branco.webp", 640);
await salva(await pinta(completo, MARROM), "logo-marrom.webp", 640);
await salva(await pinta(plaina, BRANCO), "plaina-branca.webp", 240);
await salva(await pinta(plaina, MARROM), "plaina-marrom.webp", 240);

/* Logo para a imagem de compartilhamento (satori só lê PNG/JPEG). */
await sharp(await pinta(completo, BRANCO)).resize({ width: 520 }).png().toFile(path.join(RAIZ, "src", "assets", "og", "logo-og.png"));

/* Ícone: plaina branca sobre quadrado marrom. */
const icone = async (lado, nome) => {
  const p = await sharp(await pinta(plaina, BRANCO)).resize({ width: Math.round(lado * 0.74) }).toBuffer();
  await sharp({ create: { width: lado, height: lado, channels: 4, background: { ...MARROM, alpha: 1 } } })
    .composite([{ input: p, gravity: "center" }])
    .png({ compressionLevel: 9 })
    .toFile(path.join(RAIZ, "src", "app", nome));
};
await icone(96, "icon.png");
await icone(180, "apple-icon.png");
console.log("logo, plaina e ícones gerados");
