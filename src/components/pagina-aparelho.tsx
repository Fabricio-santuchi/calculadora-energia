import Header from "@/components/header";
import Footer from "@/components/footer";
import Calculadora from "@/components/calculadora-form";
import type { Aparelho } from "@/lib/data/aparelhos";
import type { Idioma } from "@/lib/numero";

export interface ConteudoAparelho {
  textoApoio: string[]; // cada item do array é um parágrafo
  faq: { pergunta: string; resposta: string }[];
}

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
        <div className="flex justify-center bg-background px-4 py-12">
          <Calculadora idioma={idioma} aparelho={aparelho} />
        </div>

        <article className="mx-auto max-w-2xl px-4 py-12">
          <div className="space-y-4 text-muted-foreground">
            {conteudo.textoApoio.map((paragrafo, indice) => (
              <p key={indice}>{paragrafo}</p>
            ))}
          </div>

          <h2 className="mt-10 text-2xl font-semibold text-foreground">
            {idioma === "pt" ? "Perguntas frequentes" : "Frequently asked questions"}
          </h2>

          <div className="mt-4 space-y-6">
            {conteudo.faq.map((item) => (
              <div key={item.pergunta}>
                <h3 className="font-medium text-foreground">{item.pergunta}</h3>
                <p className="mt-1 text-muted-foreground">{item.resposta}</p>
              </div>
            ))}
          </div>
        </article>
      </main>
      <Footer idioma={idioma} />
    </div>
  );
}
