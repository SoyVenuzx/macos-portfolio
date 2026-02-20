import { useGSAP } from "@gsap/react";
import type { RefObject } from "react";

import { setupTextHover } from "../lib/setupTextHover";
import type { FontType } from "../types";

export const useTextHover = (
  containerRef: RefObject<HTMLElement | null>,
  type: FontType,
) => {
  useGSAP(() => {
    const cleanup = setupTextHover(containerRef.current, type);

    return () => {
      cleanup();
    };
  }, [containerRef, type]);
};
