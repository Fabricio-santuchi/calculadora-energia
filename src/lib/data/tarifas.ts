export interface FonteTarifa {
  nome: string;
  url?: string;
}
export interface Tarifa {
  codigo: string;
  nomePt: string;
  nomeEn: string;
  moeda: string;
  valor: number;
  atualizadoEm: string;
  fonte: FonteTarifa;
}

export const tarifas: Tarifa[] = [
  {
    codigo: "US",
    nomePt: "EUA",
    nomeEn: "USA",
    moeda: "USD",
    valor: 0.16,
    atualizadoEm: "2026-09-23",
    fonte: { nome: "EIA", url: "https://www.eia.gov" },
  },
  {
    codigo: "GB",
    nomePt: "Reino Unido",
    nomeEn: "United Kingdom",
    moeda: "GBP",
    valor: 0.28,
    atualizadoEm: "2026-09-23",
    fonte: { nome: "Ofgem", url: "https://www.ofgem.gov.uk" },
  },
  {
    codigo: "BR",
    nomePt: "Brasil",
    nomeEn: "Brazil",
    moeda: "BRL",
    valor: 0.75,
    atualizadoEm: "2026-09-23",
    fonte: { nome: "ANEEL", url: "https://www.gov.br/aneel" },
  },
  {
    codigo: "CA",
    nomePt: "Canadá",
    nomeEn: "Canada",
    moeda: "CAD",
    valor: 0.13,
    atualizadoEm: "2026-09-23",
    fonte: { nome: "A conferir" },
  },
  {
    codigo: "PT",
    nomePt: "Portugal",
    nomeEn: "Portugal",
    moeda: "EUR",
    valor: 0.24,
    atualizadoEm: "2026-09-23",
    fonte: { nome: "Eurostat", url: "https://ec.europa.eu/eurostat" },
  },
  {
    codigo: "DE",
    nomePt: "Alemanha",
    nomeEn: "Germany",
    moeda: "EUR",
    valor: 0.4,
    atualizadoEm: "2026-09-23",
    fonte: { nome: "Eurostat", url: "https://ec.europa.eu/eurostat" },
  },
  {
    codigo: "AU",
    nomePt: "Austrália",
    nomeEn: "Australia",
    moeda: "AUD",
    valor: 0.3,
    atualizadoEm: "2026-09-23",
    fonte: { nome: "A conferir" },
  },
  {
    codigo: "MX",
    nomePt: "México",
    nomeEn: "Mexico",
    moeda: "MXN",
    valor: 2.5,
    atualizadoEm: "2026-09-23",
    fonte: { nome: "A conferir" },
  },
];
