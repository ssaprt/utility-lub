import { Scroll } from "../Scroll";
import styles from "./Main.module.css";

export const Main = ({ children }: { children: React.ReactNode }) => {
    return (
        <main className={styles.main} id="main">
            <Scroll />
            {children}
        </main>
    );
};
