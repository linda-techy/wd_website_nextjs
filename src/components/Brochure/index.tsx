"use client";

import { Icon } from "@iconify/react";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { testimonials } from "@/app/api/testimonial";
import { propertyHomes } from "@/app/api/propertyhomes";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Phone Mockup Components
const PhoneMockup = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
    <div className={`bg-gradient-to-b from-gray-800 to-gray-900 rounded-[3rem] p-3 shadow-2xl border-8 border-gray-800 ${className}`}>
        <div className="bg-white rounded-[2.5rem] overflow-hidden">
            {children}
        </div>
    </div>
);

const ProgressPhone = () => (
    <PhoneMockup>
        <div className="bg-gradient-to-br from-primary to-primary/80 p-6 text-white">
            <div className="flex items-center justify-between mb-4">
                <Icon icon={"ph:chart-line-up-fill"} width={28} height={28} />
                <span className="text-sm font-bold">85% Complete</span>
            </div>
            <h3 className="text-lg font-bold mb-2">Project Progress</h3>
            <div className="h-2 bg-white/30 rounded-full">
                <div className="h-2 bg-white rounded-full w-[85%]"></div>
            </div>
        </div>
        <div className="p-4 space-y-3">
            <div className="flex items-center gap-3 bg-green-50 p-3 rounded-lg">
                <Icon icon={"ph:check-circle-fill"} width={24} height={24} className="text-green-600" />
                <div className="text-left">
                    <p className="text-xs font-bold text-gray-900">Foundation Complete</p>
                    <p className="text-xs text-gray-600">15 days ahead</p>
                </div>
            </div>
            <div className="flex items-center gap-3 bg-blue-50 p-3 rounded-lg">
                <Icon icon={"ph:clock-fill"} width={24} height={24} className="text-blue-600" />
                <div className="text-left">
                    <p className="text-xs font-bold text-gray-900">In Progress</p>
                    <p className="text-xs text-gray-600">Roofing work</p>
                </div>
            </div>
            <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
                <Icon icon={"ph:calendar-fill"} width={24} height={24} className="text-gray-600" />
                <div className="text-left">
                    <p className="text-xs font-bold text-gray-900">Next Phase</p>
                    <p className="text-xs text-gray-600">Finishing work</p>
                </div>
            </div>
        </div>
    </PhoneMockup>
);

const PhotoPhone = () => (
    <PhoneMockup>
        <div className="bg-gradient-to-br from-primary to-primary/80 p-6 text-white">
            <div className="flex items-center justify-between mb-4">
                <Icon icon={"ph:camera-fill"} width={28} height={28} />
                <span className="text-xs bg-white/20 px-3 py-1 rounded-full font-bold">Today</span>
            </div>
            <h3 className="text-lg font-bold">Daily Updates</h3>
        </div>
        <div className="p-4">
            <div className="relative h-48 rounded-lg overflow-hidden mb-3">
                <Image
                    src="/images/properties/property5/image-3.jpg"
                    alt="Roofing Progress"
                    fill
                    className="object-cover"
                    unoptimized
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                    <p className="text-white text-xs font-bold">Roofing in Progress</p>
                    <p className="text-white/80 text-xs">2 hours ago</p>
                </div>
            </div>
            <div className="grid grid-cols-3 gap-2">
                {[4, 5, 6].map((i) => (
                    <div key={i} className="relative h-16 rounded overflow-hidden">
                        <Image
                            src={`/images/properties/property${i}/image-2.jpg`}
                            alt="Progress"
                            fill
                            className="object-cover"
                            unoptimized
                        />
                    </div>
                ))}
            </div>
        </div>
    </PhoneMockup>
);

const BudgetPhone = () => (
    <PhoneMockup>
        <div className="bg-gradient-to-br from-primary to-primary/80 p-6 text-white">
            <div className="flex items-center justify-between mb-4">
                <Icon icon={"ph:currency-inr-fill"} width={28} height={28} />
                <span className="text-sm font-bold">Budget</span>
            </div>
            <h3 className="text-2xl font-bold mb-1">₹45.2L</h3>
            <p className="text-sm text-white/80">of ₹52L Budget</p>
        </div>
        <div className="p-4 space-y-3">
            <div className="flex justify-between items-center pb-3 border-b">
                <div>
                    <p className="text-xs font-bold text-gray-900">Material Cost</p>
                    <p className="text-xs text-gray-600">Cement, Steel, Bricks</p>
                </div>
                <span className="text-sm font-bold text-gray-900">₹28.5L</span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b">
                <div>
                    <p className="text-xs font-bold text-gray-900">Labor Cost</p>
                    <p className="text-xs text-gray-600">Workers, Supervisors</p>
                </div>
                <span className="text-sm font-bold text-gray-900">₹12.8L</span>
            </div>
            <div className="flex justify-between items-center">
                <div>
                    <p className="text-xs font-bold text-green-600">Remaining</p>
                    <p className="text-xs text-gray-600">Available Budget</p>
                </div>
                <span className="text-sm font-bold text-green-600">₹6.8L</span>
            </div>
        </div>
    </PhoneMockup>
);

