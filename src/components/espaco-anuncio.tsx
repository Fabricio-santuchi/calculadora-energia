import type { Idioma } from "@/lib/numero";

type Props = {
  idioma: Idioma;
};

const TEXTO: Record<Idioma, string> = {
  pt: "Espaço do anúncio",
  en: "Ad space",
};

// Placeholder do bloco de anúncio (espec 4.3) — na task 23 recebe o
// AdSense de verdade. Reaproveitado na página de aparelho (4.3) e na
// inicial (6.3). No celular o texto fica mais curto: o "(AdSense)" some
// via CSS (xs:inline), não precisa de uma segunda string.
export default function EspacoAnuncio({ idioma }: Props) {
  return (
    <div className="mx-auto flex h-[100px] w-full max-w-[1120px] items-center justify-center rounded-xl border border-dashed border-borda-tracejada px-4 text-center text-xs tracking-widest text-muted-foreground uppercase xs:h-[110px] xs:rounded-[14px]">
      {TEXTO[idioma]}
      {/* "(AdSense)" é nome de marca — igual nos dois idiomas, por isso
          fixo, sem entrar no objeto TEXTO. */}
      <span className="hidden xs:inline"> (AdSense)</span>
    </div>
  );
}
