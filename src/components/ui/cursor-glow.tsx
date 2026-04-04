"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CursorGlow(): React.ReactElement {
  const [visible, setVisible] = useState(false);
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const x = useSpring(mouseX, { stiffness: 150, damping: 25 });
  const y = useSpring(mouseY, { stiffness: 150, damping: 25 });

  useEffect(() => {
    function handleMove(e: MouseEvent) {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      const el = document.elementFromPoint(e.clientX, e.clientY);
      if (!el) { setVisible(false); return; }

      const section = el.closest("[data-cursor-glow]");
      setVisible(!!section);
    }

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="pointer-events-none fixed z-[9998] rounded-full mix-blend-screen"
      style={{
        x,
        y,
        translateX: "-50%",
        translateY: "-50%",
        width: 280,
        height: 280,
        background:
          "radial-gradient(circle, rgba(91,95,239,0.15) 0%, rgba(91,95,239,0.05) 40%, transparent 70%)",
        opacity: visible ? 1 : 0,
        transition: "opacity 0.3s ease",
      }}
    />
  );
}
