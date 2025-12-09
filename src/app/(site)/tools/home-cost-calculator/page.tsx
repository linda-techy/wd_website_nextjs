import HeroSub from "@/components/shared/HeroSub";
import React from "react";
import { Metadata } from "next";
import HomeCostCalculator from "@/components/Tools/HomeCostCalculator";

export const metadata: Metadata = {
    title: "Property List | Walldot builders",
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
