"use client";

import { useState } from "react";
import Link from "next/link";
import { Globe, Menu, X } from "lucide-react";
import type { Idioma } from "@/lib/numero";
import { NOME_DO_SITE } from "@/lib/site";

type Props = {
  idioma: Idioma;
  ativo?: "aparelhos" | "sobre";
};

const TEXTOS_HEADER: Record<Idioma, { aparelhos: string; sobre: string }> = {
  pt: { aparelhos: "Aparelhos", sobre: "Sobre" },
  en: { aparelhos: "Appliances", sobre: "About" },
};

export default function Header({ idioma, ativo }: Props) {
  const [menuAberto, setMenuAberto] = useState(false);
  const t = TEXTOS_HEADER[idioma];
  const outroIdioma = idioma === "en" ? "pt" : "en";

  const linkClasse = (item: "aparelhos" | "sobre") =>
    `flex h-11 items-center rounded-[10px] px-3.5 text-sm font-medium text-foreground ${
      ativo === item ? "bg-accent font-semibold" : ""
    }`;

  return (
    <header className="flex h-[73px] items-center justify-center border-b border-border bg-background">
      <div className="flex w-full max-w-[1120px] items-center justify-between px-4">
        <Link
          href={`/${idioma}`}
          className="flex items-center gap-2.5 text-foreground no-underline"
        >
          <span className="flex size-9 items-center justify-center rounded-[10px] bg-foreground text-primary">
            <svg
              viewBox="0 0 24 24"
              className="size-[22px]"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.75}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8z" />
            </svg>
          </span>
          <span className="font-heading text-[22px] font-semibold">
            {NOME_DO_SITE}
          </span>
        </Link>

        <nav
          aria-label="Principal"
          className="hidden items-center gap-2 md:flex"
        >
          <Link href={`/${idioma}`} className={linkClasse("aparelhos")}>
            {t.aparelhos}
          </Link>
          <Link href={`/${idioma}/sobre`} className={linkClasse("sobre")}>
            {t.sobre}
          </Link>
          <Link
            href={`/${outroIdioma}`}
            className="ml-4 flex h-10 items-center gap-1.5 rounded-full border border-border px-3.5 text-sm text-foreground no-underline"
          >
            <Globe className="size-[18px]" />
            PT · EN
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setMenuAberto(true)}
          className="flex h-11 w-11 items-center justify-center md:hidden"
          aria-label="Abrir menu"
        >
          <Menu className="size-6" />
        </button>
      </div>

      {menuAberto && (
        <div className="fixed inset-0 z-50 flex flex-col bg-background p-4 md:hidden">
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setMenuAberto(false)}
              className="flex h-11 w-11 items-center justify-center"
              aria-label="Fechar menu"
            >
              <X className="size-6" />
            </button>
          </div>
          <nav
            aria-label="Principal"
            className="mt-6 flex flex-col items-stretch gap-2"
          >
            <Link href={`/${idioma}`} className={linkClasse("aparelhos")}>
              {t.aparelhos}
            </Link>
            <Link href={`/${idioma}/sobre`} className={linkClasse("sobre")}>
              {t.sobre}
            </Link>
            <Link
              href={`/${outroIdioma}`}
              className="flex h-11 items-center gap-1.5 rounded-full border border-border px-3.5 text-sm text-foreground no-underline"
            >
              <Globe className="size-[18px]" />
              PT · EN
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
