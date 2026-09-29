import type { Metadata } from "next";
import Link from "next/link";
import { fraunces, plexSans, plexMono } from "./fonts";
import { NOME_DO_SITE } from "@/lib/site";
import "./globals.css";

// Página especial: bypassa os layouts normais (por isso importa fontes e
// CSS global na mão), então serve pra QUALQUER rota que não exista, em
// qualquer um dos dois layouts raiz do site. Sem saber o idioma de quem
// visitou, o texto vem nos dois.
export const metadata: Metadata = {
  title: `404 | ${NOME_DO_SITE}`,
  description: "Page not found / Página não encontrada.",
};

export default function GlobalNotFound() {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${plexSans.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background font-sans text-foreground">
        <main className="mx-auto flex w-full max-w-[1120px] flex-1 items-center px-4 py-16 xs:px-6 md:px-8">
          <div className="grid w-full items-center gap-12 md:grid-cols-2">
            <div className="flex h-[300px] flex-col items-center justify-center gap-3 rounded-[24px] bg-foreground md:h-[420px]">
              <span className="font-mono text-8xl font-semibold tracking-tight text-[#F2B53A] md:text-[160px]">
                404
              </span>
              <span className="font-mono text-lg text-background/60">
                0,00 kWh · 0 W
              </span>
            </div>

            <div className="flex flex-col gap-5">
              <h1 className="font-heading text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
                This page is switched off
              </h1>
              <p className="text-muted-foreground">
                Página não encontrada. O endereço não existe ou mudou.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/en"
                  className="flex h-[52px] items-center rounded-xl bg-foreground px-5 font-semibold text-background no-underline"
                >
                  Go to English site
                </Link>
                <Link
                  href="/pt"
                  className="flex h-[52px] items-center rounded-xl border border-foreground px-5 font-semibold text-foreground no-underline"
                >
                  Ir para o site em português
                </Link>
              </div>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
