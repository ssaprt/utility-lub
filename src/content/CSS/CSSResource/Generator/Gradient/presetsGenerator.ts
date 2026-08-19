export interface GradientPreset {
    id: string;
    name: string;
    gradient: string;
}

export interface GradientPresetCategory {
    id: string;
    name: string;
    presets: GradientPreset[];
}

interface ColorPalette {
    id: string;
    name: string;
    shades: string[];
}

const palettes: ColorPalette[] = [
    {
        id: "red",
        name: "Red",
        shades: [
            "#450a0a",
            "#7f1d1d",
            "#991b1b",
            "#b91c1c",
            "#dc2626",
            "#ef4444",
            "#f87171",
            "#fca5a5",
            "#fecaca",
            "#fee2e2",
        ],
    },
    {
        id: "orange",
        name: "Orange",
        shades: [
            "#431407",
            "#7c2d12",
            "#9a3412",
            "#c2410c",
            "#ea580c",
            "#f97316",
            "#fb923c",
            "#fdba74",
            "#fed7aa",
            "#ffedd5",
        ],
    },
    {
        id: "amber",
        name: "Amber",
        shades: [
            "#451a03",
            "#78350f",
            "#92400e",
            "#b45309",
            "#d97706",
            "#f59e0b",
            "#fbbf24",
            "#fcd34d",
            "#fde68a",
            "#fef3c7",
        ],
    },
    {
        id: "yellow",
        name: "Yellow",
        shades: [
            "#422006",
            "#713f12",
            "#854d0e",
            "#a16207",
            "#ca8a04",
            "#eab308",
            "#facc15",
            "#fde047",
            "#fef08a",
            "#fef9c3",
        ],
    },
    {
        id: "lime",
        name: "Lime",
        shades: [
            "#1a2e05",
            "#365314",
            "#3f6212",
            "#4d7c0f",
            "#65a30d",
            "#84cc16",
            "#a3e635",
            "#bef264",
            "#d9f99d",
            "#ecfccb",
        ],
    },
    {
        id: "green",
        name: "Green",
        shades: [
            "#052e16",
            "#14532d",
            "#166534",
            "#15803d",
            "#16a34a",
            "#22c55e",
            "#4ade80",
            "#86efac",
            "#bbf7d0",
            "#dcfce7",
        ],
    },
    {
        id: "emerald",
        name: "Emerald",
        shades: [
            "#022c22",
            "#064e3b",
            "#065f46",
            "#047857",
            "#059669",
            "#10b981",
            "#34d399",
            "#6ee7b7",
            "#a7f3d0",
            "#d1fae5",
        ],
    },
    {
        id: "teal",
        name: "Teal",
        shades: [
            "#042f2e",
            "#134e4a",
            "#115e59",
            "#0f766e",
            "#0d9488",
            "#14b8a6",
            "#2dd4bf",
            "#5eead4",
            "#99f6e4",
            "#ccfbf1",
        ],
    },
    {
        id: "cyan",
        name: "Cyan",
        shades: [
            "#083344",
            "#164e63",
            "#155e75",
            "#0e7490",
            "#0891b2",
            "#06b6d4",
            "#22d3ee",
            "#67e8f9",
            "#a5f3fc",
            "#cffafe",
        ],
    },
    {
        id: "sky",
        name: "Sky",
        shades: [
            "#082f49",
            "#0c4a6e",
            "#075985",
            "#0369a1",
            "#0284c7",
            "#0ea5e9",
            "#38bdf8",
            "#7dd3fc",
            "#bae6fd",
            "#e0f2fe",
        ],
    },
    {
        id: "blue",
        name: "Blue",
        shades: [
            "#172554",
            "#1e3a8a",
            "#1e40af",
            "#1d4ed8",
            "#2563eb",
            "#3b82f6",
            "#60a5fa",
            "#93c5fd",
            "#bfdbfe",
            "#dbeafe",
        ],
    },
    {
        id: "indigo",
        name: "Indigo",
        shades: [
            "#1e1b4b",
            "#312e81",
            "#3730a3",
            "#4338ca",
            "#4f46e5",
            "#6366f1",
            "#818cf8",
            "#a5b4fc",
            "#c7d2fe",
            "#e0e7ff",
        ],
    },
    {
        id: "violet",
        name: "Violet",
        shades: [
            "#2e1065",
            "#4c1d95",
            "#5b21b6",
            "#6d28d9",
            "#7c3aed",
            "#8b5cf6",
            "#a78bfa",
            "#c4b5fd",
            "#ddd6fe",
            "#ede9fe",
        ],
    },
    {
        id: "purple",
        name: "Purple",
        shades: [
            "#3b0764",
            "#581c87",
            "#6b21a8",
            "#7e22ce",
            "#9333ea",
            "#a855f7",
            "#c084fc",
            "#d8b4fe",
            "#e9d5ff",
            "#f3e8ff",
        ],
    },
    {
        id: "fuchsia",
        name: "Fuchsia",
        shades: [
            "#4a044e",
            "#701a75",
            "#86198f",
            "#a21caf",
            "#c026d3",
            "#d946ef",
            "#e879f9",
            "#f0abfc",
            "#f5d0fe",
            "#fae8ff",
        ],
    },
    {
        id: "pink",
        name: "Pink",
        shades: [
            "#500724",
            "#831843",
            "#9d174d",
            "#be185d",
            "#db2777",
            "#ec4899",
            "#f472b6",
            "#f9a8d4",
            "#fbcfe8",
            "#fce7f3",
        ],
    },
    {
        id: "rose",
        name: "Rose",
        shades: [
            "#4c0519",
            "#881337",
            "#9f1239",
            "#be123c",
            "#e11d48",
            "#f43f5e",
            "#fb7185",
            "#fda4af",
            "#fecdd3",
            "#ffe4e6",
        ],
    },
    {
        id: "slate",
        name: "Slate",
        shades: [
            "#020617",
            "#0f172a",
            "#1e293b",
            "#334155",
            "#475569",
            "#64748b",
            "#94a3b8",
            "#cbd5e1",
            "#e2e8f0",
            "#f1f5f9",
        ],
    },
    {
        id: "gray",
        name: "Gray",
        shades: [
            "#030712",
            "#111827",
            "#1f2937",
            "#374151",
            "#4b5563",
            "#6b7280",
            "#9ca3af",
            "#d1d5db",
            "#e5e7eb",
            "#f3f4f6",
        ],
    },
    {
        id: "zinc",
        name: "Zinc",
        shades: [
            "#09090b",
            "#18181b",
            "#27272a",
            "#3f3f46",
            "#52525b",
            "#71717a",
            "#a1a1aa",
            "#d4d4d8",
            "#e4e4e7",
            "#f4f4f5",
        ],
    },
    {
        id: "neutral",
        name: "Neutral",
        shades: [
            "#0a0a0a",
            "#171717",
            "#262626",
            "#404040",
            "#525252",
            "#737373",
            "#a3a3a3",
            "#d4d4d4",
            "#e5e5e5",
            "#f5f5f5",
        ],
    },
    {
        id: "stone",
        name: "Stone",
        shades: [
            "#0c0a09",
            "#1c1917",
            "#292524",
            "#44403c",
            "#57534e",
            "#78716c",
            "#a8a29e",
            "#d6d3d1",
            "#e7e5e4",
            "#f5f5f4",
        ],
    },
];

const buildPresets = (palette: ColorPalette): GradientPreset[] => {
    const s = palette.shades;

    return [
        {
            id: `${palette.id}-deep`,
            name: `${palette.name} Deep`,
            gradient: `linear-gradient(135deg, ${s[0]} 0%, ${s[3]} 100%)`,
        },
        {
            id: `${palette.id}-dark`,
            name: `${palette.name} Dark`,
            gradient: `linear-gradient(135deg, ${s[1]} 0%, ${s[4]} 100%)`,
        },
        {
            id: `${palette.id}-classic`,
            name: `${palette.name} Classic`,
            gradient: `linear-gradient(135deg, ${s[3]} 0%, ${s[6]} 100%)`,
        },
        {
            id: `${palette.id}-bright`,
            name: `${palette.name} Bright`,
            gradient: `linear-gradient(135deg, ${s[4]} 0%, ${s[7]} 100%)`,
        },
        {
            id: `${palette.id}-soft`,
            name: `${palette.name} Soft`,
            gradient: `linear-gradient(135deg, ${s[6]} 0%, ${s[9]} 100%)`,
        },
        {
            id: `${palette.id}-reverse`,
            name: `${palette.name} Reverse`,
            gradient: `linear-gradient(135deg, ${s[8]} 0%, ${s[3]} 100%)`,
        },
        {
            id: `${palette.id}-vertical`,
            name: `${palette.name} Vertical`,
            gradient: `linear-gradient(180deg, ${s[2]} 0%, ${s[7]} 100%)`,
        },
        {
            id: `${palette.id}-horizontal`,
            name: `${palette.name} Horizontal`,
            gradient: `linear-gradient(90deg, ${s[1]} 0%, ${s[6]} 100%)`,
        },
        {
            id: `${palette.id}-diagonal`,
            name: `${palette.name} Diagonal`,
            gradient: `linear-gradient(45deg, ${s[1]} 0%, ${s[5]} 55%, ${s[9]} 100%)`,
        },
        {
            id: `${palette.id}-triple`,
            name: `${palette.name} Triple`,
            gradient: `linear-gradient(135deg, ${s[1]} 0%, ${s[5]} 50%, ${s[8]} 100%)`,
        },
        {
            id: `${palette.id}-quad`,
            name: `${palette.name} Quad`,
            gradient: `linear-gradient(135deg, ${s[0]} 0%, ${s[3]} 32%, ${s[6]} 68%, ${s[9]} 100%)`,
        },
        {
            id: `${palette.id}-center`,
            name: `${palette.name} Center`,
            gradient: `linear-gradient(90deg, ${s[2]} 0%, ${s[8]} 50%, ${s[2]} 100%)`,
        },
        {
            id: `${palette.id}-radial`,
            name: `${palette.name} Radial`,
            gradient: `radial-gradient(circle at 50% 50%, ${s[8]} 0%, ${s[5]} 45%, ${s[1]} 100%)`,
        },
        {
            id: `${palette.id}-radial-dark`,
            name: `${palette.name} Radial Dark`,
            gradient: `radial-gradient(circle at 50% 50%, ${s[5]} 0%, ${s[2]} 55%, ${s[0]} 100%)`,
        },
        {
            id: `${palette.id}-radial-soft`,
            name: `${palette.name} Radial Soft`,
            gradient: `radial-gradient(circle at 50% 50%, ${s[9]} 0%, ${s[7]} 45%, ${s[4]} 100%)`,
        },
        {
            id: `${palette.id}-radial-top`,
            name: `${palette.name} Top Glow`,
            gradient: `radial-gradient(circle at 50% 0%, ${s[8]} 0%, ${s[5]} 40%, ${s[1]} 100%)`,
        },
        {
            id: `${palette.id}-radial-left`,
            name: `${palette.name} Left Glow`,
            gradient: `radial-gradient(circle at 0% 50%, ${s[8]} 0%, ${s[5]} 45%, ${s[1]} 100%)`,
        },
        {
            id: `${palette.id}-radial-corner`,
            name: `${palette.name} Corner Glow`,
            gradient: `radial-gradient(circle at 20% 20%, ${s[9]} 0%, ${s[6]} 35%, ${s[2]} 100%)`,
        },
        {
            id: `${palette.id}-ellipse`,
            name: `${palette.name} Ellipse`,
            gradient: `radial-gradient(ellipse at 50% 50%, ${s[8]} 0%, ${s[5]} 50%, ${s[1]} 100%)`,
        },
        {
            id: `${palette.id}-conic`,
            name: `${palette.name} Conic`,
            gradient: `conic-gradient(from 0deg at 50% 50%, ${s[1]} 0%, ${s[5]} 35%, ${s[8]} 70%, ${s[1]} 100%)`,
        },
        {
            id: `${palette.id}-conic-dark`,
            name: `${palette.name} Conic Dark`,
            gradient: `conic-gradient(from 90deg at 50% 50%, ${s[0]} 0%, ${s[4]} 45%, ${s[7]} 75%, ${s[0]} 100%)`,
        },
        {
            id: `${palette.id}-conic-soft`,
            name: `${palette.name} Conic Soft`,
            gradient: `conic-gradient(from 180deg at 50% 50%, ${s[7]} 0%, ${s[9]} 35%, ${s[5]} 70%, ${s[7]} 100%)`,
        },
        {
            id: `${palette.id}-stripes`,
            name: `${palette.name} Stripes`,
            gradient: `repeating-linear-gradient(135deg, ${s[3]} 0%, ${s[3]} 10%, ${s[6]} 10%, ${s[6]} 20%)`,
        },
        {
            id: `${palette.id}-thin-stripes`,
            name: `${palette.name} Thin Stripes`,
            gradient: `repeating-linear-gradient(45deg, ${s[2]} 0%, ${s[2]} 5%, ${s[7]} 5%, ${s[7]} 10%)`,
        },
        {
            id: `${palette.id}-rings`,
            name: `${palette.name} Rings`,
            gradient: `repeating-radial-gradient(circle at 50% 50%, ${s[3]} 0%, ${s[3]} 8%, ${s[7]} 8%, ${s[7]} 16%)`,
        },
        {
            id: `${palette.id}-rays`,
            name: `${palette.name} Rays`,
            gradient: `repeating-conic-gradient(from 0deg at 50% 50%, ${s[3]} 0deg 15deg, ${s[7]} 15deg 30deg)`,
        },
    ];
};

