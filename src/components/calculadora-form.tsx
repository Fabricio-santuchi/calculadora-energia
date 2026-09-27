"use client";
import type { Aparelho } from "@/lib/data/aparelhos";
import { numeroParaTexto, type Idioma } from "@/lib/numero";
import { TEXTOS } from "@/lib/textos";
import { criarCalculoSchema } from "@/lib/schema";
import { calcularCusto, minutosParaHoras } from "@/lib/calculo";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { treeifyError } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { tarifas } from "@/lib/data/tarifas";
import ResultadoPainel from "./resultado-painel";

type Props = {
  idioma: Idioma;
  aparelho?: Aparelho;
};

const Calculadora = ({ idioma, aparelho }: Props) => {
  const t = TEXTOS[idioma];
  const paisInicial = idioma === "en" ? "US" : "BR";
  const tarifaInicial = tarifas.find((tarifa) => tarifa.codigo === paisInicial);

  const [potencia, setPotencia] = useState<string>(
    aparelho ? String(aparelho.potenciaWatts) : "",
  );
  const [horasPorDia, setHoras] = useState<string>(
    aparelho?.tempoPadrao ? String(aparelho.tempoPadrao) : "",
  );
  const [tarifaPorKwh, setTarifa] = useState<string>(
    tarifaInicial ? numeroParaTexto(tarifaInicial.valor, idioma) : "",
  );
  const [pais, setPais] = useState<string>(paisInicial);
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
    tempoPorDia: horasPorDia,
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

  const moeda =
    tarifas.find((tarifa) => tarifa.codigo === pais)?.moeda ?? "BRL";

  const arvore = resultado.success ? null : treeifyError(resultado.error);
  const erroPotencia = arvore?.properties?.potencia?.errors[0] ?? "";
  const erroTempo = arvore?.properties?.tempoPorDia?.errors[0] ?? "";
  const erroTarifa = arvore?.properties?.tarifaPorKwh?.errors[0] ?? "";

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
      <form className="w-full max-w-sm rounded-xl border border-border bg-card p-6 shadow-sm">
        <h1 className="text-lg font-semibold text-foreground">
          Calculadora de Custo de Energia
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Descubra quanto custa deixar o aparelho ligado.
        </p>
        <div className="mt-6 flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="potencia">{t.potencia}</Label>
            <Input
              id="potencia"
              value={potencia}
              onChange={(e) => setPotencia(e.target.value)}
              onBlur={() =>
                setTocados((atual) => ({ ...atual, potencia: true }))
              }
              placeholder="ex: 300"
              aria-invalid={!!(tocados.potencia && erroPotencia)}
              aria-describedby={
                tocados.potencia && erroPotencia ? "potencia-erro" : undefined
              }
            />
            {aparelho && (
              <div className="flex gap-2">
                {aparelho.atalhosPotencia.map((valor) => (
                  <Button
                    key={valor}
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setPotencia(String(valor))}
                  >
                    + {valor}W
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
            <Label htmlFor="horas">{t.tempoHoras}</Label>
            <Input
              id="horas"
              value={horasPorDia}
              onChange={(e) => setHoras(e.target.value)}
              onBlur={() => setTocados((atual) => ({ ...atual, tempo: true }))}
              placeholder="ex: 8"
              aria-invalid={!!(tocados.tempo && erroTempo)}
              aria-describedby={
                tocados.tempo && erroTempo ? "tempo-erro" : undefined
              }
            />
            {aparelho?.atalhosTempo && aparelho.atalhosTempo.length > 0 && (
              <div className="flex gap-2">
                {aparelho.atalhosTempo.map((valor) => (
                  <Button
                    key={valor}
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setHoras(String(valor))}
                  >
                    + {valor} min
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
              onValueChange={(valor) => {
                const tarifaEncontrada = tarifas.find(
                  (tarifa) => tarifa.codigo === valor,
                );
                if (tarifaEncontrada) {
                  setTarifa(String(tarifaEncontrada.valor));
                  setPais(String(tarifaEncontrada.codigo));
                }
              }}
            >
              <SelectTrigger id="pais">
                <SelectValue placeholder={t.paisPlaceholder} />
              </SelectTrigger>
              <SelectContent>
                {tarifas.map((tarifa) => (
                  <SelectItem key={tarifa.codigo} value={tarifa.codigo}>
                    {idioma === "en" ? tarifa.nomeEn : tarifa.nomePt} (
                    {tarifa.moeda} {tarifa.valor})
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
              placeholder="ex: 0.75"
              aria-invalid={!!(tocados.tarifa && erroTarifa)}
              aria-describedby={
                tocados.tarifa && erroTarifa ? "tarifa-erro" : undefined
              }
            />
            {tocados.tarifa && erroTarifa && (
              <p id="tarifa-erro" className="text-sm text-destructive">
                {erroTarifa}
              </p>
            )}
          </div>
        </div>
        <ResultadoPainel
          custos={custos}
          moeda={moeda}
          idioma={idioma}
          unidade={unidade}
        />
      </form>
    </div>
  );
};

export default Calculadora;
