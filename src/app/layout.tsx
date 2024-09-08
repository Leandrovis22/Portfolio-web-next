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
      <body className={nunitoSans.className + " " + jetbrainsMono.variable + " " + "antialiased"}>
        <Providers>
          <div className="relative bg-white dark:bg-[#0B0B0E] bg-[length:61px] bg-white dark:bg-grid-white/[0.06] bg-grid-black/[0.06]">
            {children}
          </div>
          {/* La capa está fija en el fondo para efectos visuales */}
          <div
            className="fixed inset-0 w-full h-full bg-repeat pointer-events-none z-[9999] opacity-[0.13]"
            style={{
              backgroundImage: 'url(/Static.png)',
              backgroundSize: '64px',
            }}
          />
        </Providers>
      </body>
    </html>
  );
};
