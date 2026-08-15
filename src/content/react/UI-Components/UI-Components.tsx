import { PageLink } from "@/components/PageLink/PageLink";

export const UIComponents = () => {
    return (
        <div className="col-start-2">
            <PageLink
                text="Easy-pagination"
                href="/react/UI-Components/pagination"
            />
            <PageLink
                text="Scroll to future"
                href="/react/UI-Components/scroll-to-future"
            />
            <PageLink text="Tooltip" href="/react/UI-Components/tooltip" />
            <PageLink
                text="Popup with timer hide"
                href="/react/UI-Components/custom-popup-with-timer-hide"
            />
        </div>
    );
};
