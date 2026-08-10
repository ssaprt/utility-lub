import { Documentation } from "@/components/Documentation/Documentation";
import { TransitionDropDown } from "../dropDown/TransitionDropDown/TransitionDropDown";

export const DotSettings = () => {
    return (
        <TransitionDropDown
            title="FINE-TUNING THEME"
            className="!rounded-[14px]"
        >
            <Documentation
                titleEnd="theme"
                code={`theme={{
    // Root <Pagination />
    style: {},
    className: "",

    // Main container
    main: {
        style: {},
        className: "",
    },

    // Navigation wrapper
    navigation: {
        style: {},
        className: "",
    },

    // Track with page buttons
    track: {
        style: {},
        className: "",
    },

    // Navigation button
    button: {
        style: {},
        className: "",

        background: "",
        color: "",

        border: "",
        // or
        borderWidth: 0,
        borderColor: "",
        borderStyle: "solid",
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
            borderStyle: "solid",
            borderRadius: "",

            shadowDirectionColor: "",
        },
    },

    // Page item
    items: {
        style: {},
        className: "",

        w: 40,
        h: 40,

        background: "",
        color: "",

        border: "",
        // or
        borderWidth: 0,
        borderColor: "",
        borderStyle: "solid",
        borderRadius: "",

        transition: "",

        hover: {
            background: "",
            color: "",
            transition: "",

            border: "",
            // or
            borderWidth: 0,
            borderColor: "",
            borderStyle: "solid",
            borderRadius: "",
        },

        active: {
            background: "",
            color: "",
            transition: "",

            border: "",
            // or
            borderWidth: 0,
            borderColor: "",
            borderStyle: "solid",
            borderRadius: "",
        },
    },

    // Arrows
    arrows: {
        style: {},
        className: "",

        w: 40,
        h: 40,

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

            w: 20,
            h: 20,
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
}}`}
            />
        </TransitionDropDown>
    );
};
