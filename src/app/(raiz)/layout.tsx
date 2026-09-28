import type { Metadata } from "next";
import { fraunces, plexSans, plexMono } from "../fonts";
import { NOME_DO_SITE } from "@/lib/site";
import "../globals.css";

export const metadata: Metadata = {
  title: NOME_DO_SITE,
  description: "Calculate how much it costs to leave your appliances on.",
};

export default function RaizLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${plexSans.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
