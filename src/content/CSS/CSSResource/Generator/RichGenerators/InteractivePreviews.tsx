"use client";

import { useRef, type CSSProperties, type PointerEvent } from "react";
import type { RichConfig } from "./rich-generator.type";

type Values = RichConfig["values"];

const rgba = (hex: string, alpha: number) => {
    const parsed = Number.parseInt(hex.replace("#", ""), 16);
    return `rgba(${parsed >> 16}, ${(parsed >> 8) & 255}, ${parsed & 255}, ${alpha})`;
};

const graph = { left: 24, right: 296, top: 14, bottom: 186, minY: -2, maxY: 3 };
const pointX = (value: number) =>
    graph.left + value * (graph.right - graph.left);
const pointY = (value: number) =>
    graph.bottom -
    ((value - graph.minY) / (graph.maxY - graph.minY)) *
        (graph.bottom - graph.top);

export const BezierPreview = ({
    config,
    mini = false,
    onChange,
}: {
    config: RichConfig;
    mini?: boolean;
    onChange?: (point: 1 | 2, x: number, y: number) => void;
}) => {
    const svgRef = useRef<SVGSVGElement>(null);
    const v = config.values;

    const updateFromPointer = (
        event: PointerEvent<SVGCircleElement>,
        point: 1 | 2,
    ) => {
        const svg = svgRef.current;
        const matrix = svg?.getScreenCTM();
        if (!svg || !matrix || !onChange) return;
        const cursor = svg.createSVGPoint();
        cursor.x = event.clientX;
        cursor.y = event.clientY;
        const local = cursor.matrixTransform(matrix.inverse());
        const x = Math.min(
            1,
            Math.max(0, (local.x - graph.left) / (graph.right - graph.left)),
        );
        const y = Math.min(
            graph.maxY,
            Math.max(
                graph.minY,
                graph.minY +
                    ((graph.bottom - local.y) / (graph.bottom - graph.top)) *
                        (graph.maxY - graph.minY),
            ),
        );
        onChange(point, Number(x.toFixed(2)), Number(y.toFixed(2)));
    };

    const pointerDown = (
        event: PointerEvent<SVGCircleElement>,
        point: 1 | 2,
    ) => {
        event.currentTarget.setPointerCapture(event.pointerId);
        updateFromPointer(event, point);
    };

    const pointerMove = (
        event: PointerEvent<SVGCircleElement>,
        point: 1 | 2,
    ) => {
        if (event.currentTarget.hasPointerCapture(event.pointerId))
            updateFromPointer(event, point);
    };

    const gridStyle = {
        backgroundImage:
            "linear-gradient(to right, color-mix(in srgb, var(--foreground) 10%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in srgb, var(--foreground) 10%, transparent) 1px, transparent 1px)",
        backgroundSize: mini ? "12px 12px" : "20px 20px",
    };

    return (
        <div className="col-stretch-2 w-full max-w-[560px]">
            <div
                className={`w-full overflow-hidden rounded-[10px] border border-fg/10 bg-fg/3 ${mini ? "h-[90px]" : "h-[260px] p-2"}`}
                style={gridStyle}
            >
                <svg
                    ref={svgRef}
                    viewBox="0 0 320 200"
                    className="size-full touch-none select-none"
                >
                    <line
                        x1={graph.left}
                        y1={pointY(0)}
                        x2={graph.right}
                        y2={pointY(0)}
                        stroke="currentColor"
                        opacity=".25"
                    />
                    <line
                        x1={graph.left}
                        y1={pointY(1)}
                        x2={graph.right}
                        y2={pointY(1)}
                        stroke="currentColor"
                        opacity=".25"
                    />
                    <line
                        x1={graph.left}
                        y1={pointY(0)}
                        x2={pointX(Number(v.x1))}
                        y2={pointY(Number(v.y1))}
                        stroke="currentColor"
                        opacity=".45"
                    />
                    <line
                        x1={graph.right}
                        y1={pointY(1)}
                        x2={pointX(Number(v.x2))}
                        y2={pointY(Number(v.y2))}
                        stroke="currentColor"
                        opacity=".45"
                    />
                    <path
                        d={`M${graph.left} ${pointY(0)} C${pointX(Number(v.x1))} ${pointY(Number(v.y1))}, ${pointX(Number(v.x2))} ${pointY(Number(v.y2))}, ${graph.right} ${pointY(1)}`}
                        fill="none"
                        stroke={String(v.accent)}
                        strokeWidth={mini ? 6 : 4}
                    />
                    <circle
                        cx={graph.left}
                        cy={pointY(0)}
                        r="4"
                        fill="currentColor"
                        opacity=".55"
                    />
                    <circle
                        cx={graph.right}
                        cy={pointY(1)}
                        r="4"
                        fill="currentColor"
                        opacity=".55"
                    />
                    {!mini && (
                        <circle
                            cx={pointX(Number(v.x1))}
                            cy={pointY(Number(v.y1))}
                            r="22"
                            fill="transparent"
                            className="cursor-grab active:cursor-grabbing"
                            onPointerDown={(event) => pointerDown(event, 1)}
                            onPointerMove={(event) => pointerMove(event, 1)}
                        />
                    )}
                    <circle
                        role="slider"
                        aria-label="Bezier point P1"
                        aria-valuetext={`${v.x1}, ${v.y1}`}
                        tabIndex={mini ? -1 : 0}
                        cx={pointX(Number(v.x1))}
                        cy={pointY(Number(v.y1))}
                        r={mini ? 8 : 11}
                        fill={String(v.accent2)}
                        stroke="var(--background)"
                        strokeWidth="5"
                        className={
                            onChange ? "cursor-grab active:cursor-grabbing" : ""
                        }
                        onPointerDown={
                            onChange
                                ? (event) => pointerDown(event, 1)
                                : undefined
                        }
                        onPointerMove={
                            onChange
                                ? (event) => pointerMove(event, 1)
                                : undefined
                        }
                    />
                    {!mini && (
                        <circle
                            cx={pointX(Number(v.x2))}
                            cy={pointY(Number(v.y2))}
                            r="22"
                            fill="transparent"
                            className="cursor-grab active:cursor-grabbing"
                            onPointerDown={(event) => pointerDown(event, 2)}
                            onPointerMove={(event) => pointerMove(event, 2)}
                        />
                    )}
                    <circle
                        role="slider"
                        aria-label="Bezier point P2"
                        aria-valuetext={`${v.x2}, ${v.y2}`}
                        tabIndex={mini ? -1 : 0}
                        cx={pointX(Number(v.x2))}
                        cy={pointY(Number(v.y2))}
                        r={mini ? 8 : 11}
                        fill={String(v.accent2)}
                        stroke="var(--background)"
                        strokeWidth="5"
                        className={
                            onChange ? "cursor-grab active:cursor-grabbing" : ""
                        }
                        onPointerDown={
                            onChange
                                ? (event) => pointerDown(event, 2)
                                : undefined
                        }
                        onPointerMove={
                            onChange
                                ? (event) => pointerMove(event, 2)
                                : undefined
                        }
                    />
                </svg>
            </div>
            {!mini && (
                <div className="relative h-14 overflow-hidden rounded-[10px] border border-fg/10 bg-fg/5">
                    <span
                        className="absolute left-2 top-2 size-5 rounded-full"
                        style={{
                            background: String(v.accent),
                            animation: `rich-move ${v.duration}s cubic-bezier(${v.x1},${v.y1},${v.x2},${v.y2}) infinite alternate`,
                        }}
                    />
                    {Boolean(v.compare) && (
                        <span
                            className="absolute bottom-2 left-2 size-5 rounded-[4px] bg-fg/35"
                            style={{
                                animation: `rich-move ${v.duration}s linear infinite alternate`,
                            }}
                        />
                    )}
                </div>
            )}
        </div>
    );
};

