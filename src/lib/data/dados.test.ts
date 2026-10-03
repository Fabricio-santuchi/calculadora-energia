import { aparelhos } from "./aparelhos";
import { tarifas } from "./tarifas";

describe("aparelhos", () => {
  test.each(aparelhos)("$slugPt: dados válidos", (aparelho) => {
    expect(aparelho.potenciaWatts).toBeGreaterThan(0);
    expect(aparelho.potenciaWatts).toBeLessThanOrEqual(10000);

    expect(aparelho.nomeEn.trim().length).toBeGreaterThan(0);
    expect(aparelho.nomePt.trim().length).toBeGreaterThan(0);

    expect(aparelho.nomeCurtoPt.trim().length).toBeGreaterThan(0);
    expect(aparelho.rotuloPotenciaPt.trim().length).toBeGreaterThan(0);

    if (aparelho.idiomas.includes("en")) {
      expect(aparelho.nomeCurtoEn?.trim().length).toBeGreaterThan(0);
      expect(aparelho.rotuloPotenciaEn?.trim().length).toBeGreaterThan(0);
    } else {
      expect(aparelho.nomeCurtoEn).toBeUndefined();
      expect(aparelho.rotuloPotenciaEn).toBeUndefined();
    }

    expect(aparelho.idiomas.length).toBeGreaterThan(0);

    aparelho.atalhosPotencia.forEach((watts) => {
      expect(watts).toBeGreaterThan(0);
    });

    expect(aparelho.atalhosPotencia).toContain(aparelho.potenciaWatts);
  });

  describe("aparelhos em minutos", () => {
    test.each(aparelhos.filter((a) => a.unidadeTempo === "minutos"))(
      "$slugPt: atalhosTempo entre 1 e 1440",
      (aparelho) => {
        const tempos = aparelho.atalhosTempo ?? [];

        expect(tempos.length).toBeGreaterThan(0);

        tempos.forEach((min) => {
          expect(min).toBeGreaterThan(0);
          expect(min).toBeLessThanOrEqual(1440);
        });
      },
    );
  });
  describe("slugs", () => {
    test("slugEn únicos entre os aparelhos em inglês", () => {
      const slugs = aparelhos
        .filter((a) => a.idiomas.includes("en"))
        .map((a) => a.slugEn);
      expect(new Set(slugs).size).toBe(slugs.length);
    });

    test("slugPt únicos entre os aparelhos em português", () => {
      const slugs = aparelhos
        .filter((a) => a.idiomas.includes("pt"))
        .map((a) => a.slugPt);
      expect(new Set(slugs).size).toBe(slugs.length);
    });
  });
  describe("tarifas", () => {
    test.each(tarifas)("$nomePt: moeda ISO e valor válido", (tarifa) => {
      expect(tarifa.moeda).toMatch(/^[A-Z]{3}$/);
      expect(tarifa.valor).toBeGreaterThan(0);
    });

    test.each(tarifas)(
      "$nomePt: código, nomes, data e fonte válidos",
      (tarifa) => {
        expect(tarifa.codigo).toMatch(/^[A-Z]{2}$/);

        expect(tarifa.nomePt.trim().length).toBeGreaterThan(0);
        expect(tarifa.nomeEn.trim().length).toBeGreaterThan(0);

        expect(tarifa.atualizadoEm).toMatch(/^\d{4}-\d{2}-\d{2}$/);
        expect(Number.isNaN(Date.parse(tarifa.atualizadoEm))).toBe(false);

        expect(tarifa.fonte.nome.trim().length).toBeGreaterThan(0);
        expect(tarifa.fonte.url ?? "https://").toMatch(/^https:\/\//);
      },
    );

    test("nota, quando existe, tem texto nos dois idiomas", () => {
      tarifas
        .filter((t) => t.nota)
        .forEach((t) => {
          expect(t.nota!.pt.trim().length).toBeGreaterThan(0);
          expect(t.nota!.en.trim().length).toBeGreaterThan(0);
        });
    });

    test("México avisa que a tarifa é por faixas", () => {
      const mexico = tarifas.find((t) => t.codigo === "MX");
      expect(mexico?.nota).toBeDefined();
    });

    test("códigos únicos", () => {
      const codigos = tarifas.map((t) => t.codigo);
      expect(new Set(codigos).size).toBe(codigos.length);
    });
  });
});
