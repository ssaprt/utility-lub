import { ComponentType, SVGProps, useEffect, useState } from "react";

type SvgComponent = ComponentType<SVGProps<SVGSVGElement>>;

export const DynamicSvgIcon = ({
    name,
    className,
    ...props
}: {
    name: string;
    className?: string;
    //eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
}) => {
    const [Icon, setIcon] = useState<SvgComponent | null>(null);

    useEffect(() => {
        let active = true;

        const load = async () => {
            try {
                const m = await import(`@/icons/${name}`);

                if (active) {
                    setIcon(() => m.default);
                }
            } catch {
                if (active) {
                    setIcon(null);
                }
            }
        };

        void load();

        return () => {
            active = false;
        };
    }, [name]);

    if (!Icon) {
        return null;
    }

    return <Icon {...props} className={className} />;
};

DynamicSvgIcon.displayName = "DynamicSvgIcon";
