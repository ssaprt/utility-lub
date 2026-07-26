import { Overlay } from "../overlay/Overlay";

export const Blue = () => {
    return (
        <>
            <Overlay
                generalTitle="BLUE"
                selectTheme="blue"
                title="blue"
                className="bg-white/60"
                animationSpeed="400ms"
            />
            <Overlay
                generalTitle="BLUE VERTICAL"
                selectTheme="blue"
                animationSpeed="400ms"
                title="blue"
                className="bg-white/60"
                mode="vertical"
            />
        </>
    );
};
