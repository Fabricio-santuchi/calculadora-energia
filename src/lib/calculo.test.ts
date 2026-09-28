import { calcularCusto, calcularCustoPorUso, minutosParaHoras } from "./calculo";

describe("calcularCusto", () => {
  test("caso conhecido: PC de 300 W, 8 h por dia, tarifa 0,75", () => {
    const resultado = calcularCusto(300, 8, 0.75);
    expect(resultado.custoPorHora).toBeCloseTo(0.225, 4);
    expect(resultado.custoDiario).toBeCloseTo(1.8, 4);
    expect(resultado.custoMensal).toBeCloseTo(54.75, 4);
    expect(resultado.custoAnual).toBeCloseTo(657, 4);
    expect(resultado.kwhMensal).toBeCloseTo(73, 4);
  });

  test("aceita horas decimais: 300 W, 7,5 h, tarifa 0,75", () => {
    const resultado = calcularCusto(300, 7.5, 0.75);
    expect(resultado.custoDiario).toBeCloseTo(1.6875, 4);
    expect(resultado.custoMensal).toBeCloseTo(51.3281, 4);
    expect(resultado.custoAnual).toBeCloseTo(615.9375, 4);
    expect(resultado.kwhMensal).toBeCloseTo(68.4375, 4);
  });

  test("potência zero: tudo custa zero", () => {
    const resultado = calcularCusto(0, 8, 0.75);
    expect(resultado.custoPorHora).toBe(0);
    expect(resultado.custoDiario).toBe(0);
    expect(resultado.custoMensal).toBe(0);
    expect(resultado.custoAnual).toBe(0);
    expect(resultado.kwhMensal).toBe(0);
  });

  test("zero horas: nada por dia, mas o custo por hora de uso continua", () => {
    const resultado = calcularCusto(300, 0, 0.75);
    expect(resultado.custoPorHora).toBeCloseTo(0.225, 4);
    expect(resultado.custoDiario).toBe(0);
    expect(resultado.custoMensal).toBe(0);
    expect(resultado.custoAnual).toBe(0);
    expect(resultado.kwhMensal).toBe(0);
  });

  test("aplica a fórmula normalmente quando a potência é negativa (validação fica a cargo do Zod)", () => {
    const resultado = calcularCusto(-300, 8, 0.75);
    expect(resultado.custoDiario).toBeCloseTo(-1.8, 4);
  });
});

describe("minutosParaHoras", () => {
  test.each([
    [0, 0],
    [10, 0.1667],
    [30, 0.5],
    [60, 1],
    [90, 1.5],
    [1440, 24],
  ])("%d min = %d h", (minutos, horas) => {
    expect(minutosParaHoras(minutos)).toBeCloseTo(horas, 4);
  });
});

describe("aparelho em minutos", () => {
  test("chuveiro: 5500 W, 10 min por dia, tarifa 0,75", () => {
    const resultado = calcularCusto(5500, minutosParaHoras(10), 0.75);
    expect(resultado.custoDiario).toBeCloseTo(0.6875, 4);
    expect(resultado.custoMensal).toBeCloseTo(20.91, 2);
    expect(resultado.custoAnual).toBeCloseTo(250.94, 2);
  });
});

describe("calcularCustoPorUso", () => {
  test("um banho de 10 min num chuveiro de 5500 W a 1,05/kWh", () => {
    expect(calcularCustoPorUso(5500, 10, 1.05)).toBeCloseTo(0.9625);
  });

  test("chaleira de 2000 W por 5 min a 0,18/kWh", () => {
    expect(calcularCustoPorUso(2000, 5, 0.18)).toBeCloseTo(0.03);
  });

  test("0 minutos custa 0", () => {
    expect(calcularCustoPorUso(5500, 0, 1.05)).toBe(0);
  });
});
