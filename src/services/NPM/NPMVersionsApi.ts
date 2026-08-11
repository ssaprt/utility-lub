import { Recording } from "@/components/notes/Version/Version";
import { api } from "../api";

export const NPM_API = api.injectEndpoints({
    endpoints: (builder) => ({
        getNPMPackageVersions: builder.query<
            Recording[],
            { packageName: string }
        >({
            query: ({ packageName }: { packageName: string }) => ({
                url: "/changer-version-npm",
                params: {
                    packageName,
                },
            }),

            providesTags: ["Versions"],
        }),
    }),
});

export const {
    useGetNPMPackageVersionsQuery,
    useLazyGetNPMPackageVersionsQuery,
} = NPM_API;
