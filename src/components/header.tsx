"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import type { Idioma } from "@/lib/numero";
import { NOME_DO_SITE } from "@/lib/site";
import { aparelhos } from "@/lib/data/aparelhos";
import { APARELHOS_DESTAQUE } from "@/lib/aparelhos-destaque";

type Props = {
  idioma: Idioma;
  ativo?: "aparelhos" | "sobre";
};

const TEXTOS_HEADER: Record<
  Idioma,
  { aparelhos: string; sobre: string; site: string; verTodos: string }
> = {
  pt: {
    aparelhos: "Aparelhos",
    sobre: "Sobre",
    site: "Site",
    verTodos: "Ver todos os aparelhos",
  },
  en: {
    aparelhos: "Appliances",
    sobre: "About",
    site: "Site",
    verTodos: "See all appliances",
  },
};

const TEXTOS_MENU: Record<
  Idioma,
  { contato: string; privacidade: string }
> = {
  pt: { contato: "Contato", privacidade: "Política de Privacidade" },
  en: { contato: "Contact", privacidade: "Privacy Policy" },
};

const ROTULO: Record<Idioma, string> = { pt: "PT", en: "EN" };
const NOME_IDIOMA: Record<Idioma, string> = { pt: "Português", en: "English" };

export default function Header({ idioma, ativo }: Props) {
  const [menuAberto, setMenuAberto] = useState(false);
  const t = TEXTOS_HEADER[idioma];
  const tMenu = TEXTOS_MENU[idioma];
  const outroIdioma = idioma === "en" ? "pt" : "en";

  // O idioma atual sempre vem primeiro (esquerda); o outro, depois (direita).
  const idiomasEmOrdem: Idioma[] = [idioma, outroIdioma];

  const linkClasse = (item: "aparelhos" | "sobre") =>
    `flex h-11 items-center rounded-[10px] px-3.5 text-sm font-medium text-foreground ${
      ativo === item ? "bg-accent font-semibold" : ""
    }`;

  const seletorIdioma = (
    <div className="ml-4 flex h-10 items-center gap-1 rounded-full border border-border px-1 text-sm">
      {idiomasEmOrdem.map((codigo) =>
        codigo === idioma ? (
          <span
            key={codigo}
            aria-current="page"
            className={`flex h-8 items-center rounded-full bg-accent px-3 font-semibold text-foreground ${
              codigo === "pt" ? "vt-idioma-pt" : "vt-idioma-en"
            }`}
          >
            {ROTULO[codigo]}
          </span>
        ) : (
          // <a> normal, não <Link> do Next: precisa ser uma navegação de
          // documento de verdade pra View Transition (cross-document) disparar.
          // O <Link> intercepta o clique e troca por JS, sem recarregar —
          // e sem recarregar, a API de transição nunca entra em ação.
          <a
            key={codigo}
            href={`/${codigo}`}
            className={`flex h-8 items-center rounded-full px-3 text-foreground no-underline ${
              codigo === "pt" ? "vt-idioma-pt" : "vt-idioma-en"
            }`}
          >
            {ROTULO[codigo]}
          </a>
        ),
      )}
    </div>
  );

  // Os mesmos 4 aparelhos em destaque do rodapé (espec 3 e MobileMenu.dc.html).
  const aparelhosMenu = APARELHOS_DESTAQUE[idioma]
    .map((slugPt) => aparelhos.find((a) => a.slugPt === slugPt))
    .filter((a) => a !== undefined);

  return (
    <header className="flex h-[60px] items-center justify-center border-b border-border bg-background xs:h-16 md:h-[73px]">
      <div className="flex w-full max-w-[1120px] items-center justify-between px-4 xs:px-6 md:px-8">
        <Link
          href={`/${idioma}`}
          className="flex items-center gap-2.5 text-foreground no-underline"
        >
          <span className="flex size-8 items-center justify-center rounded-[9px] bg-foreground text-primary xs:size-[34px] md:size-9 md:rounded-[10px]">
            <svg
              viewBox="0 0 24 24"
              className="size-[18px] xs:size-5 md:size-[22px]"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.75}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8z" />
            </svg>
          </span>
          <span className="font-heading text-[19px] font-semibold xs:text-xl md:text-[22px]">
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
          {seletorIdioma}
        </nav>

        <button
          type="button"
          onClick={() => setMenuAberto(true)}
          className="flex size-11 items-center justify-center rounded-xl border border-border bg-card md:hidden"
          aria-label="Abrir menu"
        >
          <Menu className="size-6" />
        </button>
      </div>

      {/* Menu do celular (MobileMenu.dc.html): fundo escuro, os 4 aparelhos
          em destaque, e o idioma vira 2 botões embaixo em vez da pilulazinha
          (que só existe na barra de cima, escondida no celular). */}
      {menuAberto && (
        <div className="fixed inset-0 z-50 flex flex-col bg-foreground text-background md:hidden">
          <div className="flex h-[60px] items-center justify-between border-b border-escuro-borda px-4 xs:px-6">
            <Link
              href={`/${idioma}`}
              className="flex items-center gap-2 text-background no-underline"
              onClick={() => setMenuAberto(false)}
            >
              <span className="flex size-8 items-center justify-center rounded-[9px] bg-primary text-foreground">
                <svg
                  viewBox="0 0 24 24"
                  className="size-[18px]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.75}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8z" />
                </svg>
              </span>
              <span className="font-heading text-[19px] font-semibold">
                {NOME_DO_SITE}
              </span>
            </Link>
            <button
              type="button"
              onClick={() => setMenuAberto(false)}
              className="flex size-11 items-center justify-center rounded-xl border border-escuro-borda"
              aria-label="Fechar menu"
            >
              <X className="size-[22px]" />
            </button>
          </div>

          <nav aria-label="Menu" className="flex flex-col px-4 py-6 xs:px-6">
            <span className="mb-2 text-xs font-semibold tracking-widest text-escuro-apagado uppercase">
              {t.aparelhos}
            </span>
            {aparelhosMenu.map((a) => {
              const slug = idioma === "pt" ? a.slugPt : a.slugEn;
              const nome = idioma === "pt" ? a.nomeCurtoPt : a.nomeCurtoEn;
              const rotuloPotencia =
                idioma === "pt" ? a.rotuloPotenciaPt : a.rotuloPotenciaEn;

              return (
                <Link
                  key={a.slugPt}
                  href={`/${idioma}/${slug}`}
                  onClick={() => setMenuAberto(false)}
                  className="flex min-h-[52px] items-center justify-between border-b border-escuro-borda text-lg text-background no-underline"
                >
                  <span>{nome}</span>
                  <span className="font-mono text-sm text-escuro-texto">
                    {rotuloPotencia}
                  </span>
                </Link>
              );
            })}
            <Link
              href={`/${idioma}#aparelhos`}
              onClick={() => setMenuAberto(false)}
              className="flex min-h-[52px] items-center gap-2 font-semibold text-[#F2B53A] no-underline"
            >
              {t.verTodos}
            </Link>

            <span className="mt-7 mb-2 text-xs font-semibold tracking-widest text-escuro-apagado uppercase">
              {t.site}
            </span>
            <Link
              href={`/${idioma}/sobre`}
              onClick={() => setMenuAberto(false)}
              className="flex min-h-[52px] items-center border-b border-escuro-borda text-lg text-background no-underline"
            >
              {t.sobre}
            </Link>
            <Link
              href={`/${idioma}/contato`}
              onClick={() => setMenuAberto(false)}
              className="flex min-h-[52px] items-center border-b border-escuro-borda text-lg text-background no-underline"
            >
              {tMenu.contato}
            </Link>
            <Link
              href={`/${idioma}/privacidade`}
              onClick={() => setMenuAberto(false)}
              className="flex min-h-[52px] items-center text-lg text-background no-underline"
            >
              {tMenu.privacidade}
            </Link>
          </nav>

          <div className="mt-auto grid grid-cols-2 gap-2.5 p-4">
            {idiomasEmOrdem.map((codigo) =>
              codigo === idioma ? (
                <span
                  key={codigo}
                  aria-current="page"
                  className="flex min-h-12 items-center justify-center rounded-xl bg-background font-semibold text-foreground"
                >
                  {NOME_IDIOMA[codigo]}
                </span>
              ) : (
                // <a> normal (mesmo motivo do seletor de cima): precisa de
                // navegação de documento de verdade pra animar a troca.
                <a
                  key={codigo}
                  href={`/${codigo}`}
                  className="flex min-h-12 items-center justify-center rounded-xl border border-escuro-borda font-semibold text-background no-underline"
                >
                  {NOME_IDIOMA[codigo]}
                </a>
              ),
            )}
          </div>
        </div>
      )}
    </header>
  );
}
