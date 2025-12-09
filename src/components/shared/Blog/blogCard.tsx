import React, { FC } from "react";
import Image from "next/image";
import { Blog } from "@/types/blog";
import { format } from "date-fns";
import Link from "next/link";

const BlogCard: FC<{ blog: Blog }> = ({ blog }) => {
    const { title, coverImage, date, slug, tag } = blog;
    return (
        <Link href={`/blogs/${slug}`} aria-label="blog cover 5xl:h-full 5xl:inline-block" className="gap-4 group">
            <div className="overflow-hidden rounded-2xl flex-shrink-0">
                <Image
                    src={coverImage!}
                    alt="image"
                    className="transition group-hover:scale-110"
                    width={190}
                    height={163}
                    style={{ width: "100%", height: "100%" }}
                    unoptimized={true}
                />
            </div>
            <div className="flex justify-between items-center">
                <div>
                    <h3 className="mt-3 text-xl md:text-2xl font-semibold text-dark dark:text-white group-hover:text-primary leading-snug">
                        {title}
                    </h3>
                    <span className="text-sm md:text-base font-medium dark:text-white/60 text-dark/60 leading-relaxed mt-1 block">
                        {format(new Date(date), "MMM dd, yyyy")}
                    </span>
                </div>
                <div className="py-2.5 px-5 bg-dark/5 rounded-full dark:bg-white/15">
                    <p className="text-sm md:text-base font-semibold text-dark dark:text-white">{tag}</p>
                </div>
            </div>
        </Link>
    );
};

export default BlogCard;
