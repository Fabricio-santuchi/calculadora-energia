export function generateStaticParams() {
  return [{ lang: "en" }];
}

export default function LangLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
