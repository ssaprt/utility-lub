import { DynamicSvgIcon } from "@/components/svg/DynamicSVGIcon";
import { CategoryTitle } from "../../../../components/CategoryTitle/CategoryTitle";
import { CSSGenerator } from "./CSSResours/CSSGenerator";
import { CSSCompiler } from "./CSSUtils/CSSCompiler";
import { CSSViewer } from "./CSSUtils/CSSViewer";

export const CSS = () => {
    return (
        <>
            <CategoryTitle
                icon={
                    <DynamicSvgIcon
                        name="css.svg"
                        className="w-[20px] h-[20px] fill-app"
                    />
                }
            >
                CSS Resources
            </CategoryTitle>
            <CSSGenerator />

            <CategoryTitle
                icon={
                    <DynamicSvgIcon
                        name="utils.svg"
                        className="w-[20px] h-[20px] fill-app"
                    />
                }
            >
                CSS Utils
            </CategoryTitle>
            <CSSCompiler />
            <CSSViewer />
        </>
    );
};
