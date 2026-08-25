import { useGetCssSelectorQuery } from "@/services/CSSSelector/css-selector.api";
import { IconExternalLink } from "@tabler/icons-react";

const El = ({ title, href }: { title: string; href: string }) => {
    return (
        <>
            <span className="shrink-0 self-center text-[12px]">{title}:</span>

            <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="
                    flex
                    w-full
                    min-w-0
                    items-center
                    gap-1

                    overflow-hidden

                    py-1
                    px-2

                    text-[12px]

                    bg-fg/10
                    rounded-[4px]

                    hover:bg-fg/30
                "
            >
                <span
                    className="
                        min-w-0
                        flex-1
                        truncate

                        underline
                        underline-offset-2
                    "
                >
                    {href}
                </span>

                <IconExternalLink
                    className="
                        w-4
                        h-4
                        shrink-0
                    "
                />
            </a>
        </>
    );
};

const formatTitle = (value: string) => {
    if (value === "mdn") {
        return "MDN";
    }

    if (value === "specifications") {
        return "Specifications";
    }

    return value;
};

export const Links = ({ name }: { name: string }) => {
    const { data } = useGetCssSelectorQuery({
        name,
    });

    return (
        <div className="default-block-0">
            <div
                className="
                    row-center-1
                    w-full
                    p-2
                    bg-fg/10
                    rounded-y-md
                "
            >
                <IconExternalLink className="w-4 h-4" />

                <span className="text-[16px]">Links</span>
            </div>

            <div
                className="
                    grid
                    w-full
                    min-w-0
                    grid-cols-[max-content_minmax(0,1fr)]
                    items-center
                    gap-x-2
                    gap-y-2
                    p-2
                "
            >
                {Object.entries(data?.links ?? {}).flatMap(([key, value]) => {
                    if (!value) {
                        return [];
                    }

                    const title = formatTitle(key);

                    if (Array.isArray(value)) {
                        return value.map((href) => (
                            <El
                                key={`${key}-${href}`}
                                title={title}
                                href={href}
                            />
                        ));
                    }

                    return [<El key={key} title={title} href={value} />];
                })}
            </div>
        </div>
    );
};
