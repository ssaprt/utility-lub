import { Hr } from "@/components/hr/Hr/Hr";
import { AppLink } from "@/content/react/UI-Components/Pagination/components/link/AppLink";
import { useBreakpoint } from "@/hooks/useBreakPoint";
import LogoIcon from "@/icons/mana.svg";
import { useState } from "react";
import { Loader } from "../animationIcons/Loader/Loader";

export const HeaderTitle = () => {
    const isDesktop = useBreakpoint("lg");
    const [vis, setVis] = useState(false);

    return isDesktop ? (
        <div
            onMouseEnter={() => setVis(true)}
            onMouseLeave={() => setVis(false)}
            className="col-stretch-0 w-full shrink-0"
        >
            <AppLink
                href="/"
                className="row-center-1
            gap-4 
            shrink-0
            w-full!
            pl-4
            py-[15px]
            hover:bg-fg/10
            cursor-pointer
            "
                style={{
                    flex: "0 0 auto",
                    width: "max-content",
                    minWidth: "max-content",
                }}
            >
                <LogoIcon className="w-[30px] h-[30px] fill-fg" />
                <h4 className="!tracking-[1.25px] text-fg">Utility Lab</h4>
            </AppLink>
            {vis && (
                <div
                    className={`overflow-visible pointer-events-none absolute w-[30px] h-[20px] left-4 top-0`}
                >
                    <Loader mode="rise" visible />
                </div>
            )}
            <Hr mode="horizontal" size={1} />
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
            <LogoIcon className="w-[30px] h-[30px] fill-fg" />
            <h4 className="!tracking-[1.5px] text-fg">Utility Lab</h4>
        </AppLink>
    );
};
