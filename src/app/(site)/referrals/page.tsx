import HeroSub from "@/components/shared/HeroSub";
import React from "react";
import { Metadata } from "next";
import Referrals from "@/components/Referrals";

export const metadata: Metadata = {
    title: "Refer a Friend | Walldot Builders - Earn Cash Rewards for Client Referrals",
    description: "Refer friends and family who want to build their dream home to Walldot Builders and earn attractive cash rewards. Simple referral process with generous rewards for successful project referrals across Kerala.",
    keywords: "walldot builders referral, refer a friend Kerala, home construction referral, client referral rewards, construction referral bonus, refer and earn construction, home builder referral program Kerala, cash rewards referral",
    openGraph: {
        title: "Refer a Friend | Walldot Builders",
        description: "Refer friends and family looking to build their dream home and earn cash rewards. Help others while earning benefits yourself.",
        url: "https://walldotbuilders.com/referrals",
        siteName: "Walldot Builders",
        type: "website",
        images: [
            {
                url: "/images/referral-og.jpg",
                width: 1200,
                height: 630,
                alt: "Walldot Builders Referral Program",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Refer a Friend | Walldot Builders",
        description: "Refer friends looking to build their dream home and earn cash rewards. Simple referral, generous rewards!",
        images: ["/images/referral-og.jpg"],
    },
    alternates: {
        canonical: "https://walldotbuilders.com/referrals",
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
};

const page = () => {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "WebPage",
                        "name": "Referral Program | Walldot Builders",
                        "description": "Join the Walldot Builders referral program. Refer clients for construction projects or architects for partnership opportunities and earn rewards.",
                        "url": "https://walldotbuilders.com/referrals",
                        "publisher": {
                            "@type": "Organization",
                            "name": "Walldot Builders",
                            "logo": {
                                "@type": "ImageObject",
                                "url": "https://walldotbuilders.com/images/header/logo-original.svg"
                            }
                        },
                        "mainEntity": [
                            {
                                "@type": "LoyaltyProgram",
                                "name": "Walldot Builders Client Referral Program",
                                "description": "Earn cash rewards by referring clients to Walldot Builders for their home construction projects.",
                                "provider": {
                                    "@type": "Organization",
                                    "name": "Walldot Builders"
                                }
                            },
                            {
                                "@type": "ProfessionalService",
                                "name": "Walldot Builders Architectural Partnership Program",
                                "description": "Refer architects and design professionals to join our trusted partner network and earn commissions on completed projects.",
                                "provider": {
                                    "@type": "Organization",
                                    "name": "Walldot Builders"
                                }
                            }
                        ]
                    }),
                }}
            />
            <HeroSub
                title="Refer a Friend & Earn Cash Rewards"
                description="Know someone building their dream home? Refer them to us and earn attractive cash rewards for every successful project."
                badge="Refer a Friend"
            />
            <Referrals />
        </>
    );
};

export default page;

