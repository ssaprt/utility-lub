import { CategoryAccordion } from "../../CategoryAccordion/CategoryAccordion";
import { CSSCompiler } from "./CSSCompiler";
import { CSSViewer } from "./CSSViewer";

export const CSSUtils = () => {
    return (
        <CategoryAccordion title="CSS Utils" icon="utils.svg">
            <CSSCompiler />
            <CSSViewer />
        </CategoryAccordion>
    );
};