export const FlipSwitchPreview = ({
    config,
    mini = false,
    onToggle,
}: {
    config: RichConfig;
    mini?: boolean;
    onToggle?: () => void;
}) => {
    const v = config.values;
    const scale = mini ? 0.68 : 1;
    const width = Number(v.width) * scale;
    const height = Number(v.height) * scale;
    const offset = Math.min(Number(v.offset) * scale, height / 4);
    const thumbSize = Math.min(
        Number(v.thumbSize) * scale,
        height - offset * 2,
    );
    const travel = Math.max(0, width - thumbSize - offset * 2);
    const active = Boolean(v.active);

    const content = (
        <>
            {Boolean(v.labels) && (
                <span className="absolute inset-0 flex items-center justify-between px-[14%] text-[8px] font-bold text-white/75">
                    <span>{String(v.labelOff).slice(0, 3)}</span>
                    <span>{String(v.labelOn).slice(0, 3)}</span>
                </span>
            )}
            <span
                className="absolute top-1/2 rounded-full shadow-md shadow-black/30"
                style={{
                    left: offset,
                    width: thumbSize,
                    height: thumbSize,
                    background: String(v.thumbColor),
                    transform: `translate(${active ? travel : 0}px,-50%)`,
                    transition: `transform ${v.speed}s cubic-bezier(.2,.8,.2,1)`,
                }}
            />
        </>
    );
    const style = {
        width,
        height,
        borderRadius: Math.min(Number(v.radius) * scale, height / 2),
        borderWidth: Math.min(Number(v.borderWidth), height / 5),
        borderColor: `color-mix(in srgb, ${active ? v.activeColor : v.inactiveColor} 72%, var(--foreground))`,
        background: String(active ? v.activeColor : v.inactiveColor),
        boxShadow: "inset 0 2px 5px rgb(0 0 0 / .2)",
    };
    const className =
        "relative inline-block shrink-0 overflow-hidden border outline-none transition-all";

    if (!onToggle)
        return (
            <span aria-hidden="true" className={className} style={style}>
                {content}
            </span>
        );
    return (
        <button
            type="button"
            role="switch"
            aria-checked={active}
            aria-label="Toggle switch preview"
            onClick={onToggle}
            className={`${className} cursor-pointer focus-visible:ring-2 focus-visible:ring-fg/40`}
            style={style}
        >
            {content}
        </button>
    );
};

export const GlassPreview = ({
    config,
    mini = false,
}: {
    config: RichConfig;
    mini?: boolean;
}) => {
    const v = config.values;

    const backgroundImage = String(v.backgroundImage ?? "");
    const backgroundSize = String(v.backgroundSize ?? "cover");
    const backgroundPosition = String(v.backgroundPosition ?? "center");

    const accent = String(v.accent);
    const accent2 = String(v.accent2);
    const cardColor = String(v.cardColor);

    const blur = Math.max(0, Number(v.blur));
    const opacity = Math.min(1, Math.max(0, Number(v.opacity)));
    const radius = Math.max(0, Number(v.radius));

    const decorationX = 14 + (blur % 24);
    const decorationY = 12 + (radius % 22);

    const previewStyle: CSSProperties = backgroundImage
        ? {
              backgroundColor: accent,
              backgroundImage: `
                  linear-gradient(
                      135deg,
                      ${rgba(accent, 0.2)},
                      ${rgba(accent2, 0.14)}
                  ),
                  url("${backgroundImage.replace(/"/g, "%22")}")
              `,
              backgroundSize: `cover, ${backgroundSize}`,
              backgroundPosition: `center, ${backgroundPosition}`,
              backgroundRepeat: "no-repeat",
          }
        : {
              backgroundColor: accent,
              backgroundImage: `
                  radial-gradient(
                      circle at ${decorationX}% ${decorationY}%,
                      color-mix(in srgb, ${accent2} 82%, white) 0 9%,
                      transparent 10%
                  ),
                  radial-gradient(
                      circle at ${100 - decorationX}% ${88 - decorationY / 2}%,
                      color-mix(in srgb, ${accent} 58%, white) 0 15%,
                      transparent 16%
                  ),
                  repeating-linear-gradient(
                      125deg,
                      rgb(255 255 255 / 0.2) 0 10px,
                      transparent 10px 23px
                  ),
                  linear-gradient(
                      135deg,
                      ${accent},
                      ${accent2}
                  )
              `,
          };

    const glassStyle: CSSProperties = {
        borderRadius: Math.min(radius, mini ? 14 : 48),
        background: `
            linear-gradient(
                135deg,
                ${rgba(cardColor, opacity)},
                ${rgba(cardColor, opacity * 0.42)}
            )
        `,
        backdropFilter: `blur(${blur}px) saturate(150%)`,
        WebkitBackdropFilter: `blur(${blur}px) saturate(150%)`,
        border: Boolean(v.border)
            ? `${Math.min(Number(v.borderWidth), mini ? 1 : 5)}px solid ${rgba(
                  "#ffffff",
                  Number(v.borderOpacity),
              )}`
            : "none",
        boxShadow: Boolean(v.shadow)
            ? `
                0
                ${mini ? 7 : 24}px
                ${
                    mini
                        ? Math.min(Number(v.shadowBlur), 22)
                        : Number(v.shadowBlur)
                }px
                ${
                    mini
                        ? Math.max(Number(v.shadowSpread), -8)
                        : Number(v.shadowSpread)
                }px
                rgba(0, 0, 0, ${Number(v.shadowOpacity)})
            `
            : "none",
    };

    return (
        <div
            className={`
                relative
                flex
                w-full
                items-center
                justify-center
                overflow-hidden
                ${
                    mini
                        ? "size-full rounded-[8px] p-2"
                        : "h-[260px] max-w-[540px] rounded-[18px] p-6"
                }
            `}
            style={previewStyle}
        >
            <span
                className={`
                    absolute
                    rotate-12
                    border
                    border-white/35
                    bg-white/55
                    shadow-xl
                    ${
                        mini
                            ? "left-[5%] top-[8%] size-12 rounded-[8px]"
                            : "left-[7%] top-[12%] h-24 w-32 rounded-[18px]"
                    }
                `}
                style={{
                    background: `linear-gradient(
                        135deg,
                        ${rgba(accent2, 0.72)},
                        ${rgba("#ffffff", 0.45)}
                    )`,
                }}
            />

            <span
                className={`
                    absolute
                    -rotate-12
                    border
                    border-white/25
                    shadow-xl
                    ${
                        mini
                            ? "bottom-[-8%] right-[4%] size-16 rounded-full"
                            : "bottom-[8%] right-[7%] h-28 w-40 rounded-[30px]"
                    }
                `}
                style={{
                    background: `linear-gradient(
                        135deg,
                        ${rgba(accent, 0.72)},
                        ${rgba(accent2, 0.86)}
                    )`,
                }}
            />

            <span
                className={`
                    absolute
                    bg-white/75
                    shadow-lg
                    ${
                        mini
                            ? "right-[12%] top-[12%] h-3 w-10 rounded-full"
                            : "right-[13%] top-[17%] h-6 w-24 rounded-full"
                    }
                `}
            />

            <article
                className={`
                    relative
                    overflow-hidden
                    text-white
                    ${mini ? "h-[62%] w-[82%] p-2" : "w-[74%] p-6"}
                `}
                style={glassStyle}
            >
                {Boolean(v.noise) && (
                    <span
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 opacity-[0.14]"
                        style={{
                            backgroundImage: `
                                repeating-radial-gradient(
                                    circle at 20% 20%,
                                    currentColor 0 0.5px,
                                    transparent 0.5px 3px
                                )
                            `,
                        }}
                    />
                )}

                <div className="relative z-1">
                    {mini ? (
                        <div className="col-stretch-1">
                            <span className="h-1.5 w-[55%] rounded-full bg-white/90" />

                            <span className="h-1 w-[82%] rounded-full bg-white/45" />

                            <span className="h-1 w-[65%] rounded-full bg-white/30" />
                        </div>
                    ) : (
                        <>
                            <strong className="text-lg">Glass panel</strong>

                            <p className="mt-2 text-xs opacity-70">
                                Blur and tint react to the selected background.
                            </p>

                            <div className="mt-5 row-center-2">
                                <span className="rounded-full bg-white/20 px-2 py-1 text-[10px]">
                                    Blur {blur}px
                                </span>

                                <span className="rounded-full bg-white/20 px-2 py-1 text-[10px]">
                                    Opacity {Math.round(opacity * 100)}%
                                </span>
                            </div>
                        </>
                    )}
                </div>
            </article>
        </div>
    );
};

