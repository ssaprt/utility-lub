import { PrimaryLayout } from "@/layouts/primary/PrimaryLayout";
import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Manrope, Outfit } from "next/font/google";
import "popup-from-future/style.css";
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

const outfit = Outfit({
    subsets: ["latin"],
    variable: "--font-outfit",
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
            lang="en"
            className={`
                ${manrope.variable}
                ${inter.variable}
                ${jetBrainsMono.variable}
                ${outfit.variable}
                h-full
                antialiased
            `}
        >
            <body className="selection:bg-black/80">
                <PrimaryLayout>{children}</PrimaryLayout>
            </body>
        </html>
    );
}
