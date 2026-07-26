import { Overlay } from "../overlay/Overlay";

export const RoundedOceanDepths = () => {
    return (
        <>
            <Overlay
                generalTitle="ROUNDED OCEAN DEPTHS"
                selectTheme="roundedOceanDepths"
                title="roundedOceanDepths"
                animationSpeed="400ms"
                className="[background:radial-gradient(circle_at_20%_20%,rgba(79,209,197,.25),transparent_40%),radial-gradient(circle_at_80%_80%,rgba(11,61,89,.4),transparent_50%),radial-gradient(circle_at_50%_50%,rgba(2,25,38,.3),transparent_60%),#020a12]"
            />
            <Overlay
                generalTitle="ROUNDED OCEAN DEPTHS VERTICAL"
                selectTheme="roundedOceanDepths"
                title="roundedOceanDepths"
                animationSpeed="400ms"
                mode="vertical"
                className="[background:radial-gradient(circle_at_20%_20%,rgba(79,209,197,.25),transparent_40%),radial-gradient(circle_at_80%_80%,rgba(11,61,89,.4),transparent_50%),radial-gradient(circle_at_50%_50%,rgba(2,25,38,.3),transparent_60%),#020a12]"
            />
        </>
    );
};
