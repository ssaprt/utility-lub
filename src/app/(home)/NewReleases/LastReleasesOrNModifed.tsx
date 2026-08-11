import { DataLoader } from "@/components/data-loader/DataLoader";
import { AppLink } from "@/content/react/UI-Components/Pagination/components/link/AppLink";
import { useGetNpmPackagesQuery } from "@/services/NPM/NPMApi";

import { DynamicSvgIcon } from "@/components/svg/DynamicSVGIcon";
import { latestOrModifiedFive } from "@/services/NPM/utils/latest-or-modifed-five";
import { IconCalendarPlus, IconExternalLinkFilled } from "@tabler/icons-react";
import { ScrollToFuture } from "scroll-to-future";
import { packageIcons } from "./icons";

export const LastReleasesOrNModifed = ({
    fieldSort,
    title,
    icon,
}: {
    fieldSort: "created" | "modified";
    title: string;
    icon: string;
}) => {
    const { data, isLoading, isFetching, isError, refetch } =
        useGetNpmPackagesQuery(
            {},
            {
                selectFromResult: (result) => ({
                    ...result,
                    data: latestOrModifiedFive(result.data, fieldSort),
                }),
            },
        );

    return (
        <div className="col-stretch-3">
            <div className="row-center-2">
                <DynamicSvgIcon name={icon} className="w-6 h-6 fill-fg" />
                <span className="text-fg">{title}</span>
            </div>
            <DataLoader
                isLoading={isLoading}
                isFetching={isFetching}
                isError={isError}
                onRetry={refetch}
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
                px-2
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
                        shadow-[0_2px_4px_2px] 
                        shadow-black/20 
                        
                        hover:[&>svg:last-of-type]:w-5 
                        hover:[&>svg:last-of-type]:h-5 
                        hover:[&>svg:last-of-type]:p-[4px] 
                        hover:[&>svg:last-of-type]:mr-0 
                        
                        hover:bg-fg/20 
                        "
                            >
                                <div className="col-stretch-2">
                                    <div className="row-center-2">
                                        {packageIcons[item.name][0]}
                                        <span className="text-sm">
                                            {item.name}
                                        </span>
                                    </div>

                                    <div className="col-start-1 w-0 min-w-full">
                                        <div className="row-center-1">
                                            <IconCalendarPlus className="w-4 h-4 text-fg/70" />

                                            <span className="text-[10px] text-fg/70 font-semibold">
                                                {fieldSort === "created"
                                                    ? "Created"
                                                    : "Modified"}{" "}
                                                {item.time[fieldSort]}
                                            </span>
                                        </div>

                                        <span className="w-full text-[12px] whitespace-normal break-words">
                                            {item.description}
                                        </span>
                                    </div>
                                </div>

                                <IconExternalLinkFilled
                                    className="
                                text-fg
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
        </div>
    );
};
