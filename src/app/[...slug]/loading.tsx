export default function Loading() {
    return (
        <div className="flex h-full w-full items-center justify-center">
            <div
                className="
                    size-10
                    animate-spin
                    rounded-full
                    border-4
                    border-pink-300/20
                    border-t-pink-300
                "
            />
        </div>
    );
}
