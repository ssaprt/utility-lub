import { Overlay } from "../overlay/Overlay";

export const Dark = () => {
    return (
        <>
            <Overlay
                generalTitle="DARK"
                selectTheme="dark"
                title="dark"
                className="bg-gray-100"
                animationSpeed="400ms"
            />
            <Overlay
                generalTitle="DARK VERTICAL"
                selectTheme="dark"
                animationSpeed="400ms"
                title="dark"
                className="bg-gray-100"
                mode="vertical"
            />
        </>
    );
};
