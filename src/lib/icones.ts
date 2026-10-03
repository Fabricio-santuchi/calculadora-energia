import {
  AirVent,
  Clock,
  Coffee,
  DoorClosed,
  Cpu,
  Droplet,
  Flame,
  Gamepad2,
  Gauge,
  Monitor,
  Power,
  Refrigerator,
  ShowerHead,
  Thermometer,
  Tv,
  type LucideIcon,
} from "lucide-react";
import type { Dica } from "@/content/aparelhos/tipos";

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

export const ICONE_DICA: Record<NonNullable<Dica["icone"]>, LucideIcon> = {
  gauge: Gauge,
  clock: Clock,
  power: Power,
  thermometer: Thermometer,
  droplet: Droplet,
  door: DoorClosed,
  tv: Tv,
};
