"use client";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@/components/theme-provider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider data-oid="_eovg.0">
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        data-oid="h95s6pr"
      >
        {children}
      </ThemeProvider>
    </SessionProvider>
  );
}
