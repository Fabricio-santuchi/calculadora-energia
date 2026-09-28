import type { Idioma } from "./numero";

// slugPt dos 4 aparelhos mostrados no rodapé (espec 3) e no menu do celular
// (MobileMenu.dc.html). Listas DIFERENTES por idioma de propósito: o pt
// destaca o chuveiro (só existe em pt), o en troca por chaleira no lugar.
export const APARELHOS_DESTAQUE: Record<Idioma, string[]> = {
  pt: ["pc", "geladeira", "ar-condicionado", "chuveiro"],
  en: ["pc", "geladeira", "ar-condicionado", "chaleira"],
};
