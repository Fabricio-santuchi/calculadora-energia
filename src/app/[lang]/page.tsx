import Link from "next/link";
import CalculadoraGenerica from "@/components/calculadora-generica";
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
        <section className="mx-auto grid w-full max-w-[1120px] items-center gap-14 px-4 py-16 md:grid-cols-2">
          <div className="flex flex-col gap-5">
            <span className="flex w-fit items-center gap-2 rounded-full bg-accent px-3.5 py-1.5 text-sm font-semibold text-accent-foreground">
              {t.selo}
            </span>

            <h1 className="font-heading text-5xl font-semibold leading-tight text-foreground">
              {t.titulo}
            </h1>

            <p className="text-lg text-muted-foreground">{t.subtitulo}</p>

            <div className="flex gap-3">
              <a
                href="#calc"
                className="flex h-[52px] items-center rounded-xl bg-foreground px-5 font-semibold text-background no-underline"
              >
                {t.botaoCalcular}
              </a>
              <a
                href="#aparelhos"
                className="flex h-[52px] items-center rounded-xl border border-foreground px-5 font-semibold text-foreground no-underline"
              >
                {t.botaoAparelhos}
              </a>
            </div>
          </div>

          <div id="calc">
            <CalculadoraGenerica idioma={idioma} />
          </div>
        </section>

        <section className="mx-auto mt-4 grid w-full max-w-[1120px] gap-4 px-4 py-16 md:grid-cols-3">
          {t.passos.map((passo, indice) => (
            <div
              key={passo.titulo}
              className="flex gap-4 border-t-2 border-foreground p-6"
            >
              <span className="font-mono text-3xl font-semibold text-[#8A5A00]">
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

        <EspacoAnuncio idioma={idioma} />

        <section
          id="aparelhos"
          className="mx-auto mt-16 flex w-full max-w-[1120px] flex-col gap-6 px-4 py-16"
        >
          <div className="flex flex-col gap-2">
            <h2 className="font-heading text-3xl font-semibold text-foreground">
              {t.aparelhosTitulo}
            </h2>
            <p className="text-muted-foreground">{t.aparelhosSubtitulo}</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
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
                    className="flex min-h-[180px] flex-col gap-4 rounded-2xl border border-border bg-card p-6 no-underline"
                  >
                    <span className="flex size-[52px] items-center justify-center rounded-2xl bg-secondary">
                      <Icone className="size-[26px] text-foreground" />
                    </span>
                    <span className="mt-auto flex flex-col gap-1">
                      <span className="text-lg font-semibold text-foreground">
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

        <section className="mx-auto mb-20 w-full max-w-[1120px] rounded-3xl bg-foreground px-4 py-12 text-background sm:px-14">
          <div className="grid gap-12 md:grid-cols-2">
            <div className="flex flex-col gap-3.5">
              <h2 className="font-heading text-3xl font-semibold">
                {t.tarifasTitulo}
              </h2>
              <p className="text-background/70">{t.tarifasTexto}</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {tarifas.map((tarifa) => (
                <div
                  key={tarifa.codigo}
                  className="flex justify-between rounded-2xl border border-background/20 p-4"
                >
                  <span>{idioma === "pt" ? tarifa.nomePt : tarifa.nomeEn}</span>
                  <span className="font-mono text-[#F2B53A]">
                    {formatarMoeda(tarifa.valor, tarifa.moeda, idioma)}
                  </span>
                </div>
              ))}
              <span className="col-span-2 text-xs text-background/50">
                {t.tarifasAtualizadoEm(
                  // timeZone: "UTC" evita o bug de "dia errado": a data vem
                  // como "2026-09-28" (sem hora), o JS interpreta isso como
                  // meia-noite em UTC, e sem essa opção o formatador converte
                  // pra hora local — o que pode mostrar o dia anterior em
                  // fusos atrás de UTC (ex: Brasil).
                  new Intl.DateTimeFormat(idioma === "pt" ? "pt-BR" : "en-US", {
                    timeZone: "UTC",
                  }).format(new Date(tarifas[0].atualizadoEm)),
                )}
              </span>
            </div>
          </div>
        </section>
      </main>
      <Footer idioma={idioma} />
    </div>
  );
}
