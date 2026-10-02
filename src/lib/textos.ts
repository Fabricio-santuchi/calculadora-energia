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

interface PassoComoFunciona {
  titulo: string;
  texto: string;
}

interface TextosInicio {
  selo: string;
  titulo: string;
  subtitulo: string;
  botaoCalcular: string;
  botaoAparelhos: string;
  aparelhoLabel: string;
  aparelhoOutro: string;
  /** Rótulos curtos da calculadora compacta (espec 6.1) — a de aparelho
   * usa os rótulos longos de TEXTOS; a inicial tem os dela, mais curtos. */
  /** Rótulos curtos da calculadora da inicial: a unidade fica no rótulo,
   * não dentro do campo, pra sobrar espaço pro número no celular. */
  potenciaCurta: string;
  horasPorDia: string;
  precoKwh: (simboloMoeda: string) => string;
  porHora: string;
  passos: PassoComoFunciona[];
  aparelhosTitulo: string;
  aparelhosSubtitulo: string;
  tarifasTitulo: string;
  tarifasTexto: string;
  tarifasAtualizadoEm: (data: string) => string;
  /** Linha compacta do resultado no celular (espec 6.1): "Dia R$ … · Ano R$ …". */
  diaAnoResumo: (dia: string, ano: string) => string;
}

export const TEXTOS_INICIO: Record<Idioma, TextosInicio> = {
  pt: {
    selo: "Grátis, sem cadastro",
    titulo: "Quanto custa deixar seus aparelhos ligados?",
    subtitulo:
      "Descubra o gasto de qualquer aparelho por dia, mês e ano, com o preço da energia do seu país.",
    botaoCalcular: "Calcular agora",
    botaoAparelhos: "Escolher aparelho",
    aparelhoLabel: "Aparelho",
    aparelhoOutro: "Outro / personalizado",
    potenciaCurta: "Potência (W)",
    horasPorDia: "Horas/dia",
    precoKwh: (simbolo) => `${simbolo} por kWh`,
    porHora: "Por hora",
    passos: [
      {
        titulo: "Escolha o aparelho",
        texto:
          "A potência típica já vem preenchida. Se souber a do seu, é só trocar.",
      },
      {
        titulo: "Diga quanto tempo usa",
        texto: "Quantas horas por dia ele fica ligado, em média.",
      },
      {
        titulo: "Veja o custo",
        texto: "Por dia, por mês e por ano, com a tarifa do seu país.",
      },
    ],
    aparelhosTitulo: "Escolha um aparelho",
    aparelhosSubtitulo:
      "Cada um tem sua página com calculadora, dicas e perguntas frequentes.",
    tarifasTitulo: "De onde vem o preço da energia?",
    tarifasTexto:
      "Usamos a tarifa média de cada país, de fontes oficiais, e mostramos a data da última atualização. Se a sua conta tiver outro valor, é só trocar no campo.",
    tarifasAtualizadoEm: (data) => `Valores por kWh · atualizados em ${data}`,
    diaAnoResumo: (dia, ano) => `Dia ${dia} · Ano ${ano}`,
  },
  en: {
    selo: "Free, no sign-up",
    titulo: "How much does it cost to leave your appliances on?",
    subtitulo:
      "Find out how much any appliance costs per day, month, and year, using your country's energy price.",
    botaoCalcular: "Calculate now",
    botaoAparelhos: "Choose an appliance",
    aparelhoLabel: "Appliance",
    aparelhoOutro: "Other / custom",
    potenciaCurta: "Power (W)",
    horasPorDia: "Hours/day",
    precoKwh: (simbolo) => `${simbolo} per kWh`,
    porHora: "Per hour",
    passos: [
      {
        titulo: "Choose the appliance",
        texto:
          "The typical wattage is already filled in. If you know yours, just change it.",
      },
      {
        titulo: "Say how long you use it",
        texto: "How many hours a day it's on, on average.",
      },
      {
        titulo: "See the cost",
        texto: "Per day, per month, and per year, using your country's rate.",
      },
    ],
    aparelhosTitulo: "Choose an appliance",
    aparelhosSubtitulo:
      "Each one has its own page with a calculator, tips, and frequently asked questions.",
    tarifasTitulo: "Where does the energy price come from?",
    tarifasTexto:
      "We use each country's average tariff from official sources, and show the date of the last update. If your bill shows a different value, just change it in the field.",
    tarifasAtualizadoEm: (data) => `Values per kWh · updated on ${data}`,
    diaAnoResumo: (dia, ano) => `Day ${dia} · Year ${ano}`,
  },
};

