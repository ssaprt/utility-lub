import { Documentation } from "@/components/Documentation/Documentation";
import { TransitionDropDown } from "../dropDown/TransitionDropDown/TransitionDropDown";

export const YourTheme = () => {
    return (
        <TransitionDropDown
            title="YOUR THEME"
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
                titleEnd="theme"
                code={`import type { PresetsType } from "@ssaprt/easy-pagination";
const yourTheme: PresetsType = {
    style: {},
    className: "",

    main: {
        style: {},
        className: "",
    },

    navigation: {
        style: {},
        className: "",
    },

    track: {
        style: {},
        className: "",
    },

    items: {
        w: 0,
        h: 0,

        style: {},
        className: "",

        background: "",
        color: "",

        border: "",
        // or
        borderWidth: 0,
        borderColor: "",
        borderStyle: "",

        borderRadius: "",
        transition: "",

        hover: {
            background: "",
            color: "",

            border: "",
            // or
            borderWidth: 0,
            borderColor: "",
            borderStyle: "",

            borderRadius: "",
            transition: "",
        },

        active: {
            background: "",
            color: "",

            border: "",
            // or
            borderWidth: 0,
            borderColor: "",
            borderStyle: "",

            borderRadius: "",
            transition: "",
        },
    },

    button: {
        style: {},
        className: "",

        background: "",
        color: "",

        border: "",
        // or
        borderWidth: 0,
        borderColor: "",
        borderStyle: "",

        borderRadius: "",

        shadowDirectionSize: 0,
        shadowDirectionColor: "",
        shadowDirectionBlur: 0,

        active: {
            background: "",
            color: "",

            border: "",
            // or
            borderWidth: 0,
            borderColor: "",
            borderStyle: "",

            borderRadius: "",

            shadowDirectionColor: "",
        },
    },

    arrows: {
        style: {},
        className: "",

        w: 0,
        h: 0,

        background: "",
        color: "",
        fill: "",
        stroke: "",

        borderRadius: "",

        transform: "",
        transition: "",

        icon: {
            style: {},
            className: "",

            w: 0,
            h: 0,
        },

        hover: {
            background: "",
            color: "",
            fill: "",
            stroke: "",

            borderRadius: "",

            transform: "",
            transition: "",
        },

        active: {
            background: "",
            color: "",
            fill: "",
            stroke: "",

            borderRadius: "",

            transform: "",
            transition: "",
        },

        disabled: {
            background: "",
            color: "",
            fill: "",
            stroke: "",

            borderRadius: "",

            transform: "",
            transition: "",
        },
    },
};`}
            />
        </TransitionDropDown>
    );
};
