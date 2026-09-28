import type { Idioma } from "@/lib/numero";
import type { ConteudoAparelho } from "./tipos";
import ptPc from "./pt/pc";
import enPc from "./en/pc";
import ptPcEscritorio from "./pt/pc-escritorio";
import enOfficePc from "./en/office-pc";
import ptGeladeira from "./pt/geladeira";
import enFridge from "./en/fridge";
import ptArCondicionado from "./pt/ar-condicionado";
import enAirConditioner from "./en/air-conditioner";
import ptPs5Xbox from "./pt/ps5-xbox";
import enPs5Xbox from "./en/ps5-xbox";
import ptAquecedor from "./pt/aquecedor";
import enHeater from "./en/heater";
import ptChaleira from "./pt/chaleira";
import enKettle from "./en/kettle";
import ptChuveiro from "./pt/chuveiro";

// Chave: slugPt do aparelho (serve de "id" nos dois idiomas).
const CONTEUDOS: Record<Idioma, Record<string, ConteudoAparelho>> = {
  pt: {
    pc: ptPc,
    "pc-escritorio": ptPcEscritorio,
    geladeira: ptGeladeira,
    "ar-condicionado": ptArCondicionado,
    "ps5-xbox": ptPs5Xbox,
    aquecedor: ptAquecedor,
    chaleira: ptChaleira,
    chuveiro: ptChuveiro,
  },
  en: {
    pc: enPc,
    "pc-escritorio": enOfficePc,
    geladeira: enFridge,
    "ar-condicionado": enAirConditioner,
    "ps5-xbox": enPs5Xbox,
    aquecedor: enHeater,
    chaleira: enKettle,
  },
};

export function obterConteudo(
  idioma: Idioma,
  slugPt: string,
): ConteudoAparelho | undefined {
  return CONTEUDOS[idioma][slugPt];
}

export type { ConteudoAparelho } from "./tipos";
