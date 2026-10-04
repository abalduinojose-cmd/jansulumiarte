import Image from "next/image";

import logoBranco from "../../../public/marca/logo-branco.webp";
import logoMarrom from "../../../public/marca/logo-marrom.webp";
import plainaBranca from "../../../public/marca/plaina-branca.webp";
import plainaMarrom from "../../../public/marca/plaina-marrom.webp";

type Props = { readonly cor: "branco" | "marrom"; readonly tipo?: "completo" | "plaina"; readonly className?: string; readonly sizes?: string; readonly decorativo?: boolean };

/** Logo real do cliente: branco sobre o marrom, marrom sobre o claro. A plaina sozinha serve de ícone. */
export function Logo({ cor, tipo = "completo", className, sizes = "160px", decorativo = false }: Props) {
  const src = tipo === "completo" ? (cor === "branco" ? logoBranco : logoMarrom) : cor === "branco" ? plainaBranca : plainaMarrom;
  return <Image src={src} alt={decorativo ? "" : "JanSu Lumiarte"} sizes={sizes} className={className} />;
}
