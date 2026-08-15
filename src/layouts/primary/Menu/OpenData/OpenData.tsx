import { MenuAccordion } from "@/components/accordions/MenuAccordion/MenuAccordion";
import { IconDatabase, IconFileTypeSql } from "@tabler/icons-react";
import { CategoryTitle } from "../CategoryTitle/CategoryTitle";

export const OpenData = () => {
    return (
        <>
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
        </>
    );
};
