import { CategoryAccordion } from "../CategoryAccordion/CategoryAccordion";
import { CSSGenerator } from "./CSSResours/CSSGenerator";

export const CSS = () => {
    return (
        <CategoryAccordion title="CSS Resources" icon="css.svg">
            <CSSGenerator />
        </CategoryAccordion>
    );
};
