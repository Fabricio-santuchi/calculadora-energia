import { criarCalculoSchema } from "./schema";

const horasPt = criarCalculoSchema("horas", "pt");
const minutosPt = criarCalculoSchema("minutos", "pt");
const horasEn = criarCalculoSchema("horas", "en");
const minutosEn = criarCalculoSchema("minutos", "en");

function mensagemDoCampo(
  schema: ReturnType<typeof criarCalculoSchema>,
  entrada: { potencia?: string; tempoPorDia?: string; tarifaPorKwh?: string },
  campo: "potencia" | "tempoPorDia" | "tarifaPorKwh",
) {
  const base = { potencia: "300", tempoPorDia: "8", tarifaPorKwh: "0,75" };
  const resultado = schema.safeParse({ ...base, ...entrada });
  if (resultado.success) return null;
  return (
    resultado.error.issues.find((i) => i.path[0] === campo)?.message ?? null
  );
}

describe("valores válidos", () => {
  test("converte texto com vírgula ou ponto em números", () => {
    const resultado = horasPt.safeParse({
      potencia: "300",
      tempoPorDia: "8",
      tarifaPorKwh: "0,75",
    });
    expect(resultado.success).toBe(true);
    if (resultado.success) {
      expect(resultado.data).toEqual({
        potencia: 300,
        tempoPorDia: 8,
        tarifaPorKwh: 0.75,
      });
    }
  });

  test("aceita o formato brasileiro com milhar (1.234,5)", () => {
    const resultado = horasPt.safeParse({
      potencia: "1.234,5",
      tempoPorDia: "7,5",
      tarifaPorKwh: "0.75",
    });
    expect(resultado.success).toBe(true);
    if (resultado.success) {
      expect(resultado.data.potencia).toBeCloseTo(1234.5);
      expect(resultado.data.tempoPorDia).toBeCloseTo(7.5);
    }
  });

  test.each([
    ["potencia no limite", { potencia: "10000" }],
    ["tempo zero", { tempoPorDia: "0" }],
    ["24 horas", { tempoPorDia: "24" }],
    ["potência pequena", { potencia: "0,5" }],
  ])("%s passa", (_nome, entrada) => {
    expect(
      horasPt.safeParse({
        potencia: "300",
        tempoPorDia: "8",
        tarifaPorKwh: "0,75",
        ...entrada,
      }).success,
    ).toBe(true);
  });

  test("minutos: 1440 passa e 10 passa", () => {
    for (const tempo of ["10", "1440"]) {
      expect(
        minutosPt.safeParse({
          potencia: "5500",
          tempoPorDia: tempo,
          tarifaPorKwh: "0,75",
        }).success,
      ).toBe(true);
    }
  });
});

describe("campo vazio ou inválido nunca passa", () => {
  test.each([
    ["potencia", ""],
    ["potencia", "   "],
    ["potencia", "abc"],
    ["potencia", "300W"],
    ["tempoPorDia", ""],
    ["tempoPorDia", "abc"],
    ["tarifaPorKwh", ""],
    ["tarifaPorKwh", "R$ 0,75"],
  ] as const)("%s = %j dá erro de número", (campo, valor) => {
    expect(mensagemDoCampo(horasPt, { [campo]: valor }, campo)).toBe(
      "Digite um número válido.",
    );
  });

  test("campo ausente também falha", () => {
    const resultado = horasPt.safeParse({});
    expect(resultado.success).toBe(false);
    if (!resultado.success) {
      expect(resultado.error.issues).toHaveLength(3);
    }
  });
});

describe("limites", () => {
  test.each([
    ["potencia", "0"],
    ["potencia", "-5"],
    ["tarifaPorKwh", "0"],
    ["tarifaPorKwh", "-0,5"],
  ] as const)("%s = %s: deve ser maior que zero", (campo, valor) => {
    expect(mensagemDoCampo(horasPt, { [campo]: valor }, campo)).toBe(
      "Deve ser maior que zero.",
    );
  });

  test("potência acima de 10000 W", () => {
    expect(mensagemDoCampo(horasPt, { potencia: "10001" }, "potencia")).toBe(
      "O máximo é 10000 W.",
    );
  });

  test("tarifa acima de 99999", () => {
    expect(
      mensagemDoCampo(horasPt, { tarifaPorKwh: "100000" }, "tarifaPorKwh"),
    ).toBe("O máximo é 99999.");
  });

  test("tarifa no limite (99999) passa", () => {
    expect(
      horasPt.safeParse({
        potencia: "300",
        tempoPorDia: "8",
        tarifaPorKwh: "99999",
      }).success,
    ).toBe(true);
  });

  test("tempo negativo", () => {
    expect(mensagemDoCampo(horasPt, { tempoPorDia: "-1" }, "tempoPorDia")).toBe(
      "Não pode ser negativo.",
    );
  });

  test("horas: acima de 24 falha e a mensagem diz horas", () => {
    expect(mensagemDoCampo(horasPt, { tempoPorDia: "25" }, "tempoPorDia")).toBe(
      "O máximo é 24 horas.",
    );
  });

  test("minutos: acima de 1440 falha e a mensagem diz minutos", () => {
    expect(
      mensagemDoCampo(minutosPt, { tempoPorDia: "1441" }, "tempoPorDia"),
    ).toBe("O máximo é 1440 minutos.");
  });

  test("os mesmos 25 são válidos em minutos (o limite depende da unidade)", () => {
    expect(mensagemDoCampo(minutosPt, { tempoPorDia: "25" }, "tempoPorDia")).toBe(
      null,
    );
  });
});

describe("mensagens em inglês", () => {
  test("não é número", () => {
    expect(mensagemDoCampo(horasEn, { potencia: "abc" }, "potencia")).toBe(
      "Enter a valid number.",
    );
  });

  test("maior que zero", () => {
    expect(mensagemDoCampo(horasEn, { tarifaPorKwh: "0" }, "tarifaPorKwh")).toBe(
      "Must be greater than zero.",
    );
  });

  test("tempo negativo", () => {
    expect(mensagemDoCampo(horasEn, { tempoPorDia: "-1" }, "tempoPorDia")).toBe(
      "Cannot be negative.",
    );
  });

  test("máximo em horas e em minutos", () => {
    expect(mensagemDoCampo(horasEn, { tempoPorDia: "30" }, "tempoPorDia")).toBe(
      "The maximum is 24 hours.",
    );
    expect(
      mensagemDoCampo(minutosEn, { tempoPorDia: "2000" }, "tempoPorDia"),
    ).toBe("The maximum is 1440 minutes.");
  });
});
