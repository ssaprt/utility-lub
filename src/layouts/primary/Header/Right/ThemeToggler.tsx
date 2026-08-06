import { useTheme } from "next-themes";

export const ThemeToggler = () => {
    const { theme, setTheme } = useTheme();

    return (
        <div
            className=""
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
            ss
        </div>
    );
};
