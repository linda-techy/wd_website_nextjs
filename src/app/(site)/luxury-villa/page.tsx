import HeroSub from "@/components/shared/HeroSub";
import LuxuryVillas from "@/components/Properties/LuxuryVilla";
import React from "react";
import { Metadata } from "next";
export const metadata: Metadata = {
    title: "Luxury Villas in Kerala | Premium Villa Construction | Walldot Builders",
    description: "Build your dream luxury villa in Kerala with Walldot Builders. Custom villa designs, premium materials, and expert construction in Thrissur and across Kerala.",
    keywords: ["luxury villas Kerala", "villa construction Thrissur", "custom villa builders Kerala", "premium homes Kerala", "Walldot luxury villas"],
    alternates: { canonical: "https://walldotbuilders.com/luxury-villa" },
    openGraph: {
        title: "Luxury Villas in Kerala | Walldot Builders",
        description: "Custom luxury villas built to your specifications. Premium materials, expert craftsmanship, and transparent pricing across Kerala.",
        type: "website",
        url: "https://walldotbuilders.com/luxury-villa",
        images: [{ url: "/images/brochure-og.jpg", width: 1200, height: 630, alt: "Walldot Builders Luxury Villas Kerala" }],
    },
    twitter: {
        card: "summary_large_image",
        title: "Luxury Villas in Kerala | Walldot Builders",
        description: "Custom luxury villas with premium materials and expert craftsmanship in Kerala.",
        images: ["/images/brochure-og.jpg"],
    },
};

const page = () => {
    return (
        <>
            <HeroSub
                title="Luxury Villas."
                description="Custom luxury villas built to your vision — premium materials, expert craftsmanship, and designs that stand apart."
                badge="Properties"
            />
            <LuxuryVillas />
        </>
    );
};

export default page;