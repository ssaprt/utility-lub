"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ReactNode } from "react";

export const thems = ["light", "dark", "midnight", "tree"];

export const AppThemeProvider = ({ children }: { children: ReactNode }) => {
    return (
        <NextThemesProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            themes={thems}
        >
            {children}
        </NextThemesProvider>
    );
};
