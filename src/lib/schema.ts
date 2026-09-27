import { z } from "zod";
import { parseNumero, type Idioma } from "./numero";

interface Mensagens {
  numero: string;
  positivo: string;
  negativo: string;
  unidades: Record<UnidadeTempo, string>;
  maximo: (max: number, unidade: string) => string;
  tarifaMaximo: string;
}

const MENSAGENS: Record<Idioma, Mensagens> = {
  pt: {
    numero: "Digite um número válido.",
    positivo: "Deve ser maior que zero.",
    negativo: "Não pode ser negativo.",
    unidades: { horas: "horas", minutos: "minutos" },
    maximo: (max, unidade) => `O máximo é ${max} ${unidade}.`,
    tarifaMaximo: "O máximo é 99999.",
  },
  en: {
    numero: "Enter a valid number.",
    positivo: "Must be greater than zero.",
    negativo: "Cannot be negative.",
    unidades: { horas: "hours", minutos: "minutes" },
    maximo: (max, unidade) => `The maximum is ${max} ${unidade}.`,
    tarifaMaximo: "The maximum is 99999.",
  },
};

export type UnidadeTempo = "horas" | "minutos";

export function criarCalculoSchema(unidadeTempo: UnidadeTempo, idioma: Idioma) {
  const msg = MENSAGENS[idioma];

  const potencia = z
    .string({ error: msg.numero })
    .transform(parseNumero)
    .pipe(
      z
        .number({ error: msg.numero })
        .positive(msg.positivo)
        .max(10000, msg.maximo(10000, "W")),
    );

  const maximo = unidadeTempo === "horas" ? 24 : 1440;

  const tempoPorDia = z
    .string({ error: msg.numero })
    .transform(parseNumero)
    .pipe(
      z
        .number({ error: msg.numero })
        .min(0, msg.negativo)
        .max(maximo, msg.maximo(maximo, msg.unidades[unidadeTempo])),
    );

  const tarifaPorKwh = z
    .string({ error: msg.numero })
    .transform(parseNumero)
    .pipe(
      z
        .number({ error: msg.numero })
        .positive(msg.positivo)
        .max(99999, msg.tarifaMaximo),
    );

  return z.object({ potencia, tempoPorDia, tarifaPorKwh });
}

export const calculoSchema = z.object({
  potencia: z.coerce.number().positive().max(10000),
  horasPorDia: z.coerce.number().min(0).max(24),
  tarifaPorKwh: z.coerce.number().positive(),
});
