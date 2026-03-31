import HeroSub from "@/components/shared/HeroSub";
import OfficeSpace from "@/components/Properties/OfficeSpaces";
import React from "react";
import { Metadata } from "next";
export const metadata: Metadata = {
    title: "Commercial Office Space Construction Kerala | Walldot Builders",
    description: "Walldot Builders constructs purpose-built commercial office spaces and business premises in Kerala. Quality commercial construction with transparent pricing and professional project management.",
    keywords: ["office space construction Kerala", "commercial building Thrissur", "office building contractor Kerala", "commercial construction Kerala", "Walldot commercial projects"],
    alternates: { canonical: "https://walldotbuilders.com/office-spaces" },
    openGraph: {
        title: "Commercial Office Space Construction Kerala | Walldot Builders",
        description: "Purpose-built commercial offices and business premises in Kerala. Professional project management and transparent pricing.",
        type: "website",
        url: "https://walldotbuilders.com/office-spaces",
        images: [{ url: "/images/brochure-og.jpg", width: 1200, height: 630, alt: "Walldot Builders Office Spaces Kerala" }],
    },
    twitter: {
        card: "summary_large_image",
        title: "Commercial Office Space Construction Kerala | Walldot Builders",
        description: "Purpose-built commercial offices and business premises in Kerala.",
        images: ["/images/brochure-og.jpg"],
    },
};

const page = () => {
    return (
        <>
            <HeroSub
                title="Office Spaces."
                description="Purpose-built commercial offices and business premises — professionally managed, quality-built, and delivered on time."
                badge="Properties"
            />
            <OfficeSpace />
        </>
    );
};

export default page;