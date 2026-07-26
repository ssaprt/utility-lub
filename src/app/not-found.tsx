import { AppLink } from "@/content/react/UI-Components/Pagination/components/link/AppLink";

export default function NotFound() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center gap-4">
            <h1 className="text-6xl font-bold">404</h1>

            <p>Страница не найдена</p>

            <AppLink href="/">На главную</AppLink>
        </main>
    );
}
