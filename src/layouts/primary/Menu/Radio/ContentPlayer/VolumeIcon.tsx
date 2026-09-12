type VolumeIconProps = {
    volume: number;
    className?: string;
};

export const VolumeIcon = ({
    volume,
    className = "size-4",
}: VolumeIconProps) => {
    const level = volume === 0 ? 0 : volume <= 33 ? 1 : volume <= 66 ? 2 : 3;

    return (
        <svg
            viewBox="0 0 64 50"
            className={`${className} shrink-0`}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="
                    M24.1875 3
                    C23.2773 3 22.332 3.4375 21.5625 4.21875
                    L9.9375 15.8125
                    C9.29688 16.3789 9 17.4766 9 18.25
                    V31.75
                    C9 32.5156 9.31641 33.6055 9.90625 34.125
                    L21.5 45.6875
                    C22.5547 46.7578 23.5273 47 24.1563 47
                    C25.8242 47 27 45.4766 27 43.3125
                    V6.3125
                    C27 4.03516 25.5391 3 24.1875 3Z

                    M3 15.9688
                    C1.32422 15.9688 -0.03125 17.3242 -0.03125 19
                    V31
                    C-0.03125 32.6758 1.32422 34.0313 3 34.0313
                    H7.46875
                    C7.14063 33.2461 7 32.4102 7 31.75
                    V18.25
                    C7 17.5938 7.16406 16.7617 7.5 15.9688Z
                "
                className="fill-fg"
            />

            <g
                className={`
                    stroke-fg
                    transition-opacity
                    duration-150
                    ${level === 0 ? "opacity-100" : "opacity-0"}
                `}
                strokeWidth="2.5"
                strokeLinecap="round"
            >
                <path d="M32 19 L44 31" />
                <path d="M44 19 L32 31" />
            </g>

            <path
                d="M31 20 C34 21.5 35.5 23 35.5 25 C35.5 27 34 28.5 31 30"
                className={`
                    stroke-fg
                    transition-opacity
                    duration-150
                    ${level >= 1 ? "opacity-100" : "opacity-0"}
                `}
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
            />

            <path
                d="M36 15.5 C41 18 43 21 43 25 C43 29 41 32 36 34.5"
                className={`
                    stroke-fg
                    transition-opacity
                    duration-150
                    ${level >= 2 ? "opacity-100" : "opacity-0"}
                `}
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
            />

            <path
                d="M42 10.5 C49 14 52 19 52 25 C52 31 49 36 42 39.5"
                className={`
                    stroke-fg
                    transition-opacity
                    duration-150
                    ${level >= 3 ? "opacity-100" : "opacity-0"}
                `}
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
            />
        </svg>
    );
};
