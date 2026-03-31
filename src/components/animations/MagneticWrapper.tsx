"use client";

import React, { useRef, MouseEvent } from "react";
import gsap from "gsap";

interface MagneticProps {
    children: React.ReactElement;
    intensity?: number;
    className?: string; // Optional tight coupling styles
}

export default function MagneticWrapper({ children, intensity = 40, className = "inline-block" }: MagneticProps) {
    const ref = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        const boundingRect = ref.current?.getBoundingClientRect();
        if (!boundingRect) return;

        const { width, height, left, top } = boundingRect;
        const { clientX, clientY } = e;

        // Raw distance relative to exact DOM center of button
        const xPercent = (clientX - (left + width / 2)) / (width / 2);
        const yPercent = (clientY - (top + height / 2)) / (height / 2);

        // Subtly tug button towards mouse location seamlessly using QuickTo style tweens
        gsap.to(ref.current, {
            x: xPercent * intensity,
            y: yPercent * intensity,
            duration: 0.6,
            ease: "power3.out",
        });
    };

    const handleMouseLeave = () => {
        // The famous "elastic snap back" to center when mouse separates!
        gsap.to(ref.current, {
            x: 0,
            y: 0,
            duration: 0.7,
            ease: "elastic.out(1.2, 0.4)", 
        });
    };

    return (
        <div 
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={className} 
            style={{ cursor: "pointer" }}
        >
            {children}
        </div>
    );
}
