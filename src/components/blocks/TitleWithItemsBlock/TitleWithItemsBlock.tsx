export const TitleWithItemsBlock = ({
    title,
    children,
}: {
    title: React.ReactNode;
    children?: React.ReactNode;
}) => {
    return (
        <div
            className="
                flex 
                flex-col 
                gap-2 
                items-start
                bg-black/10 
                px-4 
                py-3 
                rounded-sm 
                shadow-xl 
                border 
                border-pink-300/60 
                relative 
                overflow-hidden
                "
        >
            <span className="!text-[12px] py-[2px] px-[10px] bg-purple-100/10 rounded-[24px] select-none">
                {title}
            </span>
            <div className="flex flex-row flex-wrap w-full gap-2">
                {children}
            </div>
        </div>
    );
};
