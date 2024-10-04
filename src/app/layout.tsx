// src/app/layout.tsx

import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "Portfolio Leandro Viscolungo",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="nunito-sans">
      <body className="antialiased">
        <Providers>
          <div className="relative bg-background text-text bg-[length:61px] dark:bg-grid-white/[0.02] bg-grid-black/[0.02]">
            {children}
          </div>
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
}