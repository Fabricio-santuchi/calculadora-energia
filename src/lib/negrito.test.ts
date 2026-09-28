import { dividirNegrito } from "./negrito";

describe("dividirNegrito", () => {
  test("texto sem asteriscos vira um trecho normal", () => {
    expect(dividirNegrito("oi")).toEqual([{ texto: "oi", negrito: false }]);
  });

  test("marca o trecho entre ** como negrito", () => {
    expect(dividirNegrito("custa **R$ 1,47 por dia** hoje")).toEqual([
      { texto: "custa ", negrito: false },
      { texto: "R$ 1,47 por dia", negrito: true },
      { texto: " hoje", negrito: false },
    ]);
  });

  test("negrito no começo não cria trecho vazio", () => {
    expect(dividirNegrito("**Dica:** desligue")).toEqual([
      { texto: "Dica:", negrito: true },
      { texto: " desligue", negrito: false },
    ]);
  });

  test("** sem par fica como texto normal", () => {
    expect(dividirNegrito("a ** b")).toEqual([
      { texto: "a ** b", negrito: false },
    ]);
  });
});
