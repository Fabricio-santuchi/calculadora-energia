"use client";

import { calcularCusto } from "@/lib/calculo";
import { Input } from "@/components/ui/input";
import { calculoSchema } from "@/lib/schema";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { treeifyError } from "zod";

const Calculadora = () => {
  const [potencia, setPotencia] = useState<string>("");
  const [horasPorDia, setHoras] = useState<string>("");
  const [tarifaPorKwh, setTarifa] = useState<string>("");
  const [erros, setErros] = useState<Record<string, string>>({});
  const [custos, setCustos] = useState<{
    custoDiario: number;
    custoMensal: number;
    custoAnual: number;
  } | null>(null);

  return (
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
            tarifaPorKwh: arvoreErros.properties?.tarifaPorKwh?.errors[0] ?? "",
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
    >
      <Input
        value={potencia}
        onChange={(e) => setPotencia(e.target.value)}
        placeholder="potência"
      />
      {erros.potencia && <p>{erros.potencia}</p>}

      <Input
        value={horasPorDia}
        onChange={(e) => setHoras(e.target.value)}
        placeholder="horas por dia"
      />
      {erros.horasPorDia && <p>{erros.horasPorDia}</p>}

      <Input
        value={tarifaPorKwh}
        onChange={(e) => setTarifa(e.target.value)}
        placeholder="Tarifa"
      />
      {erros.tarifaPorKwh && <p>{erros.tarifaPorKwh}</p>}

      <Button type="submit">
        Calcular
      </Button>
      {custos && (
        <div>
          <p>Diário: {custos.custoDiario.toFixed(2)}</p>
          <p>Mensal: {custos.custoMensal.toFixed(2)}</p>
          <p>Anual: {custos.custoAnual.toFixed(2)}</p>
        </div>
      )}
    </form>
  );
};

export default Calculadora;
