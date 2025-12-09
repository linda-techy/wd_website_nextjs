import React, { FC } from "react";
import { Icon } from "@iconify/react/dist/iconify.js"

interface HeroSubProps {
    title: string;
    description: string;
    badge: string;
}

const HeroSub: FC<HeroSubProps> = ({ title, description, badge }) => {

    return (
        <>
            <section className="text-center bg-cover !pt-40 pb-20 relative overflow-x-hidden" >
                <div className='flex gap-2.5 items-center justify-center mb-3'>
                    <span>
                        <Icon
                            icon={'ph:house-simple-fill'}
                            width={24}
                            height={24}
                            className='text-primary'
                        />
                    </span>
                    <p className='text-base md:text-lg font-semibold text-dark/75 dark:text-white/75'>
                        {badge}
                    </p>
                </div>
                <h2 className="text-dark text-3xl md:text-40 lg:text-52 relative font-bold dark:text-white leading-tight tracking-tight mb-4 px-4" >{title}</h2>
                <p className="text-base md:text-lg text-dark/70 dark:text-white/70 font-normal w-full max-w-3xl mx-auto leading-relaxed px-4">
                    {description}
                </p>
            </section>
        </>
    );
};

export default HeroSub;