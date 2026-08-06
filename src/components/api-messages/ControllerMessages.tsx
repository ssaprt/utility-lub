import Image from "next/image";

export const collectionMessageComponents = {
    201: "ok",
    400: "bad-request",
    413: "large-file",
    429: "too-many",
    500: "server-error",
};

export const ControllerMessages = ({
    code,
    message,
}: {
    code: keyof typeof collectionMessageComponents;
    message: string;
}) => {
    return (
        <div className="flex flex-row gap-2 items-center select-none py-2 px-3 border-1 border-pink-300/30 shadow-md shadow-black/40 rounded-[4px]">
            <Image
                width={20}
                height={20}
                className="w-8 h-8"
                src={`/message/${collectionMessageComponents[code]}.svg`}
                alt={message}
            />
            <span className="text-sm">
                {code === 429
                    ? "Too many requests. Please try again 1 minute later"
                    : message}
            </span>
        </div>
    );
};
