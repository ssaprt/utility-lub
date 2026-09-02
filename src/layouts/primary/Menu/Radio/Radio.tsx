// const stripeColors = [
//     "fg/10",
//     "fg/10",
//     "fg/10",
//     "fg/10",
//     "fg/10",
//     "fg/10",
//     "fg/10",
//     "fg/10",
// ] as const;

import { GeneralButton } from "@/components/button/GeneralButton/GeneralButton";
import { AppLink } from "@/content/react/UI-Components/Pagination/components/link/AppLink";
import { IconWaveSawTool } from "@tabler/icons-react";

export const Radio = () => {
    return (
        <AppLink
            href="#"
            className="
            col-center-2
            px-2
            py-6
            
            overflow-hidden
            rounded-lg
            hover:bg-fg/10
            hover:shadow-lg
            hover:shadow-black/20
            transition-all
            duration-300
            ease-in-out
            "
        >
            <div
                className="relative bg-fg
       aspect-[4/3]
        w-[140px]

        bg-fg
        [mask-image:url('/boom.png')]
        [mask-position:center]
        [mask-repeat:no-repeat]
        [mask-size:contain]
        [-webkit-mask-image:url('/boom.png')]
        [-webkit-mask-position:center]
        [-webkit-mask-repeat:no-repeat]
        [-webkit-mask-size:contain]"
            ></div>
            <GeneralButton
                icon={<IconWaveSawTool className="w-4 h-4" />}
                className="py-2! px-4!"
                textButton="Listen our Radio"
                variant="frame"
                handleAction={() => {}}
            />
            {/* <div className="absolute inset-[0%] grid grid-cols-8 gap-[4px] z-1">
                {stripeColors.map((color, index) => (
                    <div
                        key={`${color}-${index}`}
                        className={`h-full min-w-0 bg-${color}`}
                    />
                ))}
            </div> */}
        </AppLink>
    );
};
