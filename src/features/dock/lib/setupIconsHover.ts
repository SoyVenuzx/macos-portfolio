import gsap from "gsap";

export const setupIconsHover = (dock: HTMLElement | null) => {
  if (!dock) return () => {};

  const icons = dock.querySelectorAll(".dock-icon");

  const animateIcons = (mouseX: number) => {
    const { left } = dock.getBoundingClientRect();

    icons.forEach((icon) => {
      const { left: iconLeft, width } = icon.getBoundingClientRect();
      const center = iconLeft - left + width / 2;
      const distance = Math.abs(mouseX - center);

      const intensity = Math.exp(-(distance ** 2.5) / 15000);

      gsap.to(icon, {
        scale: 1 + 0.25 * intensity,
        y: -15 * intensity,
        duration: 0.16,
        ease: "power1.out",
      });
    });
  };

  const handleMouseMove = (e: MouseEvent) => {
    const { left } = dock.getBoundingClientRect();

    animateIcons(e.clientX - left);
  };

  const resetIcons = () => {
    icons.forEach((icon) => {
      gsap.to(icon, { scale: 1, y: 0, duration: 0.3, ease: "power1.out" });
    });
  };

  dock.addEventListener("mousemove", handleMouseMove);
  dock.addEventListener("mouseleave", resetIcons);

  return () => {
    dock.removeEventListener("mousemove", handleMouseMove);
    dock.removeEventListener("mouseleave", resetIcons);
  };
};