export const TextInputPreview = ({
    config,
    mini = false,
}: {
    config: RichConfig;
    mini?: boolean;
}) => {
    const v = config.values;
    const width = mini ? "100%" : `min(${Number(v.width)}px, 100%)`;
    const iconSize = mini ? 12 : Math.max(15, Number(v.fontSize) + 2);
    return (
        <div className="relative max-w-full" style={{ width }}>
            {Boolean(v.icon) && (
                <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    className="pointer-events-none absolute z-2 text-fg/45"
                    style={{
                        width: iconSize,
                        height: iconSize,
                        left: mini ? 8 : Number(v.paddingX),
                        top: "50%",
                        transform: "translateY(-50%)",
                    }}
                >
                    <circle cx="11" cy="11" r="7" />
                    <path d="m20 20-3.8-3.8" />
                </svg>
            )}
            {mini ? (
                <div
                    aria-hidden="true"
                    className="block w-full truncate"
                    style={{
                        boxSizing: "border-box",
                        padding: "8px",
                        paddingLeft: Boolean(v.icon) ? 28 : 8,
                        fontSize: 9,
                        lineHeight: 1.4,
                        color: String(v.textColor),
                        background: String(v.background),
                        border: Boolean(v.bottomOnly)
                            ? "none"
                            : `${v.borderWidth}px solid ${v.borderColor}`,
                        borderBottom: `${v.borderWidth}px solid ${v.borderColor}`,
                        borderRadius: Boolean(v.bottomOnly)
                            ? 0
                            : Math.min(Number(v.radius), 12),
                        boxShadow: `0 8px ${Math.min(Number(v.shadowBlur), 14)}px rgb(0 0 0 / .16)`,
                    }}
                >
                    <span className="opacity-50">{String(v.placeholder)}</span>
                </div>
            ) : (
                <input
                    type={String(v.inputType)}
                    placeholder={String(v.placeholder)}
                    className="block w-full outline-none"
                    style={{
                        boxSizing: "border-box",
                        padding: `${Number(v.paddingY)}px ${Number(v.paddingX)}px`,
                        paddingLeft: Boolean(v.icon)
                            ? Number(v.paddingX) + iconSize + 8
                            : Number(v.paddingX),
                        fontSize: Number(v.fontSize),
                        lineHeight: 1.4,
                        color: String(v.textColor),
                        background: String(v.background),
                        border: Boolean(v.bottomOnly)
                            ? "none"
                            : `${v.borderWidth}px solid ${v.borderColor}`,
                        borderBottom: `${v.borderWidth}px solid ${v.borderColor}`,
                        borderRadius: Boolean(v.bottomOnly)
                            ? 0
                            : Math.min(Number(v.radius), 40),
                        boxShadow: `0 8px ${v.shadowBlur}px rgb(0 0 0 / .16)`,
                    }}
                />
            )}
        </div>
    );
};

