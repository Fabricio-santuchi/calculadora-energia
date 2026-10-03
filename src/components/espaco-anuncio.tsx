import type { Idioma } from "@/lib/numero";

type Props = {
  idioma: Idioma;
};

const TEXTO: Record<Idioma, string> = {
  pt: "Espaço do anúncio",
  en: "Ad space",
};

export default function EspacoAnuncio({ idioma }: Props) {
  return (
    // Wrapper separado, sem borda: se fosse padding direto na caixa com a
    // borda tracejada, o padding empurraria só o TEXTO pra dentro, mas a
    // borda continuaria colada na beira da tela.
    <div className="px-4 xs:px-6 md:px-8">
      <div className="mx-auto flex h-25 w-full max-w-280 items-center justify-center rounded-xl border border-dashed border-borda-tracejada text-center text-xs tracking-widest text-muted-foreground uppercase xs:h-27.5 xs:rounded-[14px]">
        {TEXTO[idioma]}
        {/* "(AdSense)" é nome de marca — igual nos dois idiomas, por isso
            fixo, sem entrar no objeto TEXTO. */}
        <span className="hidden xs:inline"> (AdSense)</span>
      </div>
    </div>
  );
}
