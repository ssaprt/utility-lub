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
    ready,
}: {
    code: keyof typeof collectionMessageComponents;
    message: string;
    ready: (ready: boolean) => void;
}) => {
    return (
        <div className="flex flex-col gap-4 items-center select-none py-2 px-3">
            <Image
                onLoad={() => ready(true)}
                width={20}
                height={20}
                className="w-14 h-14"
                src={`/message/${collectionMessageComponents[code]}.svg`}
                alt={message}
            />
            <span className="text-sm text-center">
                {code === 429
                    ? "Too many requests. Please try again 1 minute later"
                    : message}
            </span>
        </div>
    );
};
