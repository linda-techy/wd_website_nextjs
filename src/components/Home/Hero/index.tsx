"use client";

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useParallax } from '@/components/animations/hooks/useParallax';

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

  useParallax(imageRef, 0.15); // slow vertical parallax on the image

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    // Stagger fade up text elements
    if (textRef.current) {
      tl.fromTo(
        Array.from(textRef.current.children),
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, stagger: 0.15, delay: 0.1 }
      );
    }

    // Image slides in slightly and fades
    if (imageRef.current) {
      gsap.fromTo(
        imageRef.current,
        { scale: 1.05, opacity: 0, x: 40 },
        { scale: 1, opacity: 1, x: 0, duration: 1.8, ease: "power3.out", delay: 0.3 }
      );
    }

    // Bottom features fade up
    if (featuresRef.current) {
      gsap.fromTo(
        featuresRef.current.children,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: featuresRef.current,
            start: "top 95%",
          },
        }
      );
    }
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="!py-0">
      <div className="bg-gradient-to-b from-skyblue via-lightskyblue dark:via-[#4298b0] to-white/10 dark:to-black/10 overflow-hidden relative">
        <div className="container max-w-8xl mx-auto px-4 sm:px-5 2xl:px-0 pt-24 sm:pt-32 md:pt-48 lg:pt-60 md:pb-68">
          <div ref={textRef} className="relative text-white dark:text-dark text-center md:text-start z-10">
            <p className="text-inherit text-lg md:text-xl font-semibold mb-2">
              {/* Palm springs, CA */}
              Kerala, India
            </p>
            <h1 className="text-inherit text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight md:max-w-45p mt-4 mb-6 leading-tight">
              {/* Futuristic Haven */}
              Your dream home starts here.
            </h1>
            <div className="flex flex-col xs:flex-row justify-center md:justify-start gap-4">
              <Link
                href="/contactus"
                className="px-8 py-4 border border-white dark:border-dark bg-white dark:bg-dark text-dark dark:text-white duration-300 dark:hover:text-dark hover:bg-transparent hover:text-white text-base font-semibold rounded-full hover:cursor-pointer"
                title="Contact Walldot Builders for home construction in Kerala"
              >
                Get in touch
              </Link>
              <Link
                href="/brochure"
                className="px-8 py-4 border border-white dark:border-dark bg-transparent text-white dark:text-dark hover:bg-white dark:hover:bg-dark dark:hover:text-white hover:text-dark duration-300 text-base font-semibold rounded-full hover:cursor-pointer"
                title="Download Walldot Builders company brochure"
              >
                Brochure
              </Link>
            </div>
          </div>
          <div ref={imageRef} className="hidden md:block absolute top-10 right-0 bottom-10 w-1/2 z-0 origin-right">
            <Image
              src={"/images/hero/modern-kerala-home.png"}
              alt="Modern Kerala Home"
              fill
              priority
              quality={85}
              className="object-cover rounded-l-[50px]"
            />
          </div>
        </div>
        <div className="md:absolute bottom-0 md:-right-68 xl:right-0 bg-white dark:bg-black py-12 px-8 mobile:px-16 md:pl-16 md:pr-[295px] rounded-2xl md:rounded-none md:rounded-tl-2xl mt-24">
          <div ref={featuresRef} className="grid grid-cols-2 sm:grid-cols-4 md:flex gap-8 sm:gap-12 md:gap-16 lg:gap-20 sm:text-center dark:text-white text-black">
            <div className="flex flex-col sm:items-center gap-3">
              <Image
                src={"/images/hero/floor-plan.svg"}
                alt="Floor plan icon"
                width={32}
                height={32}
                className="block dark:hidden"
              />
              <Image
                src={"/images/hero/floor-plan.svg"}
                alt="Floor plan icon"
                width={32}
                height={32}
                className="hidden dark:block"
              />
              <p className="text-base md:text-lg font-semibold text-inherit">
                Plan Your Dream
              </p>
              <p className="text-sm md:text-base font-normal text-black/60 dark:text-white/60 leading-relaxed">
                Personalized floor plans & vastu-compliant designs
              </p>
            </div>
            <div className="flex flex-col sm:items-center gap-3">
              <Image
                src={"/images/hero/brickwall.svg"}
                alt="Brick wall icon"
                width={32}
                height={32}
                className="block dark:hidden"
              />
              <Image
                src={"/images/hero/brickwall.svg"}
                alt="Brick wall icon"
                width={32}
                height={32}
                className="hidden dark:block"
              />
              <p className="text-base md:text-lg font-semibold text-inherit">
                Build on Strength
              </p>
              <p className="text-sm md:text-base font-normal text-black/60 dark:text-white/60 leading-relaxed">
                Solid foundation & quality construction from the ground up
              </p>
            </div>
            <div className="flex flex-col sm:items-center gap-3">
              <Image
                src={"/images/hero/roof.svg"}
                alt="Roof icon"
                width={32}
                height={32}
                className="block dark:hidden"
              />
              <Image
                src={"/images/hero/roof.svg"}
                alt="Roof icon"
                width={32}
                height={32}
                className="hidden dark:block"
              />
              <p className="text-base md:text-lg font-semibold text-inherit">
                Beautiful Roofs
              </p>
              <p className="text-sm md:text-base font-normal text-black/60 dark:text-white/60 leading-relaxed">
                Crafted to Withstand Climate, Reflecting Heritage
              </p>
            </div>
            <div className="flex flex-col sm:items-center gap-3">
              <Image
                src={"/images/hero/livingroom.svg"}
                alt="Living room icon"
                width={32}
                height={32}
                className="block dark:hidden"
              />
              <p className="text-base md:text-lg font-semibold text-inherit">
                Finish with Care
              </p>
              <p className="text-sm md:text-base font-normal text-black/60 dark:text-white/60 leading-relaxed">
                Elegant interiors, lasting quality & thoughtful details
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero
