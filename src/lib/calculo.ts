export function calcularCusto(
  potenciaWatts: number,
  horasPorDia: number,
  tarifaPorKwh: number,
): { custoDiario: number; custoMensal: number; custoAnual: number } {
  const energiaDiariaKwh = (potenciaWatts * horasPorDia) / 1000;
  const custoDiario = energiaDiariaKwh * tarifaPorKwh;
  const custoMensal = custoDiario * 30; // Considerando 30 dias no mês
  const custoAnual = custoDiario * 365; // Considerando 365 dias no ano

  return {
    custoDiario,
    custoMensal,
    custoAnual,
  };
}
