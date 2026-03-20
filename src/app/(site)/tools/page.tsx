import HeroSub from "@/components/shared/HeroSub";
import React from "react";
import { Metadata } from "next";
import ToolsPage from "@/components/Tools/ToolsPage";

export const metadata: Metadata = {
    title: "Construction Tools | Walldot Builders",
    description: "Free tools for home building in Kerala — cost calculator, AI interior designer, vastu guide. Plan your dream home with Walldot Builders.",
    keywords: ["construction tools", "home building calculator", "Kerala construction", "AI interior designer", "vastu guide", "Walldot Builders"],
    openGraph: {
        title: "Construction Tools | Walldot Builders",
        description: "Free tools for home building in Kerala — cost calculator, AI interior designer, vastu guide.",
        type: "website",
    },
};

const page = () => {
    return (
        <>
            <HeroSub
                title="Precision in Every Project"
                description="Strong tools. Stronger foundations. Built the Walldot way."
                badge="Tools"
            />
            <ToolsPage/>
        </>
    );
};

export default page;
