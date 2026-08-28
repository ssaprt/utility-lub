import { GeneralButton } from "@/components/button/GeneralButton/GeneralButton";
import { DynamicSvgIcon } from "@/components/svg/DynamicSVGIcon";
import { AppLink } from "@/content/react/UI-Components/Pagination/components/link/AppLink";

export const Footer = () => {
    return (
        <footer className="relative col-center-4 justify-center mt-10">
            <div className="relative row-center-1 justify-center">
                <hr className="w-[10px] h-[1px] bg-fg/35! border-none" />

                <AppLink href="/">
                    <GeneralButton
                        textButton="Home"
                        variant="ghost"
                        icon={
                            <DynamicSvgIcon
                                name="home.svg"
                                className="w-[20px] h-[20px] fill-fg/70"
                            />
                        }
                        className="text-fg/70"
                    />
                </AppLink>

                <hr className="w-[10px] h-[1px] bg-fg/35! border-none" />

                <AppLink href="/author">
                    <GeneralButton
                        textButton="Author"
                        variant="ghost"

                        className="text-fg/70"
                    />
                </AppLink>

                <hr className="w-[10px] h-[1px] bg-fg/35! border-none" />
            </div>
            <div className="h-10"></div>
        </footer>
    );
};
