import type { Metadata } from "next";
import "./globals.css"; // C'est ici qu'on connecte ton fichier CSS Tailwind

export const metadata: Metadata = {
  title: "Schuss - L'app de ski suisse",
  description: "De la gare au sommet.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}