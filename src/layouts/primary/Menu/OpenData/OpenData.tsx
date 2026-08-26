import { MenuAccordion } from "@/components/accordions/MenuAccordion/MenuAccordion";
import { IconDatabase, IconFileTypeSql } from "@tabler/icons-react";
import { CategoryAccordion } from "../CategoryAccordion/CategoryAccordion";

export const OpenData = () => {
    return (
        <CategoryAccordion
            title="Open Data"
            icon={<IconDatabase className="w-[20px] h-[20px] stroke-app" />}
        >
            {" "}
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
        </CategoryAccordion>
    );
};
