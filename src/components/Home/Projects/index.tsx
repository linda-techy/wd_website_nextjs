"use client";

import { useRef } from 'react';
import { Icon } from '@iconify/react'
import PropertyCard from './Card/Card'
import { propertyHomes } from '@/app/api/propertyhomes'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const Projects: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    let mm = gsap.matchMedia();

    // Desktop: Horizontal Pin
    mm.add("(min-width: 1024px)", () => {
      if (scrollWrapperRef.current && horizontalRef.current) {
        
        // Calculate the translation width: total width of the track minus the viewport width
        // Wait, for padding consistency, we add a little extra space.
        const totalWidth = horizontalRef.current.scrollWidth;
        const viewportWidth = window.innerWidth;
        
        gsap.to(horizontalRef.current, {
          x: () => -(totalWidth - viewportWidth + 100), // extra padding to clear right side
          ease: "none",
          scrollTrigger: {
            trigger: scrollWrapperRef.current,
            start: "top top",
            end: () => `+=${totalWidth}`,
            pin: true,
            scrub: 1, // smooth dragging 
            invalidateOnRefresh: true,
          }
        });
      }
    });

    // Mobile/Tablet: Vertical stagger fade-up
    mm.add("(max-width: 1023px)", () => {
       if (horizontalRef.current) {
          gsap.fromTo(horizontalRef.current.children, 
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, stagger: 0.1, duration: 1, ease: 'power3.out',
              scrollTrigger: {
                trigger: scrollWrapperRef.current,
                start: "top 80%",
              }
            }
          );
       }
    });

    return () => mm.revert();
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="overflow-hidden">
      <div ref={scrollWrapperRef} className="lg:h-screen flex flex-col justify-center py-10 lg:py-0">
        <div className='container max-w-8xl mx-auto px-4 sm:px-5 2xl:px-0'>
        <div className='mb-8 sm:mb-10 md:mb-12 flex flex-col gap-2 sm:gap-3'>
          <div className='flex gap-2 items-center justify-center mb-1'>
            <span>
              <Icon
                icon={'ph:house-simple-fill'}
                width={20}
                height={20}
                className='text-primary md:w-6 md:h-6'
              />
            </span>
            <p className='text-sm md:text-base lg:text-lg font-semibold text-dark/75 dark:text-white/75'>
              Projects
            </p>
          </div>
          <h2 className='text-2xl sm:text-3xl md:text-40 lg:text-52 font-bold text-black dark:text-white text-center tracking-tight leading-tight'>
            Explore signature-crafted projects.
          </h2>
          <p className='text-base sm:text-lg md:text-xl font-normal text-black/70 dark:text-white/70 text-center leading-relaxed'>
            Where Ideas Rise into Iconic Structures.
          </p>
        </div>
        {/* Horizontal track container */}
        <div className='mt-8 lg:mt-12 w-full pl-0 lg:pl-[max(1rem,calc((100vw-88rem)/2))] overflow-hidden'>
          <div ref={horizontalRef} className='grid grid-cols-1 md:grid-cols-2 lg:flex lg:flex-nowrap gap-4 sm:gap-5 md:gap-6 lg:gap-8 px-4 sm:px-5 lg:px-0 lg:w-max pb-4 lg:pr-32'>
            {propertyHomes.slice(0, 6).map((item, index) => (
              <div key={index} className='lg:w-[400px] xl:w-[480px] shrink-0'>
                <PropertyCard item={item} />
              </div>
            ))}
          </div>
        </div>
      </div>
      </div>
    </section>
  )
}

export default Projects
