import { IconBook } from "@tabler/icons-react";

export const HowUse = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex flex-col gap-4 border-2 border-pink-300/60 bg-pink-400/10 border-solid rounded-xl py-4 px-4 items-start">
            <span className="flex flex-row items-center gap-2 !text-pink-300 !text-[18px] !ml-2 font-bold tracking-[1.1px]  capitalize !font-[sans-serif]">
                <IconBook /> HOW USE
            </span>
            {children}
        </div>
    );
};
