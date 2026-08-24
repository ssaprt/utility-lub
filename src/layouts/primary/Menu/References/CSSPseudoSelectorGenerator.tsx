"use client";
import { Loader } from "@/components/animationIcons/Loader/Loader";
import { DynamicSvgIcon } from "@/components/svg/DynamicSVGIcon";
import { useAppContextActions } from "@/context/appContext";
import { useGetCssSelectorQuery } from "@/services/CSSSelector/css-selector.api";
import { useEffect } from "react";
import { BrowserSupport } from "./BrowserSupport/BrowserSupport";
import { ExampleSelector } from "./Example/ExampleSelector";
import { Provider } from "./Example/providers/CodeFieldProvider";
import { Header } from "./Header/Header";
import { TopHide } from "./TopHide";

export const CSSPseudoSelectorGenerator = ({ name }: { name: string }) => {
    const { data, isLoading, isFetching, isError, error } =
        useGetCssSelectorQuery({
            name,
        });

    const { header } = useAppContextActions();
    const { setIconHeader, setTitleHeader } = header || {};

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

    console.log(data);

    if (isLoading) return <Loader mode="wave" visible />;
    return (
        <div className="col-start-2">
            <TopHide name={name} />
            <Header name={name} />
            {data?.example?.html && (
                <Provider>
                    <ExampleSelector name={name} />
                </Provider>
            )}
            <BrowserSupport name={name} />
        </div>
    );
};
