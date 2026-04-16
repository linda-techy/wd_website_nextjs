import HeroSub from "@/components/shared/HeroSub";
import OfficeSpace from "@/components/Properties/OfficeSpaces";
import LeadQuoteForm from "@/components/shared/LeadQuoteForm";
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
            <section className="py-16 bg-gray-50 dark:bg-gray-900">
                <div className="container mx-auto max-w-lg px-4">
                    <LeadQuoteForm
                        leadSource="website_office_spaces"
                        title="Interested in a Commercial Space?"
                        submitLabel="Get Free Consultation"
                        showArea
                        projectType="office_space"
                    />
                </div>
            </section>
        </>
    );
};

export default page;