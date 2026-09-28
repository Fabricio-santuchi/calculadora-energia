import { dividirNegrito } from "@/lib/negrito";

export default function TextoComNegrito({ texto }: { texto: string }) {
  return (
    <>
      {dividirNegrito(texto).map((trecho, indice) =>
        trecho.negrito ? (
          <strong key={indice} className="font-semibold text-foreground">
            {trecho.texto}
          </strong>
        ) : (
          <span key={indice}>{trecho.texto}</span>
        ),
      )}
    </>
  );
}
