import { PageLink } from "@/components/PageLink/PageLink";

export const Generator = () => {
    return (
        <div className="col-start-2">
            <PageLink
                text="Gradient Generator"
                href="/css/generator/gradient"
            />
            <PageLink text="Pattern Generator" href="/css/generator/pattern" />
        </div>
    );
};