interface TextosAparelho {
  trilhaInicio: string;
  trilhaAparelhos: string;
  /** Subtítulo do topo (espec 4.1), varia por unidadeTempo do aparelho. */
  subtitulo: Record<UnidadeTempo, string>;
  resultado: string;
  consumoPorMes: string;
  barraLimite: string;
  tarifaFonte: (fonte: string, data: string) => string;
  outrosAparelhosTitulo: string;
  outrosAparelhosFrase: string;
  verTodosAparelhos: string;
  faqTitulo: string;
  comoContaFeita: string;
  /** 3 linhas da fórmula (espec 4.6), varia por unidadeTempo. */
  formula: Record<UnidadeTempo, [string, string, string]>;
}

export const TEXTOS_APARELHO: Record<Idioma, TextosAparelho> = {
  pt: {
    trilhaInicio: "Início",
    trilhaAparelhos: "Aparelhos",
    subtitulo: {
      horas:
        "Coloque a potência, quantas horas por dia ele fica ligado e o preço da energia. A conta aparece na hora, por dia, por mês e por ano.",
      minutos:
        "Coloque a potência, quantos minutos por dia você usa e o preço da energia. A conta aparece na hora, por uso, por dia, por mês e por ano.",
    },
    resultado: "RESULTADO",
    consumoPorMes: "Consumo por mês",
    barraLimite: "300 kWh",
    tarifaFonte: (fonte, data) => ` Tarifa: ${fonte}, atualizada em ${data}.`,
    outrosAparelhosTitulo: "Calcule outros aparelhos",
    outrosAparelhosFrase: "A potência típica de cada um já vem preenchida",
    verTodosAparelhos: "Ver todos os aparelhos",
    faqTitulo: "Perguntas frequentes",
    comoContaFeita: "Como a conta é feita",
    formula: {
      horas: [
        "custo por dia = (watts ÷ 1000) × horas × preço do kWh",
        "por mês = por dia × 30,4",
        "por ano = por dia × 365",
      ],
      minutos: [
        "custo por uso = (watts ÷ 1000) × (minutos ÷ 60) × preço do kWh",
        "por mês = por dia × 30,4",
        "por ano = por dia × 365",
      ],
    },
  },
  en: {
    trilhaInicio: "Home",
    trilhaAparelhos: "Appliances",
    subtitulo: {
      horas:
        "Enter the power, how many hours a day it's on and your electricity price. The cost shows up instantly, per day, month and year.",
      minutos:
        "Enter the power, how many minutes a day you use it and your electricity price. The cost shows up instantly, per use, day, month and year.",
    },
    resultado: "RESULT",
    consumoPorMes: "Monthly consumption",
    barraLimite: "300 kWh",
    tarifaFonte: (fonte, data) => ` Rate: ${fonte}, updated ${data}.`,
    outrosAparelhosTitulo: "Calculate other appliances",
    outrosAparelhosFrase: "Typical power is already filled in",
    verTodosAparelhos: "See all appliances",
    faqTitulo: "Frequently asked questions",
    comoContaFeita: "How the math works",
    formula: {
      horas: [
        "cost per day = (watts ÷ 1000) × hours × price per kWh",
        "per month = per day × 30.4",
        "per year = per day × 365",
      ],
      minutos: [
        "cost per use = (watts ÷ 1000) × (minutes ÷ 60) × price per kWh",
        "per month = per day × 30.4",
        "per year = per day × 365",
      ],
    },
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
