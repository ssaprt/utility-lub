import { Media } from "@/content/react/hooks/media/Media";
import { UseImagePreview } from "@/content/react/hooks/media/useImagePreview/UseImagePreview";

export const mediaRoute = [
    {
        title: "Media",
        path: ["react", "hooks", "media"],
        Component: Media,
    },
    {
        title: "useImagePreview",
        path: ["react", "hooks", "media", "useImagePreview"],
        Component: UseImagePreview,
    },
];
