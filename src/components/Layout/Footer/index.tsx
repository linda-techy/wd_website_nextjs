import Link from "next/link";
import { Icon } from "@iconify/react"
import { FooterCompanyLinks, FooterServicesLinks, FooterToolsLinks } from "@/app/api/footerlinks";

const Footer = () => {
  return (
    <footer className="relative z-10 bg-dark">
      <div className="container mx-auto max-w-8xl pt-14 px-4 sm:px-6 lg:px-0">
        {/* <div className="flex lg:items-center justify-between items-end lg:gap-11 pb-14 border-b border-white/10 lg:flex-nowrap flex-wrap gap-6">
          <p className="text-white text-sm lg:max-w-1/5">
            Stay updated with the latest news,
            promotions, and exclusive offers.
          </p>
          <div className="flex lg:flex-row flex-col items-center lg:gap-6 gap-3">
            <div className="flex gap-2 lg:order-1 order-2">
              <input type="email" placeholder="Enter Your Email" className="rounded-full py-4 px-6 bg-white/10 placeholder:text-white text-white focus-visible:outline-0" />
              <button className="text-dark bg-white py-4 px-8 font-semibold rounded-full hover:bg-primary hover:text-white duration-300 hover:cursor-pointer">
                Subscribe
              </button>
            </div>
            <p className="text-white/40 text-sm lg:max-w-[45%] order-1 lg:order-2">
              By subscribing, you agree to receive our promotional emails. You can unsubscribe  at any time.
            </p>
          </div>
          <div className="flex items-center gap-6">
            <Link href="#">
              <Icon icon="ph:x-logo-bold" width={24} height={24} className="text-white hover:text-primary duration-300" />
            </Link>
            <Link href="#">
              <Icon icon="ph:facebook-logo-bold" width={24} height={24} className="text-white hover:text-primary duration-300" />
            </Link>
            <Link href="#">
              <Icon icon="ph:instagram-logo-bold" width={24} height={24} className="text-white hover:text-primary duration-300" />
            </Link>
          </div>
        </div> */}
        <div className="py-10 sm:py-12 md:py-14 border-b border-white/10">
          <div className="grid grid-cols-12 lg:gap-8 gap-y-6 sm:gap-y-8">
            {/* CTA Section */}
            <div className="lg:col-span-5 col-span-12">
              <h2 className="text-white leading-tight tracking-tight text-3xl md:text-40 font-bold mb-6">
               Let&apos;s build your dream space together
              </h2>
              <Link href="/contactus" className="bg-primary text-base md:text-lg font-semibold py-4 px-8 rounded-full text-white hover:bg-white hover:text-dark duration-300 hover:cursor-pointer inline-block">
                Get In Touch
              </Link>
              <div className="mt-8 pt-8 border-t border-white/10">
                <p className="text-white/60 text-sm md:text-base mb-3 font-medium">Contact Information</p>
                <Link href="mailto:info@walldotbuilders.com" className="text-white text-base md:text-lg hover:text-primary flex items-center gap-2 mb-2 leading-relaxed">
                  <Icon icon="ph:envelope-fill" width={20} height={20} />
                  info@walldotbuilders.com
                </Link>
                <Link href="tel:+919074954874" className="text-white text-base md:text-lg hover:text-primary flex items-center gap-2 leading-relaxed">
                  <Icon icon="ph:phone-fill" width={20} height={20} />
                  +91-9074-9548-74
                </Link>
              </div>
            </div>

            {/* Company Links */}
            <div className="lg:col-span-2 sm:col-span-4 col-span-6">
              <h3 className="text-white text-lg md:text-xl font-semibold mb-4">Company</h3>
              <div className="flex flex-col gap-3">
                {FooterCompanyLinks.map((item, index) => (
                  <Link key={index} href={item.href} className="text-white/70 text-base hover:text-primary hover:pl-2 transition-all duration-200">
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Services Links */}
            <div className="lg:col-span-3 sm:col-span-4 col-span-6">
              <h3 className="text-white text-lg md:text-xl font-semibold mb-4">Our Services</h3>
              <div className="flex flex-col gap-3">
                {FooterServicesLinks.map((item, index) => (
                  <Link key={index} href={item.href} className="text-white/70 text-base hover:text-primary hover:pl-2 transition-all duration-200">
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Tools & Resources Links */}
            <div className="lg:col-span-2 sm:col-span-4 col-span-6">
              <h3 className="text-white text-lg md:text-xl font-semibold mb-4">Resources</h3>
              <div className="flex flex-col gap-3">
                {FooterToolsLinks.map((item, index) => (
                  <Link key={index} href={item.href} className="text-white/70 text-base hover:text-primary hover:pl-2 transition-all duration-200">
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-between md:flex-nowrap flex-wrap items-center py-6 gap-6">
          <p className="text-white/60 text-sm md:text-base">
            ©2025 Walldot Builders LLP
          </p>
          {/* <div className="flex gap-8 items-center">
            <Link href="#" className="text-white/40 hover:text-primary text-sm">
              Terms of service
            </Link>
            <Link href="#" className="text-white/40 hover:text-primary text-sm">
              Privacy policy
            </Link>
          </div> */}
        </div>
      </div>
    </footer >
  );
};

export default Footer;