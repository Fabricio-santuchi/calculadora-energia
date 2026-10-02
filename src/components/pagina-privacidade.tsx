import Link from "next/link";
import Header from "@/components/header";
import Footer from "@/components/footer";
import type { Idioma } from "@/lib/numero";

// Data em que o texto desta política foi escrito/revisado pela última vez
// (não é a mesma data de "atualizadoEm" das tarifas — são coisas diferentes:
// uma é sobre o TEXTO da política, outra é sobre os VALORES da calculadora).
export const ULTIMA_ATUALIZACAO_PRIVACIDADE = "2026-10-01";

export const TEXTOS_PRIVACIDADE = {
  pt: {
    tituloPagina: "Política de Privacidade",
    trilhaInicio: "Início",
    trilhaAtual: "Política de Privacidade",
    h1: "Política de Privacidade",
    ultimaAtualizacao: "Última atualização",
    indiceTitulo: "Nesta página",
    secoes: [
      {
        id: "resumo",
        titulo: "Resumo",
        lista: [
          "Não pedimos cadastro nem guardamos o que você digita na calculadora.",
          "Mostramos anúncios do Google AdSense, que podem usar cookies.",
          "Contamos visitas sem cookies, com o Cloudflare Web Analytics.",
        ],
      },
      {
        id: "anuncios",
        titulo: "Anúncios e cookies",
        texto:
          "Usamos o Google AdSense para mostrar anúncios. O Google e seus parceiros podem usar cookies para exibir anúncios com base nas suas visitas a este e a outros sites. Você pode ver e ajustar essas preferências nas Configurações de anúncios do Google, e consultar como o Google usa dados de sites parceiros na Política de Privacidade do Google. Quando os anúncios forem ativados, visitantes da União Europeia e do Reino Unido vão ver um aviso de consentimento antes de qualquer anúncio ser carregado.",
      },
      {
        id: "estatisticas",
        titulo: "Estatísticas de visita",
        texto:
          "Usamos o Cloudflare Web Analytics para contar visitas de forma agregada. Essa ferramenta não usa cookies e não identifica ninguém individualmente — só nos diz quantas pessoas visitaram o site e quais páginas foram mais acessadas.",
      },
      {
        id: "calculadora",
        titulo: "Dados da calculadora",
        texto:
          "A conta é feita inteiramente no seu navegador. Nenhum valor que você digita (potência, tempo de uso, tarifa) é enviado para nenhum servidor ou guardado em qualquer lugar.",
      },
      {
        id: "direitos",
        titulo: "Seus direitos",
        texto:
          "Como não coletamos dados pessoais diretamente, não há cadastro, conta ou histórico seu para acessar, corrigir ou apagar. Ainda assim, pela LGPD (Brasil) e pelo GDPR (União Europeia), você tem direito a pedir informações sobre como seus dados são tratados pelos serviços de terceiros usados aqui (Google AdSense e Cloudflare) — entre em contato se tiver dúvidas.",
      },
      {
        id: "contato",
        titulo: "Contato",
        textoComLink: true,
      },
    ],
    textoContatoAntes: "Dúvidas sobre privacidade: ",
    textoContatoLink: "página de contato",
    textoContatoDepois: ".",
  },
  en: {
    tituloPagina: "Privacy Policy",
    trilhaInicio: "Home",
    trilhaAtual: "Privacy Policy",
    h1: "Privacy Policy",
    ultimaAtualizacao: "Last updated",
    indiceTitulo: "On this page",
    secoes: [
      {
        id: "resumo",
        titulo: "Summary",
        lista: [
          "We don't require sign-up or store what you type into the calculator.",
          "We show Google AdSense ads, which may use cookies.",
          "We count visits without cookies, using Cloudflare Web Analytics.",
        ],
      },
      {
        id: "anuncios",
        titulo: "Ads and cookies",
        texto:
          "We use Google AdSense to show ads. Google and its partners may use cookies to serve ads based on your visits to this and other sites. You can view and adjust these preferences in Google's Ad Settings, and read how Google uses data from partner sites in Google's Privacy Policy. Once ads are activated, visitors from the European Union and the United Kingdom will see a consent notice before any ad is loaded.",
      },
      {
        id: "estatisticas",
        titulo: "Visit statistics",
        texto:
          "We use Cloudflare Web Analytics to count visits in aggregate. This tool doesn't use cookies and doesn't identify anyone individually — it only tells us how many people visited the site and which pages were viewed most.",
      },
      {
        id: "calculadora",
        titulo: "Calculator data",
        texto:
          "The calculation happens entirely in your browser. Nothing you type (power, usage time, rate) is ever sent to any server or stored anywhere.",
      },
      {
        id: "direitos",
        titulo: "Your rights",
        texto:
          "Since we don't collect personal data directly, there's no account or history of yours to access, correct, or delete. Still, under LGPD (Brazil) and GDPR (European Union), you have the right to ask how your data is handled by the third-party services used here (Google AdSense and Cloudflare) — reach out if you have questions.",
      },
      {
        id: "contato",
        titulo: "Contact",
        textoComLink: true,
      },
    ],
    textoContatoAntes: "Questions about privacy: ",
    textoContatoLink: "contact page",
    textoContatoDepois: ".",
  },
} satisfies Record<Idioma, unknown>;

