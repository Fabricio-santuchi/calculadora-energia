export interface ResultadoCusto {
  custoDiario: number;
  custoMensal: number;
  custoAnual: number;
  kwhMensal: number;
  custoPorHora: number;
}

export function calcularCusto(
  potenciaWatts: number,
  horasPorDia: number,
  tarifaPorKwh: number,
): ResultadoCusto {
  const energiaDiariaKwh = (potenciaWatts * horasPorDia) / 1000;
  const custoDiario = energiaDiariaKwh * tarifaPorKwh;
  const custoMensal = custoDiario * (365 / 12); // Média de dias no mês (365/12)
  const custoAnual = custoDiario * 365; // Considerando 365 dias no ano
  const custoPorHora = (potenciaWatts / 1000) * tarifaPorKwh;
  const kwhMensal = energiaDiariaKwh * (365 / 12);
  return {
    custoDiario,
    custoMensal,
    custoAnual,
    custoPorHora,
    kwhMensal,
  };
}

export function minutosParaHoras(minutos: number): number {
  return minutos / 60;
}
