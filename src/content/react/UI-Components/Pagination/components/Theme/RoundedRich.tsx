import { Overlay } from "../overlay/Overlay";

export const RoundedRich = () => {
    return (
        <>
            <Overlay
                generalTitle="ROUNDED RICH"
                selectTheme="roundedRich"
                title="roundedRich"
                className="[background:#262626]"
                animationSpeed="300ms"
                indexing={{
                    mode: "url",
                    key: "roundedRich",
                }}
            />
            <Overlay
                generalTitle="ROUNDED RICH VERTICAL"
                selectTheme="roundedRich"
                title="roundedRich"
                className="[background:#262626]"
                mode="vertical"
                animationSpeed="300ms"
                indexing={{
                    mode: "url",
                    key: "roundedRichVertical",
                }}
            />
        </>
    );
};
