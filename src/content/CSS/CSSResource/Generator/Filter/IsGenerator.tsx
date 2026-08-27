"use client";

import { BlockWithTextarea } from "@/components/blocks/block-with-textarea/BlockWithTextarea";
import { GeneralButton } from "@/components/button/GeneralButton/GeneralButton";
import { useAppContextValues } from "@/context/appContext";

import { IconPhoto, IconUpload } from "@tabler/icons-react";

import { motion } from "framer-motion";

import { useEffect, useMemo, useRef, useState, type ChangeEvent } from "react";

import { ConfigImageFilter } from "./ConfigImageFilter";

import {
    createDefaultImageFilterConfig,
    type ImageFilterConfig,
} from "./image-filter.type";

import Image from "next/image";
import {
    DEFAULT_IMAGE_SRC,
    imageFilterToCss,
    imageFilterToCssValue,
    imageFilterToHtml,
} from "./image-filter.utils";

export const IsGenerator = () => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const objectUrlRef = useRef<string | null>(null);

    const [imageSrc, setImageSrc] = useState(DEFAULT_IMAGE_SRC);

    const [config, setConfig] = useState<ImageFilterConfig>(
        createDefaultImageFilterConfig,
    );

    const { header } = useAppContextValues();

    const { isScrolled } = header || {};

    const scroll = (isScrolled?.scroll.scrollTop ?? 0) > 380;

    const filter = useMemo(() => {
        return imageFilterToCssValue(config.filters);
    }, [config.filters]);

    const css = useMemo(() => {
        return imageFilterToCss(config.filters);
    }, [config.filters]);

    const html = useMemo(() => {
        return imageFilterToHtml();
    }, []);

    useEffect(() => {
        return () => {
            if (objectUrlRef.current) {
                URL.revokeObjectURL(objectUrlRef.current);
            }
        };
    }, []);

    const openFilePicker = () => {
        fileInputRef.current?.click();
    };

    const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (!file || !file.type.startsWith("image/")) {
            return;
        }

        if (objectUrlRef.current) {
            URL.revokeObjectURL(objectUrlRef.current);
        }

        const url = URL.createObjectURL(file);

        objectUrlRef.current = url;

        setImageSrc(url);

        event.target.value = "";
    };

    const resetImage = () => {
        if (objectUrlRef.current) {
            URL.revokeObjectURL(objectUrlRef.current);

            objectUrlRef.current = null;
        }

        setImageSrc(DEFAULT_IMAGE_SRC);
    };

    return (
        <div
            className="
                relative
                col-stretch-1
                w-full

                lg:row-stretch-4
            "
        >
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
            />

            <div
                className="
                    relative
                    z-2

                    flex

                    h-[320px]
                    w-full

                    items-center
                    justify-center

                    overflow-visible

                    sm:h-[400px]

                    lg:sticky
                    lg:top-0
                    lg:h-[460px]
                    lg:min-w-[400px]
                    lg:w-1/2
                "
            >
                <div
                    className="
                        relative

                        h-full
                        w-full

                        overflow-hidden

                        rounded-[3px]

                        border
                        border-fg/10

                        shadow-md
                        shadow-black/10
                    "
                >
                    <Image
                        width={0}
                        height={0}
                        src={imageSrc}
                        alt="Filter preview"
                        draggable={false}
                        style={{
                            width: "100%",

                            height: "100%",

                            objectFit: config.fit,

                            filter,
                        }}
                    />

                    <div
                        className="
                            absolute
                            top-2
                            left-2
                            z-10

                            row-center-1
                            w-fit
                            max-w-[calc(100%-16px)]
                            flex-wrap

                            rounded-[4px]

                            bg-app/85

                            p-0.5

                            shadow-md
                            shadow-black/20

                            backdrop-blur-md
                        "
                    >
                        <GeneralButton
                            variant="ghost"
                            icon={<IconUpload className="size-4" />}
                            textButton="Upload"
                            handleAction={openFilePicker}
                        />

                        <GeneralButton
                            variant="ghost"
                            icon={<IconPhoto className="size-4" />}
                            textButton="Default"
                            handleAction={resetImage}
                        />
                    </div>
                </div>
            </div>

            <motion.div
                onClick={() =>
                    isScrolled?.main?.scrollTo({
                        top: 0,

                        behavior: "smooth",
                    })
                }
                animate={{
                    opacity: scroll ? 1 : 0,

                    x: scroll ? 0 : "100%",
                }}
                transition={{
                    type: "spring",

                    stiffness: scroll ? 100 : 500,

                    damping: scroll ? 8 : 24,

                    mass: 0.4,
                }}
                className="
                    fixed
                    z-[100]

                    hidden

                    size-[100px]

                    cursor-pointer

                    items-center
                    justify-center

                    overflow-hidden
                    rounded-md
                    border
                    border-fg/10

                    bg-app

                    shadow-lg
                    shadow-black/80

                    lg:flex
                "
                style={{
                    right: "20px",

                    top: "90px",

                    pointerEvents: scroll ? "auto" : "none",
                }}
            >
                <Image
                    width={0}
                    height={0}
                    src={imageSrc}
                    alt=""
                    draggable={false}
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        filter,
                    }}
                />
            </motion.div>

            <div
                className="
                    col-center-2

                    min-w-0

                    flex-1
                "
            >
                <ConfigImageFilter
                    config={config}
                    setConfig={setConfig}
                    imageSrc={imageSrc}
                />

                <div
                    className="
                        col-stretch-2
                        w-full
                    "
                >
                    <BlockWithTextarea
                        title="CSS"
                        placeholder="Generated filter CSS"
                        copy
                        result={css}
                    />

                    <BlockWithTextarea
                        title="HTML"
                        placeholder="Generated HTML"
                        copy
                        result={html}
                    />
                </div>
            </div>
        </div>
    );
};
