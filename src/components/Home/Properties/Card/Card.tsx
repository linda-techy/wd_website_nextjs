import { PropertyHomes } from '@/types/properyHomes'
import { Icon } from '@iconify/react'
import Image from 'next/image'
import Link from 'next/link'

const PropertyCard: React.FC<{ item: PropertyHomes }> = ({ item }) => {
  const { name, location, rate, beds, baths, area, slug, images } = item

  const mainImage = images[0]?.src;

  return (
    <div>
      <div className='relative rounded-2xl border border-dark/10 dark:border-white/10 group hover:shadow-3xl duration-300 dark:hover:shadow-white/20'>
        <div className='overflow-hidden rounded-t-2xl'>
          <Link href={`/properties/${slug}`}>
            {mainImage && (
              <Image
                src={mainImage}
                alt={name}
                width={440}
                height={300}
                className='w-full rounded-t-2xl group-hover:brightness-50 group-hover:scale-125 transition duration-300 delay-75'
                unoptimized={true}
              />
            )}
          </Link>
          <div className='absolute top-6 right-6 p-4 bg-white rounded-full hidden group-hover:block'>
            <Icon
              icon={'solar:arrow-right-linear'}
              width={24}
              height={24}
              className='text-black'
            />
          </div>
        </div>
        <div className='p-3 sm:p-4'>
          <div className='flex flex-col mobile:flex-row gap-2 mobile:gap-0 justify-between mb-3'>
            <div>
              <Link href={`/properties/${slug}`}>
                <h3 className='text-lg sm:text-xl md:text-2xl font-medium text-black dark:text-white duration-300 group-hover:text-primary leading-tight'>
                  {name}
                </h3>
              </Link>
              <p className='text-sm sm:text-base font-normal text-black/70 dark:text-white/70 mt-1'>
                {location}
              </p>
            </div>
            <div className='self-start'>
              <button className='text-xs sm:text-sm font-normal text-primary px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-primary/10 whitespace-nowrap'>
                ${rate}
              </button>
            </div>
          </div>
          <div className='flex gap-1 sm:gap-0 pt-2 border-t border-black/10 dark:border-white/10'>
            <div className='flex flex-col gap-1 border-e border-black/10 dark:border-white/20 pr-2 sm:pr-3 flex-1'>
              <Icon icon={'solar:bed-linear'} width={20} height={20} className='sm:w-5 sm:h-5' />
              <p className='text-xs sm:text-sm font-normal text-black dark:text-white leading-tight'>
                {beds} Beds
              </p>
            </div>
            <div className='flex flex-col gap-1 border-e border-black/10 dark:border-white/20 px-2 sm:px-3 flex-1'>
              <Icon icon={'solar:bath-linear'} width={20} height={20} className='sm:w-5 sm:h-5' />
              <p className='text-xs sm:text-sm font-normal text-black dark:text-white leading-tight'>
                {baths} Baths
              </p>
            </div>
            <div className='flex flex-col gap-1 pl-2 sm:pl-3 flex-1'>
              <Icon
                icon={'lineicons:arrow-all-direction'}
                width={20}
                height={20}
                className='sm:w-5 sm:h-5'
              />
              <p className='text-xs sm:text-sm font-normal text-black dark:text-white leading-tight'>
                {area}m<sup>2</sup>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PropertyCard
