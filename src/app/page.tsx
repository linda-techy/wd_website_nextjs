import dynamic from 'next/dynamic'
import Hero from '@/components/Home/Hero'
import { homeRelatedLinks } from '@/components/shared/RelatedLinks'

// Eagerly load Hero (LCP — above the fold)
// Lazy-load everything below the fold to reduce initial JS bundle
const About = dynamic(() => import('@/components/Home/About'))
const Projects = dynamic(() => import('@/components/Home/Projects'))
const Testimonial = dynamic(() => import('@/components/Home/Testimonial'))
const GetInTouch = dynamic(() => import('@/components/Home/GetInTouch'))
const FAQ = dynamic(() => import('@/components/Home/FAQs'))
const RelatedLinks = dynamic(() => import('@/components/shared/RelatedLinks').then(m => ({ default: m.default })))

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
