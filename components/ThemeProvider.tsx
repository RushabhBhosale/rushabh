"use client";

import {
  ThemeProvider as NextThemeProvider,
  ThemeProviderProps,
} from "next-themes";
import React, { useEffect, useState } from "react";

export function ThemeProvider({
  children,
  ...props
}: { children: React.ReactNode } & Omit<ThemeProviderProps, "default"> & {
    defaultTheme: string;
  }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <NextThemeProvider {...props} defaultTheme={props.defaultTheme}>
      {children}
    </NextThemeProvider>
  );
}
