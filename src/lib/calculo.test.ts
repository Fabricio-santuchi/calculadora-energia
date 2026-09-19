import { calcularCusto } from "./calculo";

test("calcula custo diário, mensal e anual para um caso normal", () => {
  const resultado = calcularCusto(300, 8, 0.75);
  expect(resultado.custoDiario).toBeCloseTo(1.8);
  expect(resultado.custoMensal).toBeCloseTo(54);
  expect(resultado.custoAnual).toBeCloseTo(657);
});

test("calcula custo zero quando a potência é zero", () => {
  const resultado = calcularCusto(0, 8, 0.75);
  expect(resultado.custoDiario).toBeCloseTo(0);
  expect(resultado.custoMensal).toBeCloseTo(0);
  expect(resultado.custoAnual).toBeCloseTo(0);
});

test("aplica a fórmula normalmente quando a potência é negativa (validação fica a cargo do Zod)", () => {
  const resultado = calcularCusto(-300, 8, 0.75);
  expect(resultado.custoDiario).toBeCloseTo(-1.8);
});
