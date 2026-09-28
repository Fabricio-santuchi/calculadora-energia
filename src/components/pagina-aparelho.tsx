import Header from "@/components/header";
import Footer from "@/components/footer";
import Calculadora from "@/components/calculadora-form";
import TextoComNegrito from "@/components/texto-com-negrito";
import type { Aparelho } from "@/lib/data/aparelhos";
import type { Idioma } from "@/lib/numero";
import type { ConteudoAparelho } from "@/content/aparelhos";

type Props = {
  idioma: Idioma;
  aparelho: Aparelho;
  conteudo: ConteudoAparelho;
};

export default function PaginaAparelho({ idioma, aparelho, conteudo }: Props) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header idioma={idioma} ativo="aparelhos" />
      <main className="flex-1">
        <div className="flex flex-col items-center gap-8 bg-background px-4 py-12">
          {/* Único h1 da página: o título do aparelho. A calculadora usa h2. */}
          <h1 className="max-w-2xl text-center font-heading text-3xl font-semibold text-foreground md:text-4xl">
            {conteudo.tituloPagina}
          </h1>
          <Calculadora idioma={idioma} aparelho={aparelho} />
        </div>

        <article className="mx-auto max-w-2xl px-4 py-12">
          <div className="space-y-4 text-muted-foreground">
            {conteudo.textoApoio.map((paragrafo, indice) => (
              <p key={indice}>
                <TextoComNegrito texto={paragrafo} />
              </p>
            ))}
          </div>

          {conteudo.faq.length > 0 && (
            <>
              <h2 className="mt-10 text-2xl font-semibold text-foreground">
                {idioma === "pt"
                  ? "Perguntas frequentes"
                  : "Frequently asked questions"}
              </h2>

              <div className="mt-4 space-y-6">
                {conteudo.faq.map((item) => (
                  <div key={item.pergunta}>
                    <h3 className="font-medium text-foreground">
                      {item.pergunta}
                    </h3>
                    <p className="mt-1 text-muted-foreground">
                      <TextoComNegrito texto={item.resposta} />
                    </p>
                  </div>
                ))}
              </div>
            </>
          )}
        </article>
      </main>
      <Footer idioma={idioma} />
    </div>
  );
}
