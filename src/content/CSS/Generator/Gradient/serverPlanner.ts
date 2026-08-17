import type { AIPageSnapshot, AIPlannerDecision } from "@/AI/types";

import { api } from "@/services/api";

interface ServerPlannerArgs {
    snapshot: AIPageSnapshot;
    prompt: string;
    step: number;
}

export const ServerPlanner = api.injectEndpoints({
    endpoints: (builder) => ({
        serverPlanner: builder.mutation<AIPlannerDecision, ServerPlannerArgs>({
            query: ({ snapshot, prompt, step }) => ({
                url: "/ai/planner",
                method: "POST",
                body: {
                    snapshot,
                    prompt,
                    step,
                },
            }),
        }),
    }),
});

export const { useServerPlannerMutation } = ServerPlanner;
