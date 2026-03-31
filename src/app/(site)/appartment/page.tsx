import HeroSub from "@/components/shared/HeroSub";
import Appartment from "@/components/Properties/Appartment";
import React from "react";
import { Metadata } from "next";
export const metadata: Metadata = {
    title: "Apartments in Thrissur Kerala | Modern Flats | Walldot Builders",
    description: "Explore modern apartments and flats built by Walldot Builders in Thrissur, Kerala. Quality construction, thoughtful design, and transparent pricing for every apartment project.",
    keywords: ["apartments in Thrissur", "flats in Kerala", "apartment construction Kerala", "modern flats Thrissur", "Walldot Builders apartments"],
    alternates: { canonical: "https://walldotbuilders.com/appartment" },
    openGraph: {
        title: "Apartments in Thrissur Kerala | Walldot Builders",
        description: "Modern apartments and flats built with quality materials and transparent pricing. Explore Walldot Builders' apartment portfolio in Kerala.",
        type: "website",
        url: "https://walldotbuilders.com/appartment",
        images: [{ url: "/images/brochure-og.jpg", width: 1200, height: 630, alt: "Walldot Builders Apartments Kerala" }],
    },
    twitter: {
        card: "summary_large_image",
        title: "Apartments in Thrissur Kerala | Walldot Builders",
        description: "Modern apartments and flats built with quality materials in Kerala.",
        images: ["/images/brochure-og.jpg"],
    },
};

const page = () => {
    return (
        <>
            <HeroSub
                title="Apartments."
                description="Modern apartments and flats built with quality materials, thoughtful design, and transparent pricing across Kerala."
                badge="Properties"
            />
            <Appartment />
        </>
    );
};

export default page;