import { Documentation } from "@/components/Documentation/Documentation";
import { TransitionDropDown } from "../Pagination/components/dropDown/TransitionDropDown/TransitionDropDown";

export const MixTheme = () => {
    return (
        <TransitionDropDown title="MIX THEME" className="!rounded-[14px]">
            <Documentation
                titleEnd="App"
                code={`<ScrollToFuture
    selectTheme="primary"
    optionsTheme={{
        scrollBar: {
            inactive: {
                backgroundColor: "rgba(255, 255, 255, 0.08)",
                borderRadius: "999px",
            },

            hover: {
                backgroundColor: "rgba(255, 255, 255, 0.16)",
            },

            active: {
                backgroundColor: "rgba(255, 255, 255, 0.24)",
            },
        },

        thumb: {
            inactive: {
                backgroundColor: "#8b5cf6",
                borderRadius: "999px",
            },

            hover: {
                backgroundColor: "#a78bfa",
                transform: "scale(1.05)",
            },

            active: {
                backgroundColor: "#ddd6fe",
                transform: "scale(1.12)",
            },
        },
    }}
/>`}
            />
        </TransitionDropDown>
    );
};
