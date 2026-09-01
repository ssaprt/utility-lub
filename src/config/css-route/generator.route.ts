import { AnimatedText } from "@/content/CSS/CSSResource/Generator/AnimatedText/AnimatedText";
import { Animation } from "@/content/CSS/CSSResource/Generator/AnimationGenerator/Animation";
import { Border } from "@/content/CSS/CSSResource/Generator/BorderGenerator/Border";
import { BorderImage } from "@/content/CSS/CSSResource/Generator/BorderImageGenerator/BorderImage";
import { BoxShadow } from "@/content/CSS/CSSResource/Generator/BoxShadow/BoxShadow";
import { Button } from "@/content/CSS/CSSResource/Generator/Button/Button";
import { CheckboxRadio } from "@/content/CSS/CSSResource/Generator/CheckboxRadio/CheckboxRadio";
import { ClipPathGenerator } from "@/content/CSS/CSSResource/Generator/ClipPatch/ClipPatch";
import { CubicBezier } from "@/content/CSS/CSSResource/Generator/CubicBezier/CubicBezier";
import { ImageFilter } from "@/content/CSS/CSSResource/Generator/Filter/ImageFilter";
import { Flex } from "@/content/CSS/CSSResource/Generator/Flex/Flex";
import { FlipSwitch } from "@/content/CSS/CSSResource/Generator/FlipSwitch/FlipSwitch";
import { Glassmorphism } from "@/content/CSS/CSSResource/Generator/Glassmorphism/Glassmorphism";
import { GlitchText } from "@/content/CSS/CSSResource/Generator/GlitchText/GlitchText";
import { Gradient } from "@/content/CSS/CSSResource/Generator/Gradient/Gradient";
import { GradientBorder } from "@/content/CSS/CSSResource/Generator/GradientBorder/GradientBorder";
import { Grid } from "@/content/CSS/CSSResource/Generator/Grid/Grid";
import { InputRange } from "@/content/CSS/CSSResource/Generator/InputRange/InputRange";
import { Layout } from "@/content/CSS/CSSResource/Generator/Layout/Layout";
import { Loader } from "@/content/CSS/CSSResource/Generator/Loader/Loader";
import { NthChild } from "@/content/CSS/CSSResource/Generator/NthChild/NthChild";
import { Pattern } from "@/content/CSS/CSSResource/Generator/Pattern/Pattern";
import { Ribbon } from "@/content/CSS/CSSResource/Generator/Ribbon/Ribbon";
import { SkeletonLoader } from "@/content/CSS/CSSResource/Generator/SkeletonLoader/SkeletonLoader";
import { Sprite } from "@/content/CSS/CSSResource/Generator/Sprite/Sprite";
import { TextGradient } from "@/content/CSS/CSSResource/Generator/TextGradient/TextGradient";
import { TextInput } from "@/content/CSS/CSSResource/Generator/TextInput/TextInput";
import { TextShadow } from "@/content/CSS/CSSResource/Generator/TextShadow/TextShadow";
import { Toast } from "@/content/CSS/CSSResource/Generator/Toast/Toast";
import { Transform3D } from "@/content/CSS/CSSResource/Generator/Transform3D/Transform3D";
import { Triangle } from "@/content/CSS/CSSResource/Generator/Triangle/Triangle";

export const generatorRoute = [
    {
        title: "CSS Generator",
        path: ["css", "generator"],
        Component: () => null,
    },
    {
        title: "CSS Gradient Generator",
        path: ["css", "generator", "gradient"],
        Component: Gradient,
    },
    {
        title: "CSS Pattern Generator",
        path: ["css", "generator", "pattern"],
        Component: Pattern,
    },
    {
        title: "CSS Clip Patch Generator",
        path: ["css", "generator", "clip-patch"],
        Component: ClipPathGenerator,
    },
    {
        title: "CSS Box Shadow Generator",
        path: ["css", "generator", "box-shadow"],
        Component: BoxShadow,
    },
    {
        title: "CSS Border Generator",
        path: ["css", "generator", "border"],
        Component: Border,
    },
    {
        title: "CSS Flex Box Generator",
        path: ["css", "generator", "flex"],
        Component: Flex,
    },
    {
        title: "CSS Grid Generator",
        path: ["css", "generator", "grid"],
        Component: Grid,
    },
    {
        title: "CSS Image Filter Generator",
        path: ["css", "generator", "filter"],
        Component: ImageFilter,
    },
    {
        title: "CSS Animated Text Generator",
        path: ["css", "generator", "animated-text"],
        Component: AnimatedText,
    },
    {
        title: "CSS Border Image Generator",
        path: ["css", "generator", "border-image"],
        Component: BorderImage,
    },
    {
        title: "CSS Animation Generator",
        path: ["css", "generator", "animation"],
        Component: Animation,
    },
    {
        title: "CSS Button Generator",
        path: ["css", "generator", "button"],
        Component: Button,
    },
    {
        title: "CSS Checkbox & Radio Generator",
        path: ["css", "generator", "checkbox-radio"],
        Component: CheckboxRadio,
    },
    {
        title: "CSS Glitch Text Generator",
        path: ["css", "generator", "glitch-text"],
        Component: GlitchText,
    },
    {
        title: "CSS Gradient Border Generator",
        path: ["css", "generator", "gradient-border"],
        Component: GradientBorder,
    },
    {
        title: "CSS Input Range Generator",
        path: ["css", "generator", "input-range"],
        Component: InputRange,
    },
    {
        title: "CSS Layout Generator",
        path: ["css", "generator", "layout"],
        Component: Layout,
    },
    {
        title: "CSS Loader Generator",
        path: ["css", "generator", "loader"],
        Component: Loader,
    },
    {
        title: "CSS nth-child Tester",
        path: ["css", "generator", "nth-child"],
        Component: NthChild,
    },
    {
        title: "CSS Ribbon Generator",
        path: ["css", "generator", "ribbon"],
        Component: Ribbon,
    },
    {
        title: "CSS Skeleton Loader Generator",
        path: ["css", "generator", "skeleton-loader"],
        Component: SkeletonLoader,
    },
    {
        title: "CSS Cubic Bezier Generator",
        path: ["css", "generator", "cubic-bezier"],
        Component: CubicBezier,
    },
    {
        title: "CSS Flip Switch Generator",
        path: ["css", "generator", "flip-switch"],
        Component: FlipSwitch,
    },
    {
        title: "CSS Glassmorphism Generator",
        path: ["css", "generator", "glassmorphism"],
        Component: Glassmorphism,
    },
    {
        title: "CSS Triangle Generator",
        path: ["css", "generator", "triangle"],
        Component: Triangle,
    },
    {
        title: "CSS Toast Generator",
        path: ["css", "generator", "toast"],
        Component: Toast,
    },
    {
        title: "CSS Text Shadow Generator",
        path: ["css", "generator", "text-shadow"],
        Component: TextShadow,
    },
    {
        title: "CSS Text Input Generator",
        path: ["css", "generator", "input"],
        Component: TextInput,
    },
    {
        title: "CSS Text Gradient Generator",
        path: ["css", "generator", "text-gradient"],
        Component: TextGradient,
    },
    {
        title: "CSS Sprite Generator",
        path: ["css", "generator", "sprite"],
        Component: Sprite,
    },
    {
        title: "CSS 3D Transform Generator",
        path: ["css", "generator", "transform-3d"],
        Component: Transform3D,
    },
];