const createGradientVariants = (
    id: string,
    name: string,
    colors: string[],
): GradientPreset[] => {
    const first = colors[0];
    const second = colors[1];
    const third = colors[2] ?? colors[1];
    const fourth = colors[3] ?? colors[0];

    return [
        {
            id: `${id}-linear-135`,
            name: `${name} 135`,
            gradient: `linear-gradient(135deg, ${first} 0%, ${second} 100%)`,
        },
        {
            id: `${id}-linear-90`,
            name: `${name} 90`,
            gradient: `linear-gradient(90deg, ${first} 0%, ${second} 100%)`,
        },
        {
            id: `${id}-linear-45`,
            name: `${name} 45`,
            gradient: `linear-gradient(45deg, ${first} 0%, ${second} 100%)`,
        },
        {
            id: `${id}-triple`,
            name: `${name} Triple`,
            gradient: `linear-gradient(135deg, ${first} 0%, ${second} 50%, ${third} 100%)`,
        },
        {
            id: `${id}-quad`,
            name: `${name} Quad`,
            gradient: `linear-gradient(135deg, ${first} 0%, ${second} 33%, ${third} 66%, ${fourth} 100%)`,
        },
        {
            id: `${id}-radial`,
            name: `${name} Radial`,
            gradient: `radial-gradient(circle at 50% 50%, ${second} 0%, ${first} 100%)`,
        },
        {
            id: `${id}-radial-top`,
            name: `${name} Top`,
            gradient: `radial-gradient(circle at 50% 0%, ${second} 0%, ${first} 100%)`,
        },
        {
            id: `${id}-radial-corner`,
            name: `${name} Corner`,
            gradient: `radial-gradient(circle at 20% 20%, ${second} 0%, ${first} 100%)`,
        },
        {
            id: `${id}-conic`,
            name: `${name} Conic`,
            gradient: `conic-gradient(from 0deg at 50% 50%, ${first} 0%, ${second} 50%, ${first} 100%)`,
        },
        {
            id: `${id}-conic-soft`,
            name: `${name} Conic Soft`,
            gradient: `conic-gradient(from 90deg at 50% 50%, ${first} 0%, ${second} 35%, ${third} 70%, ${first} 100%)`,
        },
    ];
};

