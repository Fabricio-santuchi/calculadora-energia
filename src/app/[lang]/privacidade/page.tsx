import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PaginaPrivacidade, {
  TEXTOS_PRIVACIDADE,
} from "@/components/pagina-privacidade";
import { NOME_DO_SITE, URL_BASE } from "@/lib/site";

// Só gera /pt/privacidade (ver sobre/page.tsx pro motivo completo).
export function generateStaticParams() {
  return [{ lang: "pt" }];
}

export async function generateMetadata(): Promise<Metadata> {
  const t = TEXTOS_PRIVACIDADE.pt;
  const url = `${URL_BASE}/pt/privacidade`;
  const descricao =
    "Como o WattCheck lida com anúncios, cookies e dados de visita.";

  return {
    title: `${t.tituloPagina} | ${NOME_DO_SITE}`,
    description: descricao,
    alternates: {
      canonical: url,
      languages: {
        en: `${URL_BASE}/en/privacy`,
        pt: url,
        "x-default": `${URL_BASE}/en/privacy`,
      },
    },
    openGraph: {
      title: `${t.tituloPagina} | ${NOME_DO_SITE}`,
      description: descricao,
      url,
      siteName: NOME_DO_SITE,
      locale: "pt_BR",
    },
  };
}

export default async function PrivacidadePage({
  params,
}: PageProps<"/[lang]/privacidade">) {
  const { lang } = await params;
  if (lang !== "pt") {
    notFound();
  }

  return <PaginaPrivacidade idioma="pt" />;
}
