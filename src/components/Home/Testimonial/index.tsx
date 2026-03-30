"use client";
import * as React from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    type CarouselApi,
} from "@/components/ui/carousel";
import { testimonials } from "@/app/api/testimonial";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useParallax } from "@/components/animations/hooks/useParallax";

// Click-to-play YouTube facade — avoids loading ~500KB of YouTube scripts on page load
const YouTubeFacade = ({
    youtubeId,
    title,
}: {
    youtubeId: string;
    title: string;
}) => {
    const [playing, setPlaying] = React.useState(false);
    const thumbnailUrl = `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`;

    if (playing) {
        return (
            <div
                className="relative w-full rounded-2xl overflow-hidden shadow-2xl"
                style={{ paddingBottom: "56.25%" }}
            >
                <iframe
                    className="absolute inset-0 w-full h-full"
                    src={`https://www.youtube.com/embed/${youtubeId}?rel=0&modestbranding=1&autoplay=1`}
                    title={title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                />
            </div>
        );
    }

    return (
        <button
            onClick={() => setPlaying(true)}
            aria-label={`Play ${title}`}
            className="relative w-full rounded-2xl overflow-hidden shadow-2xl group cursor-pointer focus:outline-none"
            style={{ paddingBottom: "56.25%" }}
        >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                src={thumbnailUrl}
                alt={title}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Play button overlay */}
            <span className="absolute inset-0 flex items-center justify-center">
                <span className="bg-red-600 group-hover:bg-red-700 transition-colors duration-200 rounded-full p-4">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        fill="white"
                    >
                        <path d="M8 5v14l11-7z" />
                    </svg>
                </span>
            </span>
        </button>
    );
};

const Testimonial = () => {
    const [api, setApi] = React.useState<CarouselApi | undefined>(undefined);
    const [current, setCurrent] = React.useState(0);
    const [count, setCount] = React.useState(0);
    const sectionRef = React.useRef<HTMLElement>(null);
    const contentRef = React.useRef<HTMLDivElement>(null);
    const vectorRef = React.useRef<HTMLDivElement>(null);

    useParallax(vectorRef, 0.2);

    useGSAP(() => {
        if (contentRef.current) {
            gsap.fromTo(
                contentRef.current.children,
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    stagger: 0.15,
                    duration: 1,
                    ease: "power4.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 85%",
                    },
                }
            );
        }
    }, { scope: sectionRef });

    React.useEffect(() => {
        if (!api) return;
        setCount(api.scrollSnapList().length);
        setCurrent(api.selectedScrollSnap() + 1);
        api.on("select", () => {
            setCurrent(api.selectedScrollSnap() + 1);
        });
    }, [api]);

    const handleDotClick = (index: number) => {
        if (api) {
            api.scrollTo(index);
        }
    };

    return (
        <section ref={sectionRef} className="bg-dark relative overflow-hidden" id="testimonial">
            <div ref={vectorRef} className="absolute right-0">
                <Image
                    src="/images/testimonial/Vector.png"
                    alt="decorative vector"
                    width={700}
                    height={1039}
                    loading="lazy"
                    quality={75}
                />
            </div>
            <div ref={contentRef} className="container max-w-8xl mx-auto px-4 sm:px-5 2xl:px-0">
                <div className="mb-8">
                    <p className="text-white text-base md:text-lg font-semibold flex gap-2 mb-3">
                        <Icon icon="ph:house-simple-fill" className="text-2xl text-primary" />
                        Testimonials
                    </p>
                    <h2 className="text-3xl md:text-40 lg:text-52 font-bold text-white leading-tight tracking-tight">
                        What our clients say
                    </h2>
                </div>
                <Carousel
                    setApi={setApi}
                    opts={{
                        loop: true,
                    }}
                >
                    <CarouselContent>
                        {testimonials.map((item, index) => {
                            return (
                                <CarouselItem key={index} className="mt-9">
                                    <div className="lg:flex items-center gap-11">
                                        {/* Left: review text + name */}
                                        <div className="flex items-start gap-11 lg:pr-20">
                                            <div>
                                                <Icon icon="ph:house-simple" width={32} height={32} className="text-primary" />
                                            </div>
                                            <div>
                                                <h4 className="text-white text-xl md:text-2xl lg:text-3xl font-medium leading-relaxed">{item.review}</h4>
                                                <div className="flex items-center mt-8 gap-6">
                                                    {!item.youtubeId && (
                                                        <Image
                                                            src={item.image ?? ""}
                                                            alt={item.name}
                                                            width={80}
                                                            height={80}
                                                            className="rounded-full lg:hidden block"
                                                            loading="lazy"
                                                            quality={75}
                                                        />
                                                    )}
                                                    <div>
                                                        <h6 className="text-white text-lg md:text-xl font-semibold">{item.name}</h6>
                                                        <p className="text-white/60 text-base">{item.position}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Right: YouTube facade or fallback photo */}
                                        <div className="lg:block hidden w-full max-w-[440px] flex-shrink-0">
                                            {item.youtubeId ? (
                                                <YouTubeFacade
                                                    youtubeId={item.youtubeId}
                                                    title={`${item.name} testimonial`}
                                                />
                                            ) : (
                                                <div className="w-full h-full rounded-2xl overflow-hidden">
                                                    <Image
                                                        src={item.image ?? ""}
                                                        alt={item.name}
                                                        width={440}
                                                        height={440}
                                                        loading="lazy"
                                                        quality={80}
                                                    />
                                                </div>
                                            )}
                                        </div>

                                        {/* Mobile: YouTube facade below text */}
                                        {item.youtubeId && (
                                            <div className="lg:hidden block w-full mt-6">
                                                <YouTubeFacade
                                                    youtubeId={item.youtubeId}
                                                    title={`${item.name} testimonial`}
                                                />
                                            </div>
                                        )}
                                    </div>
                                </CarouselItem>
                            );
                        })}
                    </CarouselContent>
                </Carousel>
                <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 flex gap-2.5 p-2.5 bg-white/20 rounded-full">
                    {Array.from({ length: count }).map((_, index) => (
                        <button
                            key={index}
                            onClick={() => handleDotClick(index)}
                            className={`w-2.5 h-2.5 rounded-full ${current === index + 1 ? "bg-white" : "bg-white/50"}`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonial;
