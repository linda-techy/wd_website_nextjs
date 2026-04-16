import HeroSub from "@/components/shared/HeroSub";
import ResidentialList from "@/components/Properties/Residential";
import LeadQuoteForm from "@/components/shared/LeadQuoteForm";
import React from "react";
import { Metadata } from "next";
export const metadata: Metadata = {
    title: "Residential Home Construction in Thrissur Kerala | Walldot Builders",
    description: "Build your residential home in Kerala with Walldot Builders. Custom home designs, quality construction, and transparent pricing for residential projects in Thrissur and across Kerala.",
    keywords: ["residential construction Kerala", "home builders Thrissur", "custom homes Kerala", "house construction Thrissur", "residential homes Kerala", "Walldot Builders"],
    alternates: { canonical: "https://walldotbuilders.com/residential-homes" },
    openGraph: {
        title: "Residential Home Construction Kerala | Walldot Builders",
        description: "Custom residential homes built with quality materials and transparent pricing across Kerala. Experts in Thrissur home construction.",
        type: "website",
        url: "https://walldotbuilders.com/residential-homes",
        images: [{ url: "/images/brochure-og.jpg", width: 1200, height: 630, alt: "Walldot Builders Residential Homes Kerala" }],
    },
    twitter: {
        card: "summary_large_image",
        title: "Residential Home Construction Kerala | Walldot Builders",
        description: "Custom residential homes with quality materials and transparent pricing in Kerala.",
        images: ["/images/brochure-og.jpg"],
    },
};

const page = () => {
    return (
        <>
            <HeroSub
                title="Residential Homes."
                description="Custom homes built for the way you live — quality construction, thoughtful design, and transparent pricing across Kerala."
                badge="Properties"
            />
            <ResidentialList />
            <section className="py-16 bg-gray-50 dark:bg-gray-900">
                <div className="container mx-auto max-w-lg px-4">
                    <LeadQuoteForm
                        leadSource="website_residential_homes"
                        title="Interested in Building Your Home?"
                        submitLabel="Get Free Consultation"
                        showArea
                        projectType="residential_home"
                    />
                </div>
            </section>
        </>
    );
};

export default page;