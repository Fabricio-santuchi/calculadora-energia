import type { Idioma } from "./numero";
import type { UnidadeTempo } from "./schema";

interface Textos {
  titulo: string;
  subtitulo: string;
  porDia: string;
  porAno: string;
  kwhPorMes: string;
  pais: string;
  paisPlaceholder: string;
  potencia: string;
  tempoHoras: string;
  tempoMinutos: string;
  tarifa: string;
  tarifaAjuda: string;
  unidadeHoras: string;
  unidadeMinutos: string;
  mensal: string;
  preenchaOsCampos: string;
  porHora: string;
  porUso: (minutos: string) => string;
  porBanho: (minutos: string) => string;
  avisoEstimativa: string;
}

export const TEXTOS: Record<Idioma, Textos> = {
  pt: {
    titulo: "Calculadora de Custo de Energia",
    subtitulo: "Descubra quanto custa deixar o aparelho ligado.",
    porDia: "Por dia",
    porAno: "Por ano",
    kwhPorMes: "kWh por mês",
    pais: "País",
    paisPlaceholder: "Escolha um país",
    potencia: "Potência do aparelho",
    tempoHoras: "Horas ligado por dia",
    tempoMinutos: "Minutos de uso por dia",
    tarifa: "Preço da energia",
    tarifaAjuda:
      "Valor médio do país já preenchido. Troque pelo da sua conta de luz se quiser.",
    unidadeHoras: "h/dia",
    unidadeMinutos: "min/dia",
    mensal: "Por mês",
    preenchaOsCampos:
      "Preencha potência, tempo de uso e preço pra ver o custo.",
    porHora: "Por hora de uso",
    porUso: (minutos) => `Por uso de ${minutos} min`,
    porBanho: (minutos) => `Por banho de ${minutos} min`,
    avisoEstimativa:
      "Valores estimados. O custo real depende do aparelho e da sua tarifa.",
  },
  en: {
    titulo: "Energy Cost Calculator",
    subtitulo: "Find out how much it costs to leave your appliance on.",
    porDia: "Per day",
    porAno: "Per year",
    kwhPorMes: "kWh per month",
    pais: "Country",
    paisPlaceholder: "Choose a country",
    potencia: "Appliance power",
    tempoHoras: "Hours on per day",
    tempoMinutos: "Minutes of use per day",
    tarifa: "Energy price",
    tarifaAjuda:
      "The country's average price is already filled in. Replace it with the one from your electricity bill if you like.",
    unidadeHoras: "h/day",
    unidadeMinutos: "min/day",
    mensal: "Per month",
    preenchaOsCampos: "Fill in power, usage time, and price to see the cost.",
    porHora: "Per hour of use",
    porUso: (minutos) => `Per ${minutos}-min use`,
    porBanho: (minutos) => `Per ${minutos}-min shower`,
    avisoEstimativa:
      "Estimated values. Actual cost depends on the appliance and your tariff.",
  },
};

/**
 * Rótulo do custo "unitário" no painel de resultado:
 * - horas: "Por hora de uso"
 * - minutos: "Por uso de 5 min" ou, no chuveiro, "Por banho de 10 min".
 * `minutos` já vem formatado (ex.: "7,5"); vazio vira o rótulo genérico.
 */
export function rotuloCustoUnitario(
  idioma: Idioma,
  unidade: UnidadeTempo,
  minutos: string,
  ehBanho = false,
): string {
  const t = TEXTOS[idioma];
  if (unidade === "horas") return t.porHora;
  return ehBanho ? t.porBanho(minutos) : t.porUso(minutos);
}
