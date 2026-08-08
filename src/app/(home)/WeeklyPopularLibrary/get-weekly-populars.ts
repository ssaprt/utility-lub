import { apiUrl } from "@/lib/api/config";

interface NpmPackage {
    name: string;
    version: string;
    description: string;
    weeklyDownloads: number;
    monthlyDownloads: number;
}

export interface NpmPackagesStats {
    packagesCount: number;
    totalWeeklyDownloads: number;
    totalMonthlyDownloads: number;
    packages: NpmPackage[];
}

export const getNpmPackagesStats = async (
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

        const data: NpmPackagesStats = await response.json();

        const topFive = data.packages
            .sort((a, b) => b.monthlyDownloads - a.monthlyDownloads)
            .filter((item) => item.monthlyDownloads > 0)
            .slice(0, 5);

        return {
            ...data,
            packages: topFive,
        };
    } catch (error) {
        console.log(error);
        return null;
    }
};
