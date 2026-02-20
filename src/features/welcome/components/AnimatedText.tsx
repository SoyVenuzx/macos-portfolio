import { useRef } from "react";
import { useTextHover } from "../hooks/useTextHover";
import { renderText } from "../lib";
import type { FontType, RenderTextProps } from "../types";

type AnimatedTextProps = RenderTextProps & {
  as?: "p" | "h1" | "span" | "div";
  wrapperClassName?: string;
  hoverType: FontType;
};

export const AnimatedText = ({
  text,
  className,
  baseWeight,
  as: Tag = "span",
  wrapperClassName,
  hoverType,
}: AnimatedTextProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useTextHover(containerRef, hoverType);

  return (
    <Tag ref={containerRef} className={wrapperClassName}>
      {renderText({ text, className, baseWeight })}
    </Tag>
  );
};
