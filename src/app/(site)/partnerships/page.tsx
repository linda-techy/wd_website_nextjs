import HeroSub from "@/components/shared/HeroSub";
import React from "react";
import { Metadata } from "next";
import Partnerships from "@/components/Partnerships";

export const metadata: Metadata = {
    title: "Professional Partnerships | Walldot Builders - Join Our Network of Trusted Partners",
    description: "Partner with Walldot Builders and grow your business. We offer partnership opportunities for architects, real estate agents, interior designers, financial institutions, material suppliers, Vastu consultants, land consultants, and corporate entities across Kerala. Earn commissions through ongoing collaboration.",
    keywords: "walldot builders partnership, architectural partnership Kerala, real estate agent collaboration, interior designer partnership, construction industry network, B2B construction partnership, builder vendor partnership, architect collaboration Kerala, professional partnership program, construction business network",
    openGraph: {
        title: "Professional Partnerships | Walldot Builders",
        description: "Join our network of professional partners. Architects, Real Estate Agents, Interior Designers, and more. Grow your business with Kerala's leading construction company.",
        url: "https://walldotbuilders.com/partnerships",
        siteName: "Walldot Builders",
        type: "website",
        images: [
            {
                url: "/images/partnership-og.jpg",
                width: 1200,
                height: 630,
                alt: "Walldot Builders Professional Partnerships",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Professional Partnerships | Walldot Builders",
        description: "Join our network of professional partners. Grow your business through collaboration with Kerala's trusted builder.",
        images: ["/images/partnership-og.jpg"],
    },
    alternates: {
        canonical: "https://walldotbuilders.com/partnerships",
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
};

const page = () => {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "WebPage",
                        "name": "Professional Partnerships | Walldot Builders",
                        "description": "Professional partnership opportunities with Walldot Builders for architects, real estate professionals, designers, and industry stakeholders.",
                        "url": "https://walldotbuilders.com/partnerships",
                        "publisher": {
                            "@type": "Organization",
                            "name": "Walldot Builders"
                        }
                    }),
                }}
            />
            <HeroSub
                title="Professional Partnership Program"
                description="Join our network of trusted partners and grow your business through collaboration"
                badge="B2B Partnerships"
            />
            <Partnerships />
        </>
    );
};

export default page;

