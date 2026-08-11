export default function Loading() {
    return (
        <div className="flex h-full w-full items-center justify-center">
            <div
                className="
                    size-10
                    animate-spin
                    rounded-full
                    border-4
                    border-fg/20
                    border-t-fg
                "
            />
        </div>
    );
}
