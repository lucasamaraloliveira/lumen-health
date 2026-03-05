import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lumen Health - Telerradiologia de Precisão",
  description: "Plataforma avançada de telerradiologia oferecendo diagnósticos precisos e ágeis para clínicas e hospitais.",
};

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="antialiased font-sans">
        {children}
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </body>
    </html>
  );
}