const warmSchemes = [
    {
        id: "sunset",
        name: "Sunset",
        colors: ["#7f1d1d", "#ef4444", "#f97316", "#fde047"],
    },
    {
        id: "fire",
        name: "Fire",
        colors: ["#450a0a", "#dc2626", "#f97316", "#facc15"],
    },
    {
        id: "peach",
        name: "Peach",
        colors: ["#fb7185", "#fdba74", "#fde68a", "#fff7ed"],
    },
    {
        id: "golden",
        name: "Golden",
        colors: ["#92400e", "#f59e0b", "#facc15", "#fef3c7"],
    },
    {
        id: "coral",
        name: "Coral",
        colors: ["#be123c", "#fb7185", "#f97316", "#fed7aa"],
    },
    {
        id: "mango",
        name: "Mango",
        colors: ["#ea580c", "#f59e0b", "#fde047", "#fef9c3"],
    },
    {
        id: "rose-fire",
        name: "Rose Fire",
        colors: ["#881337", "#e11d48", "#f97316", "#fde047"],
    },
    {
        id: "ember",
        name: "Ember",
        colors: ["#431407", "#9a3412", "#ea580c", "#fbbf24"],
    },
];

const coldSchemes = [
    {
        id: "arctic",
        name: "Arctic",
        colors: ["#172554", "#2563eb", "#38bdf8", "#cffafe"],
    },
    {
        id: "ocean",
        name: "Ocean",
        colors: ["#082f49", "#0284c7", "#22d3ee", "#ccfbf1"],
    },
    {
        id: "ice",
        name: "Ice",
        colors: ["#1e3a8a", "#60a5fa", "#bae6fd", "#f0f9ff"],
    },
    {
        id: "aqua",
        name: "Aqua",
        colors: ["#134e4a", "#0d9488", "#2dd4bf", "#cffafe"],
    },
    {
        id: "midnight",
        name: "Midnight",
        colors: ["#020617", "#1e1b4b", "#4338ca", "#818cf8"],
    },
    {
        id: "frozen-violet",
        name: "Frozen Violet",
        colors: ["#312e81", "#6366f1", "#a78bfa", "#e0e7ff"],
    },
    {
        id: "deep-sea",
        name: "Deep Sea",
        colors: ["#020617", "#164e63", "#0891b2", "#67e8f9"],
    },
    {
        id: "polar",
        name: "Polar",
        colors: ["#0f172a", "#0369a1", "#7dd3fc", "#e0f2fe"],
    },
];

