import { detectarPaisPeloIdiomaDoNavegador } from "./pais";

describe("detectarPaisPeloIdiomaDoNavegador", () => {
  test.each([
    ["en-GB", "GB"],
    ["pt-BR", "BR"],
    ["en-US", "US"],
    ["de-DE", "DE"],
    ["pt-PT", "PT"],
    ["en-AU", "AU"],
    ["en-CA", "CA"],
    ["es-MX", "MX"],
  ])("%s detecta %s", (tag, esperado) => {
    expect(detectarPaisPeloIdiomaDoNavegador(tag)).toBe(esperado);
  });

  test.each([
    ["fr-FR"], // país fora da nossa lista de 8
    ["en"], // sem região nenhuma
    [""],
    [undefined],
  ])("%j não encontra país (null)", (tag) => {
    expect(detectarPaisPeloIdiomaDoNavegador(tag)).toBeNull();
  });

  test("é maiúsculo/minúsculo indiferente na região", () => {
    expect(detectarPaisPeloIdiomaDoNavegador("en-gb")).toBe("GB");
  });
});
