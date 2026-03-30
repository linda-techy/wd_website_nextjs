"use client";

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePathname } from 'next/navigation';

export default function GlobalScrollAnimator({ children }: { children: React.ReactNode }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const pathname = usePathname();

    useGSAP(() => {
        gsap.registerPlugin(ScrollTrigger);

        if (!containerRef.current) return;

        // Give React a tick to mount children
        const ctx = gsap.context(() => {
            // Master exclusion selector logic
            const shouldAnimate = (el: Element) => {
                // Ignore elements that explicitly opt-out or are inside an opted-out container
                if (el.closest('.no-global-gsap')) return false;
                // Ignore empty elements or those with no visible text content (if it's a heading/p)
                if (el.tagName.match(/H[1-6]|P/) && !el.textContent?.trim()) return false;
                return true;
            };

            const mm = gsap.matchMedia();

            mm.add("(min-width: 1px)", () => {
                // 1. Fade up Headings (h1, h2, h3)
                const headings = Array.from(containerRef.current!.querySelectorAll('h1, h2, h3')).filter(shouldAnimate);
                if (headings.length > 0) {
                    headings.forEach((heading) => {
                        gsap.fromTo(heading, 
                            { y: 30, opacity: 0 },
                            {
                                y: 0, opacity: 1, duration: 1.2, ease: "expo.out",
                                scrollTrigger: {
                                    trigger: heading,
                                    start: "top 90%",
                                }
                            }
                        );
                    });
                }

                // 2. Fade up Paragraphs slightly after headings
                const paragraphs = Array.from(containerRef.current!.querySelectorAll('p:not(.text-xs)')).filter(shouldAnimate);
                if (paragraphs.length > 0) {
                    paragraphs.forEach((p) => {
                        gsap.fromTo(p,
                            { y: 20, opacity: 0 },
                            {
                                y: 0, opacity: 1, duration: 1, ease: "power3.out",
                                scrollTrigger: {
                                    trigger: p,
                                    start: "top 90%",
                                }
                            }
                        );
                    });
                }

                // 3. Grid Children / Cards (Staggered luxury scale up)
                const cards = Array.from(containerRef.current!.querySelectorAll('.grid > div, .card, [class*="border border-"]')).filter(shouldAnimate);
                
                // Group cards by their parent grid to stagger them properly
                const parentGrids = new Set(cards.map(c => c.parentElement).filter(Boolean));
                
                parentGrids.forEach(grid => {
                    const childrenToAnimate = Array.from(grid!.children).filter(c => cards.includes(c));
                    if (childrenToAnimate.length > 0) {
                        gsap.fromTo(childrenToAnimate,
                            { y: 40, opacity: 0, scale: 0.98 },
                            {
                                y: 0, opacity: 1, scale: 1, duration: 1.2, stagger: 0.1, ease: "expo.out",
                                scrollTrigger: {
                                    trigger: grid,
                                    start: "top 85%",
                                }
                            }
                        );
                    }
                });

                // 4. Standalone Images (Clip-path reveal)
                const images = Array.from(containerRef.current!.querySelectorAll('img:not([alt=""])')).filter(shouldAnimate);
                images.forEach((img) => {
                    // Make sure it doesn't already have a generic class or isn't inside a grid
                    if (!img.closest('.grid')) {
                        gsap.fromTo(img.parentElement || img,
                            { clipPath: "inset(10% 10% 10% 10%)", scale: 1.05, opacity: 0 },
                            {
                                clipPath: "inset(0% 0% 0% 0%)", scale: 1, opacity: 1, duration: 1.5, ease: "expo.out",
                                scrollTrigger: {
                                    trigger: img,
                                    start: "top 85%",
                                }
                            }
                        );
                    }
                });
            });
        });

        // Cleanup on route change
        return () => {
            ctx.revert();
            ScrollTrigger.killAll(); // Ensure deeply nested triggers tied to old route unmount safely
        };
    }, [pathname]); // Re-trigger heavy scrape when Next.js route changes

    return <div ref={containerRef} className="global-animator-root">{children}</div>;
}
