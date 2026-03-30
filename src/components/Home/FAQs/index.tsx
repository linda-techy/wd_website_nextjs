"use client";

import { useRef } from 'react';
import { Icon } from '@iconify/react';
import Image from 'next/image';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

const FAQ: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (imageRef.current) {
            gsap.fromTo(imageRef.current, 
                { scale: 1.05, opacity: 0, clipPath: 'inset(10% 10% 10% 10%)' }, 
                {
                    scale: 1, opacity: 1, clipPath: 'inset(0% 0% 0% 0%)', duration: 1.5, ease: 'power4.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 85%",
                    }
                }
            );
        }
        if (contentRef.current) {
            gsap.fromTo(contentRef.current.children, 
                { y: 30, opacity: 0 }, 
                {
                    y: 0, opacity: 1, stagger: 0.1, duration: 1, ease: 'power3.out', delay: 0.2,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 85%",
                    }
                }
            );
        }
    }, { scope: sectionRef });

    return (
        <section id='faqs' ref={sectionRef}>
            <div className='container max-w-8xl mx-auto px-4 sm:px-5 2xl:px-0'>
                <div className="grid lg:grid-cols-2 gap-6 sm:gap-7 md:gap-8">
                    <div ref={imageRef} className='lg:mx-0 mx-auto'>
                        <Image
                            src="/images/faqs/faq-image.jpg"
                            alt='image'
                            width={680}
                            height={644}
                            className='lg:w-full'
                            unoptimized={true}
                        />
                    </div>
                    <div ref={contentRef} className='lg:px-12'>
                        <p className="text-dark/75 dark:text-white/75 text-base md:text-lg font-semibold flex gap-2 mb-3">
                            <Icon icon="ph:house-simple-fill" className="text-2xl text-primary " />
                            FAQs
                        </p>
                        <h2 className='text-3xl md:text-40 lg:text-52 leading-tight tracking-tight font-bold text-dark dark:text-white mb-4'>
                            Everything about Walldot Builders
                        </h2>
                        <p className='text-dark/70 dark:text-white/70 text-base md:text-lg leading-relaxed pr-0 md:pr-20'>
                            We understand that building a home is a big decision. That's why Walldot Builders is here to guide you every step of the way — from planning to handing over the keys. Below are some common questions to help you understand our process better:
                        </p>
                        <div className="my-8">
                            <Accordion type="single" defaultValue="item-1" collapsible className="w-full flex flex-col gap-6">
                                <AccordionItem value="item-1">
                                    <AccordionTrigger>1. Can I personalize my home with Walldot Builders?</AccordionTrigger>
                                    <AccordionContent>
                                        Yes, absolutely. We offer full customization options — from layout changes to material selection — so your home reflects your unique taste and lifestyle.
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-2">
                                    <AccordionTrigger>2. Where do Walldot Builders operate?</AccordionTrigger>
                                    <AccordionContent>
                                        We offer home construction services across Kerala, delivering personalized solutions based on each client’s location and needs. Our team ensures every project — whether a city home or a countryside retreat — is built with precision and care.
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-3">
                                    <AccordionTrigger>3. What are the steps to build a home with Walldot Builders?</AccordionTrigger>
                                    <AccordionContent>
                                        It starts with a consultation. We discuss your requirements, provide a detailed estimate, design your plan, handle permits, and begin construction with regular updates — all the way to final handover.
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FAQ;
