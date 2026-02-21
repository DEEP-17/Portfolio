"use client";

import { useState, useEffect } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredElement, setHoveredElement] = useState<DOMRect | null>(null);
  const [mounted, setMounted] = useState(false);
  const [cursorColor, setCursorColor] = useState("#3b82f6");

  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 900, mass: 0.1 };
  const springX = useSpring(cursorX, springConfig);
  const springY = useSpring(cursorY, springConfig);


  const trailConfig = { damping: 30, stiffness: 200, mass: 0.5 };
  const trailX = useSpring(cursorX, trailConfig);
  const trailY = useSpring(cursorY, trailConfig);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      const target = e.target as HTMLElement;
      const expandElement = target.closest(".expand-cursor");

      if (expandElement) {
        const rect = expandElement.getBoundingClientRect();
        setHoveredElement(rect);
        setIsHovered(true);
        cursorX.set(rect.left + rect.width / 2);
        cursorY.set(rect.top + rect.height / 2);
      } else {
        setHoveredElement(null);
        setIsHovered(false);
      }


      const sectionWithColor = target.closest("[data-cursor-color]") as HTMLElement;
      if (sectionWithColor) {
        setCursorColor(sectionWithColor.dataset.cursorColor || "#3b82f6");
      } else {
        setCursorColor("#3b82f6");
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [cursorX, cursorY, mounted]);

  if (!mounted) {
    return (
      <div
        className="fixed top-0 left-0 pointer-events-none z-[100]"
        style={{ transform: "translate(-50%, -50%)" }}
      >
        <div
          className="rounded-full border-2"
          style={{
            width: 12,
            height: 12,
            borderColor: "#3b82f6",
            opacity: 0.8,
            backgroundColor: "#3b82f6",
          }}
        />
      </div>
    );
  }

  return (
    <>

      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[100]"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
          mixBlendMode: "difference",
        }}
      >
        <motion.div
          className="rounded-full"
          animate={{
            width: isHovered ? (hoveredElement?.width || 0) + 10 : 14,
            height: isHovered ? (hoveredElement?.height || 0) + 10 : 14,
            backgroundColor: isHovered ? "transparent" : "#ffffff",
            borderWidth: isHovered ? 2 : 0,
            borderColor: "#ffffff",
            opacity: 0.9,
          }}
          transition={springConfig}
          style={{ borderStyle: "solid" }}
        />
      </motion.div>


      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[99]"
        style={{
          x: trailX,
          y: trailY,
          translateX: "-50%",
          translateY: "-50%",
          mixBlendMode: "difference",
        }}
      >
        <motion.div
          className="rounded-full"
          animate={{
            width: isHovered ? 0 : 6,
            height: isHovered ? 0 : 6,
            backgroundColor: "#ffffff",
            opacity: isHovered ? 0 : 0.5,
          }}
          transition={trailConfig}
        />
      </motion.div>
    </>
  );
}