import { footerlinks } from "@/types/footerlinks"

// Company Links
export const FooterCompanyLinks: footerlinks[] = [
    { label: 'About Us', href: '/aboutus' },
    { label: 'Partnerships', href: '/partnerships' },
    { label: 'Refer a Friend', href: '/referrals' },
    { label: 'Contact Us', href: '/contactus' },
]

// Services Links
export const FooterServicesLinks: footerlinks[] = [
    { label: 'Residential Homes', href: '/residential-homes' },
    { label: 'Luxury Villas', href: '/luxury-villa' },
    { label: 'Apartments', href: '/appartment' },
    { label: 'Office Spaces', href: '/office-spaces' },
]

// Tools & Resources Links
export const FooterToolsLinks: footerlinks[] = [
    { label: 'Tools', href: '/tools' },
    { label: 'Home Cost Calculator', href: '/tools/home-cost-calculator' },
    { label: 'AI Interior Designer', href: '/tools/ai-interior-designer-360' },
    { label: 'Brochure', href: '/brochure' },
]

// Backward compatibility - Combined links for older components
export const FooterLinks: footerlinks[] = [
    ...FooterCompanyLinks,
    ...FooterServicesLinks,
    ...FooterToolsLinks,
]
