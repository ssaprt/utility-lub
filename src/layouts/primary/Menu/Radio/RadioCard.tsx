"use client";

import { GeneralButton } from "@/components/button/GeneralButton/GeneralButton";
import { useAppContextActions } from "@/context/appContext";
import { IconPlayerPlayFilled } from "@tabler/icons-react";

export const RadioCard = () => {
    const { setViewRadioController } = useAppContextActions();

    const handleOpenRadio = () => {
        setViewRadioController("hidden");
    };

    return (
        <div className="col-center-2 md:row-start-2 p-2 bg-fg/20">
            <div
                aria-hidden="true"
                className="
                    aspect-[4/3]
                    w-[80vw]
                    m-auto
                    md:m-0
                    max-w-[300px]
                    
                    self-stretch
                    shrink-0
                    bg-fg
                    
                    [mask-image:url('/boom.png')]
                    [mask-position:center]
                    [mask-repeat:no-repeat]
                    [mask-size:contain]

                    [-webkit-mask-image:url('/boom.png')]
                    [-webkit-mask-position:center]
                    [-webkit-mask-repeat:no-repeat]
                    [-webkit-mask-size:contain]
                "
            />

            <div className="col-center-1 md:col-start-1">
                <h3>Tap to listen</h3>
                <GeneralButton
                    icon={<IconPlayerPlayFilled className="size-4" />}
                    className="p-4! [&_*]:p-0! m-0! rounded-full! gap-0!"
                    textButton=""
                    variant="frame"
                    handleAction={handleOpenRadio}
                />{" "}
            </div>
        </div>
    );
};

{
    /* 

*/
}
