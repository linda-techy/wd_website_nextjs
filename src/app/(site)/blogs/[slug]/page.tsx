import { getAllPosts, getPostBySlug } from "@/components/utils/markdown";
import markdownToHtml from "@/components/utils/markdownToHtml";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { Icon } from '@iconify/react'

type Props = {
    params: { slug: string };
};

export async function generateMetadata({ params }: any) {
    const data = await params;
    const post = getPostBySlug(data.slug, [
        "title",
        "author",
        "excerpt",
        "detail",
        "coverImage",
        "date",
    ]);

    const siteUrl = "https://walldotbuilders.com";

    if (post && post.title) {
        const description = post.excerpt || post.detail || "Expert insights on construction, real estate, and home building in Kerala from Walldot Builders.";
        const coverImage = post.coverImage || "/images/brochure-og.jpg";
        const absoluteCover = coverImage.startsWith("http") ? coverImage : `${siteUrl}${coverImage}`;

        return {
            title: `${post.title} | Walldot Builders`,
            description,
            alternates: { canonical: `${siteUrl}/blogs/${data.slug}` },
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
            openGraph: {
                title: `${post.title} | Walldot Builders`,
                description,
                type: "article",
                url: `${siteUrl}/blogs/${data.slug}`,
                images: [{ url: absoluteCover, width: 1200, height: 630, alt: post.title }],
                publishedTime: post.date,
                authors: [post.author || "Walldot Builders"],
            },
            twitter: {
                card: "summary_large_image",
                title: `${post.title} | Walldot Builders`,
                description,
                images: [absoluteCover],
            },
        };
    } else {
        return {
            title: "Article Not Found | Walldot Builders",
            description: "The requested blog article could not be found.",
            robots: {
                index: false,
                follow: false,
            },
        };
    }
}

export default async function Post({ params }: any) {
    const data = await params;
    const post = getPostBySlug(data.slug, [
        "title",
        "author",
        "authorImage",
        "content",
        "coverImage",
        "date",
        "tag",
        "detail",
        "excerpt",
    ]);

    const content = await markdownToHtml(post.content || "");
    const siteUrl = "https://walldotbuilders.com";
    const coverImage = post.coverImage || "/images/brochure-og.jpg";
    const absoluteCover = coverImage.startsWith("http") ? coverImage : `${siteUrl}${coverImage}`;
    const description = post.excerpt || post.detail || "";

    const blogPostingSchema = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": post.title,
        "description": description,
        "image": absoluteCover,
        "datePublished": post.date,
        "dateModified": post.date,
        "author": {
            "@type": "Person",
            "name": post.author || "Walldot Builders",
        },
        "publisher": {
            "@type": "Organization",
            "name": "Walldot Builders",
            "url": siteUrl,
        },
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `${siteUrl}/blogs/${data.slug}`,
        },
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }}
            />
            <section className="relative !pt-44 pb-0!">
                <div className="container max-w-8xl mx-auto md:px-0 px-4">
                    <div>
                        <div>
                            <Link href="/blogs" className="flex items-center gap-3 text-white bg-primary py-3 px-4 rounded-full w-fit hover:bg-dark duration-300">
                                <Icon
                                    icon={'ph:arrow-left'}
                                    width={20}
                                    height={20}
                                    className=''
                                />
                                <span>Go Back</span>
                            </Link>
                            <h1 className="text-dark dark:text-white md:text-52 text-40 leading-[1.2] font-semibold pt-7">
                                {post.title}
                            </h1>
                            <h6 className="text-xm mt-5 text-dark dark:text-white">
                                {post.detail}
                            </h6>
                        </div>
                        <div className="flex items-center justify-between gap-6 mt-12">
                            <div className="flex items-center gap-4">
                                <Image
                                    src={post.authorImage}
                                    alt={post.author || "Author"}
                                    className="bg-no-repeat bg-contain inline-block rounded-full !w-12 !h-12"
                                    width={48}
                                    height={48}
                                    quality={80}
                                />
                                <div>
                                    <span className="text-xm text-dark dark:text-white">
                                        {post.author}
                                    </span>
                                </div>
                            </div>
                            <div className="flex items-center gap-7">
                                <div className="flex items-center gap-4">
                                    <Icon
                                        icon={'ph:clock'}
                                        width={20}
                                        height={20}
                                        className=''
                                    />
                                    <span className="text-base text-dark font-medium dark:text-white">
                                        {format(new Date(post.date), "MMM dd, yyyy")}
                                    </span>
                                </div>
                                <div className="py-2.5 px-5 bg-dark/5 rounded-full dark:bg-white/15">
                                    <p className="text-sm font-semibold text-dark dark:text-white">{post.tag}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="z-20 mt-12 overflow-hidden rounded">
                        <Image
                            src={post.coverImage}
                            alt={post.title || "Blog post cover image"}
                            width={1170}
                            height={766}
                            quality={85}
                            className="h-full w-full object-cover object-center rounded-3xl"
                        />
                    </div>
                </div>
            </section>
            <section className="pt-12!">
                <div className="container max-w-8xl mx-auto px-4">
                    <div className="-mx-4 flex flex-wrap justify-center">
                        <div className="blog-details markdown xl:pr-10">
                            <div dangerouslySetInnerHTML={{ __html: content }}></div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
