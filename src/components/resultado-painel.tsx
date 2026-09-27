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
      className="mt-6 rounded-lg border border-border bg-muted/40 p-4"
    >
      <p className="text-xs text-muted-foreground">{t.mensal}</p>

      <p className="text-2xl font-semibold text-foreground">
        {custos ? formatarMoeda(custos.custoMensal, moeda, idioma) : "—"}
      </p>

      {!custos && (
        <p className="mt-2 text-sm text-muted-foreground">
          {t.preenchaOsCampos}
        </p>
      )}

      <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
        <div>
          <p className="text-muted-foreground">
            {unidade === "horas" ? t.porHora : t.porUso}
          </p>

          <p className="font-medium text-foreground">
            {custos ? formatarMoeda(custos.custoPorHora, moeda, idioma) : "—"}
          </p>
        </div>
        <div>
          <p className="text-muted-foreground">Por dia</p>
          <p className="font-medium text-foreground">
            {custos ? formatarMoeda(custos.custoDiario, moeda, idioma) : "—"}
          </p>
        </div>
        <div>
          <p className="text-muted-foreground">Por ano</p>
          <p className="font-medium text-foreground">
            {custos ? formatarMoeda(custos.custoAnual, moeda, idioma) : "—"}
          </p>
        </div>
        <div>
          <p className="text-muted-foreground">kWh por mês</p>
          <p className="font-medium text-foreground">
            {custos ? `${custos.kwhMensal.toFixed(1)} kWh` : "—"}
          </p>
        </div>
      </div>
      <p className="mt-4 text-xs text-muted-foreground">{t.avisoEstimativa}</p>
    </div>
  );
}
