import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PaginaPrivacidade, {
  TEXTOS_PRIVACIDADE,
} from "@/components/pagina-privacidade";
import { NOME_DO_SITE, URL_BASE } from "@/lib/site";

// Só gera /en/privacy (ver sobre/page.tsx pro motivo completo).
export function generateStaticParams() {
  return [{ lang: "en" }];
}

export async function generateMetadata(): Promise<Metadata> {
  const t = TEXTOS_PRIVACIDADE.en;
  const url = `${URL_BASE}/en/privacy`;
  const descricao = "How WattCheck handles ads, cookies, and visit data.";

  return {
    title: `${t.tituloPagina} | ${NOME_DO_SITE}`,
    description: descricao,
    alternates: {
      canonical: url,
      languages: {
        en: url,
        pt: `${URL_BASE}/pt/privacidade`,
        "x-default": `${URL_BASE}/en/privacy`,
      },
    },
    openGraph: {
      title: `${t.tituloPagina} | ${NOME_DO_SITE}`,
      description: descricao,
      url,
      siteName: NOME_DO_SITE,
      locale: "en_US",
    },
  };
}

export default async function PrivacyPage({
  params,
}: PageProps<"/[lang]/privacy">) {
  const { lang } = await params;
  if (lang !== "en") {
    notFound();
  }

  return <PaginaPrivacidade idioma="en" />;
}
