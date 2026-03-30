"use client";

import { RefObject } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * A hook to add parallax scrolling effects to an element based on scroll position.
 */
export const useParallax = (
  ref: RefObject<HTMLElement | null>,
  speed: number = 0.5,
  options?: gsap.TweenVars
) => {
  useGSAP(
    () => {
      if (!ref.current) return;

      // Calculate the y movement based on the speed factor.
      // E.g. speed = 1 means it moves 100% of the viewport height. 
      // Negative speed makes it move faster than scrolling, positive makes it slower.
      const yMovement = speed * 100;

      gsap.to(ref.current, {
        yPercent: yMovement,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top bottom", // Starts when top of element hits bottom of viewport
          end: "bottom top",   // Ends when bottom of element hits top of viewport
          scrub: true,         // Links animation directly to scrollbar
        },
        ...options,
      });
    },
    { scope: ref }
  );
};
