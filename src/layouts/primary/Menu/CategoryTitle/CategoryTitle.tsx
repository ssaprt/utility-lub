export const CategoryTitle = ({
    icon,
    children,
}: {
    icon: React.ReactNode;
    children: string;
}) => {
    return (
        <div className="my-2 flex flex-row items-center gap-2 p-none ">
            {icon}
            <i className="text-fg font-bold tracking-widest text-[12px]">
                {children}
            </i>
        </div>
    );
};
