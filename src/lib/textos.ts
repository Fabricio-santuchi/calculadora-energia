import type { Idioma } from "./numero";

interface Textos {
  pais: string;
  paisPlaceholder: string;
  potencia: string;
  tempoHoras: string;
  tempoMinutos: string;
  tarifa: string;
  tarifaAjuda: string;
  unidadeHoras: string;
  unidadeMinutos: string;
}

export const TEXTOS: Record<Idioma, Textos> = {
  pt: {
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
  },
  en: {
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
  },
};
