import type { FONT_WEIGHTS } from "./constants";

export interface RenderTextProps {
  text: string;
  className: string;
  baseWeight?: number;
}

export type FontType = keyof typeof FONT_WEIGHTS;
