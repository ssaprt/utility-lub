import { IconBrandGithub } from "@tabler/icons-react";
import { Search } from "../Left/Search/Search";

export const Right = () => {
    return (
        <div className="flex flex-row items-center gap-2">
            <Search />
            <a
                href="https://github.com/ssaprt"
                target="_blank"
                className="my-2 flex flex-row items-center select-none gap-2 border-2 border-pink-300 px-1 py-1 rounded-full hover:bg-pink-700/30 hover:transition-colors duration-300"
            >
                <IconBrandGithub className="w-[20px] h-[20px] stroke-pink-300" />
            </a>
        </div>
    );
};
