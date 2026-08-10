export const TitleWithItemsBlock = ({
    title,
    children,
    classNameTitle,
    className,
    classNameBody,
}: {
    title: React.ReactNode;
    children?: React.ReactNode;
    className?: string;
    classNameTitle?: string;
    classNameBody?: string;
}) => {
    return (
        <div
            className={`flex 
                flex-col 
                gap-2 
                items-start
                bg-black/8 
                px-4 
                py-3 
                rounded-md 
                shadow-lg 
                shadow-black/20 
                border-1 
                border-fg/30 
                relative 
                overflow-hidden 
                ${className}
                `}
        >
            <span
                className={`!text-[12px] py-[2px] px-[10px] bg-fg/10 rounded-[24px] select-none ${classNameTitle}`}
            >
                {title}
            </span>
            <div
                className={`flex flex-row flex-wrap w-full gap-2 ${classNameBody}`}
            >
                {children}
            </div>
        </div>
    );
};
