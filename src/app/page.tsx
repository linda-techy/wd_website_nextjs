import FeaturedProperty from '@/components/Home/FeaturedProperty'
import Hero from '@/components/Home/Hero'
import Properties from '@/components/Home/Properties'
import About from '@/components/Home/About'
import Projects from '@/components/Home/Projects'
import Services from '@/components/Home/Services'
import Testimonial from '@/components/Home/Testimonial'
import BlogSmall from '@/components/shared/Blog'
import GetInTouch from '@/components/Home/GetInTouch'
import FAQ from '@/components/Home/FAQs'
import RelatedLinks, { homeRelatedLinks } from '@/components/shared/RelatedLinks'

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      {/* <Services /> */}
      <Projects />
      {/* <Properties /> */}
      {/* <FeaturedProperty /> */}
      <Testimonial />
      {/* <BlogSmall /> */}
      <GetInTouch />
      <FAQ />
      <RelatedLinks 
        title="Explore Our Services & Resources" 
        links={homeRelatedLinks} 
      />
    </main>
  )
}
