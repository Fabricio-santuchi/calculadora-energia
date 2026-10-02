import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PaginaSobre, { TEXTOS_SOBRE } from "@/components/pagina-sobre";
import { NOME_DO_SITE, URL_BASE } from "@/lib/site";

// Só gera /pt/sobre — sem isso, o layout [lang] geraria /en/sobre também
// (ele sempre monta os dois idiomas), e aí o notFound() lá embaixo cairia
// numa tela de erro genérica do Next em vez da nossa 404 (isso só funciona
// bem pra rota que nunca foi construída, não pra uma que foi e "recusou").
export function generateStaticParams() {
  return [{ lang: "pt" }];
}

export async function generateMetadata(): Promise<Metadata> {
  const t = TEXTOS_SOBRE.pt;
  const url = `${URL_BASE}/pt/sobre`;

  return {
    title: `${t.tituloPagina} | ${NOME_DO_SITE}`,
    description: t.subtitulo,
    alternates: {
      canonical: url,
      languages: {
        en: `${URL_BASE}/en/about`,
        pt: url,
        "x-default": `${URL_BASE}/en/about`,
      },
    },
    openGraph: {
      title: `${t.tituloPagina} | ${NOME_DO_SITE}`,
      description: t.subtitulo,
      url,
      siteName: NOME_DO_SITE,
      locale: "pt_BR",
    },
  };
}

export default async function SobrePage({
  params,
}: PageProps<"/[lang]/sobre">) {
  const { lang } = await params;
  if (lang !== "pt") {
    notFound();
  }

  return <PaginaSobre idioma="pt" />;
}
