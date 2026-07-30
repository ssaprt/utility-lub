import { GeneralButton } from "@/components/button/GeneralButton/GeneralButton";
import {
    PresetsThemeType,
    Tooltip,
    TooltipAnimationType,
    TooltipPlacement,
} from "@ssaprt/tooltip";

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
    const code = `import { TooltipProvider } from '@ssaprt/tooltip';
import "@ssaprt/tooltip/style.css";
import { Tooltip } from '@ssaprt/tooltip';

export const App = () => {
    return (
        <TooltipProvider // provider not required
            defaultRenderPosition="top"
            selectTheme="dark"
            animations={{ show: "zoom", hide: "fade" }}
            interactive={true}
        >
            <YourLayout />
        </TooltipProvider>
    )
}

const YourLayout = () => {
    <Tooltip
        animation={{ // animation props optional
            show: ${animationShow},
            hide: ${animationHide},
            speed: ${speed},
        }}
        position="${positionRenderMode}" // top | right | bottom | left optional
        hideDelay={${hideDelay}} // optional
        interactive={${interactive}} // optional
        content="any html code || <Component /> || Saved successfully"
        selectTheme="${selectTheme}" // optional
        customTheme={{ // optional
            body: {
                style: {
                    borderRadius: ${borderRadius},
                },
            }
        }}
    }}
}
`;
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
                <GeneralButton
                    textButton={selectTheme}
                    copy={{ copyItem: code }}
                />
            </div>
        </Tooltip>
    );
};
