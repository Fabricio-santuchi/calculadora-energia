"use client";

import { useState } from "react";
import Calculadora from "@/components/calculadora-form";
import { aparelhos, type Aparelho } from "@/lib/data/aparelhos";
import type { Idioma } from "@/lib/numero";
import { TEXTOS_INICIO } from "@/lib/textos";

type Props = {
  idioma: Idioma;
};

export default function CalculadoraGenerica({ idioma }: Props) {
  const t = TEXTOS_INICIO[idioma];
  const [aparelhoSelecionado, setAparelhoSelecionado] = useState<
    Aparelho | undefined
  >(undefined);

  const aparelhosDoIdioma = aparelhos.filter((a) => a.idiomas.includes(idioma));

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="aparelho-dropdown" className="text-sm font-semibold">
          {t.aparelhoLabel}
        </label>
        <select
          id="aparelho-dropdown"
          className="h-11 rounded-xl border border-input bg-card px-3"
          value={aparelhoSelecionado?.slugPt ?? "outro"}
          onChange={(e) => {
            const valor = e.target.value;
            if (valor === "outro") {
              setAparelhoSelecionado(undefined);
              return;
            }
            const encontrado = aparelhosDoIdioma.find(
              (a) => a.slugPt === valor,
            );
            setAparelhoSelecionado(encontrado);
          }}
        >
          <option value="outro">{t.aparelhoOutro}</option>
          {aparelhosDoIdioma.map((a) => (
            <option key={a.slugPt} value={a.slugPt}>
              {idioma === "pt" ? a.nomePt : a.nomeEn}
            </option>
          ))}
        </select>
      </div>

      <Calculadora
        key={aparelhoSelecionado?.slugPt ?? "outro"}
        idioma={idioma}
        aparelho={aparelhoSelecionado}
      />
    </div>
  );
}
