export interface Trecho {
  texto: string;
  negrito: boolean;
}

/**
 * Quebra "um **dois** três" em trechos: [um ][dois (negrito)][ três].
 * Serve pra mostrar negrito sem usar HTML cru (dangerouslySetInnerHTML).
 * Asterisco sem par fica como texto normal.
 */
export function dividirNegrito(texto: string): Trecho[] {
  const partes = texto.split("**");
  if (partes.length % 2 === 0) return [{ texto, negrito: false }];

  return partes
    .map((parte, indice) => ({ texto: parte, negrito: indice % 2 === 1 }))
    .filter((trecho) => trecho.texto !== "");
}
