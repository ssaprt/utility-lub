import Image from "next/image";
import { useState } from "react";

export const Flag = ({
    flag,
    className,
}: {
    flag: string;
    className?: string;
}) => {
    const [loading, setLoading] = useState(true);
    return (
        <div className={`relative w-3 h-3 ${className}`}>
            {loading && (
                <div className="absolute top-0 left-0 w-full h-full bg-fg/30 animate-pulse z-1"></div>
            )}
            <Image
                width={20}
                height={20}
                unoptimized
                src={flag}
                alt="flag"
                className="w-full h-full z-2"
                onLoad={() => setLoading(false)}
                onError={() => setLoading(false)}
            />
        </div>
    );
};
