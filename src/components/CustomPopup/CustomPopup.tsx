import { IconX } from "@tabler/icons-react";
import { Popup } from "popup-from-future";
import { forwardRef, type ReactNode } from "react";

interface CustomPopupProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    children?: ReactNode;
    body?: Record<string, unknown>;
    headerTitle?: string;
}

export const CustomPopup = forwardRef<HTMLDivElement, CustomPopupProps>(
    ({ open, setOpen, children, body, headerTitle }, ref) => {
        return (
            <Popup
                ref={ref}
                isOpen={open}
                open={() => setOpen(false)}
                layer={{
                    className: "!bg-black/30 backdrop-blur-[2px]",
                }}
                customStyle={{
                    container: {
                        className:
                            "border-0 border-fg/30 !bg-app !shadow-[0_5px_10px_4px] !shadow-black/40 !items-start",
                    },
                    header: {
                        className: "mr-12 p-1 text-[14px] ml-1",
                    },
                    body: {
                        ...body,
                        className: "bg-app",
                    },
                }}
                animation={{
                    open: {
                        animationName: "jello-in",
                        duration: 300,
                    },
                    close: {
                        animationName: "blur-out",
                        duration: 130,
                    },
                }}
                close={{
                    size: "30px",
                    icon: <IconX className="hover:text-fg/40" />,
                    className: "!top-[12px] !right-[12px]",
                }}
                header={{
                    content: (
                        <span className="text-md text-fg">
                            {headerTitle ??
                                "Do you have the missing information?"}
                        </span>
                    ),
                }}
            >
                {children}
            </Popup>
        );
    },
);

CustomPopup.displayName = "CustomPopup";
