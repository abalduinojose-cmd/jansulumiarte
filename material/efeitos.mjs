/**
 * Efeitos de rolagem: telas reais (não full-page) em pontos da rolagem, com
 * "reduzir movimento" desligado e ligado.
 *   node material/efeitos.mjs 1440|375 [reduce]
 */
import puppeteer from "puppeteer-core";

const w = Number(process.argv[2] ?? 1440);
const reduce = process.argv[3] === "reduce";
const b = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: "new" });
const p = await b.newPage();
await p.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: reduce ? "reduce" : "no-preference" }]);
await p.setViewport({ width: w, height: w < 768 ? 812 : 900, deviceScaleFactor: 1 });
await p.goto("http://localhost:5248/", { waitUntil: "networkidle0", timeout: 120000 });
await p.addStyleTag({ content: "html{scroll-behavior:auto!important}" });
await new Promise((r) => setTimeout(r, 2500));

const alvos = process.env.ALVOS ? process.env.ALVOS.split(",") : ["0", "#projetos", "frase:0.25", "frase:0.6", "#materiais", "#processo:0.4", "#depoimentos", "#contato"];
let i = 0;
for (const a of alvos) {
  await p.evaluate((a) => {
    if (a.startsWith("frase:")) {
      const s = document.querySelector(".frase-trilho");
      const f = Number(a.split(":")[1]);
      scrollTo(0, s.offsetTop + (s.offsetHeight - innerHeight) * f);
    } else if (a.startsWith("#")) {
      const [sel, f] = a.split(":");
      const el = document.querySelector(sel);
      scrollTo(0, el.getBoundingClientRect().top + scrollY - (f ? innerHeight * -Number(f) : 60));
    } else scrollTo(0, Number(a));
  }, a);
  await new Promise((r) => setTimeout(r, 700));
  await p.screenshot({ path: `material/ef-${w}${reduce ? "-r" : ""}-${i++}.jpg`, type: "jpeg", quality: 70 });
}
console.log("ok", i);
await b.close();
