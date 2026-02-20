import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import { useRef } from "react";

interface renderTextProps {
  text: string;
  className: string;
  baseWeight?: number;
}

type FontType = keyof typeof FONT_WEIGHTS;

const FONT_WEIGHTS = {
  subtitle: { min: 100, max: 400, default: 100 },
  title: { min: 400, max: 800, default: 400 },
} as const;

const renderText = ({ text, className, baseWeight = 400 }: renderTextProps) => {
  const counts: Record<string, number> = {};

  return [...text].map((char) => {
    counts[char] = (counts[char] || 0) + 1;

    return (
      <span
        key={`${char}-${counts[char]}`}
        className={className}
        style={{ fontVariationSettings: `'wght' ${baseWeight}` }}
      >
        {char === " " ? "\u00A0" : char}
      </span>
    );
  });
};

const setupTextHover = (container: HTMLElement | null, type: FontType) => {
  if (!container) return () => {};

  const letters = container.querySelectorAll("span");
  const { min, max, default: base } = FONT_WEIGHTS[type];

  const animateLetter = (
    letter: HTMLElement,
    weight: number,
    duration: number = 0.25,
  ) => {
    return gsap.to(letter, {
      duration,
      ease: "power2.out",
      fontVariationSettings: `'wght' ${weight}`,
    });
  };

  const handleMouseMove = (event: MouseEvent) => {
    const { left } = container.getBoundingClientRect();
    const mouseX = event.clientX - left;

    letters.forEach((letter) => {
      const { left: l, width: w } = letter.getBoundingClientRect();
      const distance = Math.abs(mouseX - (l - left + w / 2));
      const intensity = Math.exp(-(distance ** 2) / 15000);

      animateLetter(letter, min + (max - min) * intensity);
    });
  };

  const handleMouseLeave = () => {
    letters.forEach((letter) => {
      animateLetter(letter, base, 0.3);
    });
  };

  container.addEventListener("mousemove", handleMouseMove);
  container.addEventListener("mouseleave", handleMouseLeave);

  return () => {
    container.removeEventListener("mousemove", handleMouseMove);
    container.removeEventListener("mouseleave", handleMouseLeave);
  };
};

export default function Welcome() {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);

  useGSAP(() => {
    const titleCleanup = setupTextHover(titleRef.current, "title");
    const subtitleCleanup = setupTextHover(subtitleRef.current, "subtitle");

    return () => {
      subtitleCleanup();
      titleCleanup();
    };
  }, []);

  return (
    <section id="welcome">
      <p ref={subtitleRef}>
        {renderText({
          text: "Hey, I'm GB! Welcome to my",
          className: "text-3xl font-georama",
          baseWeight: 100,
        })}
      </p>
      <h1 ref={titleRef} className="mt-7">
        {renderText({
          text: "Portfolio",
          className: "text-9xl italic font-georama",
        })}
      </h1>

      <div className="small-screen">
        <p>This Portfolio is desgined for desktop/tablet screens only</p>
      </div>
    </section>
  );
}
