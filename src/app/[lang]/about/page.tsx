import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PaginaSobre, { TEXTOS_SOBRE } from "@/components/pagina-sobre";
import {
  imagemCompartilhamento,
  NOME_DO_SITE,
  URL_BASE,
} from "@/lib/site";

// Só gera /en/about — mesmo motivo do sobre/page.tsx.
export function generateStaticParams() {
  return [{ lang: "en" }];
}

export async function generateMetadata(): Promise<Metadata> {
  const t = TEXTOS_SOBRE.en;
  const url = `${URL_BASE}/en/about`;

  return {
    title: `${t.tituloPagina} | ${NOME_DO_SITE}`,
    description: t.subtitulo,
    alternates: {
      canonical: url,
      languages: {
        en: url,
        pt: `${URL_BASE}/pt/sobre`,
        "x-default": `${URL_BASE}/en/about`,
      },
    },
    openGraph: {
      title: `${t.tituloPagina} | ${NOME_DO_SITE}`,
      description: t.subtitulo,
      url,
      siteName: NOME_DO_SITE,
      locale: "en_US",
      images: imagemCompartilhamento("en"),
    },
  };
}

export default async function AboutPage({
  params,
}: PageProps<"/[lang]/about">) {
  const { lang } = await params;
  if (lang !== "en") {
    notFound();
  }

  return <PaginaSobre idioma="en" />;
}
