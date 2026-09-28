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
  /** Aviso mostrado embaixo do campo de preço quando esse país está escolhido. */
  nota?: { pt: string; en: string };
}

export const tarifas: Tarifa[] = [
  {
    codigo: "US",
    nomePt: "EUA",
    nomeEn: "USA",
    moeda: "USD",
    valor: 0.18,
    atualizadoEm: "2026-09-28",
    fonte: { nome: "EIA", url: "https://www.eia.gov" },
  },
  {
    codigo: "GB",
    nomePt: "Reino Unido",
    nomeEn: "United Kingdom",
    moeda: "GBP",
    valor: 0.26,
    atualizadoEm: "2026-09-28",
    fonte: { nome: "Ofgem", url: "https://www.ofgem.gov.uk" },
  },
  {
    codigo: "BR",
    nomePt: "Brasil",
    nomeEn: "Brazil",
    moeda: "BRL",
    valor: 1.05,
    atualizadoEm: "2026-09-28",
    fonte: {
      nome: "ANEEL (média com impostos, estimativa)",
      url: "https://www.gov.br/aneel",
    },
  },
  {
    codigo: "CA",
    nomePt: "Canadá",
    nomeEn: "Canada",
    moeda: "CAD",
    valor: 0.17,
    atualizadoEm: "2026-09-28",
    fonte: {
      nome: "GlobalPetrolPrices (com impostos)",
      url: "https://www.globalpetrolprices.com",
    },
  },
  {
    codigo: "PT",
    nomePt: "Portugal",
    nomeEn: "Portugal",
    moeda: "EUR",
    valor: 0.24,
    atualizadoEm: "2026-09-28",
    fonte: { nome: "Eurostat", url: "https://ec.europa.eu/eurostat" },
  },
  {
    codigo: "DE",
    nomePt: "Alemanha",
    nomeEn: "Germany",
    moeda: "EUR",
    valor: 0.39,
    atualizadoEm: "2026-09-28",
    fonte: { nome: "Eurostat", url: "https://ec.europa.eu/eurostat" },
  },
  {
    codigo: "AU",
    nomePt: "Austrália",
    nomeEn: "Australia",
    moeda: "AUD",
    valor: 0.3,
    atualizadoEm: "2026-09-28",
    fonte: { nome: "Média nacional estimada (30–35 c/kWh)" },
  },
  {
    codigo: "MX",
    nomePt: "México",
    nomeEn: "Mexico",
    moeda: "MXN",
    valor: 1.37,
    atualizadoEm: "2026-09-28",
    fonte: { nome: "CFE (faixa intermediária)", url: "https://www.cfe.mx" },
    nota: {
      pt: "No México a tarifa residencial é por faixas de consumo: quanto mais você gasta, mais caro fica o kWh. Este valor é uma média estimada.",
      en: "In Mexico, residential rates are tiered: the more you use, the more each kWh costs. This value is an estimated average.",
    },
  },
];
