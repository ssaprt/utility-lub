export const TitleWithItemsBlock = ({
    title,
    children,
}: {
    title: string;
    children?: React.ReactNode;
}) => {
    return (
        <div
            className="
                flex 
                flex-col 
                gap-1 
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
            <span className="!text-[12px]">{title}</span>
            <div className="flex flex-row flex-wrap gap-2">{children}</div>
        </div>
    );
};
