import { aparelhos } from "@/lib/data/aparelhos";
import { obterConteudo } from "./index";

const IDIOMAS = ["pt", "en"] as const;

describe("conteúdo dos aparelhos", () => {
  test.each(aparelhos)("$slugPt: tem conteúdo em cada idioma da página", (aparelho) => {
    IDIOMAS.forEach((idioma) => {
      const conteudo = obterConteudo(idioma, aparelho.slugPt);

      if (!aparelho.idiomas.includes(idioma)) {
        // ex.: chuveiro não tem página em inglês, então não tem texto
        expect(conteudo).toBeUndefined();
        return;
      }

      expect(conteudo).toBeDefined();
      expect(conteudo!.tituloPagina.trim().length).toBeGreaterThan(0);
      expect(conteudo!.textoApoio.length).toBeGreaterThanOrEqual(3);
      expect(conteudo!.faq.length).toBeGreaterThanOrEqual(3);
      conteudo!.faq.forEach((item) => {
        expect(item.pergunta.trim()).toMatch(/\?$/);
        expect(item.resposta.trim().length).toBeGreaterThan(0);
      });
    });
  });

  test("títulos das páginas são todos diferentes", () => {
    const titulos = IDIOMAS.flatMap((idioma) =>
      aparelhos
        .map((a) => obterConteudo(idioma, a.slugPt)?.tituloPagina)
        .filter(Boolean),
    );
    expect(new Set(titulos).size).toBe(titulos.length);
  });
});
