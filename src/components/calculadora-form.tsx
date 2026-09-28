"use client";
import type { Aparelho } from "@/lib/data/aparelhos";
import { numeroParaTexto, parseNumero, type Idioma } from "@/lib/numero";
import { rotuloCustoUnitario, TEXTOS } from "@/lib/textos";
import { criarCalculoSchema } from "@/lib/schema";
import {
  calcularCusto,
  calcularCustoPorUso,
  minutosParaHoras,
} from "@/lib/calculo";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { treeifyError } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { tarifas } from "@/lib/data/tarifas";
import { detectarPaisPeloIdiomaDoNavegador } from "@/lib/pais";
import ResultadoPainel from "./resultado-painel";

type Props = {
  idioma: Idioma;
  aparelho?: Aparelho;
};

// Estilo do atalho escolhido (aria-pressed="true"): fundo e borda âmbar.
const CLASSE_ATALHO =
  "rounded-full font-mono aria-pressed:border-[#E8A317] aria-pressed:bg-[#FBE7B8] aria-pressed:text-foreground";

const Calculadora = ({ idioma, aparelho }: Props) => {
  const t = TEXTOS[idioma];
  const paisInicial = idioma === "en" ? "US" : "BR";
  const tarifaInicial = tarifas.find((tarifa) => tarifa.codigo === paisInicial);

  const [potencia, setPotencia] = useState<string>(
    aparelho ? String(aparelho.potenciaWatts) : "",
  );
  const [tempoPorDia, setTempo] = useState<string>(
    aparelho?.tempoPadrao ? String(aparelho.tempoPadrao) : "",
  );
  const [tarifaPorKwh, setTarifa] = useState<string>(
    tarifaInicial ? numeroParaTexto(tarifaInicial.valor, idioma) : "",
  );
  const [pais, setPais] = useState<string>(paisInicial);

  // Roda só no navegador (nunca no build estático), depois da página montar.
  useEffect(() => {
    const paisDetectado = detectarPaisPeloIdiomaDoNavegador(
      navigator.language,
    );
    if (!paisDetectado || paisDetectado === paisInicial) return;

    const tarifaDetectada = tarifas.find((t) => t.codigo === paisDetectado);
    if (tarifaDetectada) {
      // Leitura única de navigator.language após montar; não dá pra fazer
      // isso fora de um efeito sem quebrar o build estático (navigator não
      // existe lá).
      /* eslint-disable react-hooks/set-state-in-effect */
      setPais(paisDetectado);
      setTarifa(numeroParaTexto(tarifaDetectada.valor, idioma));
      /* eslint-enable react-hooks/set-state-in-effect */
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- só na primeira renderização
  }, []);

  const [tocados, setTocados] = useState<
    Record<"potencia" | "tempo" | "tarifa", boolean>
  >({
    potencia: false,
    tempo: false,
    tarifa: false,
  });

  const unidade = aparelho?.unidadeTempo ?? "horas";
  const schema = criarCalculoSchema(unidade, idioma);

  const resultado = schema.safeParse({
    potencia,
    tempoPorDia,
    tarifaPorKwh,
  });

  const custos = resultado.success
    ? calcularCusto(
        resultado.data.potencia,
        unidade === "minutos"
          ? minutosParaHoras(resultado.data.tempoPorDia)
          : resultado.data.tempoPorDia,
        resultado.data.tarifaPorKwh,
      )
    : null;

  // "Por hora de uso" (horas) ou o custo de UM uso com o tempo digitado (minutos).
  const custoUnitario = !resultado.success
    ? null
    : unidade === "minutos"
      ? calcularCustoPorUso(
          resultado.data.potencia,
          resultado.data.tempoPorDia,
          resultado.data.tarifaPorKwh,
        )
      : (custos?.custoPorHora ?? null);

  const rotuloUnitario = rotuloCustoUnitario(
    idioma,
    unidade,
    resultado.success
      ? numeroParaTexto(resultado.data.tempoPorDia, idioma)
      : tempoPorDia.trim(),
    aparelho?.tipoDeUso === "banho",
  );

  const tarifaDoPais = tarifas.find((tarifa) => tarifa.codigo === pais);
  const moeda = tarifaDoPais?.moeda ?? "BRL";
  const notaDoPais = tarifaDoPais?.nota?.[idioma];

  // Rótulos do select: com isso o botão mostra "Brasil (BRL 1,05)" e não "BR".
  const opcoesPais = tarifas.map((tarifa) => ({
    value: tarifa.codigo,
    label: `${idioma === "en" ? tarifa.nomeEn : tarifa.nomePt} (${tarifa.moeda} ${numeroParaTexto(tarifa.valor, idioma)})`,
  }));

  const arvore = resultado.success ? null : treeifyError(resultado.error);
  const erroPotencia = arvore?.properties?.potencia?.errors[0] ?? "";
  const erroTempo = arvore?.properties?.tempoPorDia?.errors[0] ?? "";
  const erroTarifa = arvore?.properties?.tarifaPorKwh?.errors[0] ?? "";

  const potenciaAtual = parseNumero(potencia);
  const tempoAtual = parseNumero(tempoPorDia);

  return (
    <form
      // O cálculo é ao vivo: não existe "enviar". Sem isso, apertar Enter
      // num campo recarregava a página e apagava tudo.
      onSubmit={(e) => e.preventDefault()}
      className="w-full max-w-sm rounded-[20px] border border-border bg-card p-6 shadow-sm"
    >
      <h2 className="font-heading text-lg font-semibold text-foreground">
        {t.titulo}
      </h2>
      <p className="mt-1 text-sm text-muted-foreground">{t.subtitulo}</p>
      <div className="mt-6 flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="potencia">{t.potencia}</Label>
          <div className="relative">
            <Input
              id="potencia"
              value={potencia}
              onChange={(e) => setPotencia(e.target.value)}
              onBlur={() =>
                setTocados((atual) => ({ ...atual, potencia: true }))
              }
              placeholder="ex: 300"
              inputMode="decimal"
              className="h-11 pr-10 font-mono"
              aria-invalid={!!(tocados.potencia && erroPotencia)}
              aria-describedby={
                tocados.potencia && erroPotencia ? "potencia-erro" : undefined
              }
            />
            <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center font-mono text-sm text-muted-foreground">
              W
            </span>
          </div>
          {aparelho && (
            <div className="flex flex-wrap gap-2">
              {aparelho.atalhosPotencia.map((valor) => (
                <Button
                  key={valor}
                  type="button"
                  variant="outline"
                  size="sm"
                  className={CLASSE_ATALHO}
                  aria-pressed={potenciaAtual === valor}
                  onClick={() => setPotencia(String(valor))}
                >
                  {valor} W
                </Button>
              ))}
            </div>
          )}
          {tocados.potencia && erroPotencia && (
            <p id="potencia-erro" className="text-sm text-destructive">
              {erroPotencia}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="tempo">
            {unidade === "minutos" ? t.tempoMinutos : t.tempoHoras}
          </Label>
          <div className="relative">
            <Input
              id="tempo"
              value={tempoPorDia}
              onChange={(e) => setTempo(e.target.value)}
              onBlur={() => setTocados((atual) => ({ ...atual, tempo: true }))}
              placeholder={unidade === "minutos" ? "ex: 10" : "ex: 8"}
              inputMode="decimal"
              className="h-11 pr-20 font-mono"
              aria-invalid={!!(tocados.tempo && erroTempo)}
              aria-describedby={
                tocados.tempo && erroTempo ? "tempo-erro" : undefined
              }
            />
            <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center font-mono text-sm text-muted-foreground">
              {unidade === "minutos" ? t.unidadeMinutos : t.unidadeHoras}
            </span>
          </div>
          {aparelho?.atalhosTempo && aparelho.atalhosTempo.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {aparelho.atalhosTempo.map((valor) => (
                <Button
                  key={valor}
                  type="button"
                  variant="outline"
                  size="sm"
                  className={CLASSE_ATALHO}
                  aria-pressed={tempoAtual === valor}
                  onClick={() => setTempo(String(valor))}
                >
                  {valor} min
                </Button>
              ))}
            </div>
          )}

          {tocados.tempo && erroTempo && (
            <p id="tempo-erro" className="text-sm text-destructive">
              {erroTempo}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="pais">{t.pais}</Label>
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
            <SelectTrigger id="pais" className="h-11 w-full">
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

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="tarifa">{t.tarifa}</Label>
          <Input
            id="tarifa"
            value={tarifaPorKwh}
            onChange={(e) => setTarifa(e.target.value)}
            onBlur={() => setTocados((atual) => ({ ...atual, tarifa: true }))}
            placeholder={idioma === "pt" ? "ex: 1,05" : "ex: 0.18"}
            inputMode="decimal"
            className="h-11 font-mono"
            aria-invalid={!!(tocados.tarifa && erroTarifa)}
            aria-describedby={
              tocados.tarifa && erroTarifa ? "tarifa-erro" : "tarifa-ajuda"
            }
          />
          {tocados.tarifa && erroTarifa ? (
            <p id="tarifa-erro" className="text-sm text-destructive">
              {erroTarifa}
            </p>
          ) : (
            <p id="tarifa-ajuda" className="text-xs text-muted-foreground">
              {t.tarifaAjuda}
            </p>
          )}
          {notaDoPais && (
            <p className="text-xs text-muted-foreground">{notaDoPais}</p>
          )}
        </div>
      </div>
      <ResultadoPainel
        custos={custos}
        custoUnitario={custoUnitario}
        rotuloUnitario={rotuloUnitario}
        moeda={moeda}
        idioma={idioma}
      />
    </form>
  );
};

export default Calculadora;
