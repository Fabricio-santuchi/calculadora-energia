import { rotuloCustoUnitario, TEXTOS } from "./textos";

describe("rotuloCustoUnitario", () => {
  test("horas: por hora de uso", () => {
    expect(rotuloCustoUnitario("pt", "horas", "4")).toBe(TEXTOS.pt.porHora);
    expect(rotuloCustoUnitario("en", "horas", "4")).toBe(TEXTOS.en.porHora);
  });

  test("minutos: por uso de N min", () => {
    expect(rotuloCustoUnitario("pt", "minutos", "5")).toBe("Por uso de 5 min");
    expect(rotuloCustoUnitario("en", "minutos", "5")).toBe("Per 5-min use");
  });

  test("chuveiro: por banho de N min", () => {
    expect(rotuloCustoUnitario("pt", "minutos", "10", true)).toBe(
      "Por banho de 10 min",
    );
  });
});
