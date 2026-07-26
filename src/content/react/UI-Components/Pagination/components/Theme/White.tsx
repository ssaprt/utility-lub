import { Overlay } from "../overlay/Overlay";

export const White = () => {
    return (
        <>
            <Overlay
                generalTitle="WHITE"
                selectTheme="white"
                title="white"
                className="[background:#262626]"
                animationSpeed="400ms"
            />
            <Overlay
                generalTitle="WHITE VERTICAL"
                selectTheme="white"
                title="white"
                className="[background:#262626]"
                mode="vertical"
                animationSpeed="400ms"
            />
        </>
    );
};
