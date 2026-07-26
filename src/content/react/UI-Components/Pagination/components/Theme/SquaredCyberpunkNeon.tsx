import { Overlay } from "../overlay/Overlay";

export const SquaredCyberpunkNeon = () => {
    return (
        <>
            <Overlay
                generalTitle="SQUARED CYBERPUNK NEON"
                selectTheme="squaredCyberpunkNeon"
                title="squaredCyberpunkNeon"
                animationSpeed="400ms"
                className="[background:radial-gradient(circle_at_20%_20%,rgba(255,46,136,.3),transparent_35%),radial-gradient(circle_at_80%_10%,rgba(0,246,255,.25),transparent_30%),radial-gradient(circle_at_50%_100%,rgba(123,0,255,.2),transparent_45%),#05010a]"
            />
            <Overlay
                generalTitle="SQUARED CYBERPUNK NEON VERTICAL"
                selectTheme="squaredCyberpunkNeon"
                title="squaredCyberpunkNeon"
                animationSpeed="400ms"
                mode="vertical"
                className="[background:radial-gradient(circle_at_20%_20%,rgba(255,46,136,.3),transparent_35%),radial-gradient(circle_at_80%_10%,rgba(0,246,255,.25),transparent_30%),radial-gradient(circle_at_50%_100%,rgba(123,0,255,.2),transparent_45%),#05010a]"
            />
        </>
    );
};
