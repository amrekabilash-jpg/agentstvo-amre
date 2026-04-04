"use client";

import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
    const cursorRef = useRef<HTMLDivElement>(null);
    const [isHovering, setIsHovering] = useState(false);

    // Dual position states: fast inner dot + slow outer ring
    const [position, setPosition] = useState({ x: 0, y: 0 }); // Inner dot (fast)
    const [ringPosition, setRingPosition] = useState({ x: 0, y: 0 }); // Outer ring (slow)

    // Target position from mouse
    const targetPositionRef = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            targetPositionRef.current = { x: e.clientX, y: e.clientY };
        };

        const handleMouseEnter = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (
                target.tagName === "A" ||
                target.tagName === "BUTTON" ||
                target.closest("a") ||
                target.closest("button")
            ) {
                setIsHovering(true);
            }
        };

        const handleMouseLeave = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (
                target.tagName === "A" ||
                target.tagName === "BUTTON" ||
                target.closest("a") ||
                target.closest("button")
            ) {
                setIsHovering(false);
            }
        };

        window.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseenter", handleMouseEnter, true);
        document.addEventListener("mouseleave", handleMouseLeave, true);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseenter", handleMouseEnter, true);
            document.removeEventListener("mouseleave", handleMouseLeave, true);
        };
    }, []);

    // Dual RAF loop: update both dot and ring with different lerp speeds
    useEffect(() => {
        let animationFrameId: number;

        const updatePositions = () => {
            const target = targetPositionRef.current;

            // Inner dot: fast lerp (0.15)
            setPosition((prev) => {
                const dx = target.x - prev.x;
                const dy = target.y - prev.y;
                return {
                    x: prev.x + dx * 0.15,
                    y: prev.y + dy * 0.15,
                };
            });

            // Outer ring: slow lerp (0.08) for luxurious lag
            setRingPosition((prev) => {
                const dx = target.x - prev.x;
                const dy = target.y - prev.y;
                return {
                    x: prev.x + dx * 0.08,
                    y: prev.y + dy * 0.08,
                };
            });

            animationFrameId = requestAnimationFrame(updatePositions);
        };

        animationFrameId = requestAnimationFrame(updatePositions);

        return () => {
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <>
            {/* Outer ring — slower lerp, mix-blend-mode: difference */}
            <div
                className="pointer-events-none fixed z-[9999] hidden md:block"
                style={{
                    left: `${ringPosition.x}px`,
                    top: `${ringPosition.y}px`,
                    transform: "translate(-50%, -50%)",
                }}
            >
                <div
                    style={{
                        width: isHovering ? "56px" : "36px",
                        height: isHovering ? "56px" : "36px",
                        borderRadius: "50%",
                        border: "1px solid var(--accent-blue)",
                        mixBlendMode: "difference",
                        transition: "width 0.4s cubic-bezier(0,1,0.5,1), height 0.4s cubic-bezier(0,1,0.5,1)",
                        opacity: 0.7,
                    }}
                />
            </div>

            {/* Inner dot — fast lerp, solid */}
            <div
                ref={cursorRef}
                className="pointer-events-none fixed z-[9999] hidden md:block"
                style={{
                    left: `${position.x}px`,
                    top: `${position.y}px`,
                    transform: "translate(-50%, -50%)",
                }}
            >
                <div
                    style={{
                        width: isHovering ? "8px" : "6px",
                        height: isHovering ? "8px" : "6px",
                        borderRadius: "50%",
                        backgroundColor: "var(--accent-blue)",
                        transition: "width 0.2s, height 0.2s",
                    }}
                />
            </div>
        </>
    );
}
