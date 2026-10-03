import { aparelhos } from "@/lib/data/aparelhos";
import { obterConteudo } from "./index";

const IDIOMAS = ["pt", "en"] as const;

describe("conteúdo dos aparelhos", () => {
  test.each(aparelhos)("$slugPt: tem conteúdo em cada idioma da página", (aparelho) => {
    IDIOMAS.forEach((idioma) => {
      const conteudo = obterConteudo(idioma, aparelho.slugPt);

      if (!aparelho.idiomas.includes(idioma)) {
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

      expect(conteudo!.tituloTexto.trim().length).toBeGreaterThan(0);
      expect(conteudo!.tituloDicas.trim().length).toBeGreaterThan(0);
      expect(conteudo!.dicas.length).toBe(3);
      conteudo!.dicas.forEach((dica) => {
        expect(dica.titulo.trim().length).toBeGreaterThan(0);
        expect(dica.texto.trim().length).toBeGreaterThan(0);
      });

      // O parágrafo "Para gastar menos" virou as dicas — não pode sobrar
      // duplicado dentro de textoApoio.
      conteudo!.textoApoio.forEach((paragrafo) => {
        expect(paragrafo).not.toMatch(/\*\*(Para gastar menos|To spend less)/);
      });
    });
  });

  describe("campos opcionais da espec 5 (variações por aparelho)", () => {
    test("geladeira (pt e en): rótulo, explicação, nota de tempo e aviso próprios", () => {
      (["pt", "en"] as const).forEach((idioma) => {
        const conteudo = obterConteudo(idioma, "geladeira")!;
        expect(conteudo.rotuloPotencia?.trim().length).toBeGreaterThan(0);
        expect(conteudo.explicacao?.titulo.trim().length).toBeGreaterThan(0);
        expect(conteudo.explicacao?.texto.trim().length).toBeGreaterThan(0);
        expect(conteudo.notaTempo?.trim().length).toBeGreaterThan(0);
        expect(conteudo.avisoResultado?.trim().length).toBeGreaterThan(0);
      });
    });

    test("chuveiro (pt): rótulo de potência e notas próprios", () => {
      const conteudo = obterConteudo("pt", "chuveiro")!;
      expect(conteudo.rotuloPotencia).toBe("Potência do chuveiro");
      expect(conteudo.notaPotencia?.trim().length).toBeGreaterThan(0);
      expect(conteudo.notaTempo?.trim().length).toBeGreaterThan(0);
    });

    test("chaleira (pt e en): notas de potência e tempo", () => {
      (["pt", "en"] as const).forEach((idioma) => {
        const conteudo = obterConteudo(idioma, "chaleira")!;
        expect(conteudo.notaPotencia?.trim().length).toBeGreaterThan(0);
        expect(conteudo.notaTempo?.trim().length).toBeGreaterThan(0);
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
