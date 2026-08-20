"use client";

import { useState } from "react";

import { motion } from "framer-motion";
import { runAgent } from "./runAgent";

import { TextAreaWithScrollBar } from "@/components/textarea/TextAreaWithScrollBar";
import { useServerPlannerMutation } from "@/services/AI";
import { AIButton } from "./AIButton";

import { useAppContextValues } from "@/context/appContext";
import type { AIAgentResult, AIPageSnapshot, AIPlannerDecision } from "./types";

const getErrorMessage = (error: unknown) => {
    if (error instanceof Error) {
        return error.message;
    }

    if (typeof error === "object" && error !== null && "data" in error) {
        const data = (
            error as {
                data?: {
                    message?: string;
                    error?: string;
                };
            }
        ).data;

        return data?.message ?? data?.error ?? "Agent error";
    }

    return "Agent error";
};

export const AIAgent = () => {
    const [prompt, setPrompt] = useState("");
    const [running, setRunning] = useState(false);
    const [result, setResult] = useState<AIAgentResult | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [expanded, setExpanded] = useState(false);
    const [serverPlanner] = useServerPlannerMutation();
    const { menu } = useAppContextValues();

    const forButton = {
        promt: prompt,
        running,
        result,
        error,
    };

    const closeMessage = () => {
        setResult(null);
        setError(null);
    };

    const planner = async (
        snapshot: AIPageSnapshot,
        userPrompt: string,
        step: number,
    ): Promise<AIPlannerDecision> => {
        return serverPlanner({
            snapshot,
            prompt: userPrompt,
            step,
        }).unwrap();
    };

    const run = async () => {
        const value = prompt.trim();

        if (!value || running) {
            return;
        }

        setRunning(true);
        setResult(null);
        setError(null);

        try {
            const nextResult = await runAgent({
                prompt: value,
                planner,
            });

            setResult(nextResult);
        } catch (currentError) {
            setError(getErrorMessage(currentError));
        } finally {
            setRunning(false);
            setPrompt("");
            setExpanded(false);
        }
    };

    if (!menu.visibleAgent) return null;

    return (
        <div data-ai-ignore="true" className={`flex flex-col gap-3`}>
            <div
                className={`row-end-1 relative flex-nowrap h-fit`}
                onFocusCapture={() => {
                    setExpanded(true);
                }}
                onBlurCapture={(event) => {
                    const nextTarget = event.relatedTarget;

                    if (
                        nextTarget instanceof Node &&
                        event.currentTarget.contains(nextTarget)
                    ) {
                        return;
                    }

                    setExpanded(false);
                }}
            >
                <TextAreaWithScrollBar
                    backValue={setPrompt}
                    name="prompt"
                    placeholder="Just tell me what result you want to achieve, and I will help you..."
                    className={`
                        rounded-md!
                        ${expanded ? "min-h-[200px]! h-[200px]!" : "min-h-0! h-[60px]!"}
                        transition-[min-height]
                        duration-300
                        ease-in-out
                  
                        [&>span]:top-[0px]!
                        [&>span]:transform-none!                        
                    `}
                >
                    {prompt}
                </TextAreaWithScrollBar>

                <motion.button
                    type="button"
                    tabIndex={expanded ? 0 : -1}
                    disabled={running || !prompt.trim()}
                    initial={false}
                    animate={{
                        opacity: expanded ? 1 : 0,
                        scale: expanded ? 1 : 0.75,
                        y: expanded ? 0 : 8,
                    }}
                    transition={{
                        duration: expanded ? 0.35 : 0.2,
                        delay: expanded ? 0.12 : 0,
                        ease: [0.22, 1, 0.36, 1],
                    }}
                    style={{
                        pointerEvents: expanded ? "auto" : "none",
                    }}
                    onClick={() => {
                        void run();
                    }}
                    className="
                    
                    z-3
        absolute
        right-3
        bottom-3
        origin-center
    "
                >
                    <AIButton
                        forButton={forButton}
                        className="h-[60px] w-[60px]"
                    />
                </motion.button>
            </div>

            {result?.success && (
                <div
                    className="
            relative
            flex
            flex-col
            gap-2
            rounded-lg
            border
            border-emerald-500/20
            bg-emerald-500/10
            p-3
            pr-10
            shadow-sm
        "
                >
                    <button
                        type="button"
                        aria-label="Close message"
                        onClick={closeMessage}
                        className="
                absolute
                top-2
                right-2
                flex
                h-7
                w-7
                cursor-pointer
                items-center
                justify-center
                rounded-full
                text-lg
                leading-none
                opacity-50
                transition
                hover:bg-emerald-500/10
                hover:opacity-100
            "
                    >
                        ×
                    </button>

                    <div className="flex items-center gap-2">
                        <div
                            className="
                    flex
                    h-7
                    w-7
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-emerald-500/15
                    text-sm
                    font-bold
                    text-emerald-500
                "
                        >
                            ✓
                        </div>

                        <div className="font-medium text-emerald-500">
                            Completed
                        </div>
                    </div>

                    {result.message && (
                        <div className="text-sm opacity-80">
                            {result.message}
                        </div>
                    )}
                </div>
            )}

            {result && !result.success && (
                <div
                    className="
            relative
            flex
            flex-col
            gap-2
            rounded-lg
            border
            border-amber-500/20
            bg-amber-500/10
            p-3
            pr-10
            shadow-sm
        "
                >
                    <button
                        type="button"
                        aria-label="Close message"
                        onClick={closeMessage}
                        className="
                absolute
                top-2
                right-2
                flex
                h-7
                w-7
                cursor-pointer
                items-center
                justify-center
                rounded-full
                text-lg
                leading-none
                opacity-50
                transition
                hover:bg-amber-500/10
                hover:opacity-100
            "
                    >
                        ×
                    </button>

                    <div className="flex items-center gap-2">
                        <div
                            className="
                    flex
                    h-7
                    w-7
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-amber-500/15
                    text-sm
                    font-bold
                    text-amber-500
                "
                        >
                            !
                        </div>

                        <div className="font-medium text-amber-500">
                            Not completed
                        </div>
                    </div>

                    {result.message && (
                        <div className="text-sm opacity-80">
                            {result.message}
                        </div>
                    )}
                </div>
            )}

            {error && (
                <div
                    className="
            relative
            flex
            flex-col
            gap-2
            rounded-lg
            border
            border-red-500/20
            bg-red-500/10
            p-3
            pr-10
            shadow-sm
        "
                >
                    <button
                        type="button"
                        aria-label="Close message"
                        onClick={closeMessage}
                        className="
                absolute
                top-2
                right-2
                flex
                h-7
                w-7
                cursor-pointer
                items-center
                justify-center
                rounded-full
                text-lg
                leading-none
                opacity-50
                transition
                hover:bg-red-500/10
                hover:opacity-100
            "
                    >
                        ×
                    </button>

                    <div className="flex items-center gap-2">
                        <div
                            className="
                    flex
                    h-7
                    w-7
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-red-500/15
                    text-sm
                    font-bold
                    text-red-500
                "
                        >
                            ×
                        </div>

                        <div className="font-medium text-red-500">
                            Agent error
                        </div>
                    </div>

                    <div className="text-sm opacity-80">{error}</div>
                </div>
            )}
        </div>
    );
};
