/**
 * Reels do @jansu_lumiarte: videos/ (originais, fora do repositório) ->
 * public/videos. Já vêm em H.264 720x1280 com bitrate de web, então saem
 * por CÓPIA do fluxo (sem reencodar, qualidade original), só com o
 * faststart para começar a tocar antes de baixar inteiro. A capa é um
 * quadro limpo escolhido na folha de contato, em 540px e ~30 KB, porque o
 * poster baixa sempre, mesmo fora da tela.
 *
 *   npm run videos
 */
import { spawnSync } from "node:child_process";
import { mkdir, stat } from "node:fs/promises";
import path from "node:path";
import ffmpeg from "ffmpeg-static";
import sharp from "sharp";

const RAIZ = path.resolve(import.meta.dirname, "..");
const SAIDA = path.join(RAIZ, "public", "videos");
const CAPAS = path.join(RAIZ, "src", "assets", "videos");
const V = (id) => `jansu_lumiarte_${id}_36314114730.mp4`;

/** origem -> nome, segundo da capa */
const VIDEOS = [
  [V("1784271994_3943079329231714996"), "loja-planejada", 13],
  [V("1784087792_3941531761157855125"), "quarto-bom-retiro", 24],
  [V("1774988692_3865207010714887764"), "closet-iluminado", 20],
];

const roda = (args, captura = false) => {
  const r = spawnSync(ffmpeg, ["-v", "error", "-y", ...args], { stdio: ["ignore", captura ? "pipe" : "inherit", "inherit"], maxBuffer: 64 * 1024 * 1024 });
  if (r.status !== 0) throw new Error(`ffmpeg falhou: ${args.join(" ")}`);
  return r.stdout;
};

await mkdir(SAIDA, { recursive: true });
await mkdir(CAPAS, { recursive: true });
for (const [origem, nome, capa] of VIDEOS) {
  const entrada = path.join(RAIZ, "videos", origem);
  const saida = path.join(SAIDA, `${nome}.mp4`);
  roda(["-i", entrada, "-c", "copy", "-movflags", "+faststart", saida]);
  const quadro = roda(["-ss", String(capa), "-i", entrada, "-frames:v", "1", "-f", "image2pipe", "-c:v", "png", "-"], true);
  await sharp(quadro).resize({ width: 540 }).jpeg({ quality: 70, mozjpeg: true }).toFile(path.join(CAPAS, `${nome}.jpg`));
  console.log(`${nome.padEnd(20)} ${((await stat(saida)).size / 1048576).toFixed(1)} MB`);
}
