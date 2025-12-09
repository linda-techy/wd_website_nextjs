import HeroSub from "@/components/shared/HeroSub";
import React from "react";
import { Metadata } from "next";
import AboutUs from "@/components/Aboutus";
import Breadcrumb from "@/components/shared/Breadcrumb";
import RelatedLinks, { servicesRelatedLinks } from "@/components/shared/RelatedLinks";

export const metadata: Metadata = {
    title: "About Walldot Builders | Best Construction Company in Thrissur, Kerala",
    description: "Learn about Walldot Builders, one of the top construction companies in Thrissur, Kerala. Expert home builders with 3+ years of experience in quality construction.",
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
