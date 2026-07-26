import { useAppContextValues } from "@/context/appContext";
import { BackPlate } from "./BackPlate";
import { BoxForAnimations } from "./BoxForAnimations";
import styles from "./Header.module.css";
import { Left } from "./Left/Left";
import { Right } from "./Right/Right";

export const Header = () => {
    const isScrolled = useAppContextValues()?.header?.isScrolled;

    return (
        <header
            id="main-header"
            className={`${styles.header} ${isScrolled && styles.scrolled} flex flex-row w-full justify-between px-2 py-2 h-[60px] relative backdrop-blur-[12px]`}
        >
            <Left />
            <Right />
            <BoxForAnimations />
            <BackPlate />
        </header>
    );
};
