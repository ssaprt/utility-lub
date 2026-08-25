"use client";

import { DynamicSvgIcon } from "@/components/svg/DynamicSVGIcon";
import { useAppContextActions } from "@/context/appContext";
import { useAppRequestState } from "@/hooks/useAppRequestState";
import { useGetCssSelectorQuery } from "@/services/CSSSelector/css-selector.api";
import { useEffect } from "react";
import { BrowserSupport } from "./BrowserSupport/BrowserSupport";
import { ExampleSelector } from "./Example/ExampleSelector";
import { Provider } from "./Example/providers/CodeFieldProvider";
import { Header } from "./Header/Header";
import { TopHide } from "./TopHide";

export const CSSPseudoSelectorGenerator = ({ name }: { name: string }) => {
    const { data, isLoading, isFetching, isError, refetch } =
        useGetCssSelectorQuery({
            name,
        });

    const { header } = useAppContextActions();

    const { setIconHeader, setTitleHeader } = header;

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

    if (!data) {
        return null;
    }

    return (
        <div className="col-start-2">
            <TopHide name={name} />

            <Header name={name} />

            {data.example?.html && (
                <Provider>
                    <ExampleSelector name={name} />
                </Provider>
            )}

            <BrowserSupport name={name} />
        </div>
    );
};
