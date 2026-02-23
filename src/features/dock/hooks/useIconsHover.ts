import { useGSAP } from "@gsap/react";
import type { RefObject } from "react";
import { setupIconsHover } from "../lib/setupIconsHover";

export const useIconsHover = (containerRef: RefObject<HTMLElement | null>) => {
  useGSAP(() => {
    const cleanup = setupIconsHover(containerRef.current);

    return () => {
      cleanup();
    };
  }, [containerRef]);
};
