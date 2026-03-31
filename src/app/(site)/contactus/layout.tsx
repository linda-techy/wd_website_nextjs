import { Metadata } from 'next'

export const metadata: Metadata = {
    title: "Contact Walldot Builders | Get a Free Construction Consultation in Kerala",
    description: "Contact Walldot Builders in Thrissur, Kerala for your home construction, villa, or commercial project. Get expert guidance and a free initial consultation. Call +91-9074-9548-74.",
    keywords: ["contact Walldot Builders", "construction consultation Kerala", "home builder contact Thrissur", "construction inquiry Kerala", "get construction quote Kerala"],
    alternates: { canonical: "https://walldotbuilders.com/contactus" },
    openGraph: {
        title: "Contact Walldot Builders | Free Construction Consultation Kerala",
        description: "Reach out to Walldot Builders for your dream home project in Kerala. Expert guidance, transparent pricing, and a free initial consultation.",
        type: "website",
        url: "https://walldotbuilders.com/contactus",
        images: [{ url: "/images/brochure-og.jpg", width: 1200, height: 630, alt: "Contact Walldot Builders Kerala" }],
    },
    twitter: {
        card: "summary_large_image",
        title: "Contact Walldot Builders | Free Construction Consultation Kerala",
        description: "Reach out for your dream home project in Kerala. Expert guidance and free initial consultation.",
        images: ["/images/brochure-og.jpg"],
    },
}

const contactPageSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact Walldot Builders",
    "description": "Contact Walldot Builders in Thrissur, Kerala for home construction, villas, and commercial projects.",
    "url": "https://walldotbuilders.com/contactus",
    "mainEntity": {
        "@type": "GeneralContractor",
        "name": "Walldot Builders",
        "telephone": "+91-9074954874",
        "email": "hello@walldotbuilders.com",
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "Thrissur",
            "addressRegion": "Kerala",
            "addressCountry": "IN",
        },
    },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }}
            />
            {children}
        </>
    );
}
