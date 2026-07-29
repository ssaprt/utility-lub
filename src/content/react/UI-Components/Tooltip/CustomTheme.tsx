import { Documentation } from "@/components/Documentation/Documentation";
import { TransitionDropDown } from "@/content/react/UI-Components/Pagination/components/dropDown/TransitionDropDown/TransitionDropDown";

export const CustomTheme = () => {
    return (
        <TransitionDropDown
            title="CUSTOM THEME"
            style={{
                "--bgPrimaryContainer": "rgb(40, 44, 52)",
                "--bgPrimaryContainerShow": "rgb(40, 44, 52)",
                "--bgTitleBlock": "rgb(40, 44, 52)",
                "--colorTitleBlock": "#fda5d6",
                "--colorTitleBlockShow": "#ba749b",
                "--BoxShadowTitleBlock": "none",
                "--BoxShadowTitleBlockShow": "none",
                "--fillTitleBlockIcon": "#fda5d6",
                "--fillTitleBlockIconShow": "#ba749b",
            }}
            className="!rounded-[14px]"
        >
            <Documentation
                titleEnd="App"
                code={`<Tooltip
    content="Custom theme"
    customTheme={{
        body: {
            background:
                "linear-gradient(135deg, #7c3aed, #db2777)",
            filter:
                "drop-shadow(0 12px 24px rgba(124, 58, 237, 0.4))",
            style: {
                color: "#ffffff",
                padding: "12px 16px",
                border: "2px solid #f0abfc",
                borderRadius: "18px 6px",
                fontSize: "14px",
                fontWeight: 700,
            },
        },
        arrow: {
            size: "10px",
            width: "24px",
        },
        animation: {
            show: "bounce",
            hide: "scale",
            speed: "220ms",
            easing: "cubic-bezier(0.34, 1.56, 0.64, 1)",
        },
    }}
>
    <button type="button">Custom</button>
</Tooltip>`}
            />
        </TransitionDropDown>
    );
};
