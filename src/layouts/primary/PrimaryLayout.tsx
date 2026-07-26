"use client";

import { Hr } from "@/components/hr/Hr/Hr";
import { AppContextProvider } from "@/context/appContext";

import { MountLoader } from "@/components/loader/MountLoader";
import { Header } from "./Header/Header";
import { Main } from "./Main/Main";
import { Menu } from "./Menu/Menu";

export const PrimaryLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <AppContextProvider>
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
                    <Hr mode="horizontal" />
                </div>

                <Main>{children}</Main>
            </div>
        </AppContextProvider>
    );
};
