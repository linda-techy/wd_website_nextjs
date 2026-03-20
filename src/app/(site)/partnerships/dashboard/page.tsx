import { Metadata } from "next";
import PartnerDashboard from "@/components/Partnerships/Dashboard";

export const metadata: Metadata = {
    title: "Partner Dashboard | Walldot Builders",
    description: "Partner management dashboard for Walldot Builders associates.",
    robots: { index: false, follow: false },
};

const page = () => {
    return <PartnerDashboard />;
};

export default page;

