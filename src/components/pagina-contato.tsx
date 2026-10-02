import Link from "next/link";
import { Mail } from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import type { Idioma } from "@/lib/numero";
import { EMAIL_CONTATO } from "@/lib/site";

export const TEXTOS_CONTATO = {
  pt: {
    tituloPagina: "Contato",
    trilhaInicio: "Início",
    trilhaAtual: "Contato",
    h1: "Fale com a gente",
    subtitulo:
      "Achou um valor errado, quer sugerir um aparelho ou tem alguma dúvida? Manda um e-mail.",
    rotuloEmail: "E-mail",
    cards: [
      {
        titulo: "Erro nos valores",
        texto: "Diga o país ou o aparelho e, se puder, a fonte certa.",
      },
      {
        titulo: "Novo aparelho",
        texto: "Qual aparelho você queria calcular e não achou.",
      },
    ],
  },
  en: {
    tituloPagina: "Contact",
    trilhaInicio: "Home",
    trilhaAtual: "Contact",
    h1: "Get in touch",
    subtitulo:
      "Found a wrong value, want to suggest an appliance, or just have a question? Send an email.",
    rotuloEmail: "Email",
    cards: [
      {
        titulo: "Wrong values",
        texto:
          "Tell us the country or appliance and, if you can, the right source.",
      },
      {
        titulo: "New appliance",
        texto: "Which appliance you wanted to calculate and couldn't find.",
      },
    ],
  },
} satisfies Record<Idioma, unknown>;

type Props = {
  idioma: Idioma;
};

export default function PaginaContato({ idioma }: Props) {
  const t = TEXTOS_CONTATO[idioma];

  return (
    <div className="flex min-h-screen flex-col">
      <Header idioma={idioma} />
      <main className="flex-1">
        <div className="mx-auto grid w-full max-w-280 gap-10 px-4 py-9 xs:px-6 md:px-8 md:py-16 lg:grid-cols-2 lg:items-start lg:gap-16">
          <div className="flex flex-col gap-5">
            <nav
              aria-label="Trilha"
              className="flex flex-wrap items-center gap-2 text-[13px] text-muted-foreground md:text-sm"
            >
              <Link
                href={`/${idioma}`}
                className="text-muted-foreground no-underline"
              >
                {t.trilhaInicio}
              </Link>
              <span aria-hidden="true">/</span>
              <span>{t.trilhaAtual}</span>
            </nav>

            <h1 className="font-heading text-[36px] leading-[1.08] font-semibold tracking-[-0.02em] text-foreground xs:text-[44px] md:text-[60px]">
              {t.h1}
            </h1>
            <p className="max-w-130 text-base text-muted-foreground md:text-[19px]">
              {t.subtitulo}
            </p>
          </div>

          <div className="min-w-0 flex flex-col gap-4 md:pt-11">
            <a
              href={`mailto:${EMAIL_CONTATO}`}
              className="flex min-w-0 items-center gap-3.5 rounded-2xl bg-foreground p-5 text-background no-underline md:gap-4.5 md:p-7"
            >
              <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-background/10 text-primary md:size-14">
                <Mail className="size-5 md:size-6" />
              </span>
              <span className="flex min-w-0 flex-col gap-0.5">
                <span className="text-[13px] text-background/70 md:text-sm">
                  {t.rotuloEmail}
                </span>
                <span className="min-w-0 wrap-break-word font-mono text-[15px] font-semibold md:text-[18px]">
                  {EMAIL_CONTATO}
                </span>
              </span>
            </a>
            <div className="grid grid-cols-1 gap-4 xs:grid-cols-2">
              {t.cards.map((card) => (
                <div
                  key={card.titulo}
                  className="flex flex-col gap-1.5 rounded-2xl border border-border bg-card p-4.5 md:p-5.5"
                >
                  <span className="text-[16px] font-semibold text-foreground md:text-[17px]">
                    {card.titulo}
                  </span>
                  <span className="text-[14px] leading-normal text-muted-foreground md:text-[15px]">
                    {card.texto}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer idioma={idioma} />
    </div>
  );
}
