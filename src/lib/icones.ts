import {
  AirVent,
  Coffee,
  Cpu,
  Flame,
  Gamepad2,
  Monitor,
  Refrigerator,
  ShowerHead,
  type LucideIcon,
} from "lucide-react";

// slugPt -> ícone, porque slugPt é o único id igual nos dois idiomas.
// Compartilhado entre a grade da inicial (6.4) e "Calcule outros aparelhos"
// na página de aparelho (4.4).
export const ICONE_POR_APARELHO: Record<string, LucideIcon> = {
  pc: Cpu,
  "pc-escritorio": Monitor,
  geladeira: Refrigerator,
  "ar-condicionado": AirVent,
  "ps5-xbox": Gamepad2,
  aquecedor: Flame,
  chaleira: Coffee,
  chuveiro: ShowerHead,
};
