import { NpmPackagesStats } from "../NPMApi";

export const topFive = (data?: NpmPackagesStats) => {
    if (!data) return null;
    const top = [...data.packages]
        .sort((a, b) => b.monthlyDownloads - a.monthlyDownloads)
        .filter((item) => item.monthlyDownloads > 0)
        .slice(0, 5);

    return {
        ...data,
        packages: top,
    };
};
