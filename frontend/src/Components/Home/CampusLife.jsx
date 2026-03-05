import React, { Suspense, lazy } from 'react';
import EventCard from '../Events/EventCard';
import useReveal from '../../common/Reveal';

// Image imports
import delhi_darshan from '../../assets/imagesv2/CampusLife/DelhiDarshan.webp';
import fresher_orientation from '../../assets/imagesv2/CampusLife/FresherOrientation.webp';
import info_session from '../../assets/imagesv2/CampusLife/InfoSession.webp';
import speranza from '../../assets/imagesv2/CampusLife/Speranza.webp';
import stic_dinner from '../../assets/imagesv2/CampusLife/STICDinner.webp';
import suit_camp from '../../assets/imagesv2/CampusLife/SuitCamp.webp';

// Lazy load the heavy animation to save initial RAM
const GalleryAnimation = lazy(() => import('../Gallery/GalleryAnimation'));

const campusEvents = [
    { number: "1", title: "Fresher's Orientation", tagline: "Start Here, Stress-Free", description: "Your first few days decide how comfortable you feel on campus...", color: "bg-[#0198FF]", image: fresher_orientation },
    { number: "2", title: "Speranza", tagline: "The Freshers-Only Fest", description: "Speranza is the freshers-only fest held about a month after arriving...", color: "bg-[#F0C826] text-black", image: speranza },
    { number: "3", title: "STIC Dinner", tagline: "Students and Professors, Same Table", description: "An informal dinner where students and professors sit together...", color: "bg-[#2EBF70]", image: stic_dinner },
    { number: "4", title: "Suit Camp", tagline: "Dress for the Opportunity", description: "A student initiative that provides access to formal wear...", color: "bg-[#E74B8B]", image: suit_camp },
    { number: "5", title: "Information Session", tagline: "Clarity, Not Confusion", description: "Dedicated sessions that clear common student doubts...", color: "bg-[#173962]", image: info_session },
    { number: "6", title: "Delhi Darshan", tagline: "Discover the City Together", description: "Organized outings that help students explore Delhi...", color: "bg-[#0198FF]", image: delhi_darshan }
];

const CampusLife = () => {
    const [headerRef, headerVisible] = useReveal();
    const [gridRef, gridVisible] = useReveal({ threshold: 0.05 });

    return (
        <section className="pt-20 bg-white dark:bg-neutral-900 transition-colors duration-300 overflow-x-hidden">
            <div className="mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Header */}
                <div 
                    ref={headerRef}
                    className={`mb-12 transition-all duration-700 will-change-transform ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                >
                    <h2 className="text-5xl md:text-6xl font-bold text-[#4D4D4D] dark:text-gray-100 mb-4 font-montserrat tracking-tight">
                        Campus Life, Done <br className="hidden md:block" />
                        <span className="text-[#4D4D4D] dark:text-[#888]">Right!</span>
                    </h2>
                    <p className="text-xl text-gray-600 font-semibold font-inter dark:text-gray-400 max-w-2xl">
                        The initiatives that make your IIT Delhi journey smoother, richer, and more memorable.
                    </p>
                </div>

                {/* Grid */}
                <div 
                    ref={gridRef}
                    className={`grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 transition-all duration-700 delay-200 ${gridVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                >
                    {campusEvents.map((event, index) => (
                        <EventCard key={index} {...event} />
                    ))}
                </div>
            </div>

            {/* Gallery with loading skeleton to prevent layout shift */}
            <Suspense fallback={<div className="h-[400px] w-full" />}>
                <GalleryAnimation />
            </Suspense>
        </section>
    );
};

export default CampusLife;