"use client";

type Props = {
  potenciaPadrao?: number;
};

import { calcularCusto } from "@/lib/calculo";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { calculoSchema } from "@/lib/schema";
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

const Calculadora = ({ potenciaPadrao }: Props) => {
  const [potencia, setPotencia] = useState<string>(
    potenciaPadrao ? String(potenciaPadrao) : "",
  );
  const [horasPorDia, setHoras] = useState<string>("");
  const [tarifaPorKwh, setTarifa] = useState<string>("");
  const [erros, setErros] = useState<Record<string, string>>({});
  const [custos, setCustos] = useState<{
    custoDiario: number;
    custoMensal: number;
    custoAnual: number;
  } | null>(null);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const resultado = calculoSchema.safeParse({
            potencia,
            horasPorDia,
            tarifaPorKwh,
          });
          if (!resultado.success) {
            const arvoreErros = treeifyError(resultado.error);
            setErros({
              potencia: arvoreErros.properties?.potencia?.errors[0] ?? "",
              horasPorDia: arvoreErros.properties?.horasPorDia?.errors[0] ?? "",
              tarifaPorKwh:
                arvoreErros.properties?.tarifaPorKwh?.errors[0] ?? "",
            });
            setCustos(null);
          } else {
            setErros({});
            const resultadoCalculo = calcularCusto(
              resultado.data.potencia,
              resultado.data.horasPorDia,
              resultado.data.tarifaPorKwh,
            );
            setCustos(resultadoCalculo);
          }
        }}
        className="w-full max-w-sm rounded-xl border border-border bg-card p-6 shadow-sm"
      >
        <h1 className="text-lg font-semibold text-foreground">
          Calculadora de Custo de Energia
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Descubra quanto custa deixar o aparelho ligado.
        </p>
        <div className="mt-6 flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="potencia">Potência (W)</Label>
            <Input
              id="potencia"
              value={potencia}
              onChange={(e) => setPotencia(e.target.value)}
              placeholder="ex: 300"
              aria-invalid={!!erros.potencia}
            />
            {erros.potencia && (
              <p className="text-sm text-destructive">{erros.potencia}</p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="horas">Horas de uso por dia</Label>
            <Input
              id="horas"
              value={horasPorDia}
              onChange={(e) => setHoras(e.target.value)}
              placeholder="ex: 8"
              aria-invalid={!!erros.horasPorDia}
            />
            {erros.horasPorDia && (
              <p className="text-sm text-destructive">{erros.horasPorDia}</p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="pais">País (opcional, preenche a tarifa)</Label>
            <Select
              onValueChange={(valor) => {
                const tarifaEncontrada = tarifas.find(
                  (tarifa) => tarifa.codigo === valor,
                );
                if (tarifaEncontrada) {
                  setTarifa(String(tarifaEncontrada.valor));
                }
              }}
            >
              <SelectTrigger id="pais">
                <SelectValue placeholder="Escolha um país" />
              </SelectTrigger>
              <SelectContent>
                {tarifas.map((tarifa) => (
                  <SelectItem key={tarifa.codigo} value={tarifa.codigo}>
                    {tarifa.nomePt} ({tarifa.moeda} {tarifa.valor})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="tarifa">Tarifa (por kWh)</Label>
            <Input
              id="tarifa"
              value={tarifaPorKwh}
              onChange={(e) => setTarifa(e.target.value)}
              placeholder="ex: 0.75"
              aria-invalid={!!erros.tarifaPorKwh}
            />
            {erros.tarifaPorKwh && (
              <p className="text-sm text-destructive">{erros.tarifaPorKwh}</p>
            )}
          </div>
        </div>
        <Button type="submit" className="mt-6 w-full">
          Calcular
        </Button>

        {custos && (
          <div className="mt-6 grid grid-cols-3 gap-2 rounded-lg border border-border bg-muted/40 p-4 text-center">
            <div>
              <p className="text-xs text-muted-foreground">Diário</p>
              <p className="text-base font-semibold text-foreground">
                {custos.custoDiario.toFixed(2)}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Mensal</p>
              <p className="text-base font-semibold text-foreground">
                {custos.custoMensal.toFixed(2)}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Anual</p>
              <p className="text-base font-semibold text-foreground">
                {custos.custoAnual.toFixed(2)}
              </p>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default Calculadora;
