import { useEffect, useState } from "react";

export const useDetectedScrollMain = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const header = document.querySelector(
                "#main-header",
            ) as HTMLDivElement;
            if (header) {
                const body = document.querySelector("#main") as HTMLBodyElement;
                if (body.scrollTop > 0) {
                    setIsScrolled(true);
                } else {
                    setIsScrolled(false);
                    header.classList.remove("shadow-black", "shadow-lg/40");
                    (header.children[0] as HTMLDivElement).classList.remove(
                        "[background:var(--bg)]",
                        "opacity-70",
                    );
                }
            }
        };
        document
            .querySelector("#main")!
            .addEventListener("scroll", handleScroll);
        return () => {
            document
                .querySelector("#main")!
                .removeEventListener("scroll", handleScroll);
        };
    }, []);

    return isScrolled;
};
