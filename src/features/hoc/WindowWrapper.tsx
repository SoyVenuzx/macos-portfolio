import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { type ComponentType, useLayoutEffect, useRef } from "react";
import useWindowStore from "@/store/window/window.store";
import type { windowKeyType } from "@/store/window/window.types";

function WindowWrapper<P extends object>(
  Component: ComponentType<P>,
  windowKey: windowKeyType,
) {
  const Wrapped = (props: P) => {
    const ref = useRef<HTMLElement>(null);

    const { focusWindow, windows } = useWindowStore();
    const { isOpen, zIndex } = windows[windowKey];

    useGSAP(() => {
      const element = ref.current;

      if (!element || !isOpen) return;

      element.style.display = "block";

      gsap.fromTo(
        element,
        { scale: 0.8, opacity: 0, y: 40 },
        { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: "power3.out" },
      );
    }, [isOpen]);

    useGSAP(() => {
      const element = ref.current;

      if (!element) return;

      const [instance] = Draggable.create(element, {
        onPress: () => focusWindow(windowKey),
      });

      return () => instance.kill();
    }, []);

    useLayoutEffect(() => {
      const element = ref.current;

      if (!element) return;

      element.style.display = isOpen ? "block" : "none";
    }, [isOpen]);

    return (
      <section id={windowKey} ref={ref} style={{ zIndex }} className="absolute">
        <Component {...props} />
      </section>
    );
  };

  Wrapped.displayName = `WindowWrapper(${Component.displayName || Component.name || "Component"})`;

  return Wrapped;
}

export default WindowWrapper;
