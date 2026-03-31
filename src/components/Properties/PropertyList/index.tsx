'use client';
import PropertyCard from '@/components/Home/Properties/Card/Card'
import { propertyHomes } from '@/app/api/propertyhomes'
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const PropertiesListing: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const cards = containerRef.current?.querySelectorAll('.property-card-wrapper');
    if (cards && cards.length > 0) {
      gsap.fromTo(cards, 
        { y: 60, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "expo.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
          }
        }
      );
    }
  }, { scope: containerRef });

  return (
    <section className='pt-0!' ref={containerRef}>
      <div className='container max-w-8xl mx-auto px-4 sm:px-5 2xl:px-0'>
        <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 md:gap-6'>
          {propertyHomes.map((item, index) => (
            <div key={index} className='property-card-wrapper opacity-0'>
              <PropertyCard item={item} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PropertiesListing
