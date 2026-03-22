import { Metadata } from "next";
import { Suspense } from "react";
import PartnerLogin from "@/components/Partnerships/Login";

export const metadata: Metadata = {
    title: "Partner Login | Walldot Builders",
    description: "Partner portal login for Walldot Builders associates.",
    robots: { index: false, follow: false },
};

const page = () => {
    return (
        <Suspense fallback={null}>
            <PartnerLogin />
        </Suspense>
    );
};

export default page;

