import { formatarMoeda, parseNumero } from "./numero";

const normalizarEspacos = (texto: string) => texto.replace(/\s/g, " ");

describe("parseNumero", () => {
  test.each([
    ["0,75", 0.75],
    ["0.75", 0.75],
    ["1.234,5", 1234.5],
    ["1234,5", 1234.5],
    ["300", 300],
    [" 2,5 ", 2.5],
    ["0", 0],
  ])("%j vira %d", (texto, esperado) => {
    expect(parseNumero(texto)).toBeCloseTo(esperado, 6);
  });

  test.each([[""], ["   "], ["abc"], ["12abc"], ["1,5,2"], ["1.2.3"]])(
    "%j é inválido (null)",
    (texto) => {
      expect(parseNumero(texto)).toBeNull();
    },
  );

  test("não converte campo vazio em zero", () => {
    expect(parseNumero("")).not.toBe(0);
  });

  test("deixa número negativo passar (quem barra é o Zod)", () => {
    expect(parseNumero("-5")).toBe(-5);
  });
});

describe("formatarMoeda", () => {
  test("português, real: R$ 1,80", () => {
    expect(normalizarEspacos(formatarMoeda(1.8, "BRL", "pt"))).toBe("R$ 1,80");
  });

  test("português usa ponto no milhar e vírgula nos centavos", () => {
    expect(normalizarEspacos(formatarMoeda(1234.56, "BRL", "pt"))).toBe(
      "R$ 1.234,56",
    );
  });

  test("inglês, dólar: $1,234.56", () => {
    expect(formatarMoeda(1234.56, "USD", "en")).toBe("$1,234.56");
  });

  test("a moeda não depende do idioma: real em inglês", () => {
    expect(formatarMoeda(1.8, "BRL", "en")).toBe("R$1.80");
  });

  test("zero aparece como 0,00", () => {
    expect(normalizarEspacos(formatarMoeda(0, "BRL", "pt"))).toBe("R$ 0,00");
  });
});
