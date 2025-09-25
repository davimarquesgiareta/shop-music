import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Importa a fonte correta e padrão
import "./globals.css";

// Inicializa a fonte
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Shop Music App",
  description: "Seu marketplace de instrumentos musicais",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      {/* Aplica a classe da fonte ao body */}
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}