import { executeAction } from "./executeAction";
import { scanPage } from "./scanPage";

import type {
    AIAction,
    AIAgentResult,
    AIPageControl,
    AIPageSnapshot,
    AIPlannerDecision,
} from "./types";

interface RunAgentOptions {
    prompt: string;
    maxSteps?: number;

    planner: (
        snapshot: AIPageSnapshot,
        prompt: string,
        step: number,
    ) => Promise<AIPlannerDecision> | AIPlannerDecision;
}

const waitForUI = () => {
    return new Promise<void>((resolve) => {
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                resolve();
            });
        });
    });
};

const controlsMatch = (original: AIPageControl, current: AIPageControl) => {
    if (original.kind !== current.kind) {
        return false;
    }

    if (original.text && current.text && original.text !== current.text) {
        return false;
    }

    if (original.label && current.label && original.label !== current.label) {
        return false;
    }

    if (original.group && current.group && original.group !== current.group) {
        return false;
    }

    if (
        original.context &&
        current.context &&
        original.context !== current.context
    ) {
        return false;
    }

    return true;
};

const findCurrentControl = (
    snapshot: AIPageSnapshot,
    original: AIPageControl,
) => {
    const byId = snapshot.controls.find(
        (control) => control.id === original.id,
    );

    if (byId) {
        return byId;
    }

    return snapshot.controls.find((control) =>
        controlsMatch(original, control),
    );
};

const resolveAction = (
    action: AIAction,
    originalSnapshot: AIPageSnapshot,
): AIAction | null => {
    const originalControl = originalSnapshot.controls.find(
        (control) => control.id === action.target,
    );

    if (!originalControl) {
        return null;
    }

    const currentSnapshot = scanPage();

    const currentControl = findCurrentControl(currentSnapshot, originalControl);

    if (!currentControl) {
        return null;
    }

    if (currentControl.disabled) {
        return null;
    }

    if (action.type === "click") {
        return {
            type: "click",
            target: currentControl.id,
        };
    }

    return {
        type: "set",
        target: currentControl.id,
        value: action.value,
    };
};

export const runAgent = async ({
    prompt,
    planner,
    maxSteps = 10,
}: RunAgentOptions): Promise<AIAgentResult> => {
    const steps: AIAgentResult["steps"] = [];

    for (let step = 0; step < maxSteps; step += 1) {
        const snapshot = scanPage();

        const decision = await planner(snapshot, prompt, step);

        console.log("AI STEP", step);
        console.log("AI DECISION", decision);
        console.log("AI SNAPSHOT", snapshot);

        if (decision.type === "done") {
            steps.push({
                step,
                decision,
                success: true,
            });

            return {
                success: true,
                steps,
                message: decision.message,
            };
        }

        if (decision.type === "actions") {
            console.log(
                "TARGET CONTROLS",
                JSON.stringify(
                    decision.actions.map((action) => {
                        const control = snapshot.controls.find(
                            (control) => control.id === action.target,
                        );

                        return {
                            action,
                            control: control
                                ? {
                                      id: control.id,
                                      kind: control.kind,
                                      text: control.text,
                                      label: control.label,
                                      value: control.value,
                                      checked: control.checked,
                                      ariaPressed: control.ariaPressed,
                                      ariaSelected: control.ariaSelected,
                                      dataState: control.dataState,
                                      context: control.context,
                                  }
                                : null,
                        };
                    }),
                    null,
                    2,
                ),
            );
        }

        if (decision.actions.length === 0) {
            steps.push({
                step,
                decision,
                success: false,
            });

            return {
                success: false,
                steps,
                message: "Planner returned no actions",
            };
        }

        for (
            let actionIndex = 0;
            actionIndex < decision.actions.length;
            actionIndex += 1
        ) {
            const action = decision.actions[actionIndex];

            const resolvedAction = resolveAction(action, snapshot);

            if (!resolvedAction) {
                steps.push({
                    step,
                    decision,
                    success: false,
                });

                return {
                    success: false,
                    steps,
                    message: `Unable to resolve current UI control for target: ${action.target}`,
                };
            }

            const result = executeAction(resolvedAction);

            if (!result.success) {
                steps.push({
                    step,
                    decision,
                    success: false,
                });

                return {
                    success: false,
                    steps,
                    message: result.message ?? "Action execution failed",
                };
            }

            const hasNextAction = actionIndex < decision.actions.length - 1;

            if (hasNextAction) {
                await waitForUI();
            }
        }

        steps.push({
            step,
            decision,
            success: true,
        });

        if (!decision.observeAfter) {
            return {
                success: true,
                steps,
                message: decision.message ?? "Task completed",
            };
        }

        await waitForUI();
    }

    return {
        success: false,
        steps,
        message: `Maximum agent steps reached: ${maxSteps}`,
    };
};
