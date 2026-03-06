import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lumen Health - Telerradiologia de Precisão",
  description: "Plataforma avançada de telerradiologia oferecendo diagnósticos precisos e ágeis para clínicas e hospitais.",
};

import { GoogleTagManager } from '@next/third-parties/google';
import ToastProvider from './components/ToastProvider';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://picsum.photos" />
        <link rel="preconnect" href="https://i.pravatar.cc" />
        <link rel="dns-prefetch" href="https://picsum.photos" />
        <link rel="dns-prefetch" href="https://i.pravatar.cc" />
      </head>
      <body className={`${inter.variable} ${outfit.variable} antialiased font-sans`}>
        {children}
        <ToastProvider />
        <GoogleTagManager gtmId="GTM-XXXXXXX" />
      </body>
    </html>
  );
}
