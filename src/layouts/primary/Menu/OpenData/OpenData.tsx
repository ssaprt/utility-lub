import { MenuAccordion } from "@/components/accordions/MenuAccordion/MenuAccordion";
import { IconDatabase, IconFileTypeSql } from "@tabler/icons-react";
import { CategoryTitle } from "../../../../components/CategoryTitle/CategoryTitle";

export const OpenData = () => {
    return (
        <div className="relative px-2 py-1 rounded-lg bg-fg/10">
            <CategoryTitle
                icon={<IconDatabase className="w-[20px] h-[20px] stroke-app" />}
            >
                Open Data
            </CategoryTitle>

            <MenuAccordion
                id="Tables"
                icon={<IconFileTypeSql className="h-[20px] w-[20px]" />}
                title="Tables"
                items={[
                    {
                        type: "link",
                        href: "/open-data/tables/table-of-russian-cities",
                        title: "Table of Russian Cities",
                    },
                ]}
            />
        </div>
    );
};
