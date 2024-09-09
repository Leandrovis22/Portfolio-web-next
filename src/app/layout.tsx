// src/app/layout.tsx

import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";
import { Nunito_Sans } from "next/font/google";

export const metadata: Metadata = {
  title: "Portfolio Leandro Viscolungo",
  description: "",
};

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  weight: ["200", "300", "400", "600", "700", "800", "900"],
  variable: "--font-nunitoSans",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={nunitoSans.className + " " + "antialiased"}>
        <Providers>
          <div className="relative bg-background text-text bg-[length:61px] dark:bg-grid-white/[0.02] bg-grid-black/[0.02]">
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
