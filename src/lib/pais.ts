import { tarifas } from "./data/tarifas";

/**
 * Recebe uma tag de idioma do navegador (ex: "en-GB", "pt-BR", "en-US") e
 * devolve o código do país correspondente, se ele existir em tarifas.ts.
 * Não acessa `navigator` diretamente, pra poder ser testada sem simular o navegador.
 */
export function detectarPaisPeloIdiomaDoNavegador(
  tagDeIdioma: string | undefined,
): string | null {
  if (!tagDeIdioma) return null;

  const regiao = tagDeIdioma.split("-")[1]?.toUpperCase();
  if (!regiao) return null;

  const encontrada = tarifas.find((tarifa) => tarifa.codigo === regiao);
  return encontrada ? encontrada.codigo : null;
}
