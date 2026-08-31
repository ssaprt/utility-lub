import { AnimatedText } from "@/content/CSS/CSSResource/Generator/AnimatedText/AnimatedText";
import { Animation } from "@/content/CSS/CSSResource/Generator/AnimationGenerator/Animation";
import { Border } from "@/content/CSS/CSSResource/Generator/BorderGenerator/Border";
import { BorderImage } from "@/content/CSS/CSSResource/Generator/BorderImageGenerator/BorderImage";
import { BoxShadow } from "@/content/CSS/CSSResource/Generator/BoxShadow/BoxShadow";
import { ClipPathGenerator } from "@/content/CSS/CSSResource/Generator/ClipPatch/ClipPatch";
import { ImageFilter } from "@/content/CSS/CSSResource/Generator/Filter/ImageFilter";
import { Flex } from "@/content/CSS/CSSResource/Generator/Flex/Flex";
import { Gradient } from "@/content/CSS/CSSResource/Generator/Gradient/Gradient";
import { Grid } from "@/content/CSS/CSSResource/Generator/Grid/Grid";
import { Pattern } from "@/content/CSS/CSSResource/Generator/Pattern/Pattern";

export const generatorRoute = [
    {
        title: "CSS Gernerator",
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
        title: "Border Generator",
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
        title: "CSS Image filter Generator",
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
];
