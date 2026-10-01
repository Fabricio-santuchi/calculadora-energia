import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/header";
import Footer from "@/components/footer";
import type { Idioma } from "@/lib/numero";
import { tarifas } from "@/lib/data/tarifas";
import { NOME_DO_SITE, URL_BASE } from "@/lib/site";

const TEXTOS = {
  pt: {
    tituloPagina: "Sobre",
    trilhaInicio: "Início",
    trilhaAtual: "Sobre",
    h1: "Sobre o WattCheck",
    subtitulo:
      "Um jeito simples de descobrir quanto cada aparelho pesa na conta de luz, sem precisar fazer conta na mão.",
    tituloPorque: "Por que este site existe",
    // Rascunho — ideia é o Fabricio reescrever com as próprias palavras
    // (espec, seção 8: "continua em aberto de propósito").
    textoPorque: [
      "Comecei o WattCheck pra resolver uma dúvida minha: quanto realmente custa deixar um aparelho ligado o dia inteiro? Toda conta de luz chega com o total, mas nunca com esse detalhe.",
      "O site nasceu como projeto de aprendizado — construí cada parte dele, do cálculo até o design — e virou uma ferramenta que eu mesmo uso pra decidir o que vale a pena trocar ou desligar em casa.",
    ],
    tituloFontes: "De onde vêm os números",
    textoFontes:
      "As tarifas são médias de cada país, tiradas de fontes oficiais. As potências são valores típicos e podem variar de aparelho para aparelho.",
    fontes: [
      { pais: "Estados Unidos", fonte: "EIA" },
      { pais: "Reino Unido", fonte: "Ofgem" },
      { pais: "Brasil", fonte: "ANEEL" },
      { pais: "Portugal e Alemanha", fonte: "Eurostat" },
      { pais: "Canadá", fonte: "GlobalPetrolPrices" },
      { pais: "Austrália", fonte: "Média nacional" },
      { pais: "México", fonte: "CFE" },
    ],
    ultimaConferencia: "Última conferência",
    autorNome: "Fabricio Santuchi",
    autorCargo: "Desenvolvedor front-end",
    autorFrase: "Aprendendo a programar construindo coisas que eu mesmo uso.",
    falarComigo: "Falar comigo",
  },
  en: {
    tituloPagina: "About",
    trilhaInicio: "Home",
    trilhaAtual: "About",
    h1: "About WattCheck",
    subtitulo:
      "A simple way to find out how much each appliance adds to your power bill, without doing the math by hand.",
    tituloPorque: "Why this site exists",
    textoPorque: [
      "I started WattCheck to answer a question of my own: how much does it actually cost to leave an appliance running all day? Every power bill shows the total, but never that detail.",
      "The site began as a learning project — I built every part of it, from the calculation to the design — and became a tool I use myself to decide what's worth replacing or switching off at home.",
    ],
    tituloFontes: "Where the numbers come from",
    textoFontes:
      "Rates are country averages from official sources. Power ratings are typical values and can vary by appliance.",
    fontes: [
      { pais: "United States", fonte: "EIA" },
      { pais: "United Kingdom", fonte: "Ofgem" },
      { pais: "Brazil", fonte: "ANEEL" },
      { pais: "Portugal & Germany", fonte: "Eurostat" },
      { pais: "Canada", fonte: "GlobalPetrolPrices" },
      { pais: "Australia", fonte: "National average" },
      { pais: "Mexico", fonte: "CFE" },
    ],
    ultimaConferencia: "Last checked",
    autorNome: "Fabricio Santuchi",
    autorCargo: "Front-end developer",
    autorFrase: "Learning to code by building things I actually use.",
    falarComigo: "Get in touch",
  },
} satisfies Record<Idioma, unknown>;

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/sobre">): Promise<Metadata> {
  const { lang } = await params;
  const idioma: Idioma = lang === "pt" ? "pt" : "en";
  const t = TEXTOS[idioma];
  const url = `${URL_BASE}/${idioma}/sobre`;

  return {
    title: `${t.tituloPagina} | ${NOME_DO_SITE}`,
    description: t.subtitulo,
    alternates: {
      canonical: url,
      languages: {
        en: `${URL_BASE}/en/sobre`,
        pt: `${URL_BASE}/pt/sobre`,
      },
    },
    openGraph: {
      title: `${t.tituloPagina} | ${NOME_DO_SITE}`,
      description: t.subtitulo,
      url,
      siteName: NOME_DO_SITE,
      locale: idioma === "pt" ? "pt_BR" : "en_US",
    },
  };
}

