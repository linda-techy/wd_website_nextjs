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

const Testimonial = () => {
    const [api, setApi] = React.useState<CarouselApi | undefined>(undefined);
    const [current, setCurrent] = React.useState(0);
    const [count, setCount] = React.useState(0);

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
        <section className="bg-dark relative overflow-hidden" id="testimonial">
            <div className="absolute right-0">
                <Image
                    src="/images/testimonial/Vector.png"
                    alt="victor"
                    width={700}
                    height={1039}
                    unoptimized={true}
                />
            </div>
            <div className="container max-w-8xl mx-auto px-4 sm:px-5 2xl:px-0">
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
                        {testimonials.map((item, index) => (
                            <CarouselItem key={index} className="mt-9">
                                <div className="lg:flex items-center gap-11">
                                    <div className="flex items-start gap-11 lg:pr-20">
                                        <div>
                                            <Icon icon="ph:house-simple" width={32} height={32} className="text-primary" />
                                        </div>
                                        <div>
                                            <h4 className="text-white text-xl md:text-2xl lg:text-3xl font-medium leading-relaxed">{item.review}</h4>
                                            <div className="flex items-center mt-8 gap-6">
                                                <Image
                                                    src={item.image}
                                                    alt={item.name}
                                                    width={80}
                                                    height={80}
                                                    className="rounded-full lg:hidden block"
                                                    unoptimized={true}
                                                />
                                                <div>
                                                    <h6 className="text-white text-lg md:text-xl font-semibold">{item.name}</h6>
                                                    <p className="text-white/60 text-base">{item.position}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-full h-full rounded-2xl overflow-hidden">
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            width={440}
                                            height={440}
                                            className="lg:block hidden"
                                            unoptimized={true}
                                        />
                                    </div>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
                <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 flex gap-2.5 p-2.5 bg-white/20 rounded-full">
                    {Array.from({ length: count }).map((_, index) => (
                        <button
                            key={index}
                            onClick={() => handleDotClick(index)}
                            className={`w-2.5 h-2.5 rounded-full ${current === index + 1 ? "bg-white" : "bg-white/50"
                                }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonial;
