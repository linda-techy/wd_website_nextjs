import React from "react";
import { Metadata } from "next";
import HomeCostCalculator from "@/components/Tools/HomeCostCalculator";

export const metadata: Metadata = {
    title: "Home Construction Cost Calculator Kerala | Walldot Builders",
    description: "Calculate accurate home construction costs in Kerala. Get instant estimates for materials, labour, and finishing based on your location and requirements.",
    keywords: ["home construction cost calculator", "Kerala construction cost", "house building estimate", "construction budget Kerala", "Walldot Builders"],
    alternates: { canonical: "https://walldotbuilders.com/tools/home-cost-calculator" },
    openGraph: {
        title: "Home Construction Cost Calculator Kerala | Walldot Builders",
        description: "Calculate accurate home construction costs in Kerala. Get instant estimates for materials, labour, and finishing.",
        type: "website",
        url: "https://walldotbuilders.com/tools/home-cost-calculator",
        images: [{ url: "/images/brochure-og.jpg", width: 1200, height: 630, alt: "Home Construction Cost Calculator Kerala" }],
    },
    twitter: {
        card: "summary_large_image",
        title: "Home Construction Cost Calculator Kerala | Walldot Builders",
        description: "Calculate accurate home construction costs in Kerala. Get instant estimates for materials, labour, and finishing.",
        images: ["/images/brochure-og.jpg"],
    },
};

const page = () => {
    return (
        <>
           <section className="text-center bg-cover !pt-40 pb-20 relative overflow-x-hidden" >
            <HomeCostCalculator/>
            </section>
        </>
    );
};

export default page;
