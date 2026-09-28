export interface Aparelho {
  slugEn: string;
  slugPt: string;
  nomeEn: string;
  nomePt: string;
  potenciaWatts: number;
  unidadeTempo: "horas" | "minutos";
  idiomas: ("en" | "pt")[];
  atalhosPotencia: [number, number, number];
  atalhosTempo?: number[];
  tempoPadrao: number;
  /** "banho" muda o rótulo do custo por uso ("Por banho de 10 min"). */
  tipoDeUso?: "banho";
}

export const aparelhos: Aparelho[] = [
  {
    slugEn: "pc",
    slugPt: "pc",
    nomeEn: "Gaming PC (in use)",
    nomePt: "PC gamer (em uso)",
    potenciaWatts: 350,
    unidadeTempo: "horas",
    idiomas: ["en", "pt"],
    atalhosPotencia: [100, 350, 600],
    tempoPadrao: 4,
  },
  {
    slugEn: "office-pc",
    slugPt: "pc-escritorio",
    nomeEn: "Office PC (in use)",
    nomePt: "PC escritório (em uso)",
    potenciaWatts: 100,
    unidadeTempo: "horas",
    idiomas: ["en", "pt"],
    atalhosPotencia: [50, 100, 200],
    tempoPadrao: 8,
  },
  {
    slugEn: "fridge",
    slugPt: "geladeira",
    nomeEn: "Refrigerator (average, on/off cycle)",
    nomePt: "Geladeira (média, ciclo liga/desliga)",
    potenciaWatts: 50,
    unidadeTempo: "horas",
    idiomas: ["en", "pt"],
    atalhosPotencia: [30, 50, 80],
    tempoPadrao: 24,
  },
  {
    slugEn: "air-conditioner",
    slugPt: "ar-condicionado",
    nomeEn: "Air conditioner (9,000-12,000 BTU split unit)",
    nomePt: "Ar-condicionado (split 9000-12000 BTU)",
    potenciaWatts: 1000,
    unidadeTempo: "horas",
    idiomas: ["en", "pt"],
    atalhosPotencia: [800, 1000, 1500],
    tempoPadrao: 8,
  },
  {
    slugEn: "ps5-xbox",
    slugPt: "ps5-xbox",
    nomeEn: "PS5 / Xbox Series X (playing)",
    nomePt: "PS5 / Xbox Series X (jogando)",
    potenciaWatts: 200,
    unidadeTempo: "horas",
    idiomas: ["en", "pt"],
    atalhosPotencia: [100, 200, 250],
    tempoPadrao: 3,
  },
  {
    slugEn: "heater",
    slugPt: "aquecedor",
    nomeEn: "Electric heater",
    nomePt: "Aquecedor elétrico",
    potenciaWatts: 1500,
    unidadeTempo: "horas",
    idiomas: ["en", "pt"],
    atalhosPotencia: [1000, 1500, 2000],
    tempoPadrao: 6,
  },
  {
    slugEn: "kettle",
    slugPt: "chaleira",
    nomeEn: "Electric kettle",
    nomePt: "Chaleira elétrica",
    potenciaWatts: 2000,
    unidadeTempo: "minutos",
    idiomas: ["en", "pt"],
    atalhosPotencia: [1500, 2000, 3000],
    atalhosTempo: [3, 5, 10],
    tempoPadrao: 5,
  },
  {
    slugEn: "chuveiro",
    slugPt: "chuveiro",
    nomeEn: "Electric shower",
    nomePt: "Chuveiro elétrico",
    potenciaWatts: 5500,
    unidadeTempo: "minutos",
    idiomas: ["pt"],
    atalhosPotencia: [3500, 5500, 7500],
    atalhosTempo: [5, 10, 20, 40],
    tempoPadrao: 10,
    tipoDeUso: "banho",
  },
];
