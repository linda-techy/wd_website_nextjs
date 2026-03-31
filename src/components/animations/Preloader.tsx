"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useState, useEffect } from "react";

export default function Preloader() {
    const containerRef = useRef<HTMLDivElement>(null);
    const logoRef = useRef<HTMLImageElement>(null);
    const [hasRan, setHasRan] = useState(false);

    useEffect(() => {
        // Check session storage so this only ruins DX/UX once per browser tab visit!
        if (sessionStorage.getItem("preloader_done")) {
            setHasRan(true);
        } else {
            sessionStorage.setItem("preloader_done", "true");
        }
    }, []);

    useGSAP(() => {
        if (hasRan || !containerRef.current || !logoRef.current) return;

        // Force user to wait out the cinematic intro
        document.body.style.overflow = "hidden";

        const tl = gsap.timeline({
            onComplete: () => {
                document.body.style.overflow = "auto";
                setHasRan(true);
            }
        });

        // 1. Sleek Logo Reveal
        tl.fromTo(logoRef.current, 
            { opacity: 0, scale: 0.9 },
            { opacity: 1, scale: 1, duration: 1, ease: "expo.out", delay: 0.2 }
        )
        // 2. Dissolve and push in
        .to(logoRef.current, {
            opacity: 0, scale: 1.1, duration: 0.6, ease: "power2.inOut", delay: 0.5
        })
        // 3. Cinematic Curtain slide-up
        .to(containerRef.current, {
            yPercent: -100,
            duration: 1,
            ease: "expo.inOut",
        });

    }, { scope: containerRef, dependencies: [hasRan] });

    // Instantly remove from DOM once completed to free memory
    if (hasRan) return null;

    return (
        <div ref={containerRef} className="fixed inset-0 z-[10000] flex items-center justify-center bg-black">
            <img 
                ref={logoRef}
                src="/images/header/logo-original.svg" 
                alt="Walldot Builders" 
                // Filters force full color SVGs directly into pure white for dark screens
                className="w-48 md:w-64 opacity-0 brightness-0 invert" 
            />
        </div>
    );
}
