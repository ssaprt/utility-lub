"use client";

import { IconDownload, IconFileNeutral } from "@tabler/icons-react";
import { useEffect, useState, type ReactNode } from "react";
import { Loader } from "../animationIcons/Loader/Loader";
import { GeneralButton } from "../button/GeneralButton/GeneralButton";

type Status = "loading" | "success" | "error";

export const DataLoader = ({
    children,
    responseFn,
    errorText = "Failed to load data",
}: {
    children: ReactNode;
    responseFn: () => Promise<unknown>;
    errorText?: string;
}) => {
    const [status, setStatus] = useState<Status>("loading");

    const load = async () => {
        setStatus("loading");

        try {
            const success = await responseFn();

            setStatus(success ? "success" : "error");
        } catch {
            setStatus("error");
        }
    };

    useEffect(() => {
        async function init() {
            void load();
        }

        init();
    }, []);

    return (
        <div
            className="relative min-h-10 w-full"
            aria-busy={status === "loading"}
        >
            {status === "loading" && <Loader visible mode="wave" />}

            {status === "error" && (
                <div className="row-center-2 data-loader-fade-in">
                    <IconFileNeutral className="w-8 h-8 shrink-0" />

                    <span className="text-sm">{errorText}</span>

                    <GeneralButton
                        icon={<IconDownload className="w-4 h-4" />}
                        handleAction={() => {
                            void load();
                        }}
                        textButton="Try again"
                    />
                </div>
            )}

            {status === "success" && (
                <div className="data-loader-fade-in">{children}</div>
            )}
        </div>
    );
};
