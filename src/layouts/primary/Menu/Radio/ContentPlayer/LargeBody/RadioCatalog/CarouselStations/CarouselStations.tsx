"use client";

import { ReactNode, useState } from "react";

import { EmblaOptionsType } from "embla-carousel";

import AutoScroll from "embla-carousel-auto-scroll";

import useEmblaCarousel from "embla-carousel-react";

type PropType = {
    slides: ReactNode[];
    options?: EmblaOptionsType;
    speed?: number;
};

export const CarouselStations = ({ slides, options, speed = 1 }: PropType) => {
    const [autoScroll] = useState(() =>
        AutoScroll({
            speed,
            startDelay: 0,
            playOnInit: true,
            stopOnInteraction: false,
            stopOnMouseEnter: false,
            stopOnFocusIn: false,
        }),
    );

    const [emblaRef] = useEmblaCarousel(
        {
            ...options,
            loop: true,
            dragFree: true,
            align: "start",
        },
        [autoScroll],
    );

    return (
        <div
            className="
                embla
                relative
                w-full
                max-w-full
                row-center-1
            "
        >
            <div
                ref={emblaRef}
                className="
                    relative
                    embla__viewport
                    w-full
                    max-w-full
                    py-4
                    px-2
                "
            >
                <div className="embla__container z-1">
                    {slides.map((content, index) => (
                        <div className="embla__slide" key={index}>
                            <div className="embla__slide__number">
                                {content}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
