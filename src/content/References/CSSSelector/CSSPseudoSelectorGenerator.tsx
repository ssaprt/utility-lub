"use client";

import { DynamicSvgIcon } from "@/components/svg/DynamicSVGIcon";
import { useAppContextActions } from "@/context/appContext";
import { useAppRequestState } from "@/hooks/useAppRequestState";
import { useGetCssSelectorQuery } from "@/services/CSSSelector/css-selector.api";
import { useEffect } from "react";
import { Links } from "./Bottom/Links";
import { Status } from "./Bottom/Status";
import { BrowserSupport } from "./BrowserSupport/BrowserSupport";
import { ExampleSelector } from "./Example/ExampleSelector";
import { Provider } from "./Example/providers/CodeFieldProvider";
import { Header } from "./Header/Header";

const legacyPseudoElements = new Set([
    ":before",
    ":after",
    ":first-letter",
    ":first-line",
]);

export const CSSPseudoSelectorGenerator = ({ name }: { name: string }) => {
    const { data, isLoading, isFetching, isError, refetch } =
        useGetCssSelectorQuery({
            name,
        });

    const { header } = useAppContextActions();

    const { setIconHeader, setTitleHeader } = header;

    const isPseudoElement =
        name.startsWith("::") || legacyPseudoElements.has(name);

    const iconMeta = isPseudoElement ? "dots-double.svg" : "dots.svg";

    const descriptionMeta = isPseudoElement
        ? `CSS pseudo element ${name}`
        : `CSS pseudo class ${name}`;

    useAppRequestState({
        tag: `css-selector:${name}`,
        isLoading,
        isFetching,
        isError,
        hasData: Boolean(data),
        errorMessage: "Sorry. Failed to load data",
        onRetry: refetch,
    });

    useEffect(() => {
        setIconHeader(
            <DynamicSvgIcon
                name={
                    data?.type === "pseudo-class"
                        ? "dots.svg"
                        : "dots-double.svg"
                }
                className="w-8 h-8 fill-fg"
            />,
        );

        setTitleHeader(data?.name || "");
    }, [setIconHeader, setTitleHeader, data?.name, data?.type]);

    return (
        <>
            <div className="sr-only" data-pagefind-body>
                <span data-pagefind-meta="icon">{iconMeta}</span>

                <span data-pagefind-meta="description">{descriptionMeta}</span>

                <h3 data-pagefind-meta="title">{name}</h3>
            </div>

            {data && (
                <div className="col-start-2">
                    <Header name={name} />
                    {data.example?.html && (
                        <Provider>
                            <ExampleSelector name={name} />
                        </Provider>
                    )}
                    <BrowserSupport name={name} />
                    <Status name={name} />
                    <Links name={name} />
                </div>
            )}
        </>
    );
};
