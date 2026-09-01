import type { SpriteConfig } from "./sprite.type";

type SpritePreset = {
    name: string;
    description: string;
    config: Partial<SpriteConfig>;
};

const presets: SpritePreset[] = [
    {
        name: "Compact icons",
        description: "32px · 8 columns",
        config: {
            layout: "grid",
            columns: 8,
            cellWidth: 32,
            cellHeight: 32,
            gap: 2,
            fit: "contain",
            scale: 1,
            rendering: "smooth",
        },
    },
    {
        name: "UI icons",
        description: "48px · 6 columns",
        config: {
            layout: "grid",
            columns: 6,
            cellWidth: 48,
            cellHeight: 48,
            gap: 4,
            fit: "contain",
            scale: 1,
            rendering: "smooth",
        },
    },
    {
        name: "Game tiles",
        description: "64px · pixelated",
        config: {
            layout: "grid",
            columns: 8,
            cellWidth: 64,
            cellHeight: 64,
            gap: 0,
            fit: "cover",
            scale: 1,
            rendering: "pixelated",
        },
    },
    {
        name: "Animation strip",
        description: "Horizontal frames",
        config: {
            layout: "horizontal",
            cellWidth: 96,
            cellHeight: 96,
            gap: 0,
            fit: "contain",
            scale: 1,
            rendering: "smooth",
        },
    },
    {
        name: "Vertical strip",
        description: "Vertical frames",
        config: {
            layout: "vertical",
            cellWidth: 72,
            cellHeight: 72,
            gap: 0,
            fit: "contain",
            scale: 1,
            rendering: "smooth",
        },
    },
    {
        name: "Retina icons",
        description: "40px · export @2x",
        config: {
            layout: "grid",
            columns: 6,
            cellWidth: 40,
            cellHeight: 40,
            gap: 4,
            fit: "contain",
            scale: 2,
            rendering: "smooth",
        },
    },
    {
        name: "Pixel art",
        description: "16px · no smoothing",
        config: {
            layout: "grid",
            columns: 10,
            cellWidth: 16,
            cellHeight: 16,
            gap: 0,
            fit: "contain",
            scale: 4,
            rendering: "pixelated",
        },
    },
    {
        name: "Large cards",
        description: "128 × 96px",
        config: {
            layout: "grid",
            columns: 4,
            cellWidth: 128,
            cellHeight: 96,
            gap: 8,
            fit: "cover",
            scale: 1,
            rendering: "smooth",
        },
    },
];

export const SpritePresets = ({
    config,
    onSelect,
}: {
    config: SpriteConfig;
    onSelect: (config: Partial<SpriteConfig>) => void;
}) => {
    return (
        <section className="col-stretch-2 w-full">
            <span className="text-[13px] font-medium">Visual presets</span>

            <div className="grid w-full grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-2 rounded-[12px] border border-fg/8 bg-fg/4 p-2">
                {presets.map((preset) => {
                    const active = Object.entries(preset.config).every(
                        ([key, value]) =>
                            config[key as keyof SpriteConfig] === value,
                    );

                    const columns =
                        preset.config.layout === "vertical"
                            ? 1
                            : preset.config.layout === "horizontal"
                              ? 6
                              : Math.min(Number(preset.config.columns ?? 4), 6);

                    return (
                        <button
                            key={preset.name}
                            type="button"
                            aria-pressed={active}
                            onClick={() => onSelect(preset.config)}
                            className={`col-stretch-2 rounded-[8px] border p-2 text-left transition-all hover:bg-fg/8 ${
                                active
                                    ? "border-fg/35 bg-fg/10"
                                    : "border-fg/8 bg-fg/3"
                            }`}
                        >
                            <span
                                className="grid h-16 place-content-center gap-[3px] overflow-hidden rounded-[6px] bg-fg/5"
                                style={{
                                    gridTemplateColumns: `repeat(${columns}, 12px)`,
                                }}
                            >
                                {Array.from({ length: 12 }, (_, index) => (
                                    <span
                                        key={index}
                                        className="size-3 rounded-[2px] bg-fg/45"
                                        style={{
                                            opacity: 0.35 + (index % 5) * 0.13,
                                        }}
                                    />
                                ))}
                            </span>

                            <span className="flex min-w-0 flex-col gap-0.5">
                                <strong className="block truncate text-[11px] font-medium leading-4">
                                    {preset.name}
                                </strong>

                                <span className="block h-6 overflow-hidden text-[9px] leading-3 text-fg/45">
                                    {preset.description}
                                </span>
                            </span>
                        </button>
                    );
                })}
            </div>
        </section>
    );
};
