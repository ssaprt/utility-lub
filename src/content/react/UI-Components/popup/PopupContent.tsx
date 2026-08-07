"use client";
import { HowUse } from "@/components/HowUse/HowUse";
import { Install } from "@/components/Install/Install";
import { TitlePost } from "@/components/titles/TitlePost/TitlePost";
import { useAppContextActions } from "@/context/appContext";
import Image from "next/image";
import { useEffect } from "react";
import { Example } from "./Example";
import { FullExample } from "./FullExample";
import { ImportantInfo } from "./ImportantInfo";
import { PerPhaseAnimation } from "./PerPhaseAnimation";
import { Popups } from "./Popups";
import { SelectAnimation } from "./SelectAnimation";

export const PopupContent = () => {
    const { header } = useAppContextActions();
    const { setIconHeader, setTitleHeader } = header || {};

    useEffect(() => {
        setIconHeader(
            <Image
                className="w-8 h-8"
                src="/popup.svg"
                alt="popup.svg"
                width={40}
                height={40}
            />,
        );
        setTitleHeader("Popup with timer hide");
    }, [setIconHeader, setTitleHeader]);

    return (
        <div className="flex flex-col gap-4">
            <TitlePost
                icon="popup.svg"
                description="Popup for React and Next.js."
                packageName="popup-from-future"
            >
                Popup with timer hide
            </TitlePost>

            <Install packageName="popup-from-future" />

            <HowUse>
                <ImportantInfo />
                <Example />
                <SelectAnimation />
                <PerPhaseAnimation />
                <FullExample />
            </HowUse>

            <Popups />
        </div>
    );
};
