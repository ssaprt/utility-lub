export interface NpmPackage {
    name: string;
    version: string;
    description: string;
    weeklyDownloads: number;
    monthlyDownloads: number;
    time: {
        created: string;
        modified: string;
    };
}

export interface NpmPackagesStats {
    packagesCount: number;
    totalWeeklyDownloads: number;
    totalMonthlyDownloads: number;
    packages: NpmPackage[];
}

export type NpmPackageSortField =
    "created" | "modified" | "weeklyDownloads" | "monthlyDownloads";
