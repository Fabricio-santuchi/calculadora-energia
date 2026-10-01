import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { aparelhos } from "@/lib/data/aparelhos";
import type { Idioma } from "@/lib/numero";
import PaginaAparelho from "@/components/pagina-aparelho";
import { obterConteudo } from "@/content/aparelhos";
import { NOME_DO_SITE, URL_BASE } from "@/lib/site";

// Corta no último espaço antes do limite, pra não terminar no meio de uma
// palavra (ex: "...dedicated graphi" vira "...dedicated…").
function truncarNoEspaco(texto: string, limite: number): string {
  if (texto.length <= limite) return texto;
  const cortado = texto.slice(0, limite);
  const ultimoEspaco = cortado.lastIndexOf(" ");
  return `${cortado.slice(0, ultimoEspaco)}…`;
}

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/[aparelho]">): Promise<Metadata> {
  const { lang, aparelho: slug } = await params;
  const idioma: Idioma = lang === "pt" ? "pt" : "en";

  const aparelho = aparelhos.find((a) =>
    idioma === "pt" ? a.slugPt === slug : a.slugEn === slug,
  );
  const conteudo = aparelho && obterConteudo(idioma, aparelho.slugPt);
  if (!aparelho || !conteudo) return {};

  const titulo = `${conteudo.tituloPagina} | ${NOME_DO_SITE}`;

  // Tira os marcadores de negrito (**) — a descrição é texto puro, não html.
  const descricao = truncarNoEspaco(
    conteudo.textoApoio[0].replace(/\*\*/g, ""),
    155,
  );
  const url = `${URL_BASE}/${lang}/${slug}`;

  const languages: Record<string, string> = {};
  if (aparelho.idiomas.includes("en")) {
    languages.en = `${URL_BASE}/en/${aparelho.slugEn}`;
  }
  if (aparelho.idiomas.includes("pt")) {
    languages.pt = `${URL_BASE}/pt/${aparelho.slugPt}`;
  }

  return {
    title: titulo,
    description: descricao,
    alternates: {
      canonical: url,
      languages,
    },
    openGraph: {
      title: titulo,
      description: descricao,
      url,
      siteName: NOME_DO_SITE,
      locale: idioma === "pt" ? "pt_BR" : "en_US",
    },
  };
}

export function generateStaticParams() {
  return aparelhos.flatMap((aparelho) => {
    const entradas: { lang: "en" | "pt"; aparelho: string }[] = [];

    if (aparelho.idiomas.includes("en")) {
      entradas.push({ lang: "en", aparelho: aparelho.slugEn });
    }
    if (aparelho.idiomas.includes("pt")) {
      entradas.push({ lang: "pt", aparelho: aparelho.slugPt });
    }

    return entradas;
  });
}

export default async function AparelhoPage({
  params,
}: PageProps<"/[lang]/[aparelho]">) {
  const { lang, aparelho: slug } = await params;
  const idioma: Idioma = lang === "pt" ? "pt" : "en";

  const aparelho = aparelhos.find((a) =>
    idioma === "pt" ? a.slugPt === slug : a.slugEn === slug,
  );

  if (!aparelho) {
    notFound();
  }

  const conteudo = obterConteudo(idioma, aparelho.slugPt);
  if (!conteudo) {
    notFound();
  }

  return (
    <PaginaAparelho idioma={idioma} aparelho={aparelho} conteudo={conteudo} />
  );
}
