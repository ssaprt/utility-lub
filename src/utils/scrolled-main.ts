export const detectedScrollMain = (
    callback: (config: {
        main: HTMLElement;
        scroll: { scrollTop: number; scrolled: boolean };
        position: { x: number; y: number };
        sizes: { width: number; height: number };
    }) => void,
) => {
    const main = document.querySelector<HTMLElement>("#main");

    if (!main) return;

    const handleScroll = () => {
        const rect = main.getBoundingClientRect();

        callback({
            main,
            scroll: {
                scrollTop: main.scrollTop,
                scrolled: main.scrollTop > 0,
            },
            position: {
                x: rect.left,
                y: rect.top,
            },
            sizes: {
                width: main.offsetWidth,
                height: main.offsetHeight,
            },
        });
    };

    main.addEventListener("scroll", handleScroll);

    handleScroll();

    const frame = requestAnimationFrame(handleScroll);

    return () => {
        cancelAnimationFrame(frame);
        main.removeEventListener("scroll", handleScroll);
    };
};
