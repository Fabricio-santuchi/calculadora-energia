import type { ResultadoCusto } from "@/lib/calculo";
import type { Idioma } from "@/lib/numero";
import { formatarMoeda } from "@/lib/numero";
import { TEXTOS, TEXTOS_APARELHO } from "@/lib/textos";

type Props = {
  custos: ResultadoCusto | null;
  /** Custo por hora (aparelhos em horas) ou de um uso (aparelhos em minutos). */
  custoUnitario: number | null;
  /** "Por hora de uso", "Por uso de 5 min", "Por banho de 10 min"... */
  rotuloUnitario: string;
  moeda: string;
  idioma: Idioma;
  /**
   * Falso = layout completo da página de aparelho (espec 4.2): rótulo
   * "RESULTADO", valor de 64px, 3 caixas, barra de consumo e rodapé com a
   * fonte da tarifa. Verdadeiro (padrão) = o painel compacto usado na
   * calculadora genérica da inicial, sem nada disso.
   */
  compacto?: boolean;
  fonteNome?: string;
  dataAtualizacao?: string;
  avisoResultado?: string;
};

export default function ResultadoPainel({
  custos,
  custoUnitario,
  rotuloUnitario,
  moeda,
  idioma,
  compacto = true,
  fonteNome,
  dataAtualizacao,
  avisoResultado,
}: Props) {
  const t = TEXTOS[idioma];

  if (compacto) {
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

  // Layout completo da página de aparelho (espec 4.2).
  const ta = TEXTOS_APARELHO[idioma];
  const kwhMes = custos?.kwhMensal ?? 0;
  const larguraBarra = Math.min(100, (kwhMes / 300) * 100);

  // timeZone: "UTC" evita mostrar o dia anterior em fusos atrás de UTC —
  // a data vem sem hora ("2026-09-28"), que o JS lê como meia-noite UTC.
  const dataFormatada = dataAtualizacao
    ? new Intl.DateTimeFormat(idioma === "pt" ? "pt-BR" : "en-US", {
        timeZone: "UTC",
      }).format(new Date(dataAtualizacao))
    : null;

  return (
    <div
      aria-live="polite"
      className="flex h-full flex-col gap-5 bg-foreground p-5 text-background xs:p-6 md:gap-7 md:p-8 lg:p-10"
    >
      <span className="flex w-fit items-center gap-2 rounded-[18px] px-3 py-1.5 text-[14px] font-semibold tracking-[0.08em] text-escuro-texto uppercase">
        {ta.resultado}
      </span>

      <div>
        <p className="text-base text-escuro-texto">{t.mensal}</p>
        <p className="font-mono text-[44px] leading-none font-semibold text-[#F2B53A] xs:text-[48px] md:text-[56px] lg:text-[64px]">
          {custos ? formatarMoeda(custos.custoMensal, moeda, idioma) : "—"}
        </p>
        {!custos && (
          <p className="mt-2 text-[15px] text-background/70">
            {t.preenchaOsCampos}
          </p>
        )}
      </div>

      {/* Celular (espec 4.2, "Celular"): só 2 caixas (Dia, Ano) — o
          unitário vira linha fina embaixo. Tela 600 pra cima (7b): 3
          caixas, unitário junto com as outras. */}
      <div className="grid grid-cols-2 gap-3 xs:grid-cols-3">
        <div className="hidden rounded-[14px] border border-escuro-borda p-4 xs:block">
          <p className="text-sm text-escuro-texto">{rotuloUnitario}</p>
          <p className="mt-1 font-mono text-[17px] font-semibold whitespace-nowrap text-background md:text-[22px]">
            {custoUnitario !== null
              ? formatarMoeda(custoUnitario, moeda, idioma)
              : "—"}
          </p>
        </div>
        <div className="rounded-[14px] border border-escuro-borda p-4">
          <p className="text-sm text-escuro-texto">{t.porDia}</p>
          <p className="mt-1 font-mono text-[17px] font-semibold whitespace-nowrap text-background md:text-[22px]">
            {custos ? formatarMoeda(custos.custoDiario, moeda, idioma) : "—"}
          </p>
        </div>
        <div className="rounded-[14px] border border-escuro-borda p-4">
          <p className="text-sm text-escuro-texto">{t.porAno}</p>
          <p className="mt-1 font-mono text-[17px] font-semibold whitespace-nowrap text-background md:text-[22px]">
            {custos ? formatarMoeda(custos.custoAnual, moeda, idioma) : "—"}
          </p>
        </div>
      </div>

      {/* Linha fina do unitário — só no celular, some a partir de 480px
          porque aí ele já é a primeira das 3 caixas acima. */}
      <div className="flex items-center justify-between text-sm xs:hidden">
        <span className="text-escuro-texto">{rotuloUnitario}</span>
        <span className="font-mono text-background">
          {custoUnitario !== null
            ? formatarMoeda(custoUnitario, moeda, idioma)
            : "—"}
        </span>
      </div>

      <div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-escuro-texto">{ta.consumoPorMes}</span>
          <span className="font-mono text-background">
            {custos
              ? `${custos.kwhMensal.toLocaleString(
                  idioma === "pt" ? "pt-BR" : "en-US",
                  { minimumFractionDigits: 1, maximumFractionDigits: 1 },
                )} kWh`
              : "—"}
          </span>
        </div>
        <div
          className="mt-2 h-2 rounded-full bg-escuro-borda xs:h-2.5"
          aria-hidden="true"
        >
          <div
            className="h-full rounded-full bg-[#F2B53A]"
            style={{ width: `${larguraBarra}%` }}
          />
        </div>
        <div
          className="mt-1 flex justify-between font-mono text-xs text-escuro-apagado"
          aria-hidden="true"
        >
          <span>0</span>
          <span>{ta.barraLimite}</span>
        </div>
      </div>

      <p className="mt-auto border-t border-escuro-borda pt-[18px] text-[13px] text-escuro-texto">
        {avisoResultado ?? t.avisoEstimativa}
        {fonteNome && dataFormatada && ta.tarifaFonte(fonteNome, dataFormatada)}
      </p>
    </div>
  );
}
