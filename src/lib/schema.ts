import { z } from "zod";

export const calculoSchema = z.object({
  potencia: z.coerce.number().positive().max(10000),
  horasPorDia: z.coerce.number().min(0).max(24),
  tarifaPorKwh: z.coerce.number().positive(),
});
