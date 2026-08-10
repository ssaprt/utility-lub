import { useFocusAtEnd } from "@/hooks/useFocusAtEnd";
import clsx from "clsx";
import {
    type ClipboardEvent,
    type FocusEvent,
    type FormEvent,
    type HTMLAttributes,
    type ReactNode,
    useEffect,
    useRef,
    useState,
} from "react";
import { ScrollToFuture } from "scroll-to-future";
import styles from "./TextAreaWithScrollBar.module.css";

interface Props extends Omit<
    HTMLAttributes<HTMLDivElement>,
    "children" | "onInput"
> {
    children?: ReactNode;
    name: string;
    placeholder?: string;
    emoji?: boolean;
    backValue: (value: string) => void;
}

const getTextValue = (value: ReactNode): string => {
    if (typeof value === "string" || typeof value === "number") {
        return String(value);
    }

    return "";
};

export const TextAreaWithScrollBar = ({
    children,
    name,
    placeholder,
    backValue,
    emoji = false,
    className,
    style,
    ...props
}: Props) => {
    const focusAtEnd = useFocusAtEnd();
    const ref = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const savedRange = useRef<Range | null>(null);

    const [value, setValue] = useState(() => getTextValue(children));

    const viewPlaceholder = value.replace(/\n/g, "").trim().length === 0;

    useEffect(() => {
        const nextValue = getTextValue(children);
        //eslint-disable-next-line
        setValue(nextValue);

        if (ref.current && ref.current.innerText !== nextValue) {
            ref.current.innerText = nextValue;
        }
    }, [children]);

    useEffect(() => {
        const form = containerRef.current?.closest("form");

        if (!form) {
            return;
        }

        const handleReset = () => {
            setValue("");

            if (ref.current) {
                ref.current.innerText = "";
            }

            backValue("");
        };

        form.addEventListener("reset", handleReset);

        return () => {
            form.removeEventListener("reset", handleReset);
        };
    }, [backValue]);

    const onFocus = (event: FocusEvent<HTMLDivElement>) => {
        focusAtEnd(event.currentTarget);
    };

    const handleBlur = () => {
        const selection = window.getSelection();

        if (selection?.rangeCount) {
            savedRange.current = selection.getRangeAt(0).cloneRange();
        }
    };

    const handleChange = (event: FormEvent<HTMLDivElement>) => {
        const text = event.currentTarget.innerText
            .replace(/\n{2,}/g, "\n")
            .trimEnd();

        setValue(text);
        backValue(text);
    };

    const handlePaste = (event: ClipboardEvent<HTMLDivElement>) => {
        event.preventDefault();

        const text = event.clipboardData.getData("text/plain");

        document.execCommand("insertText", false, text);
    };

    return (
        <div
            ref={containerRef}
            className={clsx(styles.textareaOverlay, className)}
            style={style}
            {...props}
        >
            <input type="hidden" name={name} value={value} />

            {placeholder && viewPlaceholder && (
                <span className={styles.placeholder}>{placeholder}</span>
            )}

            <div
                ref={ref}
                onFocus={onFocus}
                onBlur={handleBlur}
                className={clsx(
                    styles.textarea,
                    emoji && styles.emoji,
                    "text-[16px] lg:text-xs",
                )}
                contentEditable
                suppressContentEditableWarning
                onInput={handleChange}
                onPaste={handlePaste}
            >
                <ScrollToFuture />
            </div>
        </div>
    );
};
