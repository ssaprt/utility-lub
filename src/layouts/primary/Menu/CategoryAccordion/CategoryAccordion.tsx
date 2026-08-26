import { Loader } from "@/components/animationIcons/Loader/Loader";
import { GeneralButton } from "@/components/button/GeneralButton/GeneralButton";
import { DynamicSvgIcon } from "@/components/svg/DynamicSVGIcon";
import { Top } from "./Top";

export const CategoryAccordion = ({
    title,
    icon,
    children,
    loading,
    isError,
    refetch,
}: {
    title: string;
    icon: React.ReactNode | string;
    children: React.ReactNode;
    loading?: boolean;
    isError?: boolean;
    refetch?: () => void;
}) => {
    return (
        <div className="relative px-2 py-1 rounded-lg bg-fg/10">
            <Top title={title} icon={icon} />
            {loading ? (
                <div className="flex w-full min-h-30 items-center justify-center">
                    <Loader visible mode="wave" />
                </div>
            ) : isError ? (
                <div className="col-center-3 w-full min-h-30 justify-center">
                    <DynamicSvgIcon
                        name="error.svg"
                        className="w-8 h-8 fill-fg"
                    />

                    <span className="text-xs text-fg/70">
                        Failed to load {title}
                    </span>

                    <GeneralButton
                        variant="minimal"
                        textButton="Try again"
                        handleAction={refetch}
                    />
                </div>
            ) : (
                children
            )}
        </div>
    );
};
