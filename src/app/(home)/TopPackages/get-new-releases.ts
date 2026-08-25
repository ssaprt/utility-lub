import { apiUrl } from "@/lib/api/config";
import type { NpmPackagesStats } from "./npm.types";

export const getNewReleases = async (
    username?: string,
    size?: number,
): Promise<NpmPackagesStats | null> => {
    try {
        const response = await fetch(
            `${apiUrl}/npm-popular-weekly${username ? `?username=${username}` : ""}${size ? `${username ? "&" : "?"}size=${size}` : ""}`,
        );

        if (!response.ok) {
            return null;
        }

        return await response.json();
    } catch (error) {
        console.log(error);
        return null;
    }
};
