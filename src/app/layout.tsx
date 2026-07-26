import { PrimaryLayout } from "@/layouts/primary/PrimaryLayout";
import type { Metadata, Viewport } from "next";
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
    appleWebApp: {
        capable: true,
        statusBarStyle: "black-translucent",
    },
};

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    viewportFit: "cover",
    themeColor: "#7356d1",
    colorScheme: "dark",
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
