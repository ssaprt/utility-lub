"use client";

export const RadioCard = ({ className }: { className?: string }) => {
    return (
        <div
            aria-hidden="true"
            className={` aspect-[1/1]
                    w-30
                    h-30
                    
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

                    ${className}`}
        />
    );
};
