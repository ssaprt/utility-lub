import { CopyButton } from "@/components/button/CopyButton/CopyButton";
import {
    PresetsThemeType,
    Tooltip,
    TooltipAnimationType,
    TooltipPlacement,
} from "tooltip";

export const TooltipElement = ({
    animationShow,
    animationHide,
    positionRenderMode,
    showExample,
    interactive,
    hideDelay,
    selectTheme,
    speed,
    borderRadius,
}: {
    animationShow: TooltipAnimationType;
    animationHide: TooltipAnimationType;
    positionRenderMode: TooltipPlacement;
    showExample: React.ReactNode | string;
    interactive: boolean;
    hideDelay: number;
    selectTheme: PresetsThemeType;
    speed: `${number}ms`;
    borderRadius: string;
}) => {
    return (
        <Tooltip
            animation={{
                show: animationShow,
                hide: animationHide,
                speed,
            }}
            position={positionRenderMode}
            hideDelay={hideDelay}
            interactive={interactive}
            content={showExample}
            selectTheme={selectTheme}
            customTheme={{
                body: {
                    style: {
                        paddingRight:
                            typeof showExample === "string" ? "14px" : "4px",
                        borderRadius,
                    },
                },
            }}
        >
            <div>
                <CopyButton textToCopy={selectTheme as string}>
                    {selectTheme}
                </CopyButton>
            </div>
        </Tooltip>
    );
};
