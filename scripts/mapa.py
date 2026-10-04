"""
Mapa estático do Contato na identidade da JanSu: mosaico de tiles do
OpenStreetMap centrado no endereço real (Estr. Fonte Santa, 233) e
recolorido como a "oficina à noite": fundo noite de madeira, quadras um
tom acima, ruas em marrom quente, vias principais em caramelo e os nomes
das ruas em creme, legíveis. Receita da Celebrare (mapa claro de papel)
invertida para o painel escuro. O pino NÃO é assado: a UI desenha o
marcador no centro exato. Exige o crédito visível "© OpenStreetMap".

    python scripts/mapa.py
"""
import io, math, time, urllib.request
import numpy as np
from PIL import Image

LAT, LNG, Z = -22.391352, -42.953761, 16
W, H, T = 1200, 800, 256

n = 2 ** Z
xf = (LNG + 180) / 360 * n
lr = math.radians(LAT)
yf = (1 - math.log(math.tan(lr) + 1 / math.cos(lr)) / math.pi) / 2 * n
x0, y0 = math.floor(xf - W / 2 / T) - 1, math.floor(yf - H / 2 / T) - 1
x1, y1 = math.floor(xf + W / 2 / T) + 1, math.floor(yf + H / 2 / T) + 1

import os

ORIGINAL = "midia/mapa-osm-original.png"
mosaico = Image.new("RGB", ((x1 - x0 + 1) * T, (y1 - y0 + 1) * T))
for x in (range(x0, x1 + 1) if not os.path.exists(ORIGINAL) else []):
    for y in range(y0, y1 + 1):
        req = urllib.request.Request(
            f"https://tile.openstreetmap.org/{Z}/{x}/{y}.png",
            headers={"User-Agent": "JansuLumiarteSite/1.0 (mapa estatico, geracao unica)"},
        )
        mosaico.paste(Image.open(io.BytesIO(urllib.request.urlopen(req, timeout=30).read())).convert("RGB"), ((x - x0) * T, (y - y0) * T))
        time.sleep(0.1)

# Os tiles crus ficam em midia/: rodar de novo só recolore, sem baixar.
if os.path.exists(ORIGINAL):
    img = Image.open(ORIGINAL).convert("RGB")
else:
    px, py = round((xf - x0) * T), round((yf - y0) * T)
    img = mosaico.crop((px - W // 2, py - H // 2, px + W // 2, py + H // 2))
    img.save(ORIGINAL)

a = np.asarray(img).astype(float) / 255
R, G, B = a[..., 0], a[..., 1], a[..., 2]
L = 0.2126 * R + 0.7152 * G + 0.0722 * B

# Rampa invertida: tinta do OSM (texto) vira creme; o fundo claro vira noite.
creme = np.array([236, 226, 210]) / 255
quadra = np.array([44, 33, 25]) / 255
noite = np.array([30, 22, 16]) / 255
t = np.clip((L - 0.35) / 0.6, 0, 1)[..., None]
base = np.where(t < 0.8, creme + (quadra - creme) * (t / 0.8), quadra + (noite - quadra) * ((t - 0.8) / 0.2))

# Via local (branca no OSM) vira marrom quente; via principal (amarelo e
# laranja no OSM) vira o caramelo da marca.
branca = np.clip((L - 0.962) / 0.038, 0, 1)[..., None]
quente = (np.clip((R - 0.93) / 0.07, 0, 1) * np.clip((0.86 - B) / 0.15, 0, 1) * (G > 0.72))[..., None]
rua = np.array([92, 70, 52]) / 255
caramelo = np.array([200, 155, 98]) / 255
cor = base * (1 - branca) + rua * branca
cor = cor * (1 - quente) + caramelo * quente
# Rodovia (rosa e vermelho no OSM) vira o caramelo claro.
rodovia = ((R > 0.8) & ((R - G) > 0.15) & ((R - B) > 0.05))
cor[rodovia] = np.array([226, 192, 143]) / 255
# Mata e pasto (a Fonte Santa é verde) viram um musgo bem escuro.
verde = ((G - R) > 0.05) & ((G - B) > 0.03)
musgo = np.array([36, 38, 26]) / 255
cor[verde] = cor[verde] * 0.3 + musgo * 0.7

Image.fromarray((np.clip(cor, 0, 1) * 255).astype("uint8")).save("src/assets/mapa/fonte-santa.jpg", quality=84, optimize=True)
print("mapa salvo", W, H)
