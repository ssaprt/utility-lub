import { IconSend } from "@tabler/icons-react";
import { useState } from "react";
import { GeneralButton } from "../button/GeneralButton/GeneralButton";
import ContactForm from "../contactForm/ContactForm";
import { CustomPopup } from "../CustomPopup/CustomPopup";
import { Input } from "../input/text/Input";
import { TextAreaWithScrollBar } from "../textarea/TextAreaWithScrollBar";

export const FeedBack = ({ subject }: { subject: string }) => {
    const [open, setOpen] = useState(false);
    const [refPopup, setRefPopup] = useState<HTMLDivElement | null>(null);

    return (
        <div className="my-2">
            <div className="row-center-1">
                <div className="w-full py-2 px-4 relative flex justify-center">
                    <div className="row-center-2 py-1 px-2">
                        <span className="text-sm text-fg/80">Feedback</span>
                        <GeneralButton
                            className="py-2 px-4"
                            icon={<IconSend className="w-4 h-4" />}
                            textButton="Send a letter"
                            type="button"
                            variant="frame"
                            handleAction={() => setOpen(true)}
                        />
                    </div>
                </div>

                <CustomPopup
                    ref={(node) => setRefPopup(node)}
                    headerTitle={subject + " Utility Lab"}
                    body={{
                        className: "items-start",
                    }}
                    open={open}
                    setOpen={(nextOpen) => {
                        setOpen(nextOpen);
                    }}
                >
                    <div className="w-[300px] max-w-[90vw]">
                        <ContactForm
                            open={open}
                            popupRef={refPopup!}
                            title={subject}
                            onClear={() => setOpen(false)}
                        >
                            <div className="flex flex-col gap-2 items-start w-full z-1">
                                <div className="w-full">
                                    <div className="flex flex-col gap-1">
                                        <Input
                                            name="name"
                                            type="text"
                                            label="Your name"
                                            value=""
                                        />
                                        <Input
                                            name="from"
                                            type="email"
                                            label="Your email"
                                            value=""
                                        />

                                        <TextAreaWithScrollBar
                                            name="message"
                                            placeholder="Your message"
                                            backValue={() => {}}
                                        />
                                    </div>
                                </div>
                            </div>
                        </ContactForm>
                    </div>
                </CustomPopup>
            </div>
        </div>
    );
};
