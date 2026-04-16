import HeroSub from "@/components/shared/HeroSub";
import LeadQuoteForm from "@/components/shared/LeadQuoteForm";
import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Commercial Building Construction in Kerala | Walldot Builders",
    description: "Professional commercial building construction in Kerala. Offices, retail spaces, warehouses, and industrial buildings by Walldot Builders in Thrissur and across Kerala.",
    keywords: ["commercial construction Kerala", "office building construction Thrissur", "commercial builders Kerala", "warehouse construction Kerala", "Walldot commercial"],
    alternates: { canonical: "https://walldotbuilders.com/commercial-buildings" },
    openGraph: {
        title: "Commercial Building Construction | Walldot Builders",
        description: "Professional commercial construction — offices, retail, warehouses, and industrial buildings across Kerala.",
        type: "website",
        url: "https://walldotbuilders.com/commercial-buildings",
        images: [{ url: "/images/brochure-og.jpg", width: 1200, height: 630, alt: "Walldot Builders Commercial Construction Kerala" }],
    },
    twitter: {
        card: "summary_large_image",
        title: "Commercial Building Construction | Walldot Builders",
        description: "Professional commercial construction across Kerala.",
        images: ["/images/brochure-og.jpg"],
    },
};

const page = () => {
    return (
        <>
            <HeroSub
                title="Commercial Buildings."
                description="Purpose-built commercial spaces — offices, retail, warehouses, and industrial facilities designed for your business."
                badge="Properties"
            />
            <section className="py-16 bg-gray-50 dark:bg-gray-900">
                <div className="container mx-auto max-w-lg px-4">
                    <LeadQuoteForm
                        leadSource="website_commercial"
                        title="Planning a Commercial Project?"
                        submitLabel="Get Free Consultation"
                        showArea
                        projectType="commercial_buildings"
                    />
                </div>
            </section>
        </>
    );
};

export default page;
