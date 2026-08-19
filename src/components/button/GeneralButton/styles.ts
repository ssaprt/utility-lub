export const generalButtonStyles = {
    glass: {
        base: `
            rounded-[10px]
            border-2
            border-fg/20
            bg-fg/10
            shadow-lg
            shadow-black/20
            backdrop-blur-md
            transition-all
            duration-200

            hover:bg-fg/20
            hover:border-fg/35
            hover:shadow-lg
            hover:shadow-black/30
        `,
        active: `
            !bg-fg/25
            !border-fg/50
            !shadow-md
            !shadow-fg/30
        `,
    },

    ghost: {
        base: `
            rounded-[6px]
            border-2
            border-transparent
            bg-transparent
            shadow-none
            transition-all
            duration-200

            hover:bg-fg/10
            hover:shadow-none
        `,
        active: `
            !bg-fg/15
            !border-transparent
            !shadow-none
        `,
    },

    soft: {
        base: `
            rounded-[10px]
            border-2
            border-transparent
            bg-fg/10
            shadow-none
            transition-all
            duration-200

            hover:bg-fg/20
            hover:shadow-none
        `,
        active: `
            !bg-fg/25
            !border-transparent
            !shadow-none
        `,
    },

    outline: {
        base: `
            rounded-[8px]
            border-2
            border-fg/50
            bg-transparent
            shadow-none
            transition-all
            duration-200

            hover:border-fg
            hover:bg-fg/10
            hover:shadow-none
        `,
        active: `
            !border-fg
            !bg-fg/15
            !shadow-none
        `,
    },

    glow: {
        base: `
            rounded-[10px]
            border-2
            border-fg/60
            bg-fg/15
            shadow-[0_0_8px]
            shadow-fg/30
            transition-all
            duration-200

            hover:bg-fg/25
            hover:shadow-[0_0_14px]
            hover:shadow-fg/50
        `,
        active: `
            !bg-fg/30
            !border-fg
            !shadow-[0_0_18px]
            !shadow-fg/60
        `,
    },

    solid: {
        base: `
            rounded-[8px]
            border-2
            border-transparent
            bg-fg
            text-app
            shadow-md
            shadow-black/25
            transition-all
            duration-200

            hover:bg-fg/85
            hover:shadow-lg
            hover:shadow-black/30
        `,
        active: `
            !bg-fg/80
            !border-transparent
            !shadow-[inset_0_0_4px]
            !shadow-black/60
        `,
    },

    pill: {
        base: `
            rounded-full
            border-2
            border-fg/25
            bg-fg/10
            shadow-sm
            shadow-black/20
            transition-all
            duration-200

            hover:bg-fg/20
            hover:border-fg/40
            hover:shadow-md
            hover:shadow-black/25
        `,
        active: `
            !bg-fg/25
            !border-fg/55
            !shadow-md
            !shadow-fg/20
        `,
    },

    minimal: {
        base: `
            rounded-[4px]
            border-0
            bg-transparent
            shadow-none
            transition-opacity
            duration-200

            hover:bg-transparent
            hover:shadow-none
            hover:opacity-70
        `,
        active: `
            !bg-transparent
            !shadow-none
            !opacity-50
        `,
    },

    inset: {
        base: `
            rounded-[8px]
            border-2
            border-fg/20
            bg-fg/10
            shadow-[inset_0_0_8px]
            shadow-fg/10
            transition-all
            duration-200

            hover:bg-fg/20
            hover:shadow-[inset_0_0_12px]
            hover:shadow-fg/20
        `,
        active: `
            !bg-fg/25
            !border-fg/35
            !shadow-[inset_0_0_16px]
            !shadow-fg/30
        `,
    },

    floating: {
        base: `
            rounded-[10px]
            border-2
            border-fg/70
            bg-fg/10
            shadow-[0_4px_10px]
            shadow-black/30
            transition-all
            duration-200

            hover:bg-fg/15
            hover:shadow-[0_6px_16px]
            hover:shadow-black/40
        `,
        active: `
            !bg-fg/20
            !shadow-[0_2px_5px]
            !shadow-black/25
        `,
    },

    brutalist: {
        base: `
            rounded-none
            border-2
            border-fg
            bg-app
            text-fg
            shadow-[4px_4px_0_var(--foreground)]
            transition-[transform,box-shadow,background]
            duration-100

            hover:bg-fg
            hover:text-app
            hover:translate-x-[2px]
            hover:translate-y-[2px]
            hover:shadow-[2px_2px_0_var(--foreground)]
        `,
        active: `
            !translate-x-[4px]
            !translate-y-[4px]
            !bg-fg
            !text-app
            !shadow-none
        `,
    },

    neon: {
        base: `
            rounded-[8px]
            border
            border-fg/80
            bg-transparent
            text-fg
            shadow-[0_0_4px_var(--foreground),inset_0_0_5px_color-mix(in_srgb,var(--foreground)_15%,transparent)]
            transition-all
            duration-200

            hover:bg-fg/10
            hover:shadow-[0_0_8px_var(--foreground),0_0_20px_color-mix(in_srgb,var(--foreground)_35%,transparent),inset_0_0_8px_color-mix(in_srgb,var(--foreground)_20%,transparent)]
        `,
        active: `
            !bg-fg
            !text-app
            !shadow-[0_0_12px_var(--foreground)]
        `,
    },

    cyber: {
        base: `
            rounded-none
            border
            border-fg/70
            bg-fg/5
            [clip-path:polygon(8px_0,100%_0,100%_calc(100%-8px),calc(100%-8px)_100%,0_100%,0_8px)]
            shadow-[inset_3px_0_0_var(--foreground)]
            transition-all
            duration-200

            hover:bg-fg/15
            hover:shadow-[inset_6px_0_0_var(--foreground)]
        `,
        active: `
            !bg-fg/25
            !shadow-[inset_100px_0_0_color-mix(in_srgb,var(--foreground)_12%,transparent)]
        `,
    },

    aurora: {
        base: `
            rounded-[12px]
            border
            border-white/15
            bg-[linear-gradient(120deg,color-mix(in_srgb,var(--foreground)_5%,transparent),color-mix(in_srgb,var(--foreground)_20%,transparent),color-mix(in_srgb,var(--foreground)_5%,transparent))]
            bg-[length:200%_200%]
            shadow-lg
            shadow-black/15
            backdrop-blur-xl
            transition-all
            duration-500

            hover:bg-[position:100%_50%]
            hover:border-fg/35
            hover:shadow-xl
            hover:shadow-fg/10
        `,
        active: `
            !bg-fg/20
            !border-fg/40
        `,
    },

    gradient: {
        base: `
            rounded-[9px]
            border-0
            bg-[linear-gradient(135deg,var(--foreground)_0%,color-mix(in_srgb,var(--foreground)_55%,transparent)_100%)]
            text-app
            shadow-md
            shadow-black/25
            transition-all
            duration-200

            hover:brightness-110
            hover:shadow-lg
            hover:shadow-black/30
        `,
        active: `
            !brightness-90
            !shadow-sm
        `,
    },

    chrome: {
        base: `
            rounded-[8px]
            border
            border-fg/30
            bg-[linear-gradient(180deg,color-mix(in_srgb,var(--foreground)_40%,transparent)_0%,color-mix(in_srgb,var(--foreground)_8%,transparent)_46%,color-mix(in_srgb,var(--foreground)_25%,transparent)_52%,color-mix(in_srgb,var(--foreground)_5%,transparent)_100%)]
            shadow-[inset_0_1px_0_color-mix(in_srgb,var(--foreground)_50%,transparent),0_3px_8px_rgba(0,0,0,0.25)]
            transition-all
            duration-200

            hover:brightness-125
        `,
        active: `
            !brightness-80
            !shadow-[inset_0_2px_5px_rgba(0,0,0,0.35)]
        `,
    },

    terminal: {
        base: `
            rounded-[3px]
            border
            border-fg/50
            bg-black/60
            font-mono
            text-fg
            shadow-[inset_0_0_12px_rgba(0,0,0,0.6)]
            transition-all
            duration-150

            before:content-['>']
            before:font-mono
            before:text-fg/50

            hover:border-fg
            hover:bg-black/75
        `,
        active: `
            !bg-fg
            !text-app
        `,
    },

    paper: {
        base: `
            rounded-[2px]
            border
            border-black/10
            bg-white/90
            text-black
            shadow-[1px_2px_4px_rgba(0,0,0,0.18)]
            transition-all
            duration-150

            hover:-rotate-[0.5deg]
            hover:shadow-[2px_4px_7px_rgba(0,0,0,0.22)]
        `,
        active: `
            !rotate-0
            !translate-y-[1px]
            !shadow-[0_1px_2px_rgba(0,0,0,0.18)]
        `,
    },

    clay: {
        base: `
            rounded-[14px]
            border-0
            bg-fg/15
            shadow-[6px_6px_12px_rgba(0,0,0,0.25),-4px_-4px_10px_color-mix(in_srgb,var(--foreground)_12%,transparent),inset_1px_1px_2px_color-mix(in_srgb,var(--foreground)_15%,transparent)]
            transition-all
            duration-200

            hover:bg-fg/20
            hover:shadow-[8px_8px_16px_rgba(0,0,0,0.28),-5px_-5px_12px_color-mix(in_srgb,var(--foreground)_14%,transparent)]
        `,
        active: `
            !shadow-[inset_4px_4px_8px_rgba(0,0,0,0.28),inset_-3px_-3px_8px_color-mix(in_srgb,var(--foreground)_12%,transparent)]
        `,
    },

    embossed: {
        base: `
            rounded-[8px]
            border
            border-fg/10
            bg-fg/10
            shadow-[inset_1px_1px_0_color-mix(in_srgb,var(--foreground)_25%,transparent),inset_-1px_-1px_0_rgba(0,0,0,0.3),2px_2px_5px_rgba(0,0,0,0.2)]
            transition-all
            duration-150

            hover:bg-fg/15
        `,
        active: `
            !shadow-[inset_2px_2px_5px_rgba(0,0,0,0.35),inset_-1px_-1px_2px_color-mix(in_srgb,var(--foreground)_15%,transparent)]
        `,
    },

    dashed: {
        base: `
            rounded-[8px]
            border-2
            border-dashed
            border-fg/45
            bg-transparent
            transition-all
            duration-200

            hover:border-solid
            hover:border-fg
            hover:bg-fg/8
        `,
        active: `
            !border-solid
            !border-fg
            !bg-fg/15
        `,
    },

    underline: {
        base: `
            rounded-none
            border-0
            border-b-2
            border-b-fg/25
            bg-transparent
            px-1
            shadow-none
            transition-all
            duration-200

            hover:border-b-fg
            hover:bg-transparent
        `,
        active: `
            !border-b-fg
            !bg-transparent
            !opacity-65
        `,
    },

    sideLine: {
        base: `
            rounded-[4px]
            border-0
            border-l-2
            border-l-fg/30
            bg-fg/5
            shadow-none
            transition-all
            duration-200

            hover:border-l-[6px]
            hover:border-l-fg
            hover:bg-fg/10
        `,
        active: `
            !border-l-[8px]
            !border-l-fg
            !bg-fg/15
        `,
    },

    cutCorner: {
        base: `
            rounded-none
            border
            border-fg/40
            bg-fg/10
            [clip-path:polygon(0_0,calc(100%-10px)_0,100%_10px,100%_100%,10px_100%,0_calc(100%-10px))]
            transition-all
            duration-200

            hover:bg-fg
            hover:text-app
            hover:border-fg
        `,
        active: `
            !bg-fg
            !text-app
        `,
    },

    retro: {
        base: `
            rounded-[4px]
            border-2
            border-fg
            bg-fg/10
            shadow-[3px_3px_0_color-mix(in_srgb,var(--foreground)_55%,transparent)]
            transition-all
            duration-100

            hover:translate-x-[1px]
            hover:translate-y-[1px]
            hover:shadow-[2px_2px_0_color-mix(in_srgb,var(--foreground)_55%,transparent)]
        `,
        active: `
            !translate-x-[3px]
            !translate-y-[3px]
            !shadow-none
        `,
    },

    frosted: {
        base: `
            rounded-[14px]
            border
            border-white/20
            bg-white/5
            shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_5px_15px_rgba(0,0,0,0.15)]
            backdrop-blur-2xl
            transition-all
            duration-300

            hover:bg-white/10
            hover:border-white/35
        `,
        active: `
            !bg-white/15
            !border-white/45
        `,
    },

    capsule: {
        base: `
            rounded-full
            border
            border-fg/20
            bg-fg/5
            px-4
            shadow-[inset_0_0_0_1px_color-mix(in_srgb,var(--foreground)_5%,transparent)]
            transition-all
            duration-300

            hover:px-5
            hover:bg-fg/15
            hover:border-fg/40
        `,
        active: `
            !bg-fg/25
            !border-fg/60
        `,
    },

    monochrome: {
        base: `
            rounded-[6px]
            border
            border-fg
            bg-app
            text-fg
            shadow-none
            transition-colors
            duration-150

            hover:bg-fg
            hover:text-app
        `,
        active: `
            !bg-fg
            !text-app
        `,
    },

    frame: {
        base: `
            rounded-[4px]
            border
            border-fg/20
            bg-transparent
            shadow-[inset_0_0_0_3px_var(--background),inset_0_0_0_4px_color-mix(in_srgb,var(--foreground)_25%,transparent)]
            transition-all
            duration-200

            hover:border-fg/60
            hover:shadow-[inset_0_0_0_2px_var(--background),inset_0_0_0_3px_var(--foreground)]
        `,
        active: `
            !border-fg
            !bg-fg/10
        `,
    },
} as const;

export type GeneralButtonStyle = keyof typeof generalButtonStyles;

export const DEFAULT_GENERAL_BUTTON_STYLE: GeneralButtonStyle = "pill";
