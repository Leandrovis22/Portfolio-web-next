// src/app/layout.tsx

import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";
import { JetBrains_Mono, Nunito_Sans } from "next/font/google";

export const metadata: Metadata = {
  title: "Portfolio Leandro Viscolungo",
  description: "",
};

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  weight: ["200", "300", "400", "600", "700", "800", "900"],
  variable: "--font-nunitoSans",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-jetbrainsMono",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={nunitoSans.className + " " + jetbrainsMono.variable}>
      <Providers>
        {children}
      </Providers>
      </body>
    </html>
  );
};