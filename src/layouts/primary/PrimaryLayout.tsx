"use client";
import { Hr } from "@/components/hr/Hr/Hr";
import { AppContextProvider } from "@/context/appContext";

import { AIAvailability, getAIAvailability } from "@/AI/getAvalibility";
import { MountLoader } from "@/components/loader/MountLoader";
import { TooltipProvider } from "@ssaprt/tooltip";
import "@ssaprt/tooltip/style.css";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Header } from "./Header/Header";
import { Main } from "./Main/Main";
import { Menu } from "./Menu/Menu";

export const PrimaryLayout = ({ children }: { children: React.ReactNode }) => {
    const { resolvedTheme } = useTheme();
    const [ai, setAI] = useState<AIAvailability | null>(null);
    useEffect(() => {
        const f = async () => setAI(await getAIAvailability());
        f();
    }, []);

    return (
        <AppContextProvider>
            <TooltipProvider
                defaultRenderPosition="top"
                customTheme={{
                    body: {
                        background: "var(--foreground)",
                        filter: "none",
                        className: "text-app!",
                    },
                }}
            >
                <MountLoader />
                <Menu data-pagefind-ignore />

                <div className="hidden h-full shrink-0 lg:block">
                    <Hr mode="vertical" />
                </div>

                <div
                    id="primary_layout"
                    className="
                    relative
                    z-[1001]
                    flex
                    h-full
                    w-full
                    shrink-0
                    flex-col
                    overflow-visible

                    lg:w-auto
                    lg:min-w-0
                    lg:flex-1
                    lg:basis-0
                    lg:shrink
                "
                >
                    <Header data-pagefind-ignore />

                    <div className="shrink-0">
                        <Hr mode="horizontal" size={1} />
                    </div>

                    <Main ai={ai}>{children}</Main>
                </div>
            </TooltipProvider>
        </AppContextProvider>
    );
};
