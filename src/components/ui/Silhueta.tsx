import { asset } from "@/lib/asset";
import { cx } from "@/lib/cx";

export type Tom = "noite" | "creme" | "branco";

const FUNDO: Record<Tom, string> = { noite: "bg-noite", creme: "bg-surface", branco: "bg-surface-alt" };
const COR: Record<Tom, string> = { noite: "text-noite", creme: "text-surface", branco: "text-surface-alt" };

/**
 * Divisor de seção (papel da serra na Cabana e do casarão na Celebrare): a
 * cor de baixo sobe numa curva longa, como a tábua que a plaina acabou de
 * alisar, e a própria plaina da logo descansa no alto da curva. A plaina é
 * uma máscara do arquivo da logo pintada com currentColor, então serve a
 * qualquer cor de seção sem outro arquivo.
 */
export function Silhueta({ de, para, espelhar = false }: { readonly de: Tom; readonly para: Tom; readonly espelhar?: boolean }) {
  const mascara = `url(${asset("/marca/plaina-branca.webp")})`;
  return (
    <div aria-hidden className={cx("relative -mb-px overflow-hidden", FUNDO[de])}>
      <div className={cx("relative", COR[para], espelhar && "-scale-x-100")}>
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none" focusable="false" className="block h-16 w-full md:h-28">
          <path d="M0 120V108C260 108 520 104 760 92C900 85 1010 62 1120 62C1230 62 1320 96 1440 102V120Z" fill="currentColor" />
        </svg>
        {/* a plaina pousada no alto da curva (x 1120 de 1440, y 62 de 120) */}
        <span
          className="absolute bottom-[48%] left-[77.8%] block aspect-[240/109] w-16 -translate-x-1/2 bg-current md:w-24"
          style={{ maskImage: mascara, WebkitMaskImage: mascara, maskSize: "contain", WebkitMaskSize: "contain", maskRepeat: "no-repeat", WebkitMaskRepeat: "no-repeat" }}
        />
      </div>
    </div>
  );
}
