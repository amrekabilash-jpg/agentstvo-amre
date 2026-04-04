"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface AnimatedIllustrationProps {
  src: string;
  alt: string;
  className?: string;
}

/**
 * Loads an SVG inline and animates character groups (freepik--character-*)
 * with subtle movement for 3-4 seconds when the element enters the viewport.
 */
export function AnimatedIllustration({
  src,
  alt,
  className = "",
}: AnimatedIllustrationProps): React.ReactElement {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svgContent, setSvgContent] = useState<string | null>(null);
  const hasAnimated = useRef(false);

  // Fetch SVG content
  useEffect(() => {
    let cancelled = false;
    fetch(src)
      .then((res) => res.text())
      .then((text) => {
        if (!cancelled) setSvgContent(text);
      })
      .catch(() => {
        // fallback: show as img
      });
    return () => {
      cancelled = true;
    };
  }, [src]);

  // Animate characters on viewport entry
  const animate = useCallback(() => {
    if (hasAnimated.current || !containerRef.current) return;
    hasAnimated.current = true;

    const svg = containerRef.current.querySelector("svg");
    if (!svg) return;

    // Find character groups (case-insensitive: "character", "Character")
    const characters = svg.querySelectorAll<SVGGElement>(
      '[id*="character"], [id*="Character"]'
    );

    // Also find secondary animatable elements (plants, devices, speech bubbles, etc.)
    const secondary = svg.querySelectorAll<SVGGElement>(
      '[id*="Plant"], [id*="Device"], [id*="speech-bubble"], [id*="Android"], [id*="Mug"], [id*="Coffee"], [id*="Chart"], [id*="chart"], [id*="Screens"], [id*="light-bulb"], [id*="box-"]'
    );

    if (characters.length === 0 && secondary.length === 0) return;

    // Bold animation keyframes — visible, lively movements
    const animations: Keyframe[][] = [
      // Big sway + rotation
      [
        { transform: "translateX(0px) rotate(0deg)", offset: 0 },
        { transform: "translateX(14px) rotate(3deg)", offset: 0.15 },
        { transform: "translateX(-10px) rotate(-2.5deg)", offset: 0.35 },
        { transform: "translateX(8px) rotate(2deg)", offset: 0.55 },
        { transform: "translateX(-5px) rotate(-1.5deg)", offset: 0.75 },
        { transform: "translateX(2px) rotate(0.5deg)", offset: 0.9 },
        { transform: "translateX(0px) rotate(0deg)", offset: 1 },
      ],
      // Energetic bounce up-down
      [
        { transform: "translateY(0px) scaleY(1)", offset: 0 },
        { transform: "translateY(-18px) scaleY(1.03)", offset: 0.12 },
        { transform: "translateY(4px) scaleY(0.97)", offset: 0.28 },
        { transform: "translateY(-12px) scaleY(1.02)", offset: 0.44 },
        { transform: "translateY(3px) scaleY(0.98)", offset: 0.6 },
        { transform: "translateY(-6px) scaleY(1.01)", offset: 0.76 },
        { transform: "translateY(0px) scaleY(1)", offset: 1 },
      ],
      // Full body lean + drift
      [
        { transform: "rotate(0deg) translateX(0px) translateY(0px)", offset: 0 },
        { transform: "rotate(-4deg) translateX(-12px) translateY(-4px)", offset: 0.2 },
        { transform: "rotate(3deg) translateX(10px) translateY(2px)", offset: 0.45 },
        { transform: "rotate(-2deg) translateX(-6px) translateY(-2px)", offset: 0.65 },
        { transform: "rotate(1.5deg) translateX(4px) translateY(1px)", offset: 0.82 },
        { transform: "rotate(0deg) translateX(0px) translateY(0px)", offset: 1 },
      ],
      // Jump + squash-stretch
      [
        { transform: "translateY(0px) scaleX(1) scaleY(1)", offset: 0 },
        { transform: "translateY(3px) scaleX(1.06) scaleY(0.94)", offset: 0.08 },
        { transform: "translateY(-22px) scaleX(0.94) scaleY(1.08)", offset: 0.25 },
        { transform: "translateY(0px) scaleX(1.04) scaleY(0.96)", offset: 0.42 },
        { transform: "translateY(-10px) scaleX(0.97) scaleY(1.04)", offset: 0.58 },
        { transform: "translateY(0px) scaleX(1.02) scaleY(0.98)", offset: 0.74 },
        { transform: "translateY(-4px) scaleX(0.99) scaleY(1.01)", offset: 0.88 },
        { transform: "translateY(0px) scaleX(1) scaleY(1)", offset: 1 },
      ],
      // Diagonal dance — diagonal wave motion
      [
        { transform: "translateX(0px) translateY(0px) rotate(0deg)", offset: 0 },
        { transform: "translateX(10px) translateY(-14px) rotate(2deg)", offset: 0.18 },
        { transform: "translateX(-8px) translateY(-4px) rotate(-3deg)", offset: 0.36 },
        { transform: "translateX(12px) translateY(-10px) rotate(2.5deg)", offset: 0.54 },
        { transform: "translateX(-6px) translateY(-2px) rotate(-1.5deg)", offset: 0.72 },
        { transform: "translateX(3px) translateY(-5px) rotate(0.5deg)", offset: 0.88 },
        { transform: "translateX(0px) translateY(0px) rotate(0deg)", offset: 1 },
      ],
    ];

    // Animate characters with bold movements
    characters.forEach((char, i) => {
      const keyframes = animations[i % animations.length];
      const delay = i * 150;

      char.animate(keyframes, {
        duration: 3500,
        delay,
        easing: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        fill: "forwards",
      });
    });

    // Softer animations for secondary elements (plants, devices, etc.)
    const secondaryAnimations: Keyframe[][] = [
      // Gentle sway (plant-like)
      [
        { transform: "rotate(0deg)", offset: 0 },
        { transform: "rotate(3deg)", offset: 0.2 },
        { transform: "rotate(-2deg)", offset: 0.5 },
        { transform: "rotate(1.5deg)", offset: 0.75 },
        { transform: "rotate(0deg)", offset: 1 },
      ],
      // Small float
      [
        { transform: "translateY(0px)", offset: 0 },
        { transform: "translateY(-6px)", offset: 0.3 },
        { transform: "translateY(2px)", offset: 0.6 },
        { transform: "translateY(-3px)", offset: 0.8 },
        { transform: "translateY(0px)", offset: 1 },
      ],
      // Pulse scale
      [
        { transform: "scale(1)", offset: 0 },
        { transform: "scale(1.04)", offset: 0.25 },
        { transform: "scale(0.98)", offset: 0.5 },
        { transform: "scale(1.02)", offset: 0.75 },
        { transform: "scale(1)", offset: 1 },
      ],
    ];

    secondary.forEach((el, i) => {
      const keyframes = secondaryAnimations[i % secondaryAnimations.length];
      const delay = (characters.length + i) * 100;

      el.animate(keyframes, {
        duration: 3500,
        delay,
        easing: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        fill: "forwards",
      });
    });
  }, []);

  // Intersection observer for viewport trigger
  useEffect(() => {
    if (!svgContent || !containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate();
            observer.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [svgContent, animate]);

  // Fallback to <img> if SVG has no content
  if (!svgContent) {
    return <img src={src} alt={alt} className={className} />;
  }

  return (
    <div
      ref={containerRef}
      className={className}
      role="img"
      aria-label={alt}
      dangerouslySetInnerHTML={{ __html: svgContent }}
    />
  );
}
