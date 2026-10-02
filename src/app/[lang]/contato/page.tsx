import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PaginaContato, { TEXTOS_CONTATO } from "@/components/pagina-contato";
import { NOME_DO_SITE, URL_BASE } from "@/lib/site";

// Só gera /pt/contato (ver sobre/page.tsx pro motivo completo).
export function generateStaticParams() {
  return [{ lang: "pt" }];
}

export async function generateMetadata(): Promise<Metadata> {
  const t = TEXTOS_CONTATO.pt;
  const url = `${URL_BASE}/pt/contato`;

  return {
    title: `${t.tituloPagina} | ${NOME_DO_SITE}`,
    description: t.subtitulo,
    alternates: {
      canonical: url,
      languages: {
        en: `${URL_BASE}/en/contact`,
        pt: url,
        "x-default": `${URL_BASE}/en/contact`,
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

export default async function ContatoPage({
  params,
}: PageProps<"/[lang]/contato">) {
  const { lang } = await params;
  if (lang !== "pt") {
    notFound();
  }

  return <PaginaContato idioma="pt" />;
}
