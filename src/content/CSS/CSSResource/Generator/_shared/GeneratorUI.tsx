"use client";

import { AIAgent } from "@/AI/AIAgent";
import { BlockWithTextarea } from "@/components/blocks/block-with-textarea/BlockWithTextarea";
import { GeneralButton } from "@/components/button/GeneralButton/GeneralButton";
import { NumberInput } from "@/components/input/Number/Number";
import { Range } from "@/components/input/range/Range";
import { TitlePost } from "@/components/titles/TitlePost/TitlePost";
import {
    useAppContextActions,
    useAppContextValues,
} from "@/context/appContext";
import { motion } from "framer-motion";
import type { ComponentType, ReactNode } from "react";
import { useEffect } from "react";

export const normalizeColor = (value: string) =>
    /^#[0-9a-fA-F]{6}$/.test(value) ? value : "#000000";

export const GeneratorPage = ({
    title,
    description,
    icon: Icon,
    children,
}: {
    title: string;
    description: string;
    icon: ComponentType<{ className?: string }>;
    children: ReactNode;
}) => {
    const { header } = useAppContextActions();
    const { setIconHeader, setTitleHeader } = header || {};

    useEffect(() => {
        setIconHeader(<Icon className="size-8 fill-none!" />);
        setTitleHeader(title);
    }, [Icon, setIconHeader, setTitleHeader, title]);

    return (
        <div className="z-2 flex h-auto w-full flex-col gap-8">
            <AIAgent />

            <TitlePost
                icon={{
                    component: <Icon className="size-8 fill-none!" />,
                    meta: title,
                }}
                description={description}
                hideVersion
            >
                {title}
            </TitlePost>

            {children}
        </div>
    );
};

