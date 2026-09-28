import type { ResultadoCusto } from "@/lib/calculo";
import type { Idioma } from "@/lib/numero";
import { formatarMoeda } from "@/lib/numero";
import { TEXTOS } from "@/lib/textos";

type Props = {
  custos: ResultadoCusto | null;
  /** Custo por hora (aparelhos em horas) ou de um uso (aparelhos em minutos). */
  custoUnitario: number | null;
  /** "Por hora de uso", "Por uso de 5 min", "Por banho de 10 min"... */
  rotuloUnitario: string;
  moeda: string;
  idioma: Idioma;
};
export default function ResultadoPainel({
  custos,
  custoUnitario,
  rotuloUnitario,
  moeda,
  idioma,
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
          <p className="text-background/60">{rotuloUnitario}</p>

          <p className="font-mono font-medium text-background">
            {custoUnitario !== null
              ? formatarMoeda(custoUnitario, moeda, idioma)
              : "—"}
          </p>
        </div>
        <div>
          <p className="text-background/60">{t.porDia}</p>
          <p className="font-mono font-medium text-background">
            {custos ? formatarMoeda(custos.custoDiario, moeda, idioma) : "—"}
          </p>
        </div>
        <div>
          <p className="text-background/60">{t.porAno}</p>
          <p className="font-mono font-medium text-background">
            {custos ? formatarMoeda(custos.custoAnual, moeda, idioma) : "—"}
          </p>
        </div>
        <div>
          <p className="text-background/60">{t.kwhPorMes}</p>
          <p className="font-mono font-medium text-background">
            {custos
              ? `${custos.kwhMensal.toLocaleString(
                  idioma === "pt" ? "pt-BR" : "en-US",
                  { minimumFractionDigits: 1, maximumFractionDigits: 1 },
                )} kWh`
              : "—"}
          </p>
        </div>
      </div>
      <p className="mt-4 text-xs text-background/50">{t.avisoEstimativa}</p>
    </div>
  );
}
