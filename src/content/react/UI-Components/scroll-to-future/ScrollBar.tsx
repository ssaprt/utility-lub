import { ScrollToFuture, type ScrollToFutureConfig } from "scroll-to-future";

import { useEffect, useRef, type CSSProperties } from "react";

import styles from "./ScrollBar.module.scss";

const BLOCKS_COUNT = 30;

type BlockStyle = CSSProperties & {
    "--pink-opacity": number;
};

const randomBySeed = (seed: number): number => {
    let value = seed | 0;

    value = Math.imul(value ^ (value >>> 16), 0x21f0aaad);

    value = Math.imul(value ^ (value >>> 15), 0x735a2d97);

    value ^= value >>> 15;

    return (value >>> 0) / 4294967296;
};

const blocks = Array.from({ length: BLOCKS_COUNT }, (_, index) => {
    const random = randomBySeed(index + 1);

    const style: BlockStyle = {
        "--pink-opacity": Number((0.2 + random * 0.8).toFixed(2)),
    };

    return {
        id: index,
        style,
    };
});

export const ScrollBar = ({
    scrollBar,
    thumb,
    selectTheme,
    nativeOnMobile,
}: ScrollToFutureConfig) => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const mode = scrollBar?.mode ?? "both";

    const superimposition = scrollBar?.superimposition ?? "after";

    const hasHorizontalAxis = mode === "horizontal" || mode === "both";

    const hasVerticalAxis = mode === "vertical" || mode === "both";

    const shouldRemoveRightPadding =
        superimposition === "after" && hasVerticalAxis;

    const shouldRemoveBottomPadding =
        superimposition === "after" && hasHorizontalAxis;

    const scrollContainerClassName = [
        styles.scrollBar,

        shouldRemoveRightPadding ? styles.withoutRightPadding : "",

        shouldRemoveBottomPadding ? styles.withoutBottomPadding : "",
    ]
        .filter(Boolean)
        .join(" ");

    useEffect(() => {
        const container = scrollContainerRef.current;

        if (!container) {
            return;
        }

        const frameId = requestAnimationFrame(() => {
            container.scrollTo({
                top: container.scrollHeight,
                left: container.scrollWidth,

                behavior: "auto",
            });
        });

        return () => {
            cancelAnimationFrame(frameId);
        };
    }, [
        mode,
        superimposition,
        scrollBar?.positionMode,
        scrollBar?.heightTrack,
        scrollBar?.widthTrack,
    ]);

    return (
        <div ref={scrollContainerRef} className={scrollContainerClassName}>
            <ScrollToFuture
                target={scrollContainerRef}
                selectTheme={selectTheme}
                scrollBar={scrollBar}
                thumb={thumb}
                nativeOnMobile={nativeOnMobile}
            />

            <div
                className={[
                    styles.blocks,
                    hasHorizontalAxis ? styles.horizontal : "",
                ]
                    .filter(Boolean)
                    .join(" ")}
            >
                <span className="text-sm">
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                    Aenean commodo ligula eget dolor. Aenean massa. Cum sociis
                    natoque penatibus et magnis dis parturient montes, nascetur
                    ridiculus mus. Donec quam felis, ultricies nec, pellentesque
                    eu, pretium quis, sem. Nulla consequat massa quis enim.
                    Donec pede justo, fringilla vel, aliquet nec, vulputate
                    eget, arcu. In enim justo, rhoncus ut, imperdiet a,
                    venenatis vitae, justo. Nullam dictum felis eu pede mollis
                    pretium. Integer tincidunt. Cras dapibus. Vivamus elementum
                    semper nisi. Aenean vulputate eleifend tellus. Aenean leo
                    ligula, porttitor eu, consequat vitae, eleifend ac, enim.
                    Aliquam lorem ante, dapibus in, viverra quis, feugiat a,
                    tellus. Phasellus viverra nulla ut metus varius laoreet.
                    Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel
                    augue. Curabitur ullamcorper ultricies nisi. Nam eget dui.
                    Etiam rhoncus. Maecenas tempus, tellus eget condimentum
                    rhoncus, sem quam semper libero, sit amet adipiscing sem
                    neque sed ipsum. Nam quam nunc, blandit vel, luctus
                    pulvinar, hendrerit id, lorem. Maecenas nec odio et ante
                    tincidunt tempus. Donec vitae sapien ut libero venenatis
                    faucibus. Nullam quis ante. Etiam sit amet orci eget eros
                    faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet
                    nibh. Donec sodales sagittis magna. Sed consequat, leo eget
                    bibendum sodales, augue velit cursus nunc. Lorem ipsum dolor
                    sit amet, consectetuer adipiscing elit. Aenean commodo
                    ligula eget dolor. Aenean massa. Cum sociis natoque
                    penatibus et magnis dis parturient montes, nascetur
                    ridiculus mus. Donec quam felis, ultricies nec, pellentesque
                    eu, pretium quis, sem. Nulla consequat massa quis enim.
                    Donec pede justo, fringilla vel, aliquet nec, vulputate
                    eget, arcu. In enim justo, rhoncus ut, imperdiet a,
                    venenatis vitae, justo. Nullam dictum felis eu pede mollis
                    pretium. Integer tincidunt. Cras dapibus. Vivamus elementum
                    semper nisi. Aenean vulputate eleifend tellus. Aenean leo
                    ligula, porttitor eu, consequat vitae, eleifend ac, enim.
                    Aliquam lorem ante, dapibus in, viverra quis, feugiat a,
                    tellus. Phasellus viverra nulla ut metus varius laoreet.
                    Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel
                    augue. Curabitur ullamcorper ultricies nisi. Nam eget dui.
                    Etiam rhoncus. Maecenas tempus, tellus eget condimentum
                    rhoncus, sem quam semper libero, sit amet adipiscing sem
                    neque sed ipsum. Nam quam nunc, blandit vel, luctus
                    pulvinar, hendrerit id, lorem. Maecenas nec odio et ante
                    tincidunt tempus. Donec vitae sapien ut libero venenatis
                    faucibus. Nullam quis ante. Etiam sit amet orci eget eros
                    faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet
                    nibh. Donec sodales sagittis magna. Sed consequat, leo eget
                    bibendum sodales, augue velit cursus nunc.
                </span>
            </div>
        </div>
    );
};
