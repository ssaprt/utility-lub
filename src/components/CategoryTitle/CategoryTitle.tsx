export const CategoryTitle = ({
    icon,
    children,
}: {
    icon: React.ReactNode;
    children: string;
}) => {
    return (
        <div className="my-2 flex flex-row items-center gap-2 py-[4px] px-2 bg-fg rounded-md outline-2 outline-fg outline-offset-2">
            {icon}
            <i className="text-app font-bold tracking-widest text-[12px]">
                {children}
            </i>
        </div>
    );
};
