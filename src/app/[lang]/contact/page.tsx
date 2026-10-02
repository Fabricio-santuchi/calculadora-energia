import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PaginaContato, { TEXTOS_CONTATO } from "@/components/pagina-contato";
import {
  imagemCompartilhamento,
  NOME_DO_SITE,
  URL_BASE,
} from "@/lib/site";

// Só gera /en/contact (ver sobre/page.tsx pro motivo completo).
export function generateStaticParams() {
  return [{ lang: "en" }];
}

export async function generateMetadata(): Promise<Metadata> {
  const t = TEXTOS_CONTATO.en;
  const url = `${URL_BASE}/en/contact`;

  return {
    title: `${t.tituloPagina} | ${NOME_DO_SITE}`,
    description: t.subtitulo,
    alternates: {
      canonical: url,
      languages: {
        en: url,
        pt: `${URL_BASE}/pt/contato`,
        "x-default": `${URL_BASE}/en/contact`,
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

export default async function ContactPage({
  params,
}: PageProps<"/[lang]/contact">) {
  const { lang } = await params;
  if (lang !== "en") {
    notFound();
  }

  return <PaginaContato idioma="en" />;
}
