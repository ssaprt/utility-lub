import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { routes } from "@/config/routes";

interface RoutePageProps {
    params: Promise<{
        slug: string[];
    }>;
}

export function generateStaticParams() {
    return routes.map((route) => ({
        slug: [...route.path],
    }));
}

const findRoute = (slug: string[]) => {
    return routes.find(
        (route) =>
            route.path.length === slug.length &&
            route.path.every((segment, index) => segment === slug[index]),
    );
};

export async function generateMetadata({
    params,
}: RoutePageProps): Promise<Metadata> {
    const { slug } = await params;
    const route = findRoute(slug);

    if (!route) {
        return {
            title: "Страница не найдена",
        };
    }

    return {
        title: route.title,
    };
}

export default async function RoutePage({ params }: RoutePageProps) {
    const { slug } = await params;
    const route = findRoute(slug);

    if (!route) {
        notFound();
    }

    const Content = route.Component;

    return (
        <main data-pagefind-body>
            <Content />
        </main>
    );
}
