"use client";

import { useEffect, useState } from "react";
import { NextUIProvider } from '@nextui-org/react';
import { ThemeProvider as NextThemesProvider } from "next-themes";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [isMounted, setIsMounted] = useState(false);
  const [theme, setTheme] = useState<string | undefined>(undefined);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    document.documentElement.classList.add(savedTheme);
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div className="">

      <div className="h-screen relative bg-background text-text bg-[length:61px] dark:bg-grid-white/[0.02] bg-grid-black/[0.02]"></div>
      <div
        className="fixed inset-0 w-full h-full bg-repeat pointer-events-none z-[9999] opacity-[0.13] bg-[url('/Static.png')] bg-[length:64px]"
        style={{
          backgroundImage: 'url(/Static.png)',
          backgroundSize: '64px',
        }} />

    </div>;
  }

  return (
    <NextUIProvider>
      <NextThemesProvider attribute="class" defaultTheme={theme} enableSystem={false} disableTransitionOnChange>
        {children}
      </NextThemesProvider>
    </NextUIProvider>
  );
}