export const ToastPreview = ({
    config,
    mini = false,
    onClose,
}: {
    config: RichConfig;
    mini?: boolean;
    onClose?: () => void;
}) => {
    const v = config.values;
    const icons: Record<string, string> = {
        success: "✓",
        error: "!",
        warning: "▲",
        info: "i",
    };
    return (
        <div
            className={`relative grid max-w-full grid-cols-[auto_1fr_auto] items-start overflow-hidden text-white ${mini ? "w-full gap-1.5" : "gap-3"}`}
            style={{
                width: mini ? "100%" : Math.min(Number(v.width), 520),
                padding: mini ? 8 : Number(v.padding),
                borderRadius: Math.min(Number(v.radius), mini ? 10 : 32),
                background:
                    String(v.variant) === "solid"
                        ? String(v.accent)
                        : `color-mix(in srgb, ${v.accent} 18%, #111119)`,
                border: `1px solid color-mix(in srgb, ${v.accent} 55%, transparent)`,
                boxShadow: `0 ${mini ? 8 : 16}px ${mini ? 20 : 50}px rgb(0 0 0 / .3)`,
            }}
        >
            {Boolean(v.icon) && (
                <span
                    className={`grid place-items-center rounded-full font-bold ${mini ? "size-5 text-[8px]" : "size-7 text-xs"}`}
                    style={{ background: String(v.accent) }}
                >
                    {icons[String(v.type)]}
                </span>
            )}
            <span className="min-w-0">
                <strong
                    className={`block truncate ${mini ? "text-[8px]" : "text-xs"}`}
                >
                    {String(v.title)}
                </strong>
                {!mini && (
                    <span className="mt-1 block text-[11px] opacity-60">
                        {String(v.message)}
                    </span>
                )}
            </span>
            {Boolean(v.close) &&
                (mini ? (
                    <span aria-hidden="true" className="text-sm opacity-50">
                        ×
                    </span>
                ) : (
                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close toast"
                        className="cursor-pointer text-sm opacity-50 transition-opacity hover:opacity-100"
                    >
                        ×
                    </button>
                ))}
            {Boolean(v.progress) && (
                <span
                    className="absolute bottom-0 left-0 h-[3px] w-full origin-left"
                    style={{
                        background: String(v.accent),
                        animation: mini
                            ? undefined
                            : `toast-demo-progress ${v.duration}s linear forwards`,
                    }}
                />
            )}
        </div>
    );
};

