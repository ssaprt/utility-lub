import { PrimaryLayout } from "@/layouts/primary/PrimaryLayout";
import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Manrope } from "next/font/google";
import "scroll-to-future/style.css";
import "./css/globals.css";

const manrope = Manrope({
    subsets: ["latin"],
    variable: "--font-manrope",
    display: "swap",
});

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
    display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
    subsets: ["latin"],
    variable: "--font-jetbrains-mono",
    display: "swap",
});

export const metadata: Metadata = {
    title: "Utility Lab",
    description: "Your space for frontend development",
    icons: "/mana.svg",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="ru"
            className={`
                ${manrope.variable}
                ${inter.variable}
                ${jetBrainsMono.variable}
                h-full
                antialiased
            `}
        >
            <body>
                <PrimaryLayout>{children}</PrimaryLayout>
            </body>
        </html>
    );
}