export default function BrochureContent() {
    const [activeMockup, setActiveMockup] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.registerPlugin(ScrollTrigger);
        if (!containerRef.current) return;

        const mm = gsap.matchMedia();

        mm.add("(min-width: 320px)", () => {
            // 1. Hero animate in
            const heroSection = containerRef.current?.querySelector('.brochure-content > section');
            if (heroSection) {
                // Slower, more deliberate luxury stagger
                gsap.fromTo(heroSection.querySelectorAll('h1, p, .flex > div'), 
                    { y: 40, opacity: 0 },
                    { y: 0, opacity: 1, stagger: 0.15, duration: 1.6, ease: 'expo.out', delay: 0.2 }
                );
                
                // Subtle parallax on the absolutely positioned background wrappers
                const heroBg = heroSection.querySelector('.absolute.inset-0.opacity-10');
                if (heroBg) {
                    gsap.to(heroBg, {
                        yPercent: 20,
                        ease: "none",
                        scrollTrigger: {
                            trigger: heroSection,
                            start: "top top",
                            end: "bottom top",
                            scrub: true
                        }
                    });
                }
            }

            // 2. Generic scroll reveals for all child sections with premium architectural easing
            const sections = containerRef.current?.querySelectorAll('.brochure-content > section');
            sections?.forEach((sec, i) => {
                if (i === 0) return; // skip hero as it's animated on load
                
                // Collect key elements to stagger animate inside this section
                const animTargets = sec.querySelectorAll('.print-card, h2, h3, .grid > div:not(.print-card)');
                
                if (animTargets.length > 0) {
                    gsap.fromTo(Array.from(animTargets), 
                        { y: 50, opacity: 0, scale: 0.98 },
                        {
                            y: 0, opacity: 1, scale: 1, duration: 1.4, stagger: 0.1, ease: "expo.out",
                            scrollTrigger: {
                                trigger: sec,
                                start: "top 85%",
                            }
                        }
                    );
                }
            });
        });

        return () => mm.revert();
    }, { scope: containerRef });

    // Auto-rotate mobile mockups
    useEffect(() => {
        const timer = setInterval(() => {
            setActiveMockup((prev) => (prev + 1) % 3);
        }, 4000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div ref={containerRef}>
            <div className="container max-w-8xl mx-auto px-4 sm:px-5 2xl:px-0 py-6 sm:py-8 md:py-10 lg:py-12">
            {/* Brochure Content */}
            <div className="space-y-8 sm:space-y-10 md:space-y-12 lg:space-y-14 brochure-content">
                
                {/* 1. HERO - Attention Grabber with Visual Impact */}
                <section className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-primary via-primary/90 to-primary/80 p-5 sm:p-6 md:p-8 lg:p-10 min-h-[350px] sm:min-h-[400px] flex items-center">
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute inset-0 bg-[url('/images/hero/heroBanner.png')] bg-cover bg-center"></div>
                    </div>
                    <div className="relative z-10 max-w-4xl">
                        <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/20 backdrop-blur-sm mb-4 sm:mb-6">
                            <Icon icon={"ph:device-mobile-fill"} width={16} height={16} className="text-white sm:w-5 sm:h-5" />
                            <span className="text-white text-xs sm:text-sm font-semibold">24/7 Mobile Project Tracking — Transparency You Can See</span>
                        </div>
                        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-3 sm:mb-4 md:mb-6 leading-tight">
                            Building Dreams.<br/>Creating Homes.
                        </h1>
                        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 mb-4 sm:mb-6 md:mb-8 leading-relaxed">
                            Daily site photos. Real-time budget tracking. Direct chat with your construction team — all from your phone, without visiting the site once. Full transparency at every stage.
                        </p>
                        <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4">
                            <div className="flex items-center gap-1.5 sm:gap-2 bg-white/20 backdrop-blur-sm px-3 py-1.5 sm:px-4 sm:py-2 md:px-5 md:py-2.5 rounded-full">
                                <Icon icon={"ph:device-mobile-fill"} width={16} height={16} className="text-white sm:w-5 sm:h-5 md:w-6 md:h-6" />
                                <span className="text-white text-xs sm:text-sm md:text-base font-semibold whitespace-nowrap">24/7 Mobile Tracking</span>
                            </div>
                            <div className="flex items-center gap-1.5 sm:gap-2 bg-white/20 backdrop-blur-sm px-3 py-1.5 sm:px-4 sm:py-2 md:px-5 md:py-2.5 rounded-full">
                                <Icon icon={"ph:shield-check-fill"} width={16} height={16} className="text-white sm:w-5 sm:h-5 md:w-6 md:h-6" />
                                <span className="text-white text-xs sm:text-sm md:text-base font-semibold whitespace-nowrap">Quality Assured</span>
                            </div>
                            <div className="flex items-center gap-1.5 sm:gap-2 bg-white/20 backdrop-blur-sm px-3 py-1.5 sm:px-4 sm:py-2 md:px-5 md:py-2.5 rounded-full">
                                <Icon icon={"ph:clock-fill"} width={16} height={16} className="text-white sm:w-5 sm:h-5 md:w-6 md:h-6" />
                                <span className="text-white text-xs sm:text-sm md:text-base font-semibold whitespace-nowrap">On-Time Delivery</span>
                            </div>
                        </div>
                    </div>
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
                </section>

                {/* 2. SOCIAL PROOF - Trust & Credibility */}
                <section>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-5 sm:mb-6 md:mb-8 print-grid">
                        <div className="border border-primary/30 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 text-center bg-gradient-to-br from-primary/5 to-transparent hover:shadow-xl transition-all duration-300 hover:scale-105 print-card">
                            <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center mx-auto mb-2 sm:mb-3">
                                <Icon icon={"ph:device-mobile-fill"} width={24} height={24} className="text-white sm:w-7 sm:h-7 md:w-8 md:h-8" />
                            </div>
                            <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-1">24/7</h3>
                             <p className="text-xs sm:text-sm text-black/70 dark:text-white/70 font-semibold">Mobile Project Access</p>
                        </div>
                        <div className="border border-primary/30 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 text-center bg-gradient-to-br from-primary/5 to-transparent hover:shadow-xl transition-all duration-300 hover:scale-105">
                            <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center mx-auto mb-2 sm:mb-3">
                                <Icon icon={"ph:smiley-fill"} width={24} height={24} className="text-white sm:w-7 sm:h-7 md:w-8 md:h-8" />
                            </div>
                            <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-green-600 mb-1">4.9★</h3>
                            <p className="text-xs sm:text-sm text-black/70 dark:text-white/70 font-semibold">Client Rating</p>
                        </div>
                        <div className="border border-primary/30 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 text-center bg-gradient-to-br from-primary/5 to-transparent hover:shadow-xl transition-all duration-300 hover:scale-105">
                            <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mx-auto mb-2 sm:mb-3">
                                <Icon icon={"ph:trophy-fill"} width={24} height={24} className="text-white sm:w-7 sm:h-7 md:w-8 md:h-8" />
                            </div>
                            <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-600 mb-1">3+</h3>
                            <p className="text-xs sm:text-sm text-black/70 dark:text-white/70 font-semibold">Years Excellence</p>
                        </div>
                        <div className="border border-primary/30 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 text-center bg-gradient-to-br from-primary/5 to-transparent hover:shadow-xl transition-all duration-300 hover:scale-105">
                            <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center mx-auto mb-2 sm:mb-3">
                                <Icon icon={"ph:currency-inr-fill"} width={24} height={24} className="text-white sm:w-7 sm:h-7 md:w-8 md:h-8" />
                            </div>
                            <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-purple-600 mb-1">₹0</h3>
                            <p className="text-xs sm:text-sm text-black/70 dark:text-white/70 font-semibold">Hidden Costs</p>
                        </div>
                    </div>

                    {/* Testimonials with Images */}
                    <div className="grid md:grid-cols-2 gap-6 print-grid">
                        {testimonials.map((testimonial, index) => (
                            <div key={index} className="border border-black/10 dark:border-white/10 rounded-2xl p-6 sm:p-8 bg-gradient-to-br from-primary/5 to-transparent relative overflow-hidden print-card">
                                <div className="absolute top-4 right-4">
                                    {[...Array(5)].map((_, i) => (
                                        <Icon key={i} icon={"ph:star-fill"} width={20} height={20} className="text-yellow-500 inline" />
                                    ))}
                                </div>
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="relative w-16 h-16 rounded-full overflow-hidden bg-primary/20">
                                        {/* <Image
                                            src={testimonial.image || '/images/default-avatar.jpg'}
                                            alt={testimonial.name}
                                            fill
                                            className="object-cover"
                                            unoptimized
                                        /> */}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-base sm:text-lg text-black dark:text-white">{testimonial.name}</h4>
                                        <p className="text-xs sm:text-sm text-black/60 dark:text-white/60">{testimonial.position}</p>
                                    </div>
                                </div>
                                <p className="text-sm sm:text-base text-black/70 dark:text-white/70 italic leading-relaxed">
                                    &quot;{testimonial.review}&quot;
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 3. UNIQUE VALUE PROPOSITION - Mobile Tracking (Industry First) */}
                <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-primary to-purple-600 p-8 md:p-16">
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl"></div>
                        <div className="absolute bottom-20 left-20 w-96 h-96 bg-white rounded-full blur-3xl"></div>
                    </div>
                    <div className="relative z-10">
                        <div className="text-center mb-12">
                            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/20 backdrop-blur-sm mb-6">
                                <Icon icon={"ph:sparkle-fill"} width={24} height={24} className="text-white" />
                                <span className="text-white font-bold">INDUSTRY-FIRST IN KERALA</span>
                            </div>
                            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 md:mb-6 leading-tight px-4">
                                24/7 Mobile Project Tracking
                            </h2>
                            <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed px-4">
                                Be the boss of your construction site from anywhere in the world. India&apos;s most advanced construction tracking system.
                            </p>
                        </div>

                        {/* Mobile Mockup Showcase */}
                        <div className="flex justify-center items-center mb-8 sm:mb-10 md:mb-12 px-4">
                            <div className="relative w-full max-w-sm md:max-w-5xl">
                                {/* Mobile view - Single phone with carousel */}
                                <div className="md:hidden relative">
                                    <div className={`transition-all duration-500 ${activeMockup === 0 ? 'opacity-100 translate-x-0' : 'opacity-0 absolute inset-0 translate-x-full'}`}>
                                        <div className="relative w-full max-w-xs mx-auto">
                                            <ProgressPhone />
                                        </div>
                                    </div>

                                    <div className={`transition-all duration-500 ${activeMockup === 1 ? 'opacity-100 translate-x-0' : 'opacity-0 absolute inset-0 translate-x-full'}`}>
                                        <div className="relative w-full max-w-xs mx-auto">
                                            <PhotoPhone />
                                        </div>
                                    </div>

                                    <div className={`transition-all duration-500 ${activeMockup === 2 ? 'opacity-100 translate-x-0' : 'opacity-0 absolute inset-0 translate-x-full'}`}>
                                        <div className="relative w-full max-w-xs mx-auto">
                                            <BudgetPhone />
                                        </div>
                                    </div>

                                    {/* Carousel Indicators */}
                                    <div className="flex justify-center gap-2 mt-6">
                                        {[0, 1, 2].map((index) => (
                                            <button
                                                key={index}
                                                onClick={() => setActiveMockup(index)}
                                                className={`h-2 rounded-full transition-all duration-300 ${
                                                    activeMockup === index ? 'w-8 bg-white' : 'w-2 bg-white/40'
                                                }`}
                                                aria-label={`View screen ${index + 1}`}
                                            />
                                        ))}
                                    </div>
                                </div>

                                {/* Desktop view - All three phones side by side */}
                                <div className="hidden md:flex gap-4 md:gap-6 items-center justify-center">
                                    <div className="relative w-48 md:w-56 lg:w-64 h-auto transform -rotate-6 hover:rotate-0 transition-transform duration-500 flex-shrink-0">
                                        <ProgressPhone />
                                    </div>

                                    <div className="relative w-48 md:w-56 lg:w-64 h-auto z-10 transform md:scale-110 hover:scale-115 transition-transform duration-500 flex-shrink-0">
                                        <PhotoPhone />
                                    </div>

                                    <div className="relative w-48 md:w-56 lg:w-64 h-auto transform rotate-6 hover:rotate-0 transition-transform duration-500 flex-shrink-0">
                                        <BudgetPhone />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-3 gap-6 mb-12">
                            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
                                <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mb-4">
                                    <Icon icon={"ph:camera-fill"} width={32} height={32} className="text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">Daily Photo Updates</h3>
                                <p className="text-white/80 text-sm leading-relaxed">
                                    HD photos of your site uploaded daily. See every brick, every beam, every detail as work progresses.
                                </p>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
                                <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mb-4">
                                    <Icon icon={"ph:currency-inr-fill"} width={32} height={32} className="text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">Live Budget Tracking</h3>
                                <p className="text-white/80 text-sm leading-relaxed">
                                    Real-time expense tracking. Know exactly where every rupee goes. Complete financial transparency.
                                </p>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
                                <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mb-4">
                                    <Icon icon={"ph:chats-circle-fill"} width={32} height={32} className="text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">Instant Communication</h3>
                                <p className="text-white/80 text-sm leading-relaxed">
                                    Chat with architects, engineers, and project managers instantly. Get answers in real-time.
                                </p>
                            </div>
                        </div>

                        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8">
                            <div className="grid md:grid-cols-4 gap-6 text-center mb-8">
                                <div>
                                    <div className="text-5xl font-bold text-white mb-2">100%</div>
                                    <p className="text-white/80 text-sm font-semibold">Transparency</p>
                                </div>
                                <div>
                                    <div className="text-5xl font-bold text-white mb-2">24/7</div>
                                    <p className="text-white/80 text-sm font-semibold">Access Anywhere</p>
                                </div>
                                <div>
                                    <div className="text-5xl font-bold text-white mb-2">DAILY</div>
                                    <p className="text-white/80 text-sm font-semibold">Photo Updates</p>
                                </div>
                                <div>
                                    <div className="text-5xl font-bold text-white mb-2">FREE</div>
                                    <p className="text-white/80 text-sm font-semibold">For All Projects</p>
                                </div>
                            </div>

                            <div className="border-t border-white/20 pt-8">
                                <div className="text-center mb-6">
                                    <h3 className="text-2xl font-bold text-white mb-2">Available on All Platforms</h3>
                                    <p className="text-white/80 text-sm">Choose your preferred way to track your project</p>
                                </div>

                                <div className="grid md:grid-cols-3 gap-4 mb-6">
                                    <a href="https://app.walldotbuilders.com/" target="_blank" rel="noopener noreferrer" className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 hover:border-white/40 rounded-xl p-4 text-center transition-all duration-300 hover:scale-105 cursor-pointer group">
                                        <Icon icon={"ph:globe-fill"} width={32} height={32} className="text-white mx-auto mb-2 group-hover:scale-110 transition-transform" />
                                        <h4 className="text-white font-bold text-sm mb-1">Web Access</h4>
                                        <p className="text-white/70 text-xs">Browser-based tracking</p>
                                    </a>
                                    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 text-center">
                                        <Icon icon={"ph:android-logo-fill"} width={32} height={32} className="text-white mx-auto mb-2" />
                                        <h4 className="text-white font-bold text-sm mb-1">Android App</h4>
                                        <p className="text-white/70 text-xs">Google Play Store</p>
                                    </div>
                                    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 text-center">
                                        <Icon icon={"ph:apple-logo-fill"} width={32} height={32} className="text-white mx-auto mb-2" />
                                        <h4 className="text-white font-bold text-sm mb-1">iOS App</h4>
                                        <p className="text-white/70 text-xs">Apple App Store</p>
                                    </div>
                                </div>


                            </div>
                        </div>
                    </div>
                </section>

                {/* 4. SHOWCASE - Project Gallery */}
                <section className="page-break-before">
                    <div className="text-center mb-12">
                        <div className="flex gap-2.5 items-center justify-center mb-3">
                            <Icon icon={"ph:images-fill"} width={20} height={20} className="text-primary" />
                            <p className="text-base font-semibold text-badge dark:text-white/90">Our Portfolio</p>
                        </div>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-52 font-bold tracking-tight text-black dark:text-white mb-3 leading-tight px-4">
                            Completed Projects Showcase
                        </h2>
                        <p className="text-base md:text-lg font-normal text-black/70 dark:text-white/70 leading-relaxed max-w-3xl mx-auto px-4">
                            From luxury villas to modern homes — see the quality we deliver in Kerala
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {propertyHomes.filter(project => project.status === 'completed').slice(0, 4).map((project, index) => (
                            <div key={index} className="relative rounded-2xl overflow-hidden group cursor-pointer h-80">
                                <Image
                                    src={project.images[0].src}
                                    alt={project.name}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                                    unoptimized
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                                    <div className="text-white">
                                        <h3 className="text-xl sm:text-2xl font-bold mb-2">{project.name}</h3>
                                        <p className="text-xs sm:text-sm text-white/80 mb-1">{project.location}</p>
                                        <div className="flex items-center gap-3 text-xs sm:text-sm">
                                            <span className="flex items-center gap-1">
                                                <Icon icon={"solar:bed-linear"} width={16} height={16} />
                                                {project.beds} Beds
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Icon icon={"lineicons:arrow-all-direction"} width={16} height={16} />
                                                {project.area}m²
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="text-center mt-8">
                        <a href="/properties" className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-primary text-primary font-semibold hover:bg-primary hover:text-white transition-all duration-300 cursor-pointer">
                            <Icon icon={"ph:images-fill"} width={20} height={20} />
                            View All Projects
                            <Icon icon={"ph:arrow-right"} width={18} height={18} />
                        </a>
                    </div>
                </section>

                {/* 5. SERVICES - What We Offer */}
                <section className="page-break-avoid">
                    <div className="text-center mb-12">
                        <div className="flex gap-2.5 items-center justify-center mb-3">
                            <Icon icon={"ph:briefcase-fill"} width={20} height={20} className="text-primary" />
                            <p className="text-base font-semibold text-badge dark:text-white/90">Our Services</p>
                        </div>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-52 font-bold tracking-tight text-black dark:text-white mb-3 leading-tight px-4">
                            Complete Construction Solutions
                        </h2>
                        <p className="text-base md:text-lg font-normal text-black/70 dark:text-white/70 leading-relaxed max-w-3xl mx-auto px-4">
                            From planning to handover - we handle everything
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 print-grid">
                        <div className="border-2 border-primary/20 rounded-2xl p-8 hover:border-primary transition-all duration-300 hover:shadow-2xl hover:shadow-primary/20 print-card">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
                                    <Icon icon={"ph:house-fill"} width={32} height={32} className="text-white" />
                                </div>
                                <h3 className="text-xl md:text-2xl font-bold text-black dark:text-white leading-snug">Residential Construction</h3>
                            </div>
                            <p className="text-sm md:text-base text-black/70 dark:text-white/70 mb-6 leading-relaxed">
                                Custom homes, luxury villas, and apartments built with precision, care, and attention to every detail.
                            </p>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="flex items-center gap-2">
                                    <Icon icon={"ph:check-circle-fill"} width={20} height={20} className="text-primary" />
                                    <span className="text-sm font-medium text-black/70 dark:text-white/70">Custom Homes</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Icon icon={"ph:check-circle-fill"} width={20} height={20} className="text-primary" />
                                    <span className="text-sm font-medium text-black/70 dark:text-white/70">Luxury Villas</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Icon icon={"ph:check-circle-fill"} width={20} height={20} className="text-primary" />
                                    <span className="text-sm font-medium text-black/70 dark:text-white/70">Apartments</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Icon icon={"ph:check-circle-fill"} width={20} height={20} className="text-primary" />
                                    <span className="text-sm font-medium text-black/70 dark:text-white/70">Renovations</span>
                                </div>
                            </div>
                        </div>

                        <div className="border-2 border-primary/20 rounded-2xl p-8 hover:border-primary transition-all duration-300 hover:shadow-2xl hover:shadow-primary/20 print-card">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                                    <Icon icon={"ph:buildings-fill"} width={32} height={32} className="text-white" />
                                </div>
                                <h3 className="text-xl md:text-2xl font-bold text-black dark:text-white leading-snug">Commercial Projects</h3>
                            </div>
                            <p className="text-base text-black/70 dark:text-white/70 mb-6 leading-relaxed">
                                Office buildings, retail spaces, and commercial complexes designed for business success.
                            </p>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="flex items-center gap-2">
                                    <Icon icon={"ph:check-circle-fill"} width={20} height={20} className="text-blue-500" />
                                    <span className="text-sm font-medium text-black/70 dark:text-white/70">Office Buildings</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Icon icon={"ph:check-circle-fill"} width={20} height={20} className="text-blue-500" />
                                    <span className="text-sm font-medium text-black/70 dark:text-white/70">Retail Spaces</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Icon icon={"ph:check-circle-fill"} width={20} height={20} className="text-blue-500" />
                                    <span className="text-sm font-medium text-black/70 dark:text-white/70">Warehouses</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Icon icon={"ph:check-circle-fill"} width={20} height={20} className="text-blue-500" />
                                    <span className="text-sm font-medium text-black/70 dark:text-white/70">Mixed-Use</span>
                                </div>
                            </div>
                        </div>

                        <div className="border-2 border-primary/20 rounded-2xl p-8 hover:border-primary transition-all duration-300 hover:shadow-2xl hover:shadow-primary/20 print-card">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
                                    <Icon icon={"ph:key-fill"} width={32} height={32} className="text-white" />
                                </div>
                                <h3 className="text-xl md:text-2xl font-bold text-black dark:text-white leading-snug">Turnkey Solutions</h3>
                            </div>
                            <p className="text-base text-black/70 dark:text-white/70 mb-6 leading-relaxed">
                                Complete end-to-end service from design to handover. Just bring your vision, we handle everything.
                            </p>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="flex items-center gap-2">
                                    <Icon icon={"ph:check-circle-fill"} width={20} height={20} className="text-green-500" />
                                    <span className="text-sm font-medium text-black/70 dark:text-white/70">Design & Planning</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Icon icon={"ph:check-circle-fill"} width={20} height={20} className="text-green-500" />
                                    <span className="text-sm font-medium text-black/70 dark:text-white/70">Construction</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Icon icon={"ph:check-circle-fill"} width={20} height={20} className="text-green-500" />
                                    <span className="text-sm font-medium text-black/70 dark:text-white/70">Interior Work</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Icon icon={"ph:check-circle-fill"} width={20} height={20} className="text-green-500" />
                                    <span className="text-sm font-medium text-black/70 dark:text-white/70">Handover</span>
                                </div>
                            </div>
                        </div>

                        <div className="border-2 border-primary/20 rounded-2xl p-8 hover:border-primary transition-all duration-300 hover:shadow-2xl hover:shadow-primary/20 print-card">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
                                    <Icon icon={"ph:ruler-fill"} width={32} height={32} className="text-white" />
                                </div>
                                <h3 className="text-xl md:text-2xl font-bold text-black dark:text-white leading-snug">Architectural Services</h3>
                            </div>
                            <p className="text-base text-black/70 dark:text-white/70 mb-6 leading-relaxed">
                                Innovative designs that blend aesthetics with functionality. Vastu-compliant modern architecture.
                            </p>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="flex items-center gap-2">
                                    <Icon icon={"ph:check-circle-fill"} width={20} height={20} className="text-purple-500" />
                                    <span className="text-sm font-medium text-black/70 dark:text-white/70">3D Visualization</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Icon icon={"ph:check-circle-fill"} width={20} height={20} className="text-purple-500" />
                                    <span className="text-sm font-medium text-black/70 dark:text-white/70">Vastu Compliance</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Icon icon={"ph:check-circle-fill"} width={20} height={20} className="text-purple-500" />
                                    <span className="text-sm font-medium text-black/70 dark:text-white/70">Sustainable Design</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Icon icon={"ph:check-circle-fill"} width={20} height={20} className="text-purple-500" />
                                    <span className="text-sm font-medium text-black/70 dark:text-white/70">Modern Architecture</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 6. PROCESS - How We Work (Simplified & Visual) */}
                <section className="bg-gradient-to-br from-primary/5 to-transparent rounded-3xl p-8 md:p-12">
                    <div className="text-center mb-12">
                        <div className="flex gap-2.5 items-center justify-center mb-3">
                            <Icon icon={"ph:path-fill"} width={20} height={20} className="text-primary" />
                            <p className="text-base font-semibold text-badge dark:text-white/90">Simple Process</p>
                        </div>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-52 font-bold tracking-tight text-black dark:text-white mb-3 leading-tight px-4">
                            Your Journey to Your Dream Home
                        </h2>
                        <p className="text-base md:text-lg font-normal text-black/70 dark:text-white/70 leading-relaxed max-w-3xl mx-auto px-4">
                            6 clear steps from first call to keys in hand — with full timeline visibility
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 print-grid">
                        {[
                            { num: "01", icon: "ph:handshake-fill", title: "Free Consultation", desc: "Discuss your vision & budget", duration: "1–2 days" },
                            { num: "02", icon: "ph:cube-fill", title: "Design & 3D Plans", desc: "See your home before it's built", duration: "2–4 weeks" },
                            { num: "03", icon: "ph:file-text-fill", title: "Approvals & Permits", desc: "We handle all paperwork", duration: "4–8 weeks" },
                            { num: "04", icon: "ph:hard-hat-fill", title: "Construction Begins", desc: "Daily updates via your mobile app", duration: "8–18 months" },
                            { num: "05", icon: "ph:check-circle-fill", title: "Quality Inspections", desc: "Ongoing checks at every milestone", duration: "Throughout" },
                            { num: "06", icon: "ph:key-fill", title: "Handover Keys", desc: "Move into your dream home", duration: "On agreed date" }
                        ].map((step, index) => (
                            <div key={index} className="relative bg-white dark:bg-dark border border-black/10 dark:border-white/10 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 print-card">
                                <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
                                    <span className="text-xl font-bold text-white">{step.num}</span>
                                </div>
                                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4 mt-2">
                                    <Icon icon={step.icon} width={28} height={28} className="text-primary" />
                                </div>
                                <h3 className="text-xl font-bold text-black dark:text-white mb-2">{step.title}</h3>
                                <p className="text-sm text-black/60 dark:text-white/60 mb-2">{step.desc}</p>
                                <span className="inline-block text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">{step.duration}</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 6.5 COMPARISON - Visual Before/After Value */}
                <section>
                    <div className="text-center mb-12">
                        <div className="flex gap-2.5 items-center justify-center mb-3">
                            <Icon icon={"ph:arrows-left-right-fill"} width={20} height={20} className="text-primary" />
                            <p className="text-base font-semibold text-badge dark:text-white/90">The Difference</p>
                        </div>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-52 font-bold tracking-tight text-black dark:text-white mb-3 leading-tight px-4">
                            With Walldot vs Traditional Construction
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 print-grid">
                        {/* Traditional Way */}
                        <div className="border-2 border-red-200 rounded-2xl p-8 bg-red-50/50 dark:bg-red-900/10 print-card">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                                    <Icon icon={"ph:x-circle-fill"} width={28} height={28} className="text-red-600" />
                                </div>
                                <h3 className="text-2xl font-bold text-red-900 dark:text-red-400">Traditional Way</h3>
                            </div>
                            <ul className="space-y-4">
                                {[
                                    "No project visibility - visit site frequently",
                                    "Hidden costs discovered late",
                                    "Delayed timelines common",
                                    "Poor communication with team",
                                    "No progress documentation",
                                    "Budget overruns frequent"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <Icon icon={"ph:x"} width={20} height={20} className="text-red-600 mt-1 flex-shrink-0" />
                                        <span className="text-sm text-red-900 dark:text-red-300">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Walldot Way */}
                        <div className="border-2 border-green-200 rounded-2xl p-8 bg-gradient-to-br from-green-50 to-primary/5 dark:from-green-900/10 dark:to-primary/10 relative overflow-hidden print-card">
                            <div className="absolute top-4 right-4">
                                <div className="bg-gradient-to-r from-primary to-green-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                                    <Icon icon={"ph:star-fill"} width={12} height={12} />
                                    CLIENT CHOICE
                                </div>
                            </div>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-green-500 flex items-center justify-center">
                                    <Icon icon={"ph:check-circle-fill"} width={28} height={28} className="text-white" />
                                </div>
                                <h3 className="text-2xl font-bold text-green-900 dark:text-green-400">With Walldot Builders</h3>
                            </div>
                            <ul className="space-y-4">
                                {[
                                    "24/7 mobile tracking from anywhere",
                                    "Itemized, transparent pricing before work begins",
                                    "Committed to on-time project delivery",
                                    "Direct chat with entire team",
                                    "Daily photo & video updates",
                                    "Real-time budget monitoring"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <Icon icon={"ph:check-circle-fill"} width={20} height={20} className="text-green-600 mt-1 flex-shrink-0" />
                                        <span className="text-sm font-medium text-green-900 dark:text-green-300">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Stats Comparison */}
                    <div className="mt-8 grid md:grid-cols-4 gap-4">
                        <div className="bg-gradient-to-br from-primary/10 to-transparent border border-primary/20 rounded-xl p-6 text-center">
                            <div className="text-4xl font-bold text-primary mb-2">✓</div>
                            <p className="text-sm text-black/70 dark:text-white/70">On-Time Focus</p>
                        </div>
                        <div className="bg-gradient-to-br from-green-500/10 to-transparent border border-green-500/20 rounded-xl p-6 text-center">
                            <div className="text-4xl font-bold text-green-600 mb-2">Full</div>
                            <p className="text-sm text-black/70 dark:text-white/70">Transparency</p>
                        </div>
                        <div className="bg-gradient-to-br from-blue-500/10 to-transparent border border-blue-500/20 rounded-xl p-6 text-center">
                            <div className="text-4xl font-bold text-blue-600 mb-2">24/7</div>
                            <p className="text-sm text-black/70 dark:text-white/70">Project Access</p>
                        </div>
                        <div className="bg-gradient-to-br from-purple-500/10 to-transparent border border-purple-500/20 rounded-xl p-6 text-center">
                            <div className="text-4xl font-bold text-purple-600 mb-2">0%</div>
                            <p className="text-sm text-black/70 dark:text-white/70">Hidden Costs</p>
                        </div>
                    </div>
                </section>

                {/* 7. WHY CHOOSE US - Competitive Advantages */}
                <section>
                    <div className="text-center mb-12">
                        <div className="flex gap-2.5 items-center justify-center mb-3">
                            <Icon icon={"ph:trophy-fill"} width={20} height={20} className="text-primary" />
                            <p className="text-base font-semibold text-badge dark:text-white/90">Why Choose Walldot</p>
                        </div>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-52 font-bold tracking-tight text-black dark:text-white mb-3 leading-tight px-4">
                            The Walldot Advantage
                        </h2>
                        <p className="text-base md:text-lg font-normal text-black/70 dark:text-white/70 leading-relaxed max-w-3xl mx-auto px-4">
                            What makes us a trusted construction partner in Kerala
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 print-grid">
                        {[
                            { icon: "ph:device-mobile-fill", title: "Mobile Project Tracking", desc: "Kerala's only 24/7 live site monitoring app — track everything from anywhere", color: "from-blue-500 to-blue-600" },
                            { icon: "ph:shield-check-fill", title: "Quality Commitment", desc: "ISI-certified materials from authorized dealers — no compromise on standards", color: "from-green-500 to-green-600" },
                            { icon: "ph:clock-fill", title: "On-Time Focused", desc: "We prioritize your timeline with proactive project management and regular updates", color: "from-orange-500 to-orange-600" },
                            { icon: "ph:currency-inr-fill", title: "Transparent Pricing", desc: "Zero hidden costs. Itemized quotations. What you see is what you pay", color: "from-purple-500 to-purple-600" },
                            { icon: "ph:users-three-fill", title: "In-House Expert Team", desc: "Trained engineers, masons & supervisors — no sub-contracting your project", color: "from-red-500 to-red-600" },
                            { icon: "ph:medal-fill", title: "Structural Warranty", desc: "Post-construction structural support on foundations, columns & roof — as per warranty terms", color: "from-teal-500 to-teal-600" }
                        ].map((item, index) => (
                            <div key={index} className="border border-black/10 dark:border-white/10 rounded-2xl p-6 hover:shadow-2xl transition-all duration-300 hover:scale-105 group cursor-pointer print-card">
                                <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                                    <Icon icon={item.icon} width={32} height={32} className="text-white" />
                                </div>
                                <h3 className="text-lg md:text-xl font-bold text-black dark:text-white mb-2 leading-snug">{item.title}</h3>
                                <p className="text-sm md:text-base text-black/70 dark:text-white/70 leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 8. TRUST INDICATORS - Certifications & Quality */}
                <section className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-black/10 dark:border-white/10 rounded-3xl p-8 md:p-12">
                    <div className="text-center mb-12">
                        <div className="flex gap-2.5 items-center justify-center mb-3">
                            <Icon icon={"ph:certificate-fill"} width={20} height={20} className="text-primary" />
                            <p className="text-base font-semibold text-badge dark:text-white/90">Quality Assurance</p>
                        </div>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-52 font-bold tracking-tight text-black dark:text-white mb-3 leading-tight px-4">
                            Certified Quality Standards
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 print-grid">
                        <div className="bg-white dark:bg-dark border border-black/10 dark:border-white/10 rounded-2xl p-8 text-center print-card">
                            <Icon icon={"ph:certificate-fill"} width={48} height={48} className="text-primary mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-black dark:text-white mb-2">Certified Materials</h3>
                            <p className="text-sm text-black/60 dark:text-white/60">ISI-certified cement, steel & bricks from authorized dealers only — no compromises</p>
                        </div>
                        <div className="bg-white dark:bg-dark border border-black/10 dark:border-white/10 rounded-2xl p-8 text-center print-card">
                            <Icon icon={"ph:shield-checkered-fill"} width={48} height={48} className="text-primary mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-black dark:text-white mb-2">Structural Warranty</h3>
                            <p className="text-sm text-black/60 dark:text-white/60">Foundation, columns & roof covered under our post-construction structural support program</p>
                        </div>
                        <div className="bg-white dark:bg-dark border border-black/10 dark:border-white/10 rounded-2xl p-8 text-center print-card">
                            <Icon icon={"ph:users-fill"} width={48} height={48} className="text-primary mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-black dark:text-white mb-2">In-House Skilled Workforce</h3>
                            <p className="text-sm text-black/60 dark:text-white/60">Trained engineers, masons & supervisors on our payroll — never sub-contracted</p>
                        </div>
                    </div>
                </section>

                {/* 9. CTA - Contact Section (Strong Call to Action) */}
                <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary/90 to-primary/80 p-8 md:p-16 page-break-before">
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
                        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
                    </div>
                    <div className="relative z-10 text-center">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 md:mb-6 leading-tight px-4">
                            Your Dream Home Deserves a Builder You Can Watch Over — 24/7
                        </h2>
                        <p className="text-base sm:text-lg md:text-xl text-white/90 mb-6 md:mb-8 max-w-3xl mx-auto leading-relaxed px-4">
                            Call now for your free initial consultation — our team will walk you through the project process, discuss your vision, and help you plan your next steps.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center mb-8 md:mb-12 px-4">
                            <a 
                                href="/contactus"
                                className="inline-flex items-center justify-center gap-2 md:gap-3 px-6 py-3 md:px-8 md:py-4 rounded-full bg-white text-primary text-sm md:text-base lg:text-lg font-bold hover:bg-white/90 transition-all duration-300 hover:scale-105 shadow-2xl cursor-pointer"
                            >
                                <Icon icon={"ph:phone-fill"} width={20} height={20} className="md:w-6 md:h-6" />
                                <span>Book Free Consultation</span>
                                <Icon icon={"ph:arrow-right"} width={20} height={20} className="md:w-6 md:h-6" />
                            </a>
                            <a 
                                href="https://wa.me/919074954874?text=Hi%2C+I+saw+your+brochure+and+I%27m+interested+in+a+free+consultation"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-2 md:gap-3 px-6 py-3 md:px-8 md:py-4 rounded-full bg-green-500 hover:bg-green-600 text-white text-sm md:text-base lg:text-lg font-bold transition-all duration-300 hover:scale-105 shadow-xl cursor-pointer"
                            >
                                <Icon icon={"ph:whatsapp-logo-fill"} width={20} height={20} className="md:w-6 md:h-6" />
                                <span className="whitespace-nowrap">WhatsApp Us Now</span>
                            </a>
                            <a 
                                href="tel:+919074954874"
                                className="inline-flex items-center justify-center gap-2 md:gap-3 px-6 py-3 md:px-8 md:py-4 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm md:text-base lg:text-lg font-bold hover:bg-white/30 transition-all duration-300 border-2 border-white/30 cursor-pointer"
                            >
                                <Icon icon={"ph:phone-call-fill"} width={20} height={20} className="md:w-6 md:h-6" />
                                <span className="whitespace-nowrap">Call: +91-9074-9548-74</span>
                            </a>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                            <div className="text-center">
                                <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-3">
                                    <Icon icon={"ph:map-pin-fill"} width={28} height={28} className="text-white" />
                                </div>
                                <h3 className="text-white font-bold mb-1">Visit Us</h3>
                                <p className="text-white/80 text-sm">West Fort, Thrissur, Kerala</p>
                            </div>
                            <div className="text-center">
                                <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-3">
                                    <Icon icon={"ph:envelope-fill"} width={28} height={28} className="text-white" />
                                </div>
                                <h3 className="text-white font-bold mb-1">Email Us</h3>
                                <p className="text-white/80 text-sm">info@walldotbuilders.com</p>
                            </div>
                            <div className="text-center">
                                <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-3">
                                    <Icon icon={"ph:clock-fill"} width={28} height={28} className="text-white" />
                                </div>
                                <h3 className="text-white font-bold mb-1">Working Hours</h3>
                                <p className="text-white/80 text-sm">Mon–Sat: 9AM–6PM</p>
                                <p className="text-white/60 text-xs mt-1">WhatsApp: 24/7</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <section className="text-center py-8 border-t border-black/10 dark:border-white/10">
                    <div className="mb-6">
                        <h3 className="text-2xl font-bold text-black dark:text-white mb-2">Walldot Builders</h3>
                        <p className="text-sm text-black/60 dark:text-white/60 mb-4">
                            Building Dreams. Creating Homes. Since 2022
                        </p>
                        <p className="text-sm text-black/50 dark:text-white/50">
                            Licensed &amp; Insured | Serving All of Kerala | Vastu-Friendly Designs
                        </p>
                    </div>
                    <div className="flex items-center justify-center gap-4">
                        <a href="https://www.facebook.com/walldotbuilders" target="_blank" rel="noopener noreferrer" className="text-black/50 dark:text-white/50 hover:text-primary transition-colors cursor-pointer">
                            <Icon icon={"ph:facebook-logo-fill"} width={24} height={24} />
                        </a>
                        <a href="https://www.instagram.com/walldotbuilders" target="_blank" rel="noopener noreferrer" className="text-black/50 dark:text-white/50 hover:text-primary transition-colors cursor-pointer">
                            <Icon icon={"ph:instagram-logo-fill"} width={24} height={24} />
                        </a>
                        <a href="https://www.linkedin.com/company/walldotbuilders" target="_blank" rel="noopener noreferrer" className="text-black/50 dark:text-white/50 hover:text-primary transition-colors cursor-pointer">
                            <Icon icon={"ph:linkedin-logo-fill"} width={24} height={24} />
                        </a>
                        <a href="https://www.youtube.com/@walldotbuilders" target="_blank" rel="noopener noreferrer" className="text-black/50 dark:text-white/50 hover:text-primary transition-colors cursor-pointer">
                            <Icon icon={"ph:youtube-logo-fill"} width={24} height={24} />
                        </a>
                    </div>
                    <p className="text-sm text-black/50 dark:text-white/50 mt-6">
                        © {new Date().getFullYear()} Walldot Builders. All rights reserved.
                    </p>
                </section>
            </div>
        </div>
        </div>
    );
}
