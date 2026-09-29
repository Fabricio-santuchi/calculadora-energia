import Link from "next/link";
import type { Idioma } from "@/lib/numero";
import { NOME_DO_SITE } from "@/lib/site";
import { aparelhos } from "@/lib/data/aparelhos";
import { APARELHOS_DESTAQUE } from "@/lib/aparelhos-destaque";

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
  const outroIdioma = idioma === "en" ? "pt" : "en";

  // Os mesmos 4 aparelhos em destaque do menu do celular (espec 3).
  const aparelhosRodape = APARELHOS_DESTAQUE[idioma]
    .map((slugPt) => aparelhos.find((a) => a.slugPt === slugPt))
    .filter((a) => a !== undefined);

  const linkClasseCompacta =
    "flex min-h-11 items-center text-background/70 no-underline";

  return (
    <footer className="flex justify-center bg-foreground text-background">
      <div className="flex w-full max-w-[1120px] flex-col gap-8 px-4 py-8 xs:gap-10 xs:px-6 xs:py-8 md:px-8 md:py-12 lg:flex-row lg:items-start lg:justify-between">
        {/* max-w só a partir de lg: no modo empilhado (celular até tablet)
            esse bloco precisa ocupar a largura toda, senão fica travado em
            360px, colado à esquerda com um vão vazio do lado direito — o
            max-w só faz sentido quando esse bloco fica ao lado das 3
            colunas (lg:flex-row), pra não esticar o texto largo demais. */}
        <div className="flex flex-col gap-2.5 lg:max-w-90">
          <span className="font-heading text-xl font-semibold text-background md:text-[22px]">
            {NOME_DO_SITE}
          </span>
          {/* A frase de apoio só aparece a partir de 480px (espec 3, celular
              mostra só nome + linha de links). */}
          <span className="hidden text-sm leading-relaxed text-background/80 xs:block">
            {t.tagline}
          </span>
          <span className="text-xs text-background/50">
            © {ano} {NOME_DO_SITE}
          </span>
        </div>

        {/* Celular e tela de 600: uma linha só que quebra, sem as 3 colunas
            (espec 3, "Celular", e a tabela 7b). */}
        <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm md:hidden">
          <Link href={`/${idioma}/sobre`} className={linkClasseCompacta}>
            {t.sobre}
          </Link>
          <Link href={`/${idioma}/contato`} className={linkClasseCompacta}>
            {t.contato}
          </Link>
          <Link href={`/${idioma}/privacidade`} className={linkClasseCompacta}>
            {t.privacidade}
          </Link>
          <Link href={`/${outroIdioma}`} className={linkClasseCompacta}>
            {outroIdioma === "pt" ? t.pt : t.en}
          </Link>
        </div>

        {/* Tablet e computador: as 3 colunas completas (espec 3 e 7b). */}
        <div className="hidden flex-wrap gap-12 text-sm md:flex">
          <div className="flex flex-col gap-2.5">
            <span className="font-semibold text-background">
              {t.aparelhos}
            </span>
            {aparelhosRodape.map((a) => {
              const slug = idioma === "pt" ? a.slugPt : a.slugEn;
              const nome = idioma === "pt" ? a.nomeCurtoPt : a.nomeCurtoEn;
              return (
                <Link
                  key={a.slugPt}
                  href={`/${idioma}/${slug}`}
                  className="text-background/70 no-underline"
                >
                  {nome}
                </Link>
              );
            })}
            <Link
              href={`/${idioma}#aparelhos`}
              className="text-background/70 no-underline"
            >
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