const pastelSchemes = [
    {
        id: "cotton",
        name: "Cotton",
        colors: ["#fbcfe8", "#ddd6fe", "#bae6fd", "#bbf7d0"],
    },
    {
        id: "pastel-rainbow",
        name: "Pastel Rainbow",
        colors: ["#fecdd3", "#fed7aa", "#fef08a", "#a7f3d0"],
    },
    {
        id: "lavender-milk",
        name: "Lavender Milk",
        colors: ["#ede9fe", "#ddd6fe", "#f5d0fe", "#fce7f3"],
    },
    {
        id: "mint-cream",
        name: "Mint Cream",
        colors: ["#d1fae5", "#ccfbf1", "#cffafe", "#e0f2fe"],
    },
    {
        id: "peach-cream",
        name: "Peach Cream",
        colors: ["#ffedd5", "#fed7aa", "#fecdd3", "#fce7f3"],
    },
    {
        id: "baby-blue",
        name: "Baby Blue",
        colors: ["#dbeafe", "#bae6fd", "#cffafe", "#e0e7ff"],
    },
    {
        id: "soft-rose",
        name: "Soft Rose",
        colors: ["#ffe4e6", "#fecdd3", "#fbcfe8", "#f5d0fe"],
    },
    {
        id: "spring-pastel",
        name: "Spring Pastel",
        colors: ["#ecfccb", "#dcfce7", "#ccfbf1", "#e0f2fe"],
    },
];

const neonSchemes = [
    {
        id: "neon-cyan",
        name: "Neon Cyan",
        colors: ["#083344", "#06b6d4", "#67e8f9", "#ecfeff"],
    },
    {
        id: "neon-purple",
        name: "Neon Purple",
        colors: ["#2e1065", "#7c3aed", "#d946ef", "#f0abfc"],
    },
    {
        id: "neon-pink",
        name: "Neon Pink",
        colors: ["#500724", "#db2777", "#f472b6", "#fce7f3"],
    },
    {
        id: "neon-green",
        name: "Neon Green",
        colors: ["#052e16", "#22c55e", "#a3e635", "#ecfccb"],
    },
    {
        id: "cyberpunk",
        name: "Cyberpunk",
        colors: ["#020617", "#06b6d4", "#8b5cf6", "#ec4899"],
    },
    {
        id: "laser",
        name: "Laser",
        colors: ["#030712", "#22d3ee", "#a855f7", "#f43f5e"],
    },
    {
        id: "acid",
        name: "Acid",
        colors: ["#052e16", "#84cc16", "#facc15", "#22d3ee"],
    },
    {
        id: "ultraviolet",
        name: "Ultraviolet",
        colors: ["#09090b", "#4f46e5", "#a855f7", "#f472b6"],
    },
];

