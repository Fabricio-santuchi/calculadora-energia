export interface Aparelho {
  nome: string;
  potenciaWatts: number;
}

export const aparelhos: Aparelho[] = [
  {
    nome: "PC gamer (em uso)",
    potenciaWatts: 350,
  },
  {
    nome: "PC escritório (em uso)",
    potenciaWatts: 100,
  },
  {
    nome: "Geladeira (média, ciclo liga/desliga)",
    potenciaWatts: 50,
  },
  {
    nome: "Ar-condicionado (split 9000-12000 BTU)",
    potenciaWatts: 1000,
  },
  {
    nome: "PS5 / Xbox Series X (jogando)",
    potenciaWatts: 200,
  },
  {
    nome: "Aquecedor elétrico",
    potenciaWatts: 1500,
  },
  {
    nome: "Chuveiro elétrico",
    potenciaWatts: 5500,
  },
];
