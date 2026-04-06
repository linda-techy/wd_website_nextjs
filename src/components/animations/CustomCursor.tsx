"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { usePathname } from "next/navigation";

export default function CustomCursor() {
    const cursorRef = useRef<HTMLDivElement>(null);
    const pathname = usePathname();
    const [isHovering, setIsHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Disable on touch devices to prevent mobile bugs and performance overhead
        if (window.matchMedia("(pointer: coarse)").matches) return;
        setIsVisible(true);

        const cursor = cursorRef.current;
        if (!cursor) return;

        // Center immediately to prevent janky start
        gsap.set(cursor, { xPercent: -50, yPercent: -50 });

        // Extremely performant quickSetters bypassing React state
        // Shorter duration keeps cursor tightly synced to pointer movement.
        const xTo = gsap.quickTo(cursor, "x", { duration: 0.08, ease: "power2.out" });
        const yTo = gsap.quickTo(cursor, "y", { duration: 0.08, ease: "power2.out" });

        const onMouseMove = (e: MouseEvent) => {
            xTo(e.clientX);
            yTo(e.clientY);
        };

        const onMouseEnter = () => setIsHovering(true);
        const onMouseLeave = () => setIsHovering(false);

        window.addEventListener("mousemove", onMouseMove);

        // Bind luxury hover morphing to generic interactive DOM elements
        const interactives = document.querySelectorAll('a, button, input, [role="button"], summary, .print-card');
        interactives.forEach((el) => {
            el.addEventListener("mouseenter", onMouseEnter);
            el.addEventListener("mouseleave", onMouseLeave);
        });

        // Hide OS cursor globally cleanly
        document.body.style.cursor = "none";
        
        // Ensure interactive elements override with none
        interactives.forEach((el) => {
            (el as HTMLElement).style.cursor = "none";
        });

        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            interactives.forEach((el) => {
                el.removeEventListener("mouseenter", onMouseEnter);
                el.removeEventListener("mouseleave", onMouseLeave);
            });
            document.body.style.cursor = "auto";
        };
    }, [pathname]);

    if (!isVisible) return null;

    return (
        <div
            ref={cursorRef}
            className={`pointer-events-none fixed top-0 left-0 z-[9999] rounded-full mix-blend-difference transition-all duration-300 ease-out flex items-center justify-center
            ${isHovering 
                ? 'w-16 h-16 bg-white/10 backdrop-blur-sm border border-white/50' 
                : 'w-4 h-4 bg-white'
            }`}
        />
    );
}
