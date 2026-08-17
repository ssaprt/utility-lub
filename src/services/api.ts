import { apiUrl } from "@/lib/api/config";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: apiUrl,
    }),
    tagTypes: ["NpmPackages", "Versions", "AIAgent"],
    endpoints: () => ({}),
});
