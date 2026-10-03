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
  const custoMensal = custoDiario * (365 / 12);
  const custoAnual = custoDiario * 365;
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

/**
 * Custo de UM uso de um aparelho medido em minutos (ex.: um banho de 10 min).
 * potência (kW) × tempo (h) × tarifa.
 */
export function calcularCustoPorUso(
  potenciaWatts: number,
  minutosPorUso: number,
  tarifaPorKwh: number,
): number {
  return (potenciaWatts / 1000) * minutosParaHoras(minutosPorUso) * tarifaPorKwh;
}
