import type { ResultadoCusto } from "@/lib/calculo";
import type { Idioma } from "@/lib/numero";
import type { UnidadeTempo } from "@/lib/schema";
import { formatarMoeda } from "@/lib/numero";
import { TEXTOS } from "@/lib/textos";

type Props = {
  custos: ResultadoCusto | null;
  moeda: string;
  idioma: Idioma;
  unidade: UnidadeTempo;
};
export default function ResultadoPainel({
  custos,
  moeda,
  idioma,
  unidade,
}: Props) {
  const t = TEXTOS[idioma];

  return (
    <div
      aria-live="polite"
      className="mt-6 rounded-2xl bg-foreground p-4 text-background"
    >
      <p className="text-xs text-background/60">{t.mensal}</p>

      <p className="font-mono text-3xl font-semibold text-[#F2B53A]">
        {custos ? formatarMoeda(custos.custoMensal, moeda, idioma) : "—"}
      </p>

      {!custos && (
        <p className="mt-2 text-sm text-background/70">
          {t.preenchaOsCampos}
        </p>
      )}

      <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
        <div>
          <p className="text-background/60">
            {unidade === "horas" ? t.porHora : t.porUso}
          </p>

          <p className="font-mono font-medium text-background">
            {custos ? formatarMoeda(custos.custoPorHora, moeda, idioma) : "—"}
          </p>
        </div>
        <div>
          <p className="text-background/60">Por dia</p>
          <p className="font-mono font-medium text-background">
            {custos ? formatarMoeda(custos.custoDiario, moeda, idioma) : "—"}
          </p>
        </div>
        <div>
          <p className="text-background/60">Por ano</p>
          <p className="font-mono font-medium text-background">
            {custos ? formatarMoeda(custos.custoAnual, moeda, idioma) : "—"}
          </p>
        </div>
        <div>
          <p className="text-background/60">kWh por mês</p>
          <p className="font-mono font-medium text-background">
            {custos ? `${custos.kwhMensal.toFixed(1)} kWh` : "—"}
          </p>
        </div>
      </div>
      <p className="mt-4 text-xs text-background/50">{t.avisoEstimativa}</p>
    </div>
  );
}
