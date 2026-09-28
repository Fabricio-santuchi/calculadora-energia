import Link from "next/link";
import { ChevronDown } from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Calculadora from "@/components/calculadora-form";
import EspacoAnuncio from "@/components/espaco-anuncio";
import OutrosAparelhos from "@/components/outros-aparelhos";
import TextoComNegrito from "@/components/texto-com-negrito";
import type { Aparelho } from "@/lib/data/aparelhos";
import type { Idioma } from "@/lib/numero";
import type { ConteudoAparelho } from "@/content/aparelhos";
import { TEXTOS_APARELHO } from "@/lib/textos";
import { ICONE_DICA } from "@/lib/icones";

type Props = {
  idioma: Idioma;
  aparelho: Aparelho;
  conteudo: ConteudoAparelho;
};

export default function PaginaAparelho({ idioma, aparelho, conteudo }: Props) {
  const t = TEXTOS_APARELHO[idioma];
  const nomeCurto = idioma === "pt" ? aparelho.nomeCurtoPt : aparelho.nomeCurtoEn;

  return (
    <div className="flex min-h-screen flex-col">
      <Header idioma={idioma} ativo="aparelhos" />
      <main className="flex-1">
        {/* 4.1 — Topo: trilha, h1 alinhado à esquerda, subtítulo. */}
        <div className="mx-auto w-full max-w-[1120px] px-4 pt-6 md:pt-12">
          <nav
            aria-label="Trilha"
            className="flex flex-wrap items-center gap-2 text-[13px] text-muted-foreground md:text-sm"
          >
            <Link href={`/${idioma}`} className="text-muted-foreground no-underline">
              {t.trilhaInicio}
            </Link>
            <span aria-hidden="true">/</span>
            <Link
              href={`/${idioma}#aparelhos`}
              className="text-muted-foreground no-underline"
            >
              {t.trilhaAparelhos}
            </Link>
            <span aria-hidden="true">/</span>
            <span>{nomeCurto}</span>
          </nav>

          <h1 className="mt-3 max-w-[820px] font-heading text-[34px] leading-[1.05] font-semibold tracking-[-0.02em] text-foreground md:text-[60px]">
            {conteudo.tituloPagina}
          </h1>
          <p className="mt-3 max-w-[680px] text-base text-muted-foreground md:text-[19px]">
            {t.subtitulo[aparelho.unidadeTempo]}
          </p>
        </div>

        {/* 4.2 — Calculadora em 2 colunas (a partir do computador). */}
        <div className="mx-auto mt-6 w-full max-w-[1120px] px-4 md:mt-10">
          <Calculadora
            idioma={idioma}
            aparelho={aparelho}
            exibirCabecalho={false}
            rotuloPotencia={conteudo.rotuloPotencia}
            notaPotencia={conteudo.notaPotencia}
            notaTempo={conteudo.notaTempo}
            avisoResultado={conteudo.avisoResultado}
            explicacao={conteudo.explicacao}
          />
        </div>

        {/* 4.3 — Anúncio. */}
        <div className="mt-14 md:mt-[56px]">
          <EspacoAnuncio idioma={idioma} />
        </div>

        {/* 4.4 — Calcule outros aparelhos. */}
        <OutrosAparelhos idioma={idioma} slugAtual={aparelho.slugPt} />

        {/* 4.5 — Dicas. */}
        <section className="mx-auto w-full max-w-[1120px] px-4 py-9 md:py-[72px]">
          <h2 className="font-heading text-[26px] font-semibold text-foreground md:text-4xl">
            {conteudo.tituloDicas}
          </h2>
          <div className="mt-6 flex flex-col gap-4 md:grid md:grid-cols-3">
            {conteudo.dicas.map((dica) => {
              const Icone = dica.icone ? ICONE_DICA[dica.icone] : null;
              return (
                <div
                  key={dica.titulo}
                  className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-[18px] md:gap-3 md:rounded-2xl md:p-7"
                >
                  {Icone && (
                    <span className="hidden size-11 items-center justify-center rounded-xl bg-accent md:flex">
                      <Icone className="size-5 text-foreground" />
                    </span>
                  )}
                  <h3 className="text-base font-semibold text-foreground md:text-[19px]">
                    {dica.titulo}
                  </h3>
                  <p className="text-[15px] leading-[1.55] text-muted-foreground md:text-base">
                    {dica.texto}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* 4.6 — Texto de apoio + "Como a conta é feita" + perguntas. */}
        <article className="mx-auto grid w-full max-w-[1120px] gap-10 px-4 pt-9 pb-16 md:grid-cols-2 md:items-start md:gap-16 md:pt-[72px] md:pb-24">
          <div>
            <h2 className="font-heading text-[26px] font-semibold text-foreground md:text-4xl">
              {conteudo.tituloTexto}
            </h2>
            <div className="mt-4 space-y-[18px] text-[16px] leading-[1.65] text-texto-corpo md:text-[17px]">
              {conteudo.textoApoio.map((paragrafo, indice) => (
                <p key={indice}>
                  <TextoComNegrito texto={paragrafo} />
                </p>
              ))}
            </div>

            <h3 className="mt-8 font-heading text-2xl font-semibold text-foreground">
              {t.comoContaFeita}
            </h3>
            <div className="mt-4 rounded-[14px] border border-border bg-card p-5 font-mono text-[13px] leading-[1.7] whitespace-pre-line md:p-[22px] md:text-base">
              {t.formula[aparelho.unidadeTempo].join("\n")}
            </div>
          </div>

          <div>
            <h2 className="font-heading text-[26px] font-semibold text-foreground md:text-4xl">
              {t.faqTitulo}
            </h2>
            {conteudo.faq.length > 0 && (
              <div className="mt-4 border-t border-border">
                {conteudo.faq.map((item, indice) => (
                  <details
                    key={item.pergunta}
                    open={indice === 0}
                    className="group border-b border-border py-3.5 md:py-[18px]"
                  >
                    <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-3 text-base font-semibold text-foreground marker:content-none md:text-lg">
                      {item.pergunta}
                      <ChevronDown className="size-5 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" />
                    </summary>
                    <p className="mt-2.5 text-[15px] text-muted-foreground md:text-base">
                      <TextoComNegrito texto={item.resposta} />
                    </p>
                  </details>
                ))}
              </div>
            )}
          </div>
        </article>
      </main>
      <Footer idioma={idioma} />
    </div>
  );
}
