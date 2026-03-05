import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lumen Health - Telerradiologia de Precisão",
  description: "Plataforma avançada de telerradiologia oferecendo diagnósticos precisos e ágeis para clínicas e hospitais.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
