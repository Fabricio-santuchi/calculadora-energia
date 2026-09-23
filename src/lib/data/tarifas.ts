export interface Tarifa {
  id: number;
  pais: string;
  moeda: string;
  valor: number;
  atualizadoEm: string;
}

export const tarifas: Tarifa[] = [
  {
    id: 1,
    pais: "EUA",
    moeda: "USD",
    valor: 0.16,
    atualizadoEm: "2026-09-23",
  },
  {
    id: 2,
    pais: "Reino Unido",
    moeda: "GBP",
    valor: 0.28,
    atualizadoEm: "2026-09-23",
  },
  {
    id: 3,
    pais: "Brasil",
    moeda: "BRL",
    valor: 0.75,
    atualizadoEm: "2026-09-23",
  },
  {
    id: 4,
    pais: "Canadá",
    moeda: "CAD",
    valor: 0.13,
    atualizadoEm: "2026-09-23",
  },
  {
    id: 5,
    pais: "Portugal",
    moeda: "EUR",
    valor: 0.24,
    atualizadoEm: "2026-09-23",
  },
  {
    id: 6,
    pais: "Alemanha",
    moeda: "EUR",
    valor: 0.4,
    atualizadoEm: "2026-09-23",
  },
  {
    id: 7,
    pais: "Austrália",
    moeda: "AUD",
    valor: 0.3,
    atualizadoEm: "2026-09-23",
  },
  {
    id: 8,
    pais: "México",
    moeda: "MXN",
    valor: 2.5,
    atualizadoEm: "2026-09-23",
  },
];
