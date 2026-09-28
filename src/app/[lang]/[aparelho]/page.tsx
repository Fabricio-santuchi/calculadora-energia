import { notFound } from "next/navigation";
import { aparelhos } from "@/lib/data/aparelhos";
import type { Idioma } from "@/lib/numero";
import PaginaAparelho from "@/components/pagina-aparelho";

export function generateStaticParams() {
  return aparelhos.flatMap((aparelho) => {
    const entradas: { lang: "en" | "pt"; aparelho: string }[] = [];

    if (aparelho.idiomas.includes("en")) {
      entradas.push({ lang: "en", aparelho: aparelho.slugEn });
    }
    if (aparelho.idiomas.includes("pt")) {
      entradas.push({ lang: "pt", aparelho: aparelho.slugPt });
    }

    return entradas;
  });
}

export default async function AparelhoPage({
  params,
}: PageProps<"/[lang]/[aparelho]">) {
  const { lang, aparelho: slug } = await params;
  const idioma: Idioma = lang === "pt" ? "pt" : "en";

  // TODO: achar, dentro de `aparelhos`, o aparelho cujo slug (slugPt se
  // idioma for "pt", slugEn se for "en") seja igual a `slug`.
  const aparelho = aparelhos.find((a) =>
    idioma === "pt" ? a.slugPt === slug : a.slugEn === slug,
  );

  // TODO: e se não achar nenhum (ex: /en/chuveiro, que não existe em
  // inglês, ou /en/coisa-que-nao-existe)? A função notFound(), importada
  // de "next/navigation", interrompe a renderização e mostra a 404.
  if (!aparelho) {
    notFound();
  }

  // TODO: trocar por texto/FAQ de verdade quando o arquivo de conteúdo
  // por aparelho/idioma existir (próximo passo da task 13).
  const conteudoPlaceholder = {
    textoApoio: [
      `Texto de apoio do "${idioma === "pt" ? aparelho.nomePt : aparelho.nomeEn}" ainda não foi escrito.`,
    ],
    faq: [],
  };

  return (
    <PaginaAparelho
      idioma={idioma}
      aparelho={aparelho}
      conteudo={conteudoPlaceholder}
    />
  );
}
