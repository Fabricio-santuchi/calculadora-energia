import Link from "next/link";
import { Zap } from "lucide-react";
import CalculadoraCompacta from "@/components/calculadora-compacta";
import EspacoAnuncio from "@/components/espaco-anuncio";
import Header from "@/components/header";
import Footer from "@/components/footer";
import type { Metadata } from "next";
import type { Idioma } from "@/lib/numero";
import { TEXTOS_INICIO } from "@/lib/textos";
import { aparelhos } from "@/lib/data/aparelhos";
import { tarifas } from "@/lib/data/tarifas";
import { formatarMoeda } from "@/lib/numero";
import { NOME_DO_SITE, URL_BASE } from "@/lib/site";
import { ICONE_POR_APARELHO } from "@/lib/icones";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  const idioma: Idioma = lang === "pt" ? "pt" : "en";
  const t = TEXTOS_INICIO[idioma];
  const url = `${URL_BASE}/${idioma}`;

  return {
    title: `${t.titulo} | ${NOME_DO_SITE}`,
    description: t.subtitulo,
    alternates: {
      canonical: url,
      languages: {
        en: `${URL_BASE}/en`,
        pt: `${URL_BASE}/pt`,
      },
    },
    openGraph: {
      title: `${t.titulo} | ${NOME_DO_SITE}`,
      description: t.subtitulo,
      url,
      siteName: NOME_DO_SITE,
      locale: idioma === "pt" ? "pt_BR" : "en_US",
    },
  };
}

