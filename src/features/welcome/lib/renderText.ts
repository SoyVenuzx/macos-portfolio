import { createElement } from "react";

import type { RenderTextProps } from "../types";

export const renderText = ({
  text,
  className,
  baseWeight = 400,
}: RenderTextProps) => {
  const counts: Record<string, number> = {};

  return [...text].map((char) => {
    counts[char] = (counts[char] || 0) + 1;

    return createElement(
      "span",
      {
        key: `${char}-${counts[char]}`,
        className,
        style: { fontVariationSettings: `'wght' ${baseWeight}` },
      },
      char === " " ? "\u00A0" : char,
    );
  });
};
