from fontTools.ttLib import TTFont
import glob, os
need = 'ãâáàçéêíóôõúüÃÂÁÀÇÉÊÍÓÔÕÚ·“”’–→%'
for f in sorted(glob.glob('src/assets/fontes/*.woff2')):
    cm = TTFont(f).getBestCmap()
    falta = [hex(ord(c)) for c in need if ord(c) not in cm]
    print(os.path.basename(f), 'faltam:', ' '.join(falta) or 'nada')
