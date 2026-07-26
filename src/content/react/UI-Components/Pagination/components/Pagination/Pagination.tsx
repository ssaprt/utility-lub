import { Pagination } from "@ssaprt/easy-pagination";
import { useEveryPaginationContext } from "../../context/useEveryPagination";
import { emojis } from "../../data/list";
import { List } from "../List";

export const PaginationContent = () => {
    const context = useEveryPaginationContext();

    return (
        <div
            className={`
                relative
                h-auto lg:h-full
                max-w-full
                min-w-0
                shrink-0
                overflow-hidden
                rounded-[1em]
                px-[0.35em]
                py-[0.5em]
                text-[clamp(11px,1vw,18px)]
                shadow-[0_0.125em_0.375em_0.25em]
                shadow-black/40
                ${context?.className ?? ""}
            `.trim()}
        >
            <Pagination
                selectTheme={context?.selectTheme}
                theme={{
                    items: {
                        className: `
                            h-[1.35em]
                            w-[1.35em]
                            min-w-[1.35em]
                            text-[1em]
                        `,
                    },
                }}
                items={context?.list ?? emojis}
                itemsPerPage={10}
                navigation={context?.navigation ?? "full"}
                mode={context?.mode}
                arrows={{
                    arrowStart: {
                        use: context?.arrowStart,
                    },
                    arrowEnd: {
                        use: context?.arrowEnd,
                    },
                }}
                animationSpeed={context?.animationSpeedValue ?? "300ms"}
                indexing={context?.indexing}
            >
                <List />
            </Pagination>
        </div>
    );
};
