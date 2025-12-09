import HeroSub from "@/components/shared/HeroSub";
import React from "react";
import { Metadata } from "next";
import BrochureContent from "@/components/Brochure";

export const metadata: Metadata = {
    title: "Your Dream Home Starts Here | Walldot Builders - Kerala's Premier Construction Partner",
    description: "Download our comprehensive brochure and explore Walldot Builders' premium construction services, completed projects, and industry-first 24/7 mobile project tracking. Discover luxury villas, modern apartments, office spaces, and turnkey solutions with proven excellence across Kerala.",
    keywords: "walldot builders brochure, construction company profile Kerala, mobile project tracking construction, home builders portfolio, luxury villa construction Kerala, turnkey construction services, architectural services Kerala, construction company brochure download, building contractors Kerala, residential construction portfolio, commercial construction Kerala, Thrissur builders brochure, construction project monitoring app, real-time construction updates",
    openGraph: {
        title: "Your Dream Home Starts Here | Walldot Builders - Kerala's Premier Construction Partner",
        description: "Explore our portfolio of exceptional homes, innovative 24/7 mobile project tracking, and proven commitment to excellence. Download our brochure to discover why families across Kerala choose Walldot Builders.",
        url: "https://walldotbuilders.com/brochure",
        siteName: "Walldot Builders",
        type: "website",
        images: [
            {
                url: "/images/brochure-og.jpg",
                width: 1200,
                height: 630,
                alt: "Walldot Builders Company Brochure",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Your Dream Home Starts Here | Walldot Builders",
        description: "Explore our portfolio, innovative services, and proven track record of delivering exceptional homes across Kerala. Download our brochure today.",
        images: ["/images/brochure-og.jpg"],
    },
    alternates: {
        canonical: "https://walldotbuilders.com/brochure",
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
                        "name": "Company Brochure | Walldot Builders",
                        "description": "Comprehensive company brochure showcasing Walldot Builders' construction services, portfolio, and expertise in Kerala.",
                        "url": "https://walldotbuilders.com/brochure",
                        "publisher": {
                            "@type": "Organization",
                            "name": "Walldot Builders",
                            "logo": {
                                "@type": "ImageObject",
                                "url": "https://walldotbuilders.com/images/header/logo-original.svg"
                            },
                            "address": {
                                "@type": "PostalAddress",
                                "streetAddress": "West Fort",
                                "addressLocality": "Thrissur",
                                "addressRegion": "Kerala",
                                "addressCountry": "IN"
                            },
                            "contactPoint": {
                                "@type": "ContactPoint",
                                "telephone": "+91-9074-9548-74",
                                "contactType": "customer service",
                                "email": "info@walldotbuilders.com",
                                "areaServed": "Kerala",
                                "availableLanguage": ["en", "ml"]
                            }
                        },
                        "mainEntity": {
                            "@type": "DigitalDocument",
                            "name": "Walldot Builders Company Brochure",
                            "description": "Comprehensive brochure featuring construction services, portfolio, and company profile",
                            "encodingFormat": "application/pdf"
                        }
                    }),
                }}
            />
            <HeroSub
                title="Your Dream Home Starts Here"
                description="Explore our portfolio, innovative services, and proven track record of delivering exceptional homes across Kerala"
                badge="Download Brochure"
            />
            <BrochureContent />
        </>
    );
};

export default page;

