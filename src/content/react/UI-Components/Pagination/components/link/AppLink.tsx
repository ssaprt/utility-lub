"use client";

import { PendingLoader } from "@/components/loader/PendingLoader";
import Link from "next/link";
import { useEffect, useState, type ComponentProps } from "react";
import { createPortal } from "react-dom";

type AppLinkProps = ComponentProps<typeof Link>;

export const AppLink = ({ children, ...props }: AppLinkProps) => {
    const [portalTarget, setPortalTarget] = useState<HTMLElement | null>(null);

    useEffect(() => {
        const target = document.querySelector<HTMLElement>("#main");
        //eslint-disable-next-line
        setPortalTarget(target);
    }, []);

    return (
        <Link prefetch={false} {...props}>
            {children}

            {portalTarget
                ? createPortal(<PendingLoader />, portalTarget)
                : null}
        </Link>
    );
};
