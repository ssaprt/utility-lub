import { TitleWithItemsBlock } from "@/components/blocks/TitleWithItemsBlock/TitleWithItemsBlock";
import { DataLoader } from "@/components/data-loader/DataLoader";
import { AppLink } from "@/content/react/UI-Components/Pagination/components/link/AppLink";
import { IconExternalLinkFilled } from "@tabler/icons-react";
import { useState } from "react";
import { ScrollToFuture } from "scroll-to-future";
import PopularIcon from "./ask.svg";
import { getNpmPackagesStats, NpmPackagesStats } from "./get-weekly-populars";
import { packageIcons } from "./icons";

export const WeeklyPopularLibrary = () => {
    const [data, setData] = useState<NpmPackagesStats | null>(null);

    const fetchData = async () => {
        const data = await getNpmPackagesStats();
        if (data) {
            setData(data);
            return true;
        }
        return false;
    };

    return (
        <TitleWithItemsBlock
            title={
                <div className="row-center-2">
                    <PopularIcon className="w-6 h-6 fill-pink-300" />
                    <span className="text-pink-300">Weekly popular tools</span>
                </div>
            }
        >
            <DataLoader
                responseFn={fetchData}
                errorText="Failed to load weekly populars"
            >
                {data !== null && (
                    <div
                        className={`
                col-stretch-2
                lg:row-stretch-2 
                flex-nowrap

                w-full
                lg:w-full
                
                overflow-x-auto 
                py-2  
                `}
                    >
                        {data?.packages.map((item) => (
                            <AppLink
                                href={packageIcons[item.name][1]}
                                key={item.name}
                                className="
                        relative
                        
                        row-center-2 
                        lg:row-start-2  

                        select-none
                     

                        py-2 
                        px-4 
                        bg-white/10 
                        rounded-[4px] 
                        shrink-0 
                        shadow-md 
                        shadow-black/20 
                        
                        hover:[&>svg:last-of-type]:w-5 
                        hover:[&>svg:last-of-type]:h-5 
                        hover:[&>svg:last-of-type]:p-[4px] 
                        hover:[&>svg:last-of-type]:mr-0 
                        
                        hover:bg-white/20"
                            >
                                <div className="col-stretch-2">
                                    <div className="row-center-2">
                                        {packageIcons[item.name][0]}
                                        <span>{item.name}</span>
                                    </div>

                                    <div className="col-start-1 w-0 min-w-full">
                                        <div className="row-center-1">
                                            <span className="text-[10px] text-pink-300/70">
                                                Installs weekly:
                                            </span>
                                            <span className="text-[10px] text-pink-300/70 font-semibold">
                                                {item.monthlyDownloads}
                                            </span>
                                        </div>

                                        <span className="w-full text-[10px] whitespace-normal break-words">
                                            {item.description}
                                        </span>
                                    </div>
                                </div>

                                <IconExternalLinkFilled
                                    className="
                                text-pink-300
                                relative 
                                top-1/2 
                                -translate-y-1/2
                                w-6
                                lg:w-0 

                                h-6
                                lg:h-0 

                                shrink-0 
                                rounded-full 
                                bg-purple-100/10 

                                shadow-md 
                                shafow-black/40

                                ml-auto

                                mr-0
                                lg:-mr-2

                                p-[4px]
                                lg:p-[0px] 
                                transition-[width,height,padding,margin-right] 
                                duration-300 
                                ease-in-out
                                "
                                />
                            </AppLink>
                        ))}

                        <ScrollToFuture
                            nativeOnMobile={false}
                            scrollBar={{
                                heightTrack: "100%",
                            }}
                        />
                    </div>
                )}
            </DataLoader>
        </TitleWithItemsBlock>
    );
};
