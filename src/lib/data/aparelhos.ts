export interface Aparelho {
  slugEn: string;
  slugPt: string;
  nomeEn: string;
  nomePt: string;
  /** Nome curto: trilha, "Calcule outros aparelhos", rodapé, selects. */
  nomeCurtoPt: string;
  /** Ausente só no chuveiro (não existe em inglês). */
  nomeCurtoEn?: string;
  /** Rótulo de potência mostrado nos cartões (ex: "50 W efetivo"). */
  rotuloPotenciaPt: string;
  rotuloPotenciaEn?: string;
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
    nomeCurtoPt: "PC gamer",
    nomeCurtoEn: "Gaming PC",
    rotuloPotenciaPt: "350 W",
    rotuloPotenciaEn: "350 W",
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
    nomeCurtoPt: "PC escritório",
    nomeCurtoEn: "Office PC",
    rotuloPotenciaPt: "100 W",
    rotuloPotenciaEn: "100 W",
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
    nomeCurtoPt: "Geladeira",
    nomeCurtoEn: "Fridge",
    rotuloPotenciaPt: "50 W efetivo",
    rotuloPotenciaEn: "50 W average",
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
    nomeCurtoPt: "Ar-condicionado",
    nomeCurtoEn: "Air conditioner",
    rotuloPotenciaPt: "1000 W",
    rotuloPotenciaEn: "1000 W",
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
    nomeCurtoPt: "PS5 / Xbox",
    nomeCurtoEn: "PS5 / Xbox",
    rotuloPotenciaPt: "200 W",
    rotuloPotenciaEn: "200 W",
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
    nomeCurtoPt: "Aquecedor",
    nomeCurtoEn: "Space heater",
    rotuloPotenciaPt: "1500 W",
    rotuloPotenciaEn: "1500 W",
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
    nomeCurtoPt: "Chaleira elétrica",
    nomeCurtoEn: "Electric kettle",
    rotuloPotenciaPt: "2000 W",
    rotuloPotenciaEn: "2000 W",
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
    nomeCurtoPt: "Chuveiro elétrico",
    rotuloPotenciaPt: "5500 W",
    potenciaWatts: 5500,
    unidadeTempo: "minutos",
    idiomas: ["pt"],
    atalhosPotencia: [3500, 5500, 7500],
    atalhosTempo: [5, 10, 20, 40],
    tempoPadrao: 10,
    tipoDeUso: "banho",
  },
];
