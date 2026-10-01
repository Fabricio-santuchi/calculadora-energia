"use client";
import { Info } from "lucide-react";
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
  /** Falso na página de aparelho: o h1 dela já diz o que é (espec 4.1). */
  exibirCabecalho?: boolean;
  /** Campos opcionais da espec 5 (variações por aparelho), vindos do conteúdo. */
  rotuloPotencia?: string;
  notaPotencia?: string;
  notaTempo?: string;
  avisoResultado?: string;
  /** Caixa entre potência e tempo (só a geladeira usa, por ora). */
  explicacao?: { titulo: string; texto: string };
};

// Estilo do atalho escolhido (aria-pressed="true"): fundo e borda âmbar.
// Altura mínima 40px no computador, 44 no celular (espec 1, "Chip de atalho").
const CLASSE_ATALHO =
  "min-h-10 xs:min-h-11 rounded-full font-mono aria-pressed:border-[#E8A317] aria-pressed:bg-[#FBE7B8] aria-pressed:text-foreground";

const Calculadora = ({
  idioma,
  aparelho,
  exibirCabecalho = true,
  rotuloPotencia,
  notaPotencia,
  notaTempo,
  avisoResultado,
  explicacao,
}: Props) => {
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

  // Dois formatos bem diferentes: o compacto de hoje (inicial, cabe num
  // cartão) e o de 2 colunas da página de aparelho (espec 4.2) — por isso
  // as classes do container e dos campos mudam conforme `exibirCabecalho`.
  const classeForm = exibirCabecalho
    ? "w-full max-w-sm rounded-[20px] border border-border bg-card p-6 shadow-sm"
    : "w-full overflow-hidden rounded-[20px] border border-foreground shadow-[0_1px_0_#1B1A17,0_24px_48px_-24px_rgba(27,26,23,0.25)] lg:grid lg:grid-cols-2";
  // Grid de 2 colunas ativo desde o celular (Mobile.dc.html): País e
  // Potência ocupam as 2 colunas inteiras (col-span-2, viram sua própria
  // linha), Tempo e Preço ficam 1 coluna cada, lado a lado — mesmo grid,
  // sem reordenar nada. No computador (lg:) volta a ser 1 coluna só
  // (espec 4.2), com todos os campos empilhados.
  const classeCampos = exibirCabecalho
    ? "mt-6 flex flex-col gap-4"
    : "grid grid-cols-2 gap-x-4 gap-y-4 bg-card p-5 xs:p-6 md:gap-7 md:p-8 lg:flex lg:flex-col lg:p-10";

  return (
    <form
      // O cálculo é ao vivo: não existe "enviar". Sem isso, apertar Enter
      // num campo recarregava a página e apagava tudo.
      onSubmit={(e) => e.preventDefault()}
      className={classeForm}
    >
      {exibirCabecalho && (
        <>
          <h2 className="font-heading text-lg font-semibold text-foreground">
            {t.titulo}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">{t.subtitulo}</p>
        </>
      )}
      <div className={classeCampos}>
        {/* Ordem espec 4.2: País → Potência → Tempo → Preço. */}
        <div className="col-span-2 flex flex-col gap-1.5">
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
            {/* !h-[52px]: o SelectTrigger tem "data-[size=default]:h-8"
                embutido, que é mais específico em CSS que uma classe comum
                — sem o "!" (important), o h-8 sempre ganharia. */}
            <SelectTrigger id="pais" className="h-13! w-full">
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

        <div className="col-span-2 flex flex-col gap-1.5">
          <Label htmlFor="potencia">{rotuloPotencia ?? t.potencia}</Label>
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
              className="- pr-10 font-mono"
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
          {notaPotencia && (
            <p className="text-xs text-muted-foreground">{notaPotencia}</p>
          )}
        </div>

        {/* Caixa de explicação (espec 5) entre potência e tempo — só a
            geladeira usa por enquanto ("Por que 50 W e não o valor da
            etiqueta?"). */}
        {explicacao && (
          <div className="col-span-2 flex gap-3 rounded-[14px] bg-secondary p-4">
            <Info className="mt-0.5 size-4.5 shrink-0 text-muted-foreground" />
            <div>
              <p className="text-[16px] font-semibold text-foreground">
                {explicacao.titulo}
              </p>
              <p className="mt-1 text-[15px] text-muted-foreground">
                {explicacao.texto}
              </p>
            </div>
          </div>
        )}

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
              className="h-13 pr-20 font-mono"
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
          {notaTempo && (
            <p className="text-xs text-muted-foreground">{notaTempo}</p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="tarifa">{t.tarifa}</Label>
          <div className="relative">
            <Input
              id="tarifa"
              value={tarifaPorKwh}
              onChange={(e) => setTarifa(e.target.value)}
              onBlur={() =>
                setTocados((atual) => ({ ...atual, tarifa: true }))
              }
              placeholder={idioma === "pt" ? "ex: 1,05" : "ex: 0.18"}
              inputMode="decimal"
              className="h-13 pr-20 font-mono"
              aria-invalid={!!(tocados.tarifa && erroTarifa)}
              aria-describedby={
                tocados.tarifa && erroTarifa ? "tarifa-erro" : "tarifa-ajuda"
              }
            />
            <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center font-mono text-sm text-muted-foreground">
              {moeda}/kWh
            </span>
          </div>
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
            <p className="rounded-[10px] bg-accent px-3 py-2.5 text-[13px] text-foreground">
              {notaDoPais}
            </p>
          )}
        </div>
      </div>
      <ResultadoPainel
        custos={custos}
        custoUnitario={custoUnitario}
        rotuloUnitario={rotuloUnitario}
        moeda={moeda}
        idioma={idioma}
        compacto={exibirCabecalho}
        fonteNome={tarifaDoPais?.fonte.nome}
        dataAtualizacao={tarifaDoPais?.atualizadoEm}
        avisoResultado={avisoResultado}
      />
    </form>
  );
};

export default Calculadora;
