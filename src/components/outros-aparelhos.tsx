import Link from "next/link";
import type { Idioma } from "@/lib/numero";
import { TEXTOS_APARELHO } from "@/lib/textos";
import { aparelhos } from "@/lib/data/aparelhos";
import { ICONE_POR_APARELHO } from "@/lib/icones";

type Props = {
  idioma: Idioma;
  /** slugPt do aparelho da página atual, pra destacar o cartão dele. */
  slugAtual: string;
};

// "Calcule outros aparelhos" (espec 4.4): no computador mostra todos, com o
// atual destacado; no celular mostra só 4 (os primeiros da lista, tirando o
// atual) + um botão "Ver todos".
export default function OutrosAparelhos({ idioma, slugAtual }: Props) {
  const t = TEXTOS_APARELHO[idioma];
  const aparelhosDoIdioma = aparelhos.filter((a) =>
    a.idiomas.includes(idioma),
  );
  const semAtual = aparelhosDoIdioma.filter((a) => a.slugPt !== slugAtual);

  const cartao = (a: (typeof aparelhos)[number], destaque: boolean) => {
    const Icone = ICONE_POR_APARELHO[a.slugPt];
    const slug = idioma === "pt" ? a.slugPt : a.slugEn;
    const nome = idioma === "pt" ? a.nomeCurtoPt : a.nomeCurtoEn;
    const rotuloPotencia =
      idioma === "pt" ? a.rotuloPotenciaPt : a.rotuloPotenciaEn;

    return (
      <Link
        key={a.slugPt}
        href={`/${idioma}/${slug}`}
        aria-current={destaque ? "page" : undefined}
        className={`flex min-h-[88px] items-center gap-3 rounded-2xl border p-4 no-underline sm:min-h-0 sm:flex-col sm:items-start sm:gap-4 sm:p-5 ${
          destaque
            ? "border-foreground bg-accent"
            : "border-border bg-card hover:border-foreground"
        }`}
      >
        <span
          className={`flex size-10 shrink-0 items-center justify-center rounded-xl sm:size-12 ${
            destaque ? "bg-foreground text-primary" : "bg-secondary"
          }`}
        >
          <Icone className="size-[22px]" />
        </span>
        <span className="flex flex-col gap-0.5">
          <span className="text-[15px] font-semibold text-foreground sm:text-[17px]">
            {nome}
          </span>
          <span className="font-mono text-[13px] text-muted-foreground sm:text-sm">
            {rotuloPotencia}
          </span>
        </span>
      </Link>
    );
  };

  return (
    <section className="mx-auto w-full max-w-[1120px] px-4 py-9 md:py-[72px]">
      <div className="flex flex-col justify-between gap-2 md:flex-row md:items-end">
        <h2 className="font-heading text-[26px] font-semibold text-foreground md:text-4xl">
          {t.outrosAparelhosTitulo}
        </h2>
        <p className="hidden text-[15px] text-muted-foreground md:block">
          {t.outrosAparelhosFrase}
        </p>
      </div>

      {/* Computador (e tablet): todos os aparelhos, o atual destacado. */}
      <div className="mt-6 hidden grid-cols-2 gap-4 md:grid lg:grid-cols-4">
        {aparelhosDoIdioma.map((a) => cartao(a, a.slugPt === slugAtual))}
      </div>

      {/* Celular: 4 aparelhos (sem o atual) + botão "ver todos". */}
      <div className="mt-6 grid grid-cols-2 gap-2.5 md:hidden">
        {semAtual.slice(0, 4).map((a) => cartao(a, false))}
      </div>
      <Link
        href={`/${idioma}#aparelhos`}
        className="mt-2.5 flex h-12 items-center justify-center rounded-xl border border-foreground text-center font-semibold text-foreground no-underline md:hidden"
      >
        {t.verTodosAparelhos}
      </Link>
    </section>
  );
}
