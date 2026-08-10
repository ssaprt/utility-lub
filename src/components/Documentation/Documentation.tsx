import { IconCheck, IconCopy } from "@tabler/icons-react";
import { useState } from "react";

import {
    EveryPagination,
    InstallationType,
} from "@/content/react/UI-Components/Pagination/context/useEveryPagination";
import { Code } from "./Code";

export const Documentation = (props: InstallationType) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(props.code);

        setCopied(true);

        window.setTimeout(() => {
            setCopied(false);
        }, 1500);
    };

    return (
        <EveryPagination.Provider value={{ install: props }}>
            <div
                className="
                    relative
                    flex
                    min-h-0
                    min-w-0
                    w-full
                    flex-1
                    flex-col
                    items-start
                    gap-[0.5em]
                    text-[clamp(11px,1vw,16px)]
                "
            >
                <div
                    className="
                        relative
                        flex
                        min-h-0
                        min-w-0
                        w-full
                        flex-1
                        flex-col
                    "
                >
                    <button
                        type="button"
                        onClick={handleCopy}
                        className="
                            absolute
                            right-[0.75em]
                            top-[0.75em]
                            z-10
                            flex
                            items-center
                            gap-[0.4em]
                            rounded-[0.4em]
                            bg-zinc-700/70
                            px-[0.75em]
                            py-[0.4em]
                            text-[0.85em]
                            text-white
                            transition-colors
                            hover:cursor-pointer
                            hover:bg-zinc-700
                        "
                    >
                        {copied ? (
                            <>
                                <IconCheck
                                    className="
                                        h-[1.15em]
                                        w-[1.15em]
                                        shrink-0
                                    "
                                />

                                <span>Copied</span>
                            </>
                        ) : (
                            <>
                                <IconCopy
                                    className="
                                        h-[1.15em]
                                        w-[1.15em]
                                        shrink-0
                                    "
                                />

                                <span>Copy</span>
                            </>
                        )}
                    </button>

                    <Code />
                </div>
            </div>
        </EveryPagination.Provider>
    );
};
