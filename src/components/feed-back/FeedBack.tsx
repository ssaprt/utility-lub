import { IconSend } from "@tabler/icons-react";
import { useState } from "react";
import { Loader } from "../animationIcons/Loader/Loader";
import { TitleWithItemsBlock } from "../blocks/TitleWithItemsBlock/TitleWithItemsBlock";
import { GeneralButton } from "../button/GeneralButton/GeneralButton";
import ContactForm from "../contactForm/ContactForm";
import { CustomPopup } from "../CustomPopup/CustomPopup";
import { Input } from "../input/text/Input";
import { TextAreaWithScrollBar } from "../textarea/TextAreaWithScrollBar";

export const FeedBack = ({ subject }: { subject: string }) => {
    const [open, setOpen] = useState(false);
    const [refPopup, setRefPopup] = useState<HTMLDivElement | null>(null);

    return (
        <div className="my-2 mt-10">
            <TitleWithItemsBlock title="Feedback Form">
                <Loader visible={true} mode="wave" />

                <div className="flex flex-row justify-between items-center select-none w-full relative">
                    <span className="text-sm">Send your feedback to us</span>
                    <GeneralButton
                        icon={<IconSend className="w-4 h-4" />}
                        textButton="Send Feedback"
                        type="button"
                        handleAction={() => setOpen(true)}
                    />
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
            </TitleWithItemsBlock>
        </div>
    );
};
