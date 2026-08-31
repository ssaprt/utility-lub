import { useAppContextValues } from "@/context/appContext";
import { BoxForAnimations } from "./BoxForAnimations";
import styles from "./Header.module.css";
import { Left } from "./Left/Left";
import { Right } from "./Right/Right";

export const Header = () => {
    const isScrolled =
        useAppContextValues()?.header?.isScrolled.scroll.scrolled;

    return (
        <header
            id="main-header"
            className={`
                ${styles.header}
                ${isScrolled ? styles.scrolled : ""}
                relative
                flex
                h-[60px]
                w-full
                min-w-0
                flex-row
                items-center
                px-2
                py-2
            `}
        >
            <Left />
            <Right />
            <BoxForAnimations />
        </header>
    );
};
