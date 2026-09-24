import { aparelhos } from "./aparelhos";
import { tarifas } from "./tarifas";

describe("aparelhos", () => {
  test.each(aparelhos)("$slugPt: dados válidos", (aparelho) => {
    expect(aparelho.potenciaWatts).toBeGreaterThan(0);
    expect(aparelho.potenciaWatts).toBeLessThanOrEqual(10000);

    // nomeEn e nomePt não vazios
    expect(aparelho.nomeEn.trim().length).toBeGreaterThan(0);
    expect(aparelho.nomePt.trim().length).toBeGreaterThan(0);

    // idiomas tem pelo menos 1 item
    expect(aparelho.idiomas.length).toBeGreaterThan(0);

    // atalhosPotencia: os 3 valores são maiores que 0
    aparelho.atalhosPotencia.forEach((watts) => {
      expect(watts).toBeGreaterThan(0);
    });

    // a potência padrão está entre os atalhos (dica: toContain)
    expect(aparelho.atalhosPotencia).toContain(aparelho.potenciaWatts);
  });

  describe("aparelhos em minutos", () => {
    test.each(aparelhos.filter((a) => a.unidadeTempo === "minutos"))(
      "$slugPt: atalhosTempo entre 1 e 1440",
      (aparelho) => {
        const tempos = aparelho.atalhosTempo ?? [];

        // existe e não está vazio
        expect(tempos.length).toBeGreaterThan(0);

        // cada valor fica entre 0 e 1440
        tempos.forEach((min) => {
          expect(min).toBeGreaterThan(0);
          expect(min).toBeLessThanOrEqual(1440);
        });
      },
    );
  });
  describe("slugs", () => {
    // slugEn únicos, só entre os aparelhos que têm "en" em idiomas
    // slugPt únicos, só entre os que têm "pt"
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
    test.each(tarifas)("$pais: moeda ISO e valor válido", (tarifa) => {
      // moeda com 3 letras maiúsculas (dica: toMatch com /^[A-Z]{3}$/)
      expect(tarifa.moeda).toMatch(/^[A-Z]{3}$/);

      // valor maior que 0
      expect(tarifa.valor).toBeGreaterThan(0);
    });
    // ids únicos
    test("ids únicos", () => {
      const ids = tarifas.map((t) => t.id);
      expect(new Set(ids).size).toBe(ids.length);
    });
  });
});
