import { routes } from "@/config/routes";
import { CSSPseudoSelectorGenerator } from "@/layouts/primary/Menu/References/CSSPseudoSelectorGenerator";
import cssData from "@webref/css/css.json";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

interface RoutePageProps {
    params: Promise<{
        slug: string[];
    }>;
}

const legacyPseudoElements = new Set([
    ":before",
    ":after",
    ":first-letter",
    ":first-line",
]);

const getSelectorType = (name: string) => {
    return name.startsWith("::") || legacyPseudoElements.has(name)
        ? "pseudo-element"
        : "pseudo-class";
};

const findStaticRoute = (slug: string[]) => {
    return routes.find(
        (route) =>
            route.path.length === slug.length &&
            route.path.every((segment, index) => segment === slug[index]),
    );
};

const getCssSelectorRoute = (slug: string[]) => {
    if (slug.length !== 3) {
        return null;
    }

    if (slug[0] !== "references") {
        return null;
    }

    if (slug[1] !== "css-pseudo-classes" && slug[1] !== "css-pseudo-elements") {
        return null;
    }

    return {
        name: decodeURIComponent(slug[2]),
    };
};

export async function generateStaticParams() {
    const staticRoutes = routes.map((route) => ({
        slug: [...route.path],
    }));

    const { selectors } = cssData;

    const cssSelectors = selectors.filter((selector) =>
        selector.name.startsWith(":"),
    );

    const selectorRoutes = cssSelectors.map((selector) => {
        const type = getSelectorType(selector.name);

        return {
            slug: [
                "references",
                type === "pseudo-class"
                    ? "css-pseudo-classes"
                    : "css-pseudo-elements",
                selector.name,
            ],
        };
    });

    return [...staticRoutes, ...selectorRoutes];
}

export async function generateMetadata({
    params,
}: RoutePageProps): Promise<Metadata> {
    const { slug } = await params;

    const staticRoute = findStaticRoute(slug);

    if (staticRoute) {
        return {
            title: staticRoute.title,
        };
    }

    const selectorRoute = getCssSelectorRoute(slug);

    if (selectorRoute) {
        return {
            title: selectorRoute.name,
        };
    }

    return {
        title: "Page not found",
    };
}

export default async function RoutePage({ params }: RoutePageProps) {
    const { slug } = await params;

    const staticRoute = findStaticRoute(slug);

    if (staticRoute) {
        const Content = staticRoute.Component;

        return (
            <main data-pagefind-body>
                <Content />
            </main>
        );
    }

    const selectorRoute = getCssSelectorRoute(slug);

    if (selectorRoute) {
        return (
            <main data-pagefind-body>
                <CSSPseudoSelectorGenerator name={selectorRoute.name} />
            </main>
        );
    }

    notFound();
}
