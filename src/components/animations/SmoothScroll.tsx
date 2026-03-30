"use client";

import { ReactNode, useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    // Register GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
      orientation: "vertical", 
      gestureOrientation: "vertical", 
      smoothWheel: true, 
      wheelMultiplier: 1, 
      touchMultiplier: 2, 
    });

    // Update ScrollTrigger on every scroll
    lenis.on("scroll", ScrollTrigger.update);

    // Provide Lenis to GSAP ticker
    const gsapTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(gsapTicker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      // Clean up on component unmount
      gsap.ticker.remove(gsapTicker);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
