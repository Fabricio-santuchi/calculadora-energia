export type Idioma = "pt" | "en";

const LOCALE_POR_IDIOMA: Record<Idioma, string> = {
  pt: "pt-BR",
  en: "en-US",
};

export function parseNumero(texto: string): number | null {
  const textoLimpo = texto.trim();
  if (textoLimpo === "") return null;

  const textoNormalizado = textoLimpo.includes(",")
    ? textoLimpo.replaceAll(".", "").replace(",", ".")
    : textoLimpo;

  const numero = Number(textoNormalizado);
  return Number.isFinite(numero) ? numero : null;
}

export function formatarMoeda(
  valor: number,
  moeda: string,
  idioma: Idioma,
): string {
  return new Intl.NumberFormat(LOCALE_POR_IDIOMA[idioma], {
    style: "currency",
    currency: moeda,
  }).format(valor);
}
