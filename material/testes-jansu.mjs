/**
 * Testes de comportamento: formulário (Zod + aria), lightbox (foco, setas,
 * Esc), menu do celular (Esc devolve o foco), WhatsApp flutuante só depois
 * do hero, mensagens contextuais e regras do briefing (nota sempre com o
 * volume, sem aggregateRating, um H1).
 *   node material/testes-jansu.mjs
 */
import puppeteer from "puppeteer-core";

const URL = process.env.URL ?? "http://localhost:5248/";
const b = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: "new" });
let falhas = 0;
const ok = (c, m) => {
  if (!c) falhas++;
  console.log(c ? "OK   " : "FALHA", m);
};
const espera = (ms) => new Promise((r) => setTimeout(r, ms));

const p = await b.newPage();
const erros = [];
p.on("pageerror", (e) => erros.push(e.message));
p.on("console", (m) => m.type() === "error" && erros.push(m.text()));
await p.setViewport({ width: 1280, height: 900 });
await p.goto(URL, { waitUntil: "networkidle2", timeout: 120000 });

/* Regras do briefing */
const regras = await p.evaluate(() => {
  const texto = document.body.innerText;
  const notas = [...texto.matchAll(/5,0/g)].length;
  const ld = [...document.querySelectorAll('script[type="application/ld+json"]')].map((s) => s.textContent).join("");
  const wa = [...document.querySelectorAll('a[href*="wa.me"]')].map((a) => new URL(a.href).searchParams.get("text") ?? "");
  return {
    h1: document.querySelectorAll("h1").length,
    notas,
    notasComVolume: [...document.querySelectorAll("*")].filter((e) => e.children.length === 0 && /5,0/.test(e.textContent ?? "")).every((e) => /4 avaliações/.test(e.parentElement?.parentElement?.textContent ?? "")),
    aggregate: ld.includes("aggregateRating"),
    waSemTexto: wa.filter((t) => !t).length,
    mensagens: [...new Set(wa)],
  };
});
ok(regras.h1 === 1, "um H1 só");
ok(regras.notasComVolume, `nota 5,0 sempre com "4 avaliações" ao lado (${regras.notas} ocorrências)`);
ok(!regras.aggregate, "sem aggregateRating no JSON-LD");
ok(regras.waSemTexto === 0, "todo link de WhatsApp leva mensagem");
console.log("      mensagens:\n       - " + regras.mensagens.join("\n       - "));

/* Formulário */
await p.evaluate(() => {
  window.__abriu = [];
  window.open = (u) => (window.__abriu.push(u), null);
});
await p.$eval("#contato", (e) => e.scrollIntoView());
await p.click("#contato button[type=submit]");
await espera(2500);
const msgs = await p.$$eval("#contato [id$=-erro]", (els) => els.map((e) => e.textContent));
ok(msgs.length === 3, `erros específicos: ${msgs.join(" | ")}`);
ok((await p.$$eval("#contato [aria-invalid=true][aria-describedby]", (e) => e.length)) === 3, "aria-invalid + aria-describedby nos 3 campos");
await p.type("#orc-nome", "Maria Teste");
await p.type("#orc-whatsapp", "21999887766");
ok((await p.$eval("#orc-whatsapp", (e) => e.value)) === "(21) 99988-7766", "máscara do WhatsApp");
await p.select("#orc-ambiente", "Closets");
await p.click("#contato button[type=submit]");
await espera(3000);
const sucesso = await p.$eval("#contato [role=status]", (e) => e.textContent).catch(() => null);
ok(sucesso?.includes("Pedido recebido"), "sucesso substitui o formulário");

/* Lightbox */
await p.$eval("#portfolio", (e) => e.scrollIntoView());
await p.$eval("#portfolio button[aria-label^=Ampliar]", (e) => e.click());
await espera(1200);
ok(await p.evaluate(() => document.querySelector("dialog.galeria")?.open), "lightbox abre");
ok(await p.evaluate(() => document.querySelector("dialog.galeria")?.contains(document.activeElement)), "foco dentro do lightbox");
const a1 = await p.$eval("dialog.galeria [aria-live]", (e) => e.textContent);
await p.keyboard.press("ArrowRight");
await espera(300);
const a2 = await p.$eval("dialog.galeria [aria-live]", (e) => e.textContent);
ok(a1 !== a2, `seta navega (${a1} -> ${a2})`);
await p.keyboard.press("Escape");
await espera(500);
ok(await p.evaluate(() => !document.querySelector("dialog.galeria")), "Esc fecha");
ok(await p.evaluate(() => document.activeElement?.getAttribute("aria-label")?.startsWith("Ampliar")), "foco volta à miniatura");

/* Celular: WhatsApp flutuante e menu */
const m = await b.newPage();
await m.setViewport({ width: 375, height: 812, isMobile: true, hasTouch: true });
await m.goto(URL, { waitUntil: "networkidle2", timeout: 120000 });
await espera(800);
ok((await m.$eval(".whats-flutuante", (e) => getComputedStyle(e).visibility)) === "hidden", "flutuante escondido no hero");
await m.evaluate(() => window.scrollTo(0, 2400));
await espera(900);
ok((await m.$eval(".whats-flutuante", (e) => getComputedStyle(e).visibility)) === "visible", "flutuante aparece depois do hero");
await m.click('button[aria-controls="menu-celular"]');
await espera(400);
ok(await m.evaluate(() => document.querySelector("main").inert), "menu aberto deixa o main inerte");
ok(await m.evaluate(() => document.getElementById("menu-celular").contains(document.activeElement)), "foco vai para o menu");
await m.keyboard.press("Escape");
await espera(300);
ok(await m.evaluate(() => document.activeElement?.getAttribute("aria-controls") === "menu-celular"), "Esc fecha e devolve o foco ao botão");
const alvos = await m.$$eval("a, button, summary", (els) =>
  els
    .filter((e) => e.offsetParent && !e.closest("[aria-hidden=true]") && !e.classList.contains("sr-only"))
    .map((e) => [e.textContent?.trim().slice(0, 30) || e.getAttribute("aria-label"), e.getBoundingClientRect().height])
    .filter(([, h]) => h < 44),
);
ok(alvos.length === 0, `alvos de toque >= 44px ${alvos.length ? JSON.stringify(alvos) : ""}`);

ok(erros.length === 0, `sem erro de console ${erros.join(" | ")}`);
console.log(falhas ? `\n${falhas} falha(s)` : "\ntudo certo");
await b.close();
process.exit(falhas ? 1 : 0);
