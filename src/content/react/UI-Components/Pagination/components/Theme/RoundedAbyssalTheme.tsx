import { Overlay } from "../overlay/Overlay";

export const RoundedAbyssalTheme = () => {
    return (
        <>
            <Overlay
                generalTitle="ROUNDED ABYSSAL"
                selectTheme="roundedAbyssal"
                title="roundedAbyssal"
                animationSpeed="400ms"
                className="[background:radial-gradient(circle_at_30%_20%,rgba(255,140,0,.4),transparent_40%),radial-gradient(circle_at_75%_70%,rgba(255,60,0,.25),transparent_45%),radial-gradient(circle_at_50%_100%,rgba(120,20,0,.3),transparent_55%),#1a0600]"
            />
            <Overlay
                generalTitle="ROUNDED ABYSSAL VERTICAL"
                selectTheme="roundedAbyssal"
                title="roundedAbyssal"
                animationSpeed="400ms"
                mode="vertical"
                className="[background:radial-gradient(circle_at_30%_20%,rgba(255,140,0,.4),transparent_40%),radial-gradient(circle_at_75%_70%,rgba(255,60,0,.25),transparent_45%),radial-gradient(circle_at_50%_100%,rgba(120,20,0,.3),transparent_55%),#1a0600]"
            />
        </>
    );
};
