"use client";

import { PageLink } from "@/components/PageLink/PageLink";
import { useGetCssPseudoClassesQuery } from "@/services/CSSSelector/css-selector.api";

export const CSSPseudoClassesList = () => {
    const { data } = useGetCssPseudoClassesQuery();

    return (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-2">
            {data?.items.map((item) => (
                <PageLink
                    key={item.name}
                    text={item.name}
                    href={`/references/css-pseudo-classes/${encodeURIComponent(item.name)}`}
                />
            ))}
        </div>
    );
};
