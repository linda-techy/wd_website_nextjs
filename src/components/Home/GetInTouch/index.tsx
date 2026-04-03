"use client";
import Image from 'next/image';
import Link from 'next/link';
import BrochureButton from "@/components/shared/BrochureButton";

const GetInTouch: React.FC = () => {
    return (
        <section>
            <div className='container max-w-8xl mx-auto px-4 sm:px-5 2xl:px-0'>
                <div className="relative rounded-t-2xl overflow-hidden">
                    <Image
                        src="/images/get-in-touch-bg.jpg"
                        alt="Kerala luxury interior"
                        fill
                        quality={75}
                        loading="lazy"
                        className="object-cover -z-10"
                    />

                    <div className="bg-black/30 py-8 sm:py-10 md:py-12 lg:py-14">
                        <div className="flex flex-col items-center gap-5 sm:gap-6 md:gap-8">
                            <h2 className='text-white text-2xl md:text-40 lg:text-52 max-w-3/4 text-center font-bold leading-tight tracking-tight px-4'>
                                Where thoughtful design meets
                                quality construction.
                            </h2>
                            <div className="flex flex-wrap gap-4 justify-center">
                                <Link href="/contactus" className='bg-white py-4 px-8 rounded-full text-dark hover:bg-dark hover:text-white duration-300 font-semibold' title="Contact best construction company in Kerala">
                                    Get In Touch
                                </Link>
                                <Link href="/tools/home-cost-calculator" className='bg-primary border-2 border-white py-4 px-8 rounded-full text-white hover:bg-white hover:text-dark duration-300 font-semibold' title="Calculate construction cost">
                                    Free Cost Calculator
                                </Link>
                                <BrochureButton variant="white" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full py-5 bg-primary rounded-b-2xl overflow-hidden">
                    <div className="flex items-center gap-40 animate-slide">
                        <Link href="/residential-homes" className='text-white text-base md:text-lg font-semibold whitespace-nowrap relative after:absolute after:w-20 after:h-px after:bg-white after:top-3 after:-right-32 hover:underline'>
                            BUILD YOUR DREAM HOME WITH WALLDOT BUILDERS — QUALITY YOU CAN TRUST!
                        </Link>
                        <Link href="/tools/home-cost-calculator" className='text-white text-base md:text-lg font-semibold whitespace-nowrap relative after:absolute after:w-20 after:h-px after:bg-white after:top-3 after:-right-32 hover:underline'>
                            GET A FREE COST ESTIMATE — START YOUR HOME CONSTRUCTION JOURNEY TODAY!
                        </Link>
                        <Link href="/partnerships" className='text-white text-base md:text-lg font-semibold whitespace-nowrap relative after:absolute after:w-20 after:h-px after:bg-white after:top-3 after:-right-32 hover:underline'>
                            REFERRAL PARTNERSHIP — GROW YOUR BUSINESS WITH KERALA&apos;S TRUSTED BUILDERS
                        </Link>
                        <Link href="/referrals" className='text-white text-base md:text-lg font-semibold whitespace-nowrap relative after:absolute after:w-20 after:h-px after:bg-white after:top-3 after:-right-32 hover:underline'>
                            REFER A FRIEND — HELP OTHERS BUILD THEIR DREAM HOMES!
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default GetInTouch;