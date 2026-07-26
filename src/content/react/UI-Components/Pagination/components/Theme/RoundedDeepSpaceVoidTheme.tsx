import { Overlay } from "../overlay/Overlay";

export const RoundedDeepSpaceVoidTheme = () => {
    return (
        <>
            <Overlay
                generalTitle="ROUNDED DEEP SPACE VOID"
                selectTheme="roundedDeepSpaceVoid"
                title="roundedDeepSpaceVoid"
                animationSpeed="400ms"
                className="[background:radial-gradient(circle_at_15%_25%,rgba(91,110,225,.25),transparent_35%),radial-gradient(circle_at_85%_80%,rgba(255,255,255,.06),transparent_40%),radial-gradient(circle_at_50%_50%,rgba(20,20,40,.4),transparent_60%),#050614]"
            />
            <Overlay
                generalTitle="ROUNDED DEEP SPACE VOID VERTICAL"
                selectTheme="roundedDeepSpaceVoid"
                title="roundedDeepSpaceVoid"
                animationSpeed="400ms"
                mode="vertical"
                className="[background:radial-gradient(circle_at_15%_25%,rgba(91,110,225,.25),transparent_35%),radial-gradient(circle_at_85%_80%,rgba(255,255,255,.06),transparent_40%),radial-gradient(circle_at_50%_50%,rgba(20,20,40,.4),transparent_60%),#050614]"
            />
        </>
    );
};
