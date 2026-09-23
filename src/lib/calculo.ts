export function calcularCusto(
  potenciaWatts: number,
  horasPorDia: number,
  tarifaPorKwh: number,
): { custoDiario: number; custoMensal: number; custoAnual: number } {
  const energiaDiariaKwh = (potenciaWatts * horasPorDia) / 1000;
  const custoDiario = energiaDiariaKwh * tarifaPorKwh;
  const custoMensal = custoDiario * (365 / 12); // Média de dias no mês (365/12)
  const custoAnual = custoDiario * 365; // Considerando 365 dias no ano

  return {
    custoDiario,
    custoMensal,
    custoAnual,
  };
}
