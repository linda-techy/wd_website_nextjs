import Link from 'next/link';
import { Icon } from '@iconify/react';

interface RelatedLink {
  label: string;
  href: string;
  description: string;
  icon: string;
}

interface RelatedLinksProps {
  title?: string;
  links: RelatedLink[];
}

export default function RelatedLinks({ 
  title = "Related Pages", 
  links 
}: RelatedLinksProps) {
  return (
    <section className="bg-gray-50 dark:bg-gray-900/50">
      <div className="container max-w-8xl mx-auto px-4 sm:px-5 2xl:px-0">
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {title}
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Explore more services and resources
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {links.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className="group p-6 bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:border-primary hover:shadow-lg transition-all duration-300"
              title={link.description}
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:scale-110 transition-all">
                  <Icon 
                    icon={link.icon} 
                    width={24} 
                    height={24} 
                    className="text-primary group-hover:text-white transition-colors" 
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors">
                    {link.label}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                    {link.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

// Pre-defined link sets for common pages
export const homeRelatedLinks: RelatedLink[] = [
  {
    label: "Residential Homes",
    href: "/residential-homes",
    description: "Custom home construction with expert craftsmanship in Kerala",
    icon: "ph:house-fill"
  },
  {
    label: "Luxury Villas",
    href: "/luxury-villa",
    description: "Premium villa construction with modern amenities",
    icon: "ph:buildings-fill"
  },
  {
    label: "Home Cost Calculator",
    href: "/tools/home-cost-calculator",
    description: "Calculate your construction cost instantly with our free tool",
    icon: "ph:calculator-fill"
  },
  {
    label: "AI Interior Designer",
    href: "/tools/ai-interior-designer-360",
    description: "Design your interiors with AI-powered 360° visualization",
    icon: "ph:magic-wand-fill"
  },
  {
    label: "About Walldot Builders",
    href: "/aboutus",
    description: "Learn about Kerala's trusted construction company",
    icon: "ph:info-fill"
  },
  {
    label: "Partnership Program",
    href: "/partnerships",
    description: "Grow your business by partnering with us",
    icon: "ph:handshake-fill"
  },
  {
    label: "Refer a Friend",
    href: "/referrals",
    description: "Help friends build their dream homes and earn rewards",
    icon: "ph:gift-fill"
  },
  {
    label: "Contact Us",
    href: "/contactus",
    description: "Get in touch for free consultation and site visit",
    icon: "ph:phone-fill"
  },
];

export const servicesRelatedLinks: RelatedLink[] = [
  {
    label: "Residential Construction",
    href: "/residential-homes",
    description: "Build your dream home with quality construction",
    icon: "ph:house-fill"
  },
  {
    label: "Luxury Villa Projects",
    href: "/luxury-villa",
    description: "Premium villas with modern architecture",
    icon: "ph:buildings-fill"
  },
  {
    label: "Apartment Buildings",
    href: "/appartment",
    description: "Multi-story apartment construction services",
    icon: "ph:building-apartment-fill"
  },
  {
    label: "Office Spaces",
    href: "/office-spaces",
    description: "Commercial construction and office spaces",
    icon: "ph:briefcase-fill"
  },
];

export const toolsRelatedLinks: RelatedLink[] = [
  {
    label: "Home Cost Calculator",
    href: "/tools/home-cost-calculator",
    description: "Estimate your construction cost in minutes",
    icon: "ph:calculator-fill"
  },
  {
    label: "AI Interior Designer",
    href: "/tools/ai-interior-designer-360",
    description: "Visualize your interiors in 360°",
    icon: "ph:magic-wand-fill"
  },
  {
    label: "Download Brochure",
    href: "/brochure",
    description: "Get our detailed company brochure",
    icon: "ph:file-pdf-fill"
  },
  {
    label: "Contact for Consultation",
    href: "/contactus",
    description: "Free consultation and site visit",
    icon: "ph:chat-circle-dots-fill"
  },
];

