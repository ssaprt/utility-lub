import { CSSPseudoSelectorGenerator } from "@/layouts/primary/Menu/References/CSSPseudoSelectorGenerator";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { routes } from "@/config/routes";

interface RoutePageProps {
    params: Promise<{
        slug: string[];
    }>;
}

const decodeSegment = (value: string) => {
    try {
        return decodeURIComponent(value);
    } catch {
        return value;
    }
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

    const name = decodeSegment(slug[2]);

    return {
        title: name,
        name,
    };
};

export function generateStaticParams() {
    return routes.map((route) => ({
        slug: [...route.path],
    }));
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
            title: selectorRoute.title,
        };
    }

    return {
        title: "Страница не найдена",
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
