import BlogList from "@/components/Blog";
import HeroSub from "@/components/shared/HeroSub";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Construction & Real Estate Blog | Walldot Builders Kerala",
    description: "Expert insights on home construction, real estate trends, interior design, and property investment in Kerala. Read the Walldot Builders blog for practical advice.",
    keywords: ["construction blog Kerala", "real estate insights Kerala", "home building tips", "Kerala property market", "interior design ideas", "Walldot Builders blog"],
    alternates: { canonical: "https://walldotbuilders.com/blogs" },
    openGraph: {
        title: "Construction & Real Estate Blog | Walldot Builders Kerala",
        description: "Expert insights on home construction, real estate trends, and property investment in Kerala.",
        type: "website",
        url: "https://walldotbuilders.com/blogs",
        images: [{ url: "/images/brochure-og.jpg", width: 1200, height: 630, alt: "Walldot Builders Blog" }],
    },
    twitter: {
        card: "summary_large_image",
        title: "Construction & Real Estate Blog | Walldot Builders Kerala",
        description: "Expert insights on home construction, real estate, and property investment in Kerala.",
        images: ["/images/brochure-og.jpg"],
    },
};

const Blog = () => {
    return (
        <>
            <HeroSub
                title="Real estate insights."
                description="Stay ahead in the property market with expert advice and updates."
                badge="Blog"
            />
            <BlogList />
        </>
    );
};

export default Blog;
