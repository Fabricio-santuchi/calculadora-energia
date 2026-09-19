export interface Tarifa {
  id: number;
  pais: string;
  moeda: string;
  valor: number;
}

export const tarifas: Tarifa[] = [
  {
    id: 1,
    pais: "EUA",
    moeda: "US$",
    valor: 0.16,
  },
  {
    id: 2,
    pais: "Reino Unido",
    moeda: "£",
    valor: 0.28,
  },
  {
    id: 3,
    pais: "Brasil",
    moeda: "R$",
    valor: 0.75,
  },
  {
    id: 4,
    pais: "Canadá",
    moeda: "CAD$",
    valor: 0.13,
  },
  {
    id: 5,
    pais: "Portugal",
    moeda: "€",
    valor: 0.24,
  },
  {
    id: 6,
    pais: "Alemanha",
    moeda: "€",
    valor: 0.4,
  },
  {
    id: 7,
    pais: "Austrália",
    moeda: "AUD$",
    valor: 0.3,
  },
  {
    id: 8,
    pais: "México",
    moeda: "MXN$",
    valor: 2.5,
  },
];