export const SpritePreview = ({
    config,
    mini = false,
}: {
    config: RichConfig;
    mini?: boolean;
}) => {
    const v = config.values;
    const count = Math.min(24, Number(v.columns) * Number(v.rows));
    if (String(v.imageUrl).startsWith("data:image"))
        return (
            <img
                src={String(v.imageUrl)}
                alt="Generated sprite sheet"
                className={`${mini ? "max-h-full" : "max-h-[260px]"} max-w-full object-contain`}
            />
        );
    return (
        <div
            className="grid max-h-[260px] max-w-full overflow-hidden rounded-[10px] border border-fg/10 p-2"
            style={{
                gridTemplateColumns: `repeat(${v.layout === "vertical" ? 1 : v.layout === "horizontal" ? count : v.columns},${mini ? 18 : Math.min(Number(v.cellWidth), 54)}px)`,
                gap: Number(v.padding),
            }}
        >
            {Array.from({ length: count }, (_, index) => (
                <span
                    key={index}
                    className="grid aspect-square place-items-center rounded-[4px] text-sm text-white"
                    style={{
                        background: `linear-gradient(135deg,${v.accent},${v.accent2})`,
                        opacity: 0.55 + (index % 5) * 0.1,
                    }}
                >
                    {["⌂", "★", "⚙", "✦", "✓", "☁", "▶", "◆"][index % 8]}
                </span>
            ))}
        </div>
    );
};
