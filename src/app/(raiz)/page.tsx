import type { Metadata } from "next";
import Link from "next/link";
import { NOME_DO_SITE, URL_BASE } from "@/lib/site";

export const metadata: Metadata = {
  title: `${NOME_DO_SITE} — Choose your language / Escolha o idioma`,
  description: "Calculate how much it costs to leave your appliances on.",
  alternates: {
    canonical: URL_BASE,
    languages: {
      en: `${URL_BASE}/en`,
      pt: `${URL_BASE}/pt`,
      "x-default": `${URL_BASE}/en`,
    },
  },
};

export default function EscolhaIdiomaPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-12 bg-background px-4 py-16 text-center xs:px-6 md:px-8">
      <div className="flex flex-col items-center gap-5">
        <span className="flex size-16 items-center justify-center rounded-[18px] bg-foreground text-primary">
          <svg
            viewBox="0 0 24 24"
            className="size-8.5"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.75}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8z" />
          </svg>
        </span>
        <span className="font-heading text-[28px] font-semibold text-foreground">
          {NOME_DO_SITE}
        </span>
        <h1 className="max-w-190 font-heading text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          How much does it cost to leave it on?
        </h1>
        <p className="text-lg text-muted-foreground">
          Quanto custa deixar ligado?
        </p>
      </div>

      <div className="grid w-full max-w-180 grid-cols-1 gap-5 sm:grid-cols-2">
        <Link
          href="/en"
          className="flex flex-col gap-2 rounded-[20px] border border-border bg-card p-7 text-left text-foreground no-underline hover:border-foreground hover:bg-accent"
        >
          <span className="font-mono text-sm text-muted-foreground">EN</span>
          <span className="text-2xl font-semibold">English</span>
          <span className="text-base text-muted-foreground">
            Energy cost calculator
          </span>
        </Link>
        <Link
          href="/pt"
          className="flex flex-col gap-2 rounded-[20px] border border-border bg-card p-7 text-left text-foreground no-underline hover:border-foreground hover:bg-accent"
        >
          <span className="font-mono text-sm text-muted-foreground">PT</span>
          <span className="text-2xl font-semibold">Português</span>
          <span className="text-base text-muted-foreground">
            Calculadora de custo de energia
          </span>
        </Link>
      </div>
    </main>
  );
}
