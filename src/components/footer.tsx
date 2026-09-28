import Link from "next/link";
import type { Idioma } from "@/lib/numero";
import { NOME_DO_SITE } from "@/lib/site";

type Props = {
  idioma: Idioma;
};

const TEXTOS_FOOTER: Record<
  Idioma,
  {
    tagline: string;
    aparelhos: string;
    verTodos: string;
    site: string;
    sobre: string;
    contato: string;
    privacidade: string;
    idioma: string;
    pt: string;
    en: string;
  }
> = {
  pt: {
    tagline: "Calculadoras de consumo de energia por aparelho. Os valores são estimativas.",
    aparelhos: "Aparelhos",
    verTodos: "Ver todos",
    site: "Site",
    sobre: "Sobre",
    contato: "Contato",
    privacidade: "Política de Privacidade",
    idioma: "Idioma",
    pt: "Português",
    en: "English",
  },
  en: {
    tagline:
      "Energy consumption calculators by appliance. Values are estimates.",
    aparelhos: "Appliances",
    verTodos: "See all",
    site: "Site",
    sobre: "About",
    contato: "Contact",
    privacidade: "Privacy Policy",
    idioma: "Language",
    pt: "Português",
    en: "English",
  },
};

export default function Footer({ idioma }: Props) {
  const t = TEXTOS_FOOTER[idioma];
  const ano = new Date().getFullYear();

  return (
    <footer className="flex justify-center bg-foreground text-background">
      <div className="grid w-full max-w-[1120px] grid-cols-1 gap-10 px-4 py-12 sm:grid-cols-[1fr_auto]">
        <div className="flex max-w-[360px] flex-col gap-2.5">
          <span className="font-heading text-[22px] font-semibold text-background">
            {NOME_DO_SITE}
          </span>
          <span className="text-sm leading-relaxed text-background/80">
            {t.tagline}
          </span>
          <span className="text-xs text-background/50">
            © {ano} {NOME_DO_SITE}
          </span>
        </div>

        <div className="flex flex-wrap gap-12 text-sm">
          <div className="flex flex-col gap-2.5">
            <span className="font-semibold text-background">
              {t.aparelhos}
            </span>
            <Link href={`/${idioma}`} className="text-background/70 no-underline">
              {t.verTodos}
            </Link>
          </div>
          <div className="flex flex-col gap-2.5">
            <span className="font-semibold text-background">{t.site}</span>
            <Link
              href={`/${idioma}/sobre`}
              className="text-background/70 no-underline"
            >
              {t.sobre}
            </Link>
            <Link
              href={`/${idioma}/contato`}
              className="text-background/70 no-underline"
            >
              {t.contato}
            </Link>
            <Link
              href={`/${idioma}/privacidade`}
              className="text-background/70 no-underline"
            >
              {t.privacidade}
            </Link>
          </div>
          <div className="flex flex-col gap-2.5">
            <span className="font-semibold text-background">{t.idioma}</span>
            <Link href="/pt" className="text-background/70 no-underline">
              {t.pt}
            </Link>
            <Link href="/en" className="text-background/70 no-underline">
              {t.en}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
