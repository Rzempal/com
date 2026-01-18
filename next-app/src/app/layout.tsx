import type { Metadata } from "next";
import { Poppins, Share_Tech_Mono, Orbitron } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const shareTechMono = Share_Tech_Mono({
  variable: "--font-share-tech-mono",
  subsets: ["latin"],
  weight: "400",
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "RAPALA//SYS - michalrapala.com",
  description: "Portfolio Michała Rapały - Inżynier CAD/CAM/AI, Developer aplikacji mobilnych i webowych.",
  keywords: ["portfolio", "developer", "CAD", "CAM", "AI", "robotyka", "aplikacje", "web"],
  authors: [{ name: "Michał Rapała" }],
  openGraph: {
    title: "RAPALA//SYS",
    description: "System Control Interface - Portfolio",
    type: "website",
    locale: "pl_PL",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body
        className={`${poppins.variable} ${shareTechMono.variable} ${orbitron.variable} antialiased`}
      >
        {/* Grid Background */}
        <div className="grid-bg" />
        {children}
      </body>
    </html>
  );
}
