"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress(): React.ReactElement {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });

  return (
    <motion.div
      style={{ scaleX, transformOrigin: "0%" }}
      className="fixed top-0 left-0 right-0 h-[3px] bg-[#5B5FEF] z-[9999]"
    />
  );
}
