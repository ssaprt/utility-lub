"use client";

import { useAppContextActions } from "@/context/appContext";
import Link, { useLinkStatus } from "next/link";
import { useEffect, type ComponentProps } from "react";

type AppLinkProps = ComponentProps<typeof Link>;

export const AppLink = ({ children, ...props }: AppLinkProps) => {
    return (
        <Link prefetch={false} {...props}>
            {children}
            <PendingDetect />
        </Link>
    );
};

const PendingDetect = () => {
    const { pending } = useLinkStatus();
    const { menu } = useAppContextActions();
    const { setPending } = menu;

    useEffect(() => {
        setPending(pending);

        return () => {
            setPending(false);
        };
    }, [pending, setPending]);

    return null;
};
