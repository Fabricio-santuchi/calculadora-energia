"use client";

import { Input } from "@/components/ui/input";
import { calculoSchema } from "@/lib/schema";
import { Button } from "@base-ui/react";
import { useState } from "react";
import { treeifyError } from "zod";

const Calculadora = () => {
  const [potencia, setPotencia] = useState<string>("");
  const [horasPorDia, setHoras] = useState<string>("");
  const [tarifaPorKwh, setTarifa] = useState<string>("");
  const [erros, setErros] = useState<Record<string, string>>({});

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
        } else {
          setErros({});
          console.log(resultado.data);
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

      <Button type="submit" className="bg-amber-300">
        test
      </Button>
    </form>
  );
};

export default Calculadora;
