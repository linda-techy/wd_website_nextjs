import HeroSub from "@/components/shared/HeroSub";
import React from "react";
import { Metadata } from "next";
import AboutUs from "@/components/Aboutus";
import Breadcrumb from "@/components/shared/Breadcrumb";
import RelatedLinks, { servicesRelatedLinks } from "@/components/shared/RelatedLinks";

export const metadata: Metadata = {
    title: "About Walldot Builders | Trusted Construction Company in Thrissur, Kerala",
    description: "Walldot Builders is a trusted construction company in Thrissur, Kerala, specialising in custom homes, luxury villas, apartments, and commercial buildings. Meet our team and learn our story.",
    keywords: ["Walldot Builders", "construction company Thrissur", "home builders Kerala", "about Walldot", "Thrissur builders"],
    alternates: { canonical: "https://walldotbuilders.com/aboutus" },
    openGraph: {
        title: "About Walldot Builders | Trusted Construction Company in Kerala",
        description: "Walldot Builders specialises in custom homes, luxury villas, apartments, and commercial buildings in Thrissur, Kerala.",
        type: "website",
        url: "https://walldotbuilders.com/aboutus",
        images: [{ url: "/images/brochure-og.jpg", width: 1200, height: 630, alt: "About Walldot Builders Kerala" }],
    },
    twitter: {
        card: "summary_large_image",
        title: "About Walldot Builders | Trusted Construction Company in Kerala",
        description: "Trusted construction company in Thrissur, Kerala — custom homes, villas, apartments, and commercial buildings.",
        images: ["/images/brochure-og.jpg"],
    },
};

const page = () => {
    return (
        <>
            <HeroSub
                title="Welcome to Walldot Builders"
                description="Your Trusted Partner in Building Dreams - Kerala's Premier Construction Company"
                badge="About Us"
            />
            <div className="container max-w-8xl mx-auto px-5 2xl:px-0">
                <Breadcrumb items={[{ label: "About Us" }]} />
            </div>
            <AboutUs/>
            <RelatedLinks 
                title="Our Construction Services" 
                links={servicesRelatedLinks} 
            />
        </>
    );
};

export default page;
