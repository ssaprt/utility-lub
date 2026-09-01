"use client";

import { useImagePreview } from "use-image-preview";
import { RichGeneratorPage } from "../RichGenerators/RichGenerator";

export const Glassmorphism = () => (
    <RichGeneratorPage
        kind="glassmorphism"
        title="CSS Glassmorphism Generator"
        description="Design layered glass surfaces with blur, tint, borders, texture and controlled depth"
        imagePreviewHook={useImagePreview}
    />
);
