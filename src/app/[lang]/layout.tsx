import type { Metadata } from "next";
import { fraunces, plexSans, plexMono } from "../fonts";
import { NOME_DO_SITE } from "@/lib/site";
import "../globals.css";

export function generateStaticParams() {
  return [{ lang: "en" }, { lang: "pt" }];
}

export const metadata: Metadata = {
  title: NOME_DO_SITE,
  description: "Calculate how much it costs to leave your appliances on.",
  // Liga a View Transitions API entre páginas (documento inteiro): sem isso,
  // o navegador nem tenta animar a troca de /pt pra /en.
  other: { "view-transition": "same-origin" },
};

export default async function LangLayout({
  children,
  params,
}: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  const htmlLang = lang === "pt" ? "pt-BR" : "en";

  return (
    <html
      lang={htmlLang}
      className={`${fraunces.variable} ${plexSans.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
