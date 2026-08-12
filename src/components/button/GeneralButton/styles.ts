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
            text-black
            shadow-md
            shadow-black/25
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
} as const;

export type GeneralButtonStyle = keyof typeof generalButtonStyles;

export const DEFAULT_GENERAL_BUTTON_STYLE: GeneralButtonStyle = "pill";
