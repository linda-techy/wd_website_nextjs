import HeroSub from "@/components/shared/HeroSub";
import React from "react";
import { Metadata } from "next";
import ToolsPage from "@/components/Tools/ToolsPage";

export const metadata: Metadata = {
    title: "Property List | Walldot builders",
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
