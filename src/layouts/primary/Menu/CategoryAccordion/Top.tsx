import { CategoryTitle } from "@/components/CategoryTitle/CategoryTitle";
import { DynamicSvgIcon } from "@/components/svg/DynamicSVGIcon";

export const Top = ({
    title,
    icon,
}: {
    title: string;
    icon: React.ReactNode | string;
}) => {
    return (
        <CategoryTitle
            icon={
                typeof icon === "string" ? (
                    <DynamicSvgIcon
                        name={icon}
                        className="w-[20px] h-[20px] fill-app"
                    />
                ) : (
                    icon
                )
            }
        >
            {title}
        </CategoryTitle>
    );
};
