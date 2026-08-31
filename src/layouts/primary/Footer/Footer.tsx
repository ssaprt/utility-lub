import { GeneralButton } from "@/components/button/GeneralButton/GeneralButton";
import { AppLink } from "@/content/react/UI-Components/Pagination/components/link/AppLink";

export const Footer = () => {
    return (
        <footer className="relative col-center-4 justify-center mt-10">
            <div className="relative row-center-1 justify-center">
                <hr className="w-[4px] h-[1px] bg-fg/35! border-none" />

                <AppLink href="/">
                    <GeneralButton
                        textButton="Home"
                        variant="ghost"
                        className="text-fg/70"
                    />
                </AppLink>

                <hr className="w-[4px] h-[1px] bg-fg/35! border-none" />

                <AppLink href="/author">
                    <GeneralButton
                        textButton="Author"
                        variant="ghost"

                        className="text-fg/70"
                    />
                </AppLink>

                <hr className="w-[4px] h-[1px] bg-fg/35! border-none" />
            </div>
            <div className="h-5"></div>
        </footer>
    );
};
