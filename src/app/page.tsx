import dynamic from 'next/dynamic'
import Hero from '@/components/Home/Hero'
import { homeRelatedLinks } from '@/components/shared/RelatedLinks'

// Eagerly load Hero (LCP — above the fold)
// Lazy-load everything below the fold to reduce initial JS bundle
const About = dynamic(() => import('@/components/Home/About'), { ssr: true })
const Projects = dynamic(() => import('@/components/Home/Projects'), { 
  loading: () => <div className="min-h-[800px] w-full animate-pulse bg-gray-50 dark:bg-zinc-900" /> 
})
const Testimonial = dynamic(() => import('@/components/Home/Testimonial'), { ssr: true })
const GetInTouch = dynamic(() => import('@/components/Home/GetInTouch'), { ssr: true })
const FAQ = dynamic(() => import('@/components/Home/FAQs'), { ssr: true })
const RelatedLinks = dynamic(() => import('@/components/shared/RelatedLinks').then(m => ({ default: m.default })), { ssr: true })

export default function Home() {
  return (
    <main className="no-global-gsap">
      <Hero />
      <About />
      <Projects />
      <Testimonial />
      <GetInTouch />
      <FAQ />
      <RelatedLinks
        title="Explore Our Services & Resources"
        links={homeRelatedLinks}
      />
    </main>
  )
}