type Props = {
  idioma: Idioma;
};

export default function PaginaPrivacidade({ idioma }: Props) {
  const t = TEXTOS_PRIVACIDADE[idioma];
  const slugContato = idioma === "pt" ? "contato" : "contact";

  const dataFormatada = new Intl.DateTimeFormat(
    idioma === "pt" ? "pt-BR" : "en-US",
    { timeZone: "UTC" },
  ).format(new Date(ULTIMA_ATUALIZACAO_PRIVACIDADE));

  return (
    <div className="flex min-h-screen flex-col">
      <Header idioma={idioma} />
      <main className="flex-1">
        <div className="mx-auto w-full max-w-280 px-4 pt-9 xs:px-6 md:px-8 md:pt-16">
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

          <h1 className="mt-3 font-heading text-[36px] leading-[1.08] font-semibold tracking-[-0.02em] text-foreground xs:text-[44px] md:text-[60px]">
            {t.h1}
          </h1>
          <span className="mt-2 block text-[14px] text-muted-foreground md:text-[15px]">
            {t.ultimaAtualizacao}: {dataFormatada}
          </span>
        </div>

        {/* Índice: vira <details> no celular, menu lateral fixo a partir do
            computador (lg) — mesma ideia do Tablet/Mobile.dc.html. */}
        <div className="mx-auto mt-8 grid w-full max-w-280 gap-10 px-4 pb-16 xs:px-6 md:px-8 md:pb-24 lg:grid-cols-12">
          <details className="col-span-full rounded-2xl border border-border bg-card px-4 lg:hidden">
            <summary className="flex min-h-12 cursor-pointer list-none items-center text-[15px] font-semibold text-foreground marker:content-none">
              {t.indiceTitulo}
            </summary>
            <div className="flex flex-col pb-2">
              {t.secoes.map((secao) => (
                <a
                  key={secao.id}
                  href={`#${secao.id}`}
                  className="flex min-h-10 items-center text-[15px] text-foreground no-underline"
                >
                  {secao.titulo}
                </a>
              ))}
            </div>
          </details>

          <nav
            aria-label={t.indiceTitulo}
            className="hidden flex-col gap-1 self-start border-l-2 border-border pl-4 lg:col-span-3 lg:flex"
          >
            <span className="mb-2 text-[13px] font-semibold tracking-wide text-muted-foreground uppercase">
              {t.indiceTitulo}
            </span>
            {t.secoes.map((secao) => (
              <a
                key={secao.id}
                href={`#${secao.id}`}
                className="flex min-h-9 items-center text-[15px] text-foreground no-underline"
              >
                {secao.titulo}
              </a>
            ))}
          </nav>

          <article className="flex flex-col gap-9 lg:col-span-8 lg:col-start-5">
            {t.secoes.map((secao) => (
              <div
                key={secao.id}
                id={secao.id}
                className={
                  secao.lista
                    ? "flex flex-col gap-3 rounded-2xl border border-border bg-card p-6 md:p-7"
                    : "flex flex-col gap-2.5"
                }
              >
                <h2 className="font-heading text-xl font-semibold text-foreground md:text-[26px]">
                  {secao.titulo}
                </h2>
                {secao.lista && (
                  <ul className="list-disc space-y-1.5 pl-5 text-[16px] leading-[1.65] text-texto-corpo md:text-[17px]">
                    {secao.lista.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
                {secao.texto && (
                  <p className="text-[16px] leading-[1.65] text-texto-corpo md:text-[17px]">
                    {secao.texto}
                  </p>
                )}
                {secao.textoComLink && (
                  <p className="text-[16px] leading-[1.65] text-texto-corpo md:text-[17px]">
                    {t.textoContatoAntes}
                    <Link
                      href={`/${idioma}/${slugContato}`}
                      className="underline hover:text-ambar-escuro"
                    >
                      {t.textoContatoLink}
                    </Link>
                    {t.textoContatoDepois}
                  </p>
                )}
              </div>
            ))}
          </article>
        </div>
      </main>
      <Footer idioma={idioma} />
    </div>
  );
}
