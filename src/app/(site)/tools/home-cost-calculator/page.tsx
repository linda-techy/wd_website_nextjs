import React from "react";
import { Metadata } from "next";
import HomeCostCalculator from "@/components/Tools/HomeCostCalculator";

export const metadata: Metadata = {
    title: "Home Construction Cost Calculator Kerala | Walldot Builders",
    description: "Calculate accurate home construction costs in Kerala. Get instant estimates for materials, labour, and finishing based on your location and requirements.",
    keywords: ["home construction cost calculator", "Kerala construction cost", "house building estimate", "construction budget Kerala", "Walldot Builders"],
    openGraph: {
        title: "Home Construction Cost Calculator Kerala | Walldot Builders",
        description: "Calculate accurate home construction costs in Kerala. Get instant estimates for materials, labour, and finishing.",
        type: "website",
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