export default async function SobrePage({
  params,
}: PageProps<"/[lang]/sobre">) {
  const { lang } = await params;
  const idioma: Idioma = lang === "pt" ? "pt" : "en";
  const t = TEXTOS[idioma];

  const ultimaConferenciaFormatada = new Intl.DateTimeFormat(
    idioma === "pt" ? "pt-BR" : "en-US",
    { timeZone: "UTC" },
  ).format(new Date(tarifas[0].atualizadoEm));

  return (
    <div className="flex min-h-screen flex-col">
      <Header idioma={idioma} ativo="sobre" />
      <main className="flex-1">
        {/* 3 itens diretos do grid, nessa ordem no HTML (intro, cartão do
            autor, resto do texto) — no celular isso já é a ordem visual
            certa (empilha do jeito que está escrito).
            No computador (lg:grid-cols-12), cada um recebe linha E coluna
            explícitas (em vez de deixar o grid posicionar sozinho):
            intro e resto ficam nas colunas 1-8, linha 1 e linha 2; o
            cartão fica nas colunas 10-12 ocupando as DUAS linhas
            (row-span-2) — assim ele acompanha a altura de intro+resto
            juntos, em vez de só a altura de "intro" (que é mais baixo
            que o cartão) — se não fizesse isso, sobrava um vão vazio
            entre o subtítulo e "Por que este site existe", porque o
            grid reservava a linha 1 do tamanho do cartão (o item mais
            alto dela) antes de começar a linha 2. */}
        <div className="mx-auto grid w-full max-w-280 gap-10 px-4 py-9 xs:px-6 md:px-8 md:py-16 lg:grid-cols-12">
          <div className="flex flex-col gap-5 lg:col-span-8 lg:row-start-1">
            <nav
              aria-label="Trilha"
              className="flex flex-wrap items-center gap-2 text-[13px] text-muted-foreground md:text-sm"
            >
              <Link href={`/${idioma}`} className="text-muted-foreground no-underline">
                {t.trilhaInicio}
              </Link>
              <span aria-hidden="true">/</span>
              <span>{t.trilhaAtual}</span>
            </nav>

            <h1 className="font-heading text-[36px] leading-[1.08] font-semibold tracking-[-0.02em] text-foreground xs:text-[44px] md:text-[60px]">
              {t.h1}
            </h1>
            <p className="max-w-170 text-base text-muted-foreground md:text-[19px]">
              {t.subtitulo}
            </p>
          </div>

          <aside className="flex flex-col gap-4 rounded-[20px] bg-foreground p-7 text-background lg:col-span-3 lg:col-start-10 lg:row-span-2 lg:row-start-1 lg:self-start">
            <div className="flex flex-col gap-1">
              <span className="text-[19px] font-semibold">{t.autorNome}</span>
              <span className="text-[15px] text-background/70">
                {t.autorCargo}
              </span>
            </div>
            <p className="text-[15px] leading-[1.55] text-background/70">
              {t.autorFrase}
            </p>
            <Link
              href={`/${idioma}/contato`}
              className="flex min-h-11 items-center justify-center rounded-xl border border-background font-semibold text-background no-underline"
            >
              {t.falarComigo}
            </Link>
          </aside>

          <div className="flex flex-col gap-5 lg:col-span-8 lg:row-start-2">
            <h2 className="font-heading text-2xl font-semibold text-foreground md:text-[28px]">
              {t.tituloPorque}
            </h2>
            <div className="flex flex-col gap-4 text-[16px] leading-[1.65] text-texto-corpo md:text-[17px]">
              {t.textoPorque.map((paragrafo, indice) => (
                <p key={indice}>{paragrafo}</p>
              ))}
            </div>

            <h2 className="font-heading text-2xl font-semibold text-foreground md:text-[28px]">
              {t.tituloFontes}
            </h2>
            <p className="text-[16px] leading-[1.65] text-texto-corpo md:text-[17px]">
              {t.textoFontes}
            </p>
            <div className="flex flex-col border-t border-border">
              {t.fontes.map((item) => (
                <div
                  key={item.pais}
                  className="flex justify-between gap-3 border-b border-border py-3 text-[15px] md:py-3.5 md:text-base"
                >
                  <span>{item.pais}</span>
                  <span className="font-mono text-muted-foreground">
                    {item.fonte}
                  </span>
                </div>
              ))}
            </div>
            <span className="text-[13px] text-muted-foreground md:text-sm">
              {t.ultimaConferencia}: {ultimaConferenciaFormatada}
            </span>
          </div>
        </div>
      </main>
      <Footer idioma={idioma} />
    </div>
  );
}
