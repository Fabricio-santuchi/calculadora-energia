export interface Aparelho {
  slug: string;
  nomeEn: string;
  nomePt: string;
  potenciaWatts: number;
  idiomas: ("en" | "pt")[];
}

export const aparelhos: Aparelho[] = [
  {
    slug: "pc-gamer",
    nomeEn: "Gaming PC (in use)",
    nomePt: "PC gamer (em uso)",
    potenciaWatts: 350,
    idiomas: ["en", "pt"],
  },
  {
    slug: "pc-escritorio",
    nomeEn: "Office PC (in use)",
    nomePt: "PC escritório (em uso)",
    potenciaWatts: 100,
    idiomas: ["en", "pt"],
  },
  {
    slug: "geladeira",
    nomeEn: "Refrigerator (average, on/off cycle)",
    nomePt: "Geladeira (média, ciclo liga/desliga)",
    potenciaWatts: 50,
    idiomas: ["en", "pt"],
  },
  {
    slug: "ar-condicionado",
    nomeEn: "Air conditioner (9,000-12,000 BTU split unit)",
    nomePt: "Ar-condicionado (split 9000-12000 BTU)",
    potenciaWatts: 1000,
    idiomas: ["en", "pt"],
  },
  {
    slug: "ps5-xbox",
    nomeEn: "PS5 / Xbox Series X (playing)",
    nomePt: "PS5 / Xbox Series X (jogando)",
    potenciaWatts: 200,
    idiomas: ["en", "pt"],
  },
  {
    slug: "aquecedor",
    nomeEn: "Electric heater",
    nomePt: "Aquecedor elétrico",
    potenciaWatts: 1500,
    idiomas: ["en", "pt"],
  },
  {
    slug: "chaleira",
    nomeEn: "Electric kettle",
    nomePt: "Chaleira elétrica",
    potenciaWatts: 2000,
    idiomas: ["en", "pt"],
  },
  {
    slug: "chuveiro",
    nomeEn: "Electric shower",
    nomePt: "Chuveiro elétrico",
    potenciaWatts: 5500,
    idiomas: ["pt"],
  },
];
