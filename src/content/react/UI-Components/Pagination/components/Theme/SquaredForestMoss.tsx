import { Overlay } from "../overlay/Overlay";

export const SquaredForestMoss = () => {
    return (
        <>
            <Overlay
                generalTitle="SQUARED FOREST MOSS"
                selectTheme="squaredForestMoss"
                title="SquaredForestMoss"
                animationSpeed="400ms"
                className="[background:radial-gradient(circle_at_25%_25%,rgba(123,160,91,.25),transparent_40%),radial-gradient(circle_at_75%_75%,rgba(107,68,35,.2),transparent_45%),radial-gradient(circle_at_50%_100%,rgba(20,30,10,.3),transparent_55%),#0c1207]"
            />
            <Overlay
                generalTitle="SQUARED FOREST MOSS VERTICAL"
                selectTheme="squaredForestMoss"
                title="SquaredForestMoss"
                animationSpeed="400ms"
                mode="vertical"
                className="[background:radial-gradient(circle_at_25%_25%,rgba(123,160,91,.25),transparent_40%),radial-gradient(circle_at_75%_75%,rgba(107,68,35,.2),transparent_45%),radial-gradient(circle_at_50%_100%,rgba(20,30,10,.3),transparent_55%),#0c1207]"
            />
        </>
    );
};
