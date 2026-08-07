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
                    backgroundColor: "rgba(97, 45, 161, 0.75)",
                }}
                customStyle={{
                    container: {
                        className:
                            "border-0 border-pink-300/30 shadow-xl shadow-black/40 !items-start",
                    },
                    header: {
                        className: "mr-12 p-1 text-[14px] ml-1",
                    },
                    body,
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
                    icon: <IconX className="hover:text-purple-100/40" />,
                    className: "!top-[9px] !right-[9px]",
                }}
                header={{
                    content: (
                        <span className="text-md">
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
