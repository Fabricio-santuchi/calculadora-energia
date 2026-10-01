"use client";

import { useEffect, useState } from "react";
import { treeifyError } from "zod";
import { criarCalculoSchema } from "@/lib/schema";
import { calcularCusto } from "@/lib/calculo";
import { formatarMoeda, numeroParaTexto, type Idioma } from "@/lib/numero";
import { detectarPaisPeloIdiomaDoNavegador } from "@/lib/pais";
import { TEXTOS, TEXTOS_INICIO } from "@/lib/textos";
import { aparelhos } from "@/lib/data/aparelhos";
import { tarifas } from "@/lib/data/tarifas";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  idioma: Idioma;
};

// Símbolo da moeda ("R$", "US$", "£", "€"...) pro campo de preço — usa o
// mesmo Intl.NumberFormat que a formatarMoeda já usa, só extrai a parte do
// símbolo em vez do número inteiro formatado.
function simboloMoeda(moeda: string, idioma: Idioma): string {
  const partes = new Intl.NumberFormat(idioma === "pt" ? "pt-BR" : "en-US", {
    style: "currency",
    currency: moeda,
  }).formatToParts(0);
  return partes.find((parte) => parte.type === "currency")?.value ?? moeda;
}

// Calculadora da página inicial (espec 6.1) — sempre preenchida (nunca
// vazia), resultado empilhado. Só aparelhos em HORAS no dropdown: os de
// minutos (chuveiro, chaleira) têm página própria.
export default function CalculadoraCompacta({ idioma }: Props) {
  const t = TEXTOS[idioma];
  const ti = TEXTOS_INICIO[idioma];
  const paisInicial = idioma === "en" ? "US" : "BR";
  const tarifaInicial = tarifas.find((tarifa) => tarifa.codigo === paisInicial);

  const [aparelhoSlug, setAparelhoSlug] = useState("outro");
  const [potencia, setPotencia] = useState("1000");
  const [horasPorDia, setHoras] = useState("4");
  const [tarifaPorKwh, setTarifa] = useState(
    tarifaInicial ? numeroParaTexto(tarifaInicial.valor, idioma) : "",
  );
  const [pais, setPais] = useState(paisInicial);

  // Mesmo padrão de "campo tocado" do Calculadora (calculadora-form.tsx):
  // só mostra erro depois que a pessoa sai do campo (onBlur), senão o erro
  // pisca a cada tecla digitada, antes de terminar de escrever o número.
  const [tocados, setTocados] = useState<
    Record<"potencia" | "horas" | "tarifa", boolean>
  >({
    potencia: false,
    horas: false,
    tarifa: false,
  });

  // Mesma detecção de país por navigator.language da calculadora de
  // aparelho — não mexe na lógica (lib/pais.ts), só chama de novo aqui.
  useEffect(() => {
    const paisDetectado = detectarPaisPeloIdiomaDoNavegador(
      navigator.language,
    );
    if (!paisDetectado || paisDetectado === paisInicial) return;

    const tarifaDetectada = tarifas.find((t) => t.codigo === paisDetectado);
    if (tarifaDetectada) {
      /* eslint-disable react-hooks/set-state-in-effect */
      setPais(paisDetectado);
      setTarifa(numeroParaTexto(tarifaDetectada.valor, idioma));
      /* eslint-enable react-hooks/set-state-in-effect */
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- só na primeira renderização
  }, []);

  const aparelhosEmHoras = aparelhos.filter(
    (a) => a.idiomas.includes(idioma) && a.unidadeTempo === "horas",
  );

  const schema = criarCalculoSchema("horas", idioma);
  const resultado = schema.safeParse({
    potencia,
    tempoPorDia: horasPorDia,
    tarifaPorKwh,
  });
  const custos = resultado.success
    ? calcularCusto(
        resultado.data.potencia,
        resultado.data.tempoPorDia,
        resultado.data.tarifaPorKwh,
      )
    : null;

  const arvore = resultado.success ? null : treeifyError(resultado.error);
  const erroPotencia = arvore?.properties?.potencia?.errors[0] ?? "";
  const erroHoras = arvore?.properties?.tempoPorDia?.errors[0] ?? "";
  const erroTarifa = arvore?.properties?.tarifaPorKwh?.errors[0] ?? "";

  const tarifaDoPais = tarifas.find((tarifa) => tarifa.codigo === pais);
  const moeda = tarifaDoPais?.moeda ?? "BRL";
  const simbolo = simboloMoeda(moeda, idioma);

  const opcoesPais = tarifas.map((tarifa) => ({
    value: tarifa.codigo,
    label: `${idioma === "en" ? tarifa.nomeEn : tarifa.nomePt} (${tarifa.moeda} ${numeroParaTexto(tarifa.valor, idioma)})`,
  }));

  // Sem o `items`, o <Select> não sabe o rótulo de cada valor e o
  // SelectValue mostra o value cru ("outro") em vez do texto — mesma razão
  // pela qual o select de País já passa `items` (opcoesPais) há tempos.
  const opcoesAparelho = [
    { value: "outro", label: ti.aparelhoOutro },
    ...aparelhosEmHoras.map((a) => ({
      value: a.slugPt,
      label: idioma === "pt" ? a.nomeCurtoPt : a.nomeCurtoEn,
    })),
  ];

  return (
    <div className="w-full overflow-hidden rounded-[20px] border border-foreground shadow-[0_1px_0_#1B1A17,0_24px_48px_-24px_rgba(27,26,23,0.25)]">
      <div className="flex flex-col gap-4.5 bg-card p-7">
        <div className="grid grid-cols-1 gap-3.5 xs:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="aparelho-compacto">{ti.aparelhoLabel}</Label>
            <Select
              items={opcoesAparelho}
              value={aparelhoSlug}
              onValueChange={(valor) => {
                if (!valor) return;
                setAparelhoSlug(valor);
                if (valor === "outro") return;
                const encontrado = aparelhosEmHoras.find(
                  (a) => a.slugPt === valor,
                );
                if (encontrado) {
                  setPotencia(String(encontrado.potenciaWatts));
                  setHoras(String(encontrado.tempoPadrao));
                }
              }}
            >
              {/* h-12.5! (important): o SelectTrigger tem um h-8 embutido
                  mais específico em CSS (data-[size=default]:h-8) que uma
                  classe comum não consegue sobrescrever sem "!". */}
              <SelectTrigger id="aparelho-compacto" className="h-12.5! w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="outro">{ti.aparelhoOutro}</SelectItem>
                {aparelhosEmHoras.map((a) => (
                  <SelectItem key={a.slugPt} value={a.slugPt}>
                    {idioma === "pt" ? a.nomeCurtoPt : a.nomeCurtoEn}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="pais-compacto">{t.pais}</Label>
            <Select
              items={opcoesPais}
              value={pais}
              onValueChange={(valor) => {
                const tarifaEncontrada = tarifas.find(
                  (tarifa) => tarifa.codigo === valor,
                );
                if (tarifaEncontrada) {
                  setTarifa(numeroParaTexto(tarifaEncontrada.valor, idioma));
                  setPais(tarifaEncontrada.codigo);
                }
              }}
            >
              <SelectTrigger id="pais-compacto" className="h-12.5! w-full">
                <SelectValue placeholder={t.paisPlaceholder} />
              </SelectTrigger>
              <SelectContent>
                {opcoesPais.map((opcao) => (
                  <SelectItem key={opcao.value} value={opcao.value}>
                    {opcao.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3.5">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="potencia-compacta" className="text-[13px]">
              {t.potencia}
            </Label>
            <div className="relative">
              <Input
                id="potencia-compacta"
                value={potencia}
                onChange={(e) => setPotencia(e.target.value)}
                onBlur={() =>
                  setTocados((atual) => ({ ...atual, potencia: true }))
                }
                inputMode="decimal"
                className="h-12.5 pr-7 font-mono"
                aria-invalid={!!(tocados.potencia && erroPotencia)}
                aria-describedby={
                  tocados.potencia && erroPotencia
                    ? "potencia-compacta-erro"
                    : undefined
                }
              />
              <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center font-mono text-sm text-muted-foreground">
                W
              </span>
            </div>
            {tocados.potencia && erroPotencia && (
              <p
                id="potencia-compacta-erro"
                className="text-[11px] leading-tight text-destructive"
              >
                {erroPotencia}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="horas-compacta" className="text-[13px]">
              {ti.horasPorDia}
            </Label>
            <div className="relative">
              <Input
                id="horas-compacta"
                value={horasPorDia}
                onChange={(e) => setHoras(e.target.value)}
                onBlur={() =>
                  setTocados((atual) => ({ ...atual, horas: true }))
                }
                inputMode="decimal"
                className="h-12.5 pr-7 font-mono"
                aria-invalid={!!(tocados.horas && erroHoras)}
                aria-describedby={
                  tocados.horas && erroHoras ? "horas-compacta-erro" : undefined
                }
              />
              <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center font-mono text-sm text-muted-foreground">
                h
              </span>
            </div>
            {tocados.horas && erroHoras && (
              <p
                id="horas-compacta-erro"
                className="text-[11px] leading-tight text-destructive"
              >
                {erroHoras}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="tarifa-compacta" className="text-[13px]">
              {ti.precoKwh}
            </Label>
            <div className="relative">
              <Input
                id="tarifa-compacta"
                value={tarifaPorKwh}
                onChange={(e) => setTarifa(e.target.value)}
                onBlur={() =>
                  setTocados((atual) => ({ ...atual, tarifa: true }))
                }
                inputMode="decimal"
                className="h-12.5 pr-9 font-mono"
                aria-invalid={!!(tocados.tarifa && erroTarifa)}
                aria-describedby={
                  tocados.tarifa && erroTarifa
                    ? "tarifa-compacta-erro"
                    : undefined
                }
              />
              <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center font-mono text-sm text-muted-foreground">
                {simbolo}
              </span>
            </div>
            {tocados.tarifa && erroTarifa && (
              <p
                id="tarifa-compacta-erro"
                className="text-[11px] leading-tight text-destructive"
              >
                {erroTarifa}
              </p>
            )}
          </div>
        </div>
      </div>

      <div
        aria-live="polite"
        className="flex flex-col gap-4 bg-foreground px-5 py-5.5 text-background xs:px-7 xs:py-6"
      >
        <div>
          <p className="text-sm text-background/60">{t.mensal}</p>
          <p className="font-mono text-[42px] leading-none font-semibold text-[#F2B53A] xs:text-[44px]">
            {custos ? formatarMoeda(custos.custoMensal, moeda, idioma) : "—"}
          </p>
          {!custos && (
            <p className="mt-2 text-sm text-background/70">
              {t.preenchaOsCampos}
            </p>
          )}
        </div>

        {/* Celular: uma linha compacta em vez das 3 caixas (espec 6.1). */}
        {custos && (
          <p className="font-mono text-[13px] text-background/70 xs:hidden">
            {ti.diaAnoResumo(
              formatarMoeda(custos.custoDiario, moeda, idioma),
              formatarMoeda(custos.custoAnual, moeda, idioma),
            )}
          </p>
        )}

        <div className="hidden grid-cols-3 gap-3 xs:grid">
          <div className="rounded-xl border border-escuro-borda px-3 py-2.5">
            <p className="text-[13px] text-escuro-texto">{ti.porHora}</p>
            <p className="font-mono text-[17px] font-semibold whitespace-nowrap text-background">
              {custos ? formatarMoeda(custos.custoPorHora, moeda, idioma) : "—"}
            </p>
          </div>
          <div className="rounded-xl border border-escuro-borda px-3 py-2.5">
            <p className="text-[13px] text-escuro-texto">{t.porDia}</p>
            <p className="font-mono text-[17px] font-semibold whitespace-nowrap text-background">
              {custos ? formatarMoeda(custos.custoDiario, moeda, idioma) : "—"}
            </p>
          </div>
          <div className="rounded-xl border border-escuro-borda px-3 py-2.5">
            <p className="text-[13px] text-escuro-texto">{t.porAno}</p>
            <p className="font-mono text-[17px] font-semibold whitespace-nowrap text-background">
              {custos ? formatarMoeda(custos.custoAnual, moeda, idioma) : "—"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
