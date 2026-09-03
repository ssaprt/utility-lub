import { GeneralButton } from "@/components/button/GeneralButton/GeneralButton";
import { IconPlayerPlayFilled } from "@tabler/icons-react";

export const ContentPlayer = () => {
    return (
        <div className="row-center-2">
            <GeneralButton
                icon={<IconPlayerPlayFilled className="size-4" />}
                className="
                        p-2!
                        [&_*]:p-0!
                        m-0!
                        rounded-full!
                        gap-0!
                    "
                textButton=""
                variant="frame"
                handleAction={() => {}}
            />
            <span>Soon...</span>
        </div>
    );
};
