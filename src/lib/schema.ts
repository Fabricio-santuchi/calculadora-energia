import { z } from "zod";

export const calculoSchema = z.object({
  potencia: z.coerce.number().int().min(1),
  horasPorDia: z.coerce.number().int().min(1).max(24),
  tarifaPorKwh: z.coerce.number().min(0.1),
});
