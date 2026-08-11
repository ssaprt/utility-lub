import { api } from "../api";

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

export interface GetNpmPackagesParams {
    userName?: string;
    size?: number;
}

export const NPM_API = api.injectEndpoints({
    endpoints: (builder) => ({
        getNpmPackages: builder.query<NpmPackagesStats, GetNpmPackagesParams>({
            query: ({ userName = "ssaprt", size = 5 }) => ({
                url: "/npm-packages",
                params: {
                    userName,
                    size,
                },
            }),

            providesTags: ["NpmPackages"],
        }),
    }),
});

export const { useGetNpmPackagesQuery, useLazyGetNpmPackagesQuery } = NPM_API;
