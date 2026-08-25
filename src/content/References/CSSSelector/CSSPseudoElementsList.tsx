"use client";

import { PageLink } from "@/components/PageLink/PageLink";
import { useGetCssPseudoElementsQuery } from "@/services/CSSSelector/css-selector.api";

export const CSSPseudoElementsList = () => {
    const { data } = useGetCssPseudoElementsQuery();

    return (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-2">
            {data?.items.map((item) => (
                <PageLink
                    key={item.name}
                    text={item.name}
                    href={`/references/css-pseudo-elements/${encodeURIComponent(item.name)}`}
                />
            ))}
        </div>
    );
};
