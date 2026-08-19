import AuthorIcon from "./media/face-author.svg";

export const Author = () => {
    return (
        <div className="flex flex-row gap-3 items-center justify-center">
            <AuthorIcon className="w-[200px] h-[200px] stroke-fg fill-none" />
        </div>
    );
};
