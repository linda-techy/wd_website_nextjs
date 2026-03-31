"use client";

import { useRef } from "react";
import Image from "next/image";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const About = () => {
  const containerRef = useRef<HTMLElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Text entrance
    if (textContainerRef.current) {
      gsap.fromTo(
        textContainerRef.current.children,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: textContainerRef.current,
            start: "top 80%",
          },
        }
      );
    }

    // Image clip-path reveal
    if (imageContainerRef.current) {
      gsap.fromTo(
        imageContainerRef.current,
        { clipPath: "inset(20% 20% 20% 20%)", scale: 1.05 },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          scale: 1,
          duration: 1.5,
          ease: "power4.out",
          scrollTrigger: {
            trigger: imageContainerRef.current,
            start: "top 85%",
          },
        }
      );
    }
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative overflow-hidden">
      {/* Background Vector - Mobile Optimized */}
      <div className="absolute left-0 top-0 w-full h-full">
        <Image
          src="/images/categories/Vector.svg"
          alt="vector"
          fill
          className="object-cover dark:hidden"
          quality={75}
        />
        <Image
          src="/images/categories/Vector-dark.svg"
          alt="vector"
          fill
          className="object-cover hidden dark:block"
          quality={75}
        />
      </div>

      <div className="container mx-auto px-4 xs:px-5 sm:px-6 lg:px-8 max-w-7xl 2xl:max-w-8xl relative z-10">
        <div className="grid grid-cols-12 items-center gap-y-6 gap-x-4 sm:gap-5 md:gap-6">
          {/* Text Content - Mobile First */}
          <div ref={textContainerRef} className="col-span-12 lg:col-span-6 order-2 lg:order-1">
            <p className="text-dark/75 dark:text-white/75 text-base md:text-lg font-semibold flex items-center gap-2 mb-3">
              <Icon icon="ph:house-simple-fill" className="text-2xl text-primary" />
              About us
            </p>
            <h2 className="text-3xl xs:text-4xl sm:text-5xl lg:text-52 mt-2 mb-4 font-bold leading-tight tracking-tight text-dark dark:text-white">
              Crafting Homes with Trust.
            </h2>
            <p className="text-dark/70 dark:text-white/70 text-base md:text-lg leading-relaxed max-w-full mb-4">
              We understand that a home is more than just a residence; it&apos;s a personal sanctuary, a legacy, and a place where memories are made. As one of the top <Link href="/residential-homes" className="text-primary hover:underline font-semibold">construction companies in Thrissur</Link>, we are committed to delivering not only homes but also value and satisfaction to our clients.
            </p>
            <p className="text-dark/70 dark:text-white/70 text-base md:text-lg leading-relaxed max-w-full">
              From <Link href="/luxury-villa" className="text-primary hover:underline font-semibold">luxury villas</Link> to <Link href="/appartment" className="text-primary hover:underline font-semibold">modern apartments</Link> and <Link href="/office-spaces" className="text-primary hover:underline font-semibold">office spaces</Link>, we bring your vision to life with precision and care.
            </p>
            <div className="flex flex-wrap gap-3 sm:gap-4 mt-4 sm:mt-6">
              <Link
                href="/aboutus"
                className="inline-block py-2 px-5 xs:py-3 xs:px-6 sm:py-4 sm:px-8 bg-primary text-sm xs:text-base leading-4 text-white rounded-full font-semibold hover:bg-dark transition-colors duration-300"
                title="Learn more about Walldot Builders"
              >
                About us
              </Link>
              <Link
                href="/tools"
                className="inline-block py-2 px-5 xs:py-3 xs:px-6 sm:py-4 sm:px-8 bg-transparent border-2 border-primary text-sm xs:text-base leading-4 text-primary rounded-full font-semibold hover:bg-primary hover:text-white transition-colors duration-300"
                title="Explore construction tools and calculators"
              >
                Explore Tools
              </Link>
            </div>
          </div>

          {/* Image - Mobile First */}
          <div className="col-span-12 lg:col-span-6 order-1 lg:order-2 flex items-center justify-center">
            <div ref={imageContainerRef} className="relative rounded-lg lg:rounded-2xl overflow-hidden group w-full aspect-video min-h-[250px] sm:min-h-[400px]">
              <Image
                src="/images/categories/villas.jpg"
                alt="villas"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;