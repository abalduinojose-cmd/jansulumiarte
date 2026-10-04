/** Serve docs/ em /jansulumiarte/ (como o GitHub Pages) e confere a prévia: 404, imagem quebrada, máscara da plaina, fontes, erros. node material/verificar-estatico.mjs */
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import puppeteer from "puppeteer-core";

const BASE = "/jansulumiarte";
const TIPOS = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".jpg": "image/jpeg", ".png": "image/png", ".webp": "image/webp", ".woff2": "font/woff2", ".txt": "text/plain", ".svg": "image/svg+xml", ".xml": "application/xml" };
const srv = createServer(async (req, res) => {
  const u = decodeURIComponent(req.url.split("?")[0]);
  if (!u.startsWith(BASE)) {
    res.writeHead(404);
    return res.end();
  }
  let f = path.join("docs", u.slice(BASE.length));
  try {
    if ((await stat(f)).isDirectory()) f = path.join(f, "index.html");
    res.writeHead(200, { "content-type": TIPOS[path.extname(f)] ?? "application/octet-stream" });
    res.end(await readFile(f));
  } catch {
    res.writeHead(404);
    res.end();
  }
}).listen(5249);

const b = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: "new" });
let ruim = 0;
for (const [nome, vp] of [
  ["desktop", { width: 1366, height: 820 }],
  ["celular", { width: 412, height: 860, isMobile: true, hasTouch: true }],
]) {
  const p = await b.newPage();
  await p.setViewport(vp);
  const falhas = [];
  const erros = [];
  p.on("response", (r) => r.status() >= 400 && r.url().includes("localhost:5249") && falhas.push(`${r.status()} ${r.url()}`));
  p.on("console", (m) => m.type() === "error" && erros.push(m.text()));
  await p.goto(`http://localhost:5249${BASE}/`, { waitUntil: "networkidle2" });
  for (let y = 0; y < 16000; y += 700) {
    await p.evaluate((v) => window.scrollTo(0, v), y);
    await new Promise((r) => setTimeout(r, 80));
  }
  await new Promise((r) => setTimeout(r, 1200));
  const info = await p.evaluate(() => ({
    quebradas: [...document.images].filter((i) => i.complete && i.naturalWidth === 0).map((i) => i.src),
    avatares: [...document.querySelectorAll("#depoimentos img")].map((i) => i.naturalWidth),
    mascara: getComputedStyle(document.querySelector("[style*=mask]")).maskImage,
    fontes: [...document.fonts].filter((f) => f.status === "loaded").map((f) => `${f.family} ${f.weight}`),
    og: document.querySelector('meta[property="og:image"]')?.content,
  }));
  const mascaraOk = (await p.evaluate(async (u) => (await fetch(u)).status, info.mascara.slice(5, -2))) === 200;
  if (falhas.length || info.quebradas.length || erros.length || !mascaraOk) ruim++;
  console.log(nome, JSON.stringify({ falhas, erros, ...info, mascaraOk }, null, 0));
  await p.close();
}
await b.close();
srv.close();
console.log(ruim ? "PROBLEMAS" : "prévia ok");
