import { CategoryTitle } from "@/components/CategoryTitle/CategoryTitle";
import { DynamicSvgIcon } from "@/components/svg/DynamicSVGIcon";
import { CSSCompiler } from "./CSSCompiler";
import { CSSViewer } from "./CSSViewer";

export const CSSUtils = () => {
    return (
        <div className="relative px-2 py-1 rounded-lg bg-fg/10">
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
        </div>
    );
};