const glassPresets: GradientPreset[] = [
    {
        id: "glass-white",
        name: "Glass White",
        gradient:
            "linear-gradient(135deg, rgba(255,255,255,0.38) 0%, rgba(255,255,255,0.08) 100%)",
    },
    {
        id: "glass-blue",
        name: "Glass Blue",
        gradient:
            "linear-gradient(135deg, rgba(125,211,252,0.42) 0%, rgba(37,99,235,0.08) 100%)",
    },
    {
        id: "glass-purple",
        name: "Glass Purple",
        gradient:
            "linear-gradient(135deg, rgba(196,181,253,0.42) 0%, rgba(124,58,237,0.08) 100%)",
    },
    {
        id: "glass-pink",
        name: "Glass Pink",
        gradient:
            "linear-gradient(135deg, rgba(249,168,212,0.42) 0%, rgba(219,39,119,0.08) 100%)",
    },
    {
        id: "glass-cyan",
        name: "Glass Cyan",
        gradient:
            "linear-gradient(135deg, rgba(103,232,249,0.42) 0%, rgba(8,145,178,0.08) 100%)",
    },
    {
        id: "glass-green",
        name: "Glass Green",
        gradient:
            "linear-gradient(135deg, rgba(110,231,183,0.42) 0%, rgba(5,150,105,0.08) 100%)",
    },
    {
        id: "glass-sunset",
        name: "Glass Sunset",
        gradient:
            "linear-gradient(135deg, rgba(251,113,133,0.4) 0%, rgba(249,115,22,0.2) 50%, rgba(255,255,255,0.06) 100%)",
    },
    {
        id: "glass-night",
        name: "Glass Night",
        gradient:
            "linear-gradient(135deg, rgba(99,102,241,0.28) 0%, rgba(15,23,42,0.55) 100%)",
    },
    {
        id: "glass-radial",
        name: "Glass Radial",
        gradient:
            "radial-gradient(circle at 25% 20%, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.14) 35%, rgba(255,255,255,0.03) 100%)",
    },
    {
        id: "glass-prism",
        name: "Glass Prism",
        gradient:
            "linear-gradient(135deg, rgba(103,232,249,0.32) 0%, rgba(196,181,253,0.3) 35%, rgba(249,168,212,0.3) 70%, rgba(255,255,255,0.08) 100%)",
    },
];

const metallicPresets: GradientPreset[] = [
    {
        id: "metal-silver",
        name: "Silver",
        gradient:
            "linear-gradient(135deg, #27272a 0%, #a1a1aa 22%, #f4f4f5 45%, #71717a 68%, #18181b 100%)",
    },
    {
        id: "metal-gold",
        name: "Gold",
        gradient:
            "linear-gradient(135deg, #78350f 0%, #d97706 22%, #fde68a 48%, #b45309 72%, #451a03 100%)",
    },
    {
        id: "metal-rose-gold",
        name: "Rose Gold",
        gradient:
            "linear-gradient(135deg, #881337 0%, #fb7185 25%, #fecdd3 48%, #be123c 72%, #4c0519 100%)",
    },
    {
        id: "metal-copper",
        name: "Copper",
        gradient:
            "linear-gradient(135deg, #431407 0%, #c2410c 24%, #fdba74 48%, #9a3412 72%, #431407 100%)",
    },
    {
        id: "metal-titanium",
        name: "Titanium",
        gradient:
            "linear-gradient(135deg, #0f172a 0%, #64748b 22%, #e2e8f0 48%, #475569 72%, #020617 100%)",
    },
    {
        id: "metal-blue",
        name: "Blue Metal",
        gradient:
            "linear-gradient(135deg, #172554 0%, #2563eb 24%, #bfdbfe 48%, #1d4ed8 72%, #172554 100%)",
    },
    {
        id: "metal-purple",
        name: "Purple Metal",
        gradient:
            "linear-gradient(135deg, #2e1065 0%, #7c3aed 25%, #ddd6fe 48%, #6d28d9 72%, #2e1065 100%)",
    },
    {
        id: "metal-black",
        name: "Black Metal",
        gradient:
            "linear-gradient(135deg, #09090b 0%, #3f3f46 25%, #a1a1aa 48%, #27272a 72%, #000000 100%)",
    },
    {
        id: "metal-chrome",
        name: "Chrome",
        gradient:
            "linear-gradient(90deg, #18181b 0%, #d4d4d8 18%, #ffffff 32%, #52525b 48%, #f4f4f5 64%, #71717a 82%, #18181b 100%)",
    },
    {
        id: "metal-iridescent",
        name: "Iridescent",
        gradient:
            "linear-gradient(135deg, #38bdf8 0%, #c4b5fd 25%, #f9a8d4 50%, #fde68a 75%, #5eead4 100%)",
    },
];

