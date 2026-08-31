import { CategoryAccordion } from "../../CategoryAccordion/CategoryAccordion";
import { CSSMultiAccordion } from "./CSSMultiAccordion";
import { CSSViewer } from "./CSSViewer";

export const CSSUtils = () => {
    return (
        <CategoryAccordion title="CSS Utils" icon="utils.svg">
            <CSSMultiAccordion />
            <CSSViewer />
        </CategoryAccordion>
    );
};
