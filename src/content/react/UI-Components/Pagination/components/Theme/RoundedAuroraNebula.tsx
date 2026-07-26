import { Overlay } from "../overlay/Overlay";

export const RoundedAuroraNebula = () => {
    return (
        <>
            <Overlay
                generalTitle="ROUNDED AURORA NEBULA"
                selectTheme="roundedAuroraNebula"
                title="roundedAuroraNebula"
                animationSpeed="400ms"
                className="[background:radial-gradient(circle_at_20%_20%,rgba(139,92,255,.35),transparent_40%),radial-gradient(circle_at_80%_15%,rgba(34,211,238,.25),transparent_35%),radial-gradient(circle_at_50%_100%,rgba(88,28,135,.3),transparent_50%),#05040f]"
            />
            <Overlay
                generalTitle="ROUNDED AURORA NEBULA VERTICAL"
                selectTheme="roundedAuroraNebula"
                title="roundedAuroraNebula"
                animationSpeed="400ms"
                mode="vertical"
                className="[background:radial-gradient(circle_at_20%_20%,rgba(139,92,255,.35),transparent_40%),radial-gradient(circle_at_80%_15%,rgba(34,211,238,.25),transparent_35%),radial-gradient(circle_at_50%_100%,rgba(88,28,135,.3),transparent_50%),#05040f]"
            />
        </>
    );
};