const warmPresets = warmSchemes.flatMap(({ id, name, colors }) =>
    createGradientVariants(`warm-${id}`, name, colors),
);

const coldPresets = coldSchemes.flatMap(({ id, name, colors }) =>
    createGradientVariants(`cold-${id}`, name, colors),
);

const pastelPresets = pastelSchemes.flatMap(({ id, name, colors }) =>
    createGradientVariants(`pastel-${id}`, name, colors),
);

const neonPresets = neonSchemes.flatMap(({ id, name, colors }) =>
    createGradientVariants(`neon-${id}`, name, colors),
);

const buildTwoColorPresets = (): GradientPreset[] => {
    const result: GradientPreset[] = [];

    for (let firstIndex = 0; firstIndex < palettes.length; firstIndex += 1) {
        for (
            let secondIndex = firstIndex + 1;
            secondIndex < palettes.length;
            secondIndex += 1
        ) {
            const first = palettes[firstIndex];

            const second = palettes[secondIndex];

            const firstColor = first.shades[5];

            const secondColor = second.shades[5];

            const firstLight = first.shades[7];

            const secondLight = second.shades[7];

            result.push(
                {
                    id: `duo-${first.id}-${second.id}-135`,
                    name: `${first.name} + ${second.name}`,
                    gradient: `linear-gradient(135deg, ${firstColor} 0%, ${secondColor} 100%)`,
                },
                {
                    id: `duo-${first.id}-${second.id}-90`,
                    name: `${first.name} + ${second.name} Horizontal`,
                    gradient: `linear-gradient(90deg, ${firstColor} 0%, ${secondColor} 100%)`,
                },
                {
                    id: `duo-${first.id}-${second.id}-soft`,
                    name: `${first.name} + ${second.name} Soft`,
                    gradient: `linear-gradient(135deg, ${firstLight} 0%, ${secondLight} 100%)`,
                },
                {
                    id: `duo-${first.id}-${second.id}-triple`,
                    name: `${first.name} + ${second.name} Triple`,
                    gradient: `linear-gradient(135deg, ${firstColor} 0%, ${secondColor} 50%, ${firstColor} 100%)`,
                },
                {
                    id: `duo-${first.id}-${second.id}-radial`,
                    name: `${first.name} + ${second.name} Radial`,
                    gradient: `radial-gradient(circle at 50% 50%, ${firstLight} 0%, ${secondColor} 100%)`,
                },
                {
                    id: `duo-${first.id}-${second.id}-conic`,
                    name: `${first.name} + ${second.name} Conic`,
                    gradient: `conic-gradient(from 0deg at 50% 50%, ${firstColor} 0%, ${secondColor} 50%, ${firstColor} 100%)`,
                },
            );
        }
    }

    return result;
};

const twoColorPresets = buildTwoColorPresets();

export const gradientPresetCategories: GradientPresetCategory[] = [
    ...palettes.map((palette) => ({
        id: palette.id,
        name: palette.name,
        presets: buildPresets(palette),
    })),

    {
        id: "warm",
        name: "Warm",
        presets: warmPresets,
    },
    {
        id: "cold",
        name: "Cold",
        presets: coldPresets,
    },
    {
        id: "pastel",
        name: "Pastel",
        presets: pastelPresets,
    },
    {
        id: "neon",
        name: "Neon",
        presets: neonPresets,
    },
    {
        id: "glass",
        name: "Glass",
        presets: glassPresets,
    },
    {
        id: "metallic",
        name: "Metallic",
        presets: metallicPresets,
    },
    {
        id: "two-color",
        name: "Two Color",
        presets: twoColorPresets,
    },
];
