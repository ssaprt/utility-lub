import { Documentation } from "@/components/Documentation/Documentation";
import { TransitionDropDown } from "@/content/react/UI-Components/Pagination/components/dropDown/TransitionDropDown/TransitionDropDown";
import type { ScrollToFutureConfig } from "scroll-to-future";

const INDENT = "    ";

const serializeValue = (value: unknown, level = 0): string | null => {
    if (value === null) {
        return "null";
    }

    if (typeof value === "string") {
        return JSON.stringify(value);
    }

    if (typeof value === "number" || typeof value === "boolean") {
        return String(value);
    }

    if (Array.isArray(value)) {
        const values = value
            .map((item) => serializeValue(item, level + 1))
            .filter((item): item is string => item !== null);

        if (values.length === 0) {
            return "[]";
        }

        const innerIndent = INDENT.repeat(level + 1);

        const currentIndent = INDENT.repeat(level);

        return `[
${values.map((item) => `${innerIndent}${item},`).join("\n")}
${currentIndent}]`;
    }

    if (typeof value === "object" && value !== null) {
        /*
         * React ref в вывод конфигурации
         * помещать не нужно.
         */
        if ("current" in value) {
            return null;
        }

        const entries = Object.entries(value)
            .map(([key, item]) => {
                const serialized = serializeValue(item, level + 1);

                if (serialized === null) {
                    return null;
                }

                return {
                    key,
                    value: serialized,
                };
            })
            .filter(
                (
                    entry,
                ): entry is {
                    key: string;
                    value: string;
                } => entry !== null,
            );

        if (entries.length === 0) {
            return "{}";
        }

        const innerIndent = INDENT.repeat(level + 1);

        const currentIndent = INDENT.repeat(level);

        return `{
${entries
    .map(({ key, value: serialized }) => `${innerIndent}${key}: ${serialized},`)
    .join("\n")}
${currentIndent}}`;
    }

    return null;
};

const createPropsCode = (config: ScrollToFutureConfig): string => {
    return Object.entries(config)
        .filter(([key]) => key !== "target")
        .map(([key, value]) => {
            const serialized = serializeValue(value, 3);

            if (serialized === null) {
                return null;
            }

            if (typeof value === "string") {
                return `${INDENT.repeat(3)}${key}=${serialized}`;
            }

            return `${INDENT.repeat(3)}${key}={${serialized}}`;
        })
        .filter((line): line is string => line !== null)
        .join("\n");
};

export const Output = (props: ScrollToFutureConfig) => {
    const propsCode = createPropsCode(props);

    const code = `import { ScrollToFuture } from "scroll-to-future";
import "scroll-to-future/style.css";

export const App = () => {
    return (
        <div className="scroll-block">
            <ScrollToFuture
${propsCode}
            />

            {/* Scrollable content */}
        </div>
    );
};`;

    return (
        <TransitionDropDown
            title="CODE OUTPUT"
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
            <Documentation titleEnd="App" code={code} />
        </TransitionDropDown>
    );
};
