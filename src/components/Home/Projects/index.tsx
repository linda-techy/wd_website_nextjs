import { Icon } from '@iconify/react'
import PropertyCard from './Card/Card'
import { propertyHomes } from '@/app/api/propertyhomes'

const Projects: React.FC = () => {
  return (
    <section>
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
        <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 md:gap-6'>
          {propertyHomes.slice(0, 6).map((item, index) => (
            <div key={index} className=''>
              <PropertyCard item={item} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
