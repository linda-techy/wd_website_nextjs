"use client";

import { RefObject } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger early
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * A hook for simple fade-in and slide-up animations on scroll.
 */
export const useFadeInOnScroll = (
  ref: RefObject<HTMLElement | null>,
  options?: gsap.TweenVars
) => {
  useGSAP(
    () => {
      if (!ref.current) return;

      gsap.from(ref.current, {
        y: 40,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        ...options, // Allow overriding defaults
      });
    },
    { scope: ref }
  );
};

export const useStaggerFadeInOnScroll = (
  containerRef: RefObject<HTMLElement | null>,
  selector: string,
  options?: gsap.TweenVars
) => {
  useGSAP(
    () => {
      if (!containerRef.current) return;

      const elements = gsap.utils.toArray(
        containerRef.current.querySelectorAll(selector)
      );
      if (elements.length === 0) return;

      gsap.from(elements, {
        y: 50,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        ...options,
      });
    },
    { scope: containerRef }
  );
};