export const GeneratorWorkspace = ({
    preview,
    floatingPreview,
    controls,
    css,
    html,
    previewClassName = "rounded-md",
    floatingPreviewClassName = "rounded-xl",
}: {
    preview: ReactNode;
    floatingPreview?: ReactNode;
    controls: ReactNode;
    css: string;
    html?: string;
    previewClassName?: string;
    floatingPreviewClassName?: string;
}) => {
    return (
        <div className="relative col-stretch-1 w-full lg:row-stretch-2">
            <div
                className={`
                    relative z-2 flex h-fit w-full self-start items-center
                    justify-center overflow-hidden border border-fg/10
                    bg-fg/3 p-4
                    shadow-md shadow-black/10
                    lg:sticky lg:top-0 lg:w-1/2 lg:min-w-[400px]
                    lg:self-start
                    ${previewClassName}
                `}
            >
                {preview}
            </div>

            {floatingPreview && (
                <FloatingPreview className={floatingPreviewClassName}>
                    {floatingPreview}
                </FloatingPreview>
            )}

            <div className="col-center-2 min-w-0 flex-1">
                {controls}

                <div className="col-stretch-2 w-full">
                    <BlockWithTextarea
                        title="CSS"
                        placeholder="Generated CSS"
                        copy
                        result={css}
                    />

                    {html !== undefined && (
                        <BlockWithTextarea
                            title="HTML"
                            placeholder="Generated HTML"
                            copy
                            result={html}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export const FloatingPreview = ({
    children,
    className = "rounded-xl",
}: {
    children: ReactNode;
    className?: string;
}) => {
    const { header } = useAppContextValues();
    const visible = (header?.isScrolled?.scroll?.scrollTop ?? 0) > 380;

    return (
        <motion.div
            role="button"
            aria-label="Scroll to generator preview"
            aria-hidden={!visible}
            tabIndex={visible ? 0 : -1}
            onClick={() =>
                document.querySelector<HTMLElement>("#main")?.scrollTo({
                    top: 0,
                    behavior: "smooth",
                })
            }
            onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    document.querySelector<HTMLElement>("#main")?.scrollTo({
                        top: 0,
                        behavior: "smooth",
                    });
                }
            }}
            animate={{
                opacity: visible ? 1 : 0,
                x: visible ? 0 : "100%",
                scale: visible ? 1 : 0.92,
            }}
            transition={{
                type: "spring",
                stiffness: visible ? 100 : 500,
                damping: visible ? 10 : 24,
                mass: 0.4,
            }}
            className={`fixed z-20 flex size-[110px] items-center justify-center overflow-hidden border border-fg/10 bg-app shadow-lg shadow-black/70 ${visible ? "pointer-events-auto cursor-pointer" : "pointer-events-none"} ${className}`}
            style={{ right: "20px", top: "90px" }}
        >
            {children}
        </motion.div>
    );
};

export const ConfigPanel = ({
    title,
    action,
    children,
}: {
    title: string;
    action?: ReactNode;
    children: ReactNode;
}) => {
    return (
        <div className="col-stretch-1 w-full">
            <div className="row-center-2 w-full rounded-md bg-fg/5 p-1.5">
                <span className="pl-1 text-[12px] font-medium">{title}</span>
                {action && <div className="ml-auto">{action}</div>}
            </div>

            {children}
        </div>
    );
};

export const ControlSection = ({
    title,
    value,
    children,
    className = "",
}: {
    title: string;
    value?: ReactNode;
    children: ReactNode;
    className?: string;
}) => {
    return (
        <div
            className={`col-stretch-1 rounded-md border border-fg/5 bg-fg/5 p-1.5 ${className}`}
        >
            <div className="row-center-2 min-h-5">
                <span className="text-[11px] text-fg/80">{title}</span>
                {value !== undefined && (
                    <span className="ml-auto text-[10px] text-fg/45">
                        {value}
                    </span>
                )}
            </div>

            {children}
        </div>
    );
};

export const ControlGrid = ({ children }: { children: ReactNode }) => (
    <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">{children}</div>
);

export const RangeControl = ({
    title,
    value,
    min,
    max,
    step = 1,
    unit = "",
    onChange,
}: {
    title: string;
    value: number;
    min: number;
    max: number;
    step?: number;
    unit?: string;
    onChange: (value: number) => void;
}) => (
    <ControlSection title={title} value={`${value}${unit}`}>
        <Range
            value={value}
            min={min}
            max={max}
            step={step}
            onChange={onChange}
        />
        <NumberInput
            value={value}
            min={min}
            max={max}
            step={step}
            ariaLabel={title}
            onChange={onChange}
        />
    </ControlSection>
);

export const ColorControl = ({
    title,
    value,
    onChange,
}: {
    title: string;
    value: string;
    onChange: (value: string) => void;
}) => (
    <div className="row-center-2 rounded-md border border-fg/5 bg-fg/5 p-1.5">
        <span className="text-[11px] text-fg/70">{title}</span>
        <input
            type="color"
            aria-label={`${title} color`}
            value={normalizeColor(value)}
            onChange={(event) => onChange(event.target.value)}
            className="ml-auto size-7 shrink-0 cursor-pointer rounded-[5px] border-0 bg-transparent p-0"
        />
        <input
            type="text"
            aria-label={`${title} color value`}
            value={value}
            onChange={(event) => onChange(event.target.value)}
            className="w-20 rounded-[5px] bg-fg/5 px-1.5 py-1 text-[10px] outline-none transition-colors hover:bg-fg/10 focus:bg-fg/10"
        />
    </div>
);

export const TextControl = ({
    title,
    value,
    onChange,
    placeholder,
}: {
    title: string;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}) => (
    <ControlSection title={title}>
        <input
            type="text"
            value={value}
            placeholder={placeholder}
            onChange={(event) => onChange(event.target.value)}
            className="w-full rounded-[5px] bg-fg/5 px-2 py-1.5 text-[11px] outline-none transition-colors hover:bg-fg/10 focus:bg-fg/10"
        />
    </ControlSection>
);

export function SegmentedControl<T extends string>({
    title,
    value,
    values,
    labels,
    onChange,
}: {
    title: string;
    value: T;
    values: readonly T[];
    labels?: Partial<Record<T, string>>;
    onChange: (value: T) => void;
}) {
    return (
        <ControlSection title={title}>
            <div className="row-center-1 w-fit max-w-full flex-wrap rounded-[6px] bg-fg/5 p-0.5">
                {values.map((item) => (
                    <div
                        key={item}
                        className={`rounded-[5px] transition-all ${
                            value === item
                                ? "bg-fg text-app shadow-sm shadow-black/20"
                                : "text-fg/65"
                        }`}
                    >
                        <GeneralButton
                            variant="ghost"
                            active={value === item}
                            textButton={labels?.[item] ?? item}
                            handleAction={() => onChange(item)}
                        />
                    </div>
                ))}
            </div>
        </ControlSection>
    );
}

export const ToggleControl = ({
    title,
    checked,
    onChange,
}: {
    title: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
}) => (
    <ControlSection title={title}>
        <button
            type="button"
            aria-pressed={checked}
            onClick={() => onChange(!checked)}
            className={`
                row-center-1 w-fit rounded-[5px] border px-1.5 py-1
                text-[10px] font-medium outline-none transition-all
                focus-visible:ring-2 focus-visible:ring-fg/35
                ${
                    checked
                        ? "border-fg bg-fg text-app shadow-sm shadow-black/20"
                        : "border-fg/10 bg-fg/5 text-fg/55 hover:bg-fg/10 hover:text-fg"
                }
            `}
        >
            <span
                className={`size-1.5 rounded-full ${checked ? "bg-app" : "bg-fg/30"}`}
            />
            {checked ? "On" : "Off"}
        </button>
    </ControlSection>
);

export const SelectControl = <T extends string>({
    title,
    value,
    values,
    labels,
    onChange,
}: {
    title: string;
    value: T;
    values: readonly T[];
    labels?: Partial<Record<T, string>>;
    onChange: (value: T) => void;
}) => (
    <ControlSection title={title}>
        <select
            value={value}
            onChange={(event) => onChange(event.target.value as T)}
            className="w-full cursor-pointer rounded-[5px] border-0 bg-fg/5 px-2 py-1.5 text-[11px] text-fg outline-none hover:bg-fg/10 focus:bg-fg/10"
        >
            {values.map((item) => (
                <option key={item} value={item} className="bg-app text-fg">
                    {labels?.[item] ?? item}
                </option>
            ))}
        </select>
    </ControlSection>
);
