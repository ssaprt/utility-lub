import { Hr } from "@/components/hr/Hr/Hr";
import { AppLink } from "@/content/react/UI-Components/Pagination/components/link/AppLink";
import { useBreakpoint } from "@/hooks/useBreakPoint";
import Image from "next/image";

export const HeaderTitle = () => {
    const isDesktop = useBreakpoint("lg");

    return isDesktop ? (
        <div className="flex flex-col items-center w-full gap-1 shrink-0">
            <AppLink
                href="/"
                className="flex 
            flex-row 
            justify-between 
            items-center 
            gap-4 
            shrink-0
            pt-[16px] 
            pb-[6px]
            cursor-pointer
            max-w-full
            w-full
            mb-1"
                style={{
                    flex: "0 0 auto",
                    width: "max-content",
                    minWidth: "max-content",
                }}
            >
                <Image src="/mana.svg" alt="logo" width={30} height={30} />
                <h4 className="uppercase font-bold !tracking-[1.5px] text-pink-300/80">
                    Utility Lab
                </h4>
            </AppLink>
            <Hr mode="horizontal" />
        </div>
    ) : (
        <AppLink
            href="/"
            className="flex 
            flex-row 
            justify-between 
            items-center 
            gap-4 
            shrink-0
            pt-[13.5px]
            pb-[13px]
            cursor-pointer
            
            max-w-[calc(100vw-90px)] 
            w-full
            mb-1"
            style={{
                flex: "0 0 auto",
                width: "max-content",
                minWidth: "max-content",
            }}
        >
            <Image src="/mana.svg" alt="logo" width={30} height={30} />
            <h4 className="uppercase font-bold !tracking-[1.5px] text-pink-300/80">
                Utility Lab
            </h4>
        </AppLink>
    );
};
