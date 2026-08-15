import { AppLink } from "@/content/react/UI-Components/Pagination/components/link/AppLink";
import { IconExternalLink } from "@tabler/icons-react";

export const PageLink = ({ text, href }: { text: string; href: string }) => {
    return (
        <AppLink
            href={href}
            className="
                row-center-3
                p-1
                px-2
                pr-1
                rounded-[24px]
                
                hover:bg-fg/10
                hover:shadow-md
                hover:shadow-black/25"
        >
            <span className="text-fg text-xs">{text}</span>
            <IconExternalLink className="w-5 h-5 stroke-fg shrink-0 bg-fg/10 rounded-full p-[4px]" />
        </AppLink>
    );
};
