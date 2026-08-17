import { apiUrl } from "@/lib/api/config";

export interface AIAvailability {
    available: boolean;
    remaining?: number;
    reason?: "quota" | "disabled" | "provider";
}

export const getAIAvailability = async (): Promise<AIAvailability> => {
    try {
        const response = await fetch(`${apiUrl}/ai/availability`, {
            cache: "no-store",
        });

        if (!response.ok) {
            return {
                available: false,
                reason: "provider",
            };
        }

        return response.json();
    } catch {
        return {
            available: false,
            reason: "provider",
        };
    }
};
