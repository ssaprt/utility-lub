import { Overlay } from "../overlay/Overlay";

export const LightBlue = () => {
    return (
        <>
            <Overlay
                generalTitle="LIGHT BLUE"
                selectTheme="lightBlue"
                title="lightBlue"
                animationSpeed="400ms"
                className="bg-gray-900"
            />
            <Overlay
                generalTitle="LIGHT BLUE VERTICAL"
                selectTheme="lightBlue"
                title="lightBlue"
                animationSpeed="400ms"
                className="bg-gray-900"
                mode="vertical"
            />
        </>
    );
};
