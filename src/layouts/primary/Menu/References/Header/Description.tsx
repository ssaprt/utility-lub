import { createElement } from "react";

export const Description = ({ description }: { description: string }) => {
    const formatText = () => {
        return description.split(" ").map((word) => {
            return word.includes(":")
                ? createElement(
                      "strong",
                      {
                          className: "py-[2px] px-2 bg-fg/10 text-xs!",
                          key: word,
                      },
                      word,
                  )
                : ` ${word} `;
        });
    };

    return <p className="px-2 text-xs font-light! mb-4 mt-1">{formatText()}</p>;
};
