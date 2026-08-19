"use client";

import { GeneralButton } from "@/components/button/GeneralButton/GeneralButton";
import { NumberInput } from "@/components/input/Number/Number";
import { useAppContextValues } from "@/context/appContext";
import {
    IconPhoto,
    IconPhotoOff,
    IconPlus,
    IconTrash,
} from "@tabler/icons-react";
import { motion } from "framer-motion";
import {
    useEffect,
    useMemo,
    useRef,
    useState,
    type ChangeEvent,
    type Dispatch,
    type PointerEvent,
    type SetStateAction,
} from "react";
import {
    defaultClipPathConfig,
    type ClipPathConfig,
    type ClipPathPoint,
} from "./clip-path.type";
import { clipPathConfigToCss, cloneClipPathPoints } from "./clip-path.utils";

interface IsGeneratorProps {
    config: ClipPathConfig;
    setConfig: Dispatch<SetStateAction<ClipPathConfig>>;
}

const clamp = (value: number, min: number, max: number) => {
    return Math.min(Math.max(value, min), max);
};

const round = (value: number) => {
    return Number(value.toFixed(2));
};

const createId = () => {
    return crypto.randomUUID();
};

export const IsGenerator = ({ config, setConfig }: IsGeneratorProps) => {
    const editorRef = useRef<HTMLDivElement>(null);
    const fileRef = useRef<HTMLInputElement>(null);
    const imageUrlRef = useRef<string | null>(null);

    const [imageUrl, setImageUrl] = useState<string | null>(null);

    const { header } = useAppContextValues();
    const { isScrolled } = header || {};

    const clipPath = useMemo(() => {
        return clipPathConfigToCss(config);
    }, [config]);

    const css = useMemo(() => {
        return `clip-path: ${clipPath};`;
    }, [clipPath]);

    const releaseImage = () => {
        if (imageUrlRef.current) {
            URL.revokeObjectURL(imageUrlRef.current);
            imageUrlRef.current = null;
        }

        setImageUrl(null);
    };

    useEffect(() => {
        return () => {
            if (imageUrlRef.current) {
                URL.revokeObjectURL(imageUrlRef.current);
            }
        };
    }, []);

    const updatePoint = (
        id: string,
        values: Partial<Pick<ClipPathPoint, "x" | "y">>,
    ) => {
        setConfig((current) => ({
            ...current,
            mode: "custom",
            presetId: null,
            points: current.points.map((point) =>
                point.id === id
                    ? {
                          ...point,
                          ...values,
                      }
                    : point,
            ),
        }));
    };

    const updatePointFromPointer = (
        id: string,
        clientX: number,
        clientY: number,
    ) => {
        const editor = editorRef.current;

        if (!editor) {
            return;
        }

        const rect = editor.getBoundingClientRect();

        const x = round(
            clamp(((clientX - rect.left) / rect.width) * 100, 0, 100),
        );

        const y = round(
            clamp(((clientY - rect.top) / rect.height) * 100, 0, 100),
        );

        updatePoint(id, {
            x,
            y,
        });
    };

    const handlePointerDown = (
        event: PointerEvent<HTMLButtonElement>,
        id: string,
    ) => {
        event.currentTarget.setPointerCapture(event.pointerId);

        updatePointFromPointer(id, event.clientX, event.clientY);
    };

    const handlePointerMove = (
        event: PointerEvent<HTMLButtonElement>,
        id: string,
    ) => {
        if (!event.currentTarget.hasPointerCapture(event.pointerId)) {
            return;
        }

        updatePointFromPointer(id, event.clientX, event.clientY);
    };

    const addPoint = () => {
        setConfig((current) => {
            const points = current.points;

            if (points.length >= 30) {
                return current;
            }

            let longestIndex = 0;
            let longestDistance = -1;

            for (let index = 0; index < points.length; index += 1) {
                const point = points[index];

                const nextPoint = points[(index + 1) % points.length];

                const distance = Math.hypot(
                    nextPoint.x - point.x,
                    nextPoint.y - point.y,
                );

                if (distance > longestDistance) {
                    longestDistance = distance;
                    longestIndex = index;
                }
            }

            const point = points[longestIndex];

            const nextPoint = points[(longestIndex + 1) % points.length];

            const newPoint: ClipPathPoint = {
                id: createId(),

                x: round((point.x + nextPoint.x) / 2),

                y: round((point.y + nextPoint.y) / 2),
            };

            const nextPoints = [...points];

            nextPoints.splice(longestIndex + 1, 0, newPoint);

            return {
                ...current,
                mode: "custom",
                presetId: null,
                points: nextPoints,
            };
        });
    };

    const removePoint = (id: string) => {
        setConfig((current) => {
            if (current.points.length <= 3) {
                return current;
            }

            return {
                ...current,
                mode: "custom",
                presetId: null,
                points: current.points.filter((point) => point.id !== id),
            };
        });
    };

    const startCustom = () => {
        releaseImage();

        setConfig({
            ...defaultClipPathConfig,
            mode: "custom",
            presetId: null,
            points: cloneClipPathPoints(defaultClipPathConfig.points, "custom"),
        });
    };

    const resetCustom = () => {
        setConfig({
            ...defaultClipPathConfig,
            mode: "custom",
            presetId: null,
            points: cloneClipPathPoints(defaultClipPathConfig.points, "custom"),
        });
    };

    const handleImage = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (!file) {
            return;
        }

        if (imageUrlRef.current) {
            URL.revokeObjectURL(imageUrlRef.current);
        }

        const nextUrl = URL.createObjectURL(file);

        imageUrlRef.current = nextUrl;

        setImageUrl(nextUrl);

        event.target.value = "";
    };

    const clearImage = () => {
        releaseImage();
    };

    const scroll = (isScrolled?.scroll.scrollTop ?? 0) > 380;

    const visualStyle = {
        clipPath,
        WebkitClipPath: clipPath,

        backgroundImage: imageUrl
            ? `url("${imageUrl}")`
            : "linear-gradient(135deg, #7c3aed 0%, #ec4899 50%, #f59e0b 100%)",

        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
    };

    return (
        <div className="col-start-1 lg:row-stretch-4 w-full">
            <div className="col-start-2 p-3 h-fit bg-fg/10 rounded-xl relative lg:sticky lg:top-0">
                <div className="row-center-1 w-full p-2">
                    <input
                        ref={fileRef}
                        type="file"
                        accept="image/*"
                        onChange={handleImage}
                        className="hidden"
                    />

                    <div className="row-center-2 w-full flex-wrap justify-between">
                        {!imageUrl && (
                            <GeneralButton
                                icon={<IconPhoto />}
                                textButton={
                                    imageUrl ? "Change image" : "Upload image"
                                }
                                variant="soft"
                                handleAction={() => fileRef.current?.click()}
                            />
                        )}

                        {imageUrl && (
                            <GeneralButton
                                icon={<IconPhotoOff />}
                                textButton="Remove image"
                                variant="minimal"
                                handleAction={clearImage}
                            />
                        )}

                        <GeneralButton
                            textButton="Custom polygon"
                            variant="soft"
                            active={config.mode === "custom" && !imageUrl}
                            handleAction={startCustom}
                        />
                    </div>
                </div>

                <div className="flex w-full justify-center z-22222">
                    <div
                        ref={editorRef}
                        className="
                        relative
                        size-[80vw]
                        lg:size-[450px]
                        shrink-0
                        overflow-visible
                       
                    "
                    >
                        <div
                            className="
                            absolute
                            inset-0
                            overflow-hidden
                            rounded-xl
                        "
                        >
                            <div
                                className="
                                size-full
                                transition-[clip-path,background]
                                duration-300
                                ease-out
                            "
                                style={visualStyle}
                            />
                        </div>

                        {config.points.map((point, index) => (
                            <button
                                key={point.id}
                                type="button"
                                aria-label={`Clip path point ${index + 1}`}
                                onPointerDown={(event) =>
                                    handlePointerDown(event, point.id)
                                }
                                onPointerMove={(event) =>
                                    handlePointerMove(event, point.id)
                                }
                                className="
                                    absolute
                                    z-2
                                    flex
                                    size-5
                                    -translate-x-1/2
                                    -translate-y-1/2
                                    touch-none
                                    cursor-grab
                                    items-center
                                    justify-center
                                    rounded-full
                                    border-2
                                    border-white
                                    bg-black/70
                                    text-[8px]
                                    font-semibold
                                    text-white
                                    shadow-md
                                    shadow-black/40
                                    transition-transform
                                    duration-150
                                    hover:scale-125
                                    active:scale-110
                                    active:cursor-grabbing
                                "
                                style={{
                                    left: `${point.x}%`,
                                    top: `${point.y}%`,
                                }}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <motion.div
                onClick={() =>
                    document.querySelector<HTMLElement>("#main")?.scrollTo({
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
                    z-2
                    size-[100px]
                    cursor-pointer
                    overflow-hidden
                    rounded-xl
                    bg-fg/5
                    shadow-lg
                    shadow-black/80
                "
                style={{
                    right: "20px",
                    top: "90px",
                }}
            >
                <div className="size-full" style={visualStyle} />
            </motion.div>

            <div className="col-start-2 w-full">
                {config.mode === "custom" && (
                    <div className="col-start-2 w-full lg:w-auto">
                        <div className="row-center-2 flex-wrap">
                            <GeneralButton
                                icon={<IconPlus />}
                                textButton="Add point"
                                variant="soft"
                                active={config.points.length >= 30}
                                handleAction={addPoint}
                            />

                            <GeneralButton
                                textButton="Reset polygon"
                                variant="minimal"
                                handleAction={resetCustom}
                            />
                        </div>

                        <div className="col-start-2 w-full">
                            {config.points.map((point, index) => (
                                <div
                                    key={point.id}
                                    className="
                                        row-center-1
                                        items-center
                                        justify-between
                                        gap-2
                                        rounded-[4px]
                                        bg-fg/5
                                        p-2
                                        w-full
                                    "
                                >
                                    <span className="text-[12px]">
                                        Point {index + 1}
                                    </span>

                                    <label className="row-center-1">
                                        <span className="text-[12px] text-fg/60">
                                            X
                                        </span>

                                        <NumberInput
                                            value={point.x}
                                            min={-100}
                                            max={100}
                                            ariaLabel={`Point ${index + 1} X`}
                                            onChange={(event) =>
                                                updatePoint(point.id, {
                                                    x: clamp(
                                                        Number(event),
                                                        0,
                                                        100,
                                                    ),
                                                })
                                            }
                                        />

                                        <span className="text-xs text-fg/60">
                                            %
                                        </span>
                                    </label>

                                    <label className="row-center-1">
                                        <span className="text-xs text-fg/60">
                                            Y
                                        </span>

                                        <NumberInput
                                            value={point.y}
                                            min={-100}
                                            max={100}
                                            ariaLabel={`Point ${index + 1} Y`}
                                            onChange={(event) =>
                                                updatePoint(point.id, {
                                                    y: clamp(event, 0, 100),
                                                })
                                            }
                                        />

                                        <span className="text-xs text-fg/60">
                                            %
                                        </span>
                                    </label>

                                    <GeneralButton
                                        textButton="Remove"
                                        icon={<IconTrash />}
                                        variant="minimal"
                                        active={config.points.length <= 3}
                                        handleAction={() =>
                                            removePoint(point.id)
                                        }
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="col-start-2 bg-fg/10 rounded-xl p-2">
                    <div className="row-center-2 flex-wrap">
                        <GeneralButton
                            textButton="Copy CSS"
                            copy={{
                                copyItem: css,
                            }}
                            variant="soft"
                        />
                    </div>

                    <div className="rounded-lg p-3 transition-colors duration-200 hover:bg-black/25">
                        <code className="text-sm break-all">{css}</code>
                    </div>
                </div>
            </div>
        </div>
    );
};