export default async function LangHomePage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  const idioma: Idioma = lang === "pt" ? "pt" : "en";
  const t = TEXTOS_INICIO[idioma];

  return (
    <div className="flex min-h-screen flex-col">
      <Header idioma={idioma} ativo="aparelhos" />
      <main className="flex-1">
        {/* 2 colunas só a partir do computador (lg): no tablet e abaixo, a
            espec/prancha (TabletInicio.dc.html) mostra tudo empilhado numa
            coluna só, texto em cima e a calculadora embaixo. */}
        <section className="mx-auto grid w-full max-w-280 items-center gap-14 px-4 py-16 xs:px-6 md:px-8 lg:grid-cols-2">
          <div className="flex flex-col gap-5">
            <span className="flex w-fit items-center gap-2 rounded-full bg-accent px-3.5 py-1.5 text-sm font-semibold text-accent-foreground">
              <Zap className="size-4.5" />
              {t.selo}
            </span>

            <h1 className="font-heading text-[38px] leading-[1.02] font-semibold tracking-[-0.02em] text-foreground xs:text-[44px] md:text-[52px] lg:text-[64px]">
              {t.titulo}
            </h1>

            <p className="text-lg text-muted-foreground">{t.subtitulo}</p>

            <div className="flex gap-3">
              <a
                href="#calc"
                className="flex h-13 items-center rounded-xl bg-foreground px-5 font-semibold text-background no-underline"
              >
                {t.botaoCalcular}
              </a>
              <a
                href="#aparelhos"
                className="flex h-13 items-center rounded-xl border border-foreground px-5 font-semibold text-foreground no-underline"
              >
                {t.botaoAparelhos}
              </a>
            </div>
          </div>

          <div id="calc">
            <CalculadoraCompacta idioma={idioma} />
          </div>
        </section>

        <section className="mx-auto mt-18 grid w-full max-w-280 gap-4 px-4 xs:px-6 md:grid-cols-3 md:px-8">
          {t.passos.map((passo, indice) => (
            <div
              key={passo.titulo}
              className="flex gap-4 border-t-2 border-foreground p-6"
            >
              <span className="font-mono text-[28px] font-semibold text-ambar-escuro">
                {String(indice + 1).padStart(2, "0")}
              </span>
              <div className="flex flex-col gap-1.5">
                <h3 className="text-lg font-semibold text-foreground">
                  {passo.titulo}
                </h3>
                <p className="text-muted-foreground">{passo.texto}</p>
              </div>
            </div>
          ))}
        </section>

        <div className="mt-14">
          <EspacoAnuncio idioma={idioma} />
        </div>

        <section
          id="aparelhos"
          className="mx-auto mt-18 flex w-full max-w-280 flex-col gap-6 px-4 xs:px-6 md:px-8"
        >
          <div className="flex flex-col gap-2">
            <h2 className="font-heading text-[28px] font-semibold text-foreground md:text-4xl">
              {t.aparelhosTitulo}
            </h2>
            <p className="text-[17px] text-muted-foreground">
              {t.aparelhosSubtitulo}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2.5 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
            {aparelhos
              .filter((a) => a.idiomas.includes(idioma))
              .map((a) => {
                const Icone = ICONE_POR_APARELHO[a.slugPt];
                const slug = idioma === "pt" ? a.slugPt : a.slugEn;
                const nome = idioma === "pt" ? a.nomeCurtoPt : a.nomeCurtoEn;
                const rotuloPotencia =
                  idioma === "pt" ? a.rotuloPotenciaPt : a.rotuloPotenciaEn;

                return (
                  <Link
                    key={a.slugPt}
                    href={`/${idioma}/${slug}`}
                    className="flex flex-col gap-4 rounded-[14px] border border-border bg-card p-4 no-underline md:min-h-45 md:rounded-[18px] md:p-6"
                  >
                    <span className="flex size-13 items-center justify-center rounded-[14px] bg-secondary">
                      <Icone className="size-6.5 text-foreground" />
                    </span>
                    <span className="mt-auto flex flex-col gap-1">
                      <span className="text-[19px] font-semibold text-foreground">
                        {nome}
                      </span>
                      <span className="font-mono text-sm text-muted-foreground">
                        {rotuloPotencia}
                      </span>
                    </span>
                  </Link>
                );
              })}
          </div>
        </section>

        {/* 2 colunas só a partir do computador (lg) — no tablet e abaixo,
            texto em cima e os países em grade embaixo (TabletInicio.dc.html).
            Wrapper de fora só com margem (16/24/32px, espec 1) — a caixa
            escura (com fundo e cantos) fica por dentro, senão o fundo/borda
            fica colado na tela como o EspacoAnuncio ficava antes da V9. */}
        <div className="mx-auto mt-18 mb-20 w-full max-w-280 px-4 xs:px-6 md:px-8">
          <section className="rounded-3xl bg-foreground px-4 py-12 text-background sm:px-14">
            <div className="grid gap-12 lg:grid-cols-2">
              <div className="flex flex-col gap-3.5">
                <h2 className="font-heading text-[28px] font-semibold md:text-4xl">
                  {t.tarifasTitulo}
                </h2>
                <p className="text-background/70">{t.tarifasTexto}</p>
              </div>

              {/* V11: abaixo de 360px (ex. 320px) 2 colunas fica apertado
                  demais — nome de país longo ("Reino Unido") + valor
                  formatado ("MX$ 1,37") não cabem nos ~90px de cada caixa e
                  o texto se sobrepõe/vaza. 1 coluna só nessa faixa bem
                  estreita; 360px em diante já cabe (confirmado com print).
                  O último item (data de atualização) tem que espelhar o
                  mesmo ponto de corte no col-span: com o container em
                  1 coluna, um "span 2" sem coluna nenhuma pra ocupar força
                  o grid a criar uma coluna IMPLÍCITA extra só pra caber
                  esse item — e essa coluna implícita "vaza" pro resto do
                  grid, fazendo TODAS as caixas de país renderizarem em
                  2 colunas de novo, mesmo com grid-cols-1 no container
                  (foi exatamente esse o bug que causava a sobreposição). */}
              <div className="grid grid-cols-1 gap-3 [@media(min-width:360px)]:grid-cols-2">
                {tarifas.map((tarifa) => (
                  <div
                    key={tarifa.codigo}
                    className="flex justify-between gap-2 rounded-[14px] border border-escuro-borda p-4"
                  >
                    <span>
                      {idioma === "pt" ? tarifa.nomePt : tarifa.nomeEn}
                    </span>
                    <span className="font-mono text-[#F2B53A]">
                      {formatarMoeda(tarifa.valor, tarifa.moeda, idioma)}
                    </span>
                  </div>
                ))}
                <span className="text-xs text-escuro-apagado [@media(min-width:360px)]:col-span-2">
                  {t.tarifasAtualizadoEm(
                    // timeZone: "UTC" evita o bug de "dia errado": a data
                    // vem como "2026-09-28" (sem hora), o JS interpreta
                    // isso como meia-noite em UTC, e sem essa opção o
                    // formatador converte pra hora local — o que pode
                    // mostrar o dia anterior em fusos atrás de UTC (ex:
                    // Brasil).
                    new Intl.DateTimeFormat(
                      idioma === "pt" ? "pt-BR" : "en-US",
                      { timeZone: "UTC" },
                    ).format(new Date(tarifas[0].atualizadoEm)),
                  )}
                </span>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer idioma={idioma} />
    </div>
  );
}
