import CalculadoraGenerica from "@/components/calculadora-generica";
import Header from "@/components/header";
import Footer from "@/components/footer";
import type { Idioma } from "@/lib/numero";
import { TEXTOS_INICIO } from "@/lib/textos";

export default async function LangHomePage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  const idioma: Idioma = lang === "pt" ? "pt" : "en";
  const t = TEXTOS_INICIO[idioma];

  return (
    <div className="flex min-h-screen flex-col">
      <Header idioma={idioma} ativo="aparelhos" />
      <main className="flex-1">
        <section className="mx-auto grid w-full max-w-[1120px] items-center gap-14 px-4 py-16 md:grid-cols-2">
          <div className="flex flex-col gap-5">
            <span className="flex w-fit items-center gap-2 rounded-full bg-accent px-3.5 py-1.5 text-sm font-semibold text-accent-foreground">
              {t.selo}
            </span>

            <h1 className="font-heading text-5xl font-semibold leading-tight text-foreground">
              {t.titulo}
            </h1>

            <p className="text-lg text-muted-foreground">{t.subtitulo}</p>

            <div className="flex gap-3">
              <a
                href="#calc"
                className="flex h-[52px] items-center rounded-xl bg-foreground px-5 font-semibold text-background no-underline"
              >
                {t.botaoCalcular}
              </a>
              <a
                href="#aparelhos"
                className="flex h-[52px] items-center rounded-xl border border-foreground px-5 font-semibold text-foreground no-underline"
              >
                {t.botaoAparelhos}
              </a>
            </div>
          </div>

          <div id="calc">
            <CalculadoraGenerica idioma={idioma} />
          </div>
        </section>

        <section className="mx-auto mt-4 grid w-full max-w-[1120px] gap-4 px-4 py-16 md:grid-cols-3">
          {t.passos.map((passo, indice) => (
            <div
              key={passo.titulo}
              className="flex gap-4 border-t-2 border-foreground p-6"
            >
              <span className="font-mono text-3xl font-semibold text-[#8A5A00]">
                {String(indice + 1).padStart(2, "0")}
              </span>
              <div className="flex flex-col gap-1.5">
                <h3 className="text-lg font-semibold text-foreground">
                  {passo.titulo}
                </h3>
                <p className="text-muted-foreground">{passo.texto}</p>
              </div>
            </div>
          ))}
        </section>
      </main>
      <Footer idioma={idioma} />
    </div>
  );
}
