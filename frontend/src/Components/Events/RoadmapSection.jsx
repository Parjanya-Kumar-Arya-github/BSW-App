import React from 'react';
import useReveal from '../../common/Reveal';

const RoadmapItem = ({ month, event, highlight = false }) => {
    return (
        <div 
            className={`group flex items-center justify-between p-4 md:p-6 rounded-2xl mb-4 transition-colors duration-300 cursor-default
            ${highlight 
                ? 'bg-[#e9fbf7] dark:bg-[#20AA9D]/20' 
                : 'hover:bg-[#ccffe5] dark:hover:bg-white/5 bg-transparent'
            }`}
        >
            <div className="flex items-center gap-4 md:gap-8 w-full">
                {/* Month: Responsive width and text size. Added group-hover for color sync */}
                <span 
                    className={`text-2xl md:text-4xl font-black uppercase w-20 md:w-32 flex-shrink-0 transition-colors duration-300 
                    ${highlight 
                        ? 'text-[#20AA9D]' 
                        : 'text-gray-300 dark:text-gray-600 group-hover:text-[#249ea0] dark:group-hover:text-gray-400'
                    }`}
                >
                    {month}
                </span>
                
                {/* Event: Responsive text size */}
                <span 
                    className={`text-lg md:text-3xl lg:text-4xl font-bold font-montserrat 
                    ${highlight 
                        ? 'text-black dark:text-white' 
                        : 'text-gray-950 dark:text-gray-400 group-hover:text-black dark:group-hover:text-gray-200'
                    }`}
                >
                    {event}
                </span>
            </div>
        </div>
    );
};

const RoadmapSection = () => {
    const [ref, visible] = useReveal();

    const timeline = [
        { month: "Aug", event: "Orientation & Freshers Night", highlight: false },
        { month: "Sep", event: "Speranza Festival", highlight: false },
        { month: "Oct", event: "Delhi Darshan Tour", highlight: false },
        { month: "Jan", event: "Suit Camp & Intern Prep", highlight: false },
        { month: "Mar", event: "STIC Faculty Dinner", highlight: false },
    ];

    return (
        <section className="py-16 md:py-24 bg-white dark:bg-neutral-900 transition-colors duration-300">
            <div 
                ref={ref}
                // CHANGED: max-w-7xl decreases the empty side space significantly
                className={`max-w-7xl mx-auto px-4 md:px-8 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            >
                {/* Responsive Heading: text-4xl on mobile, text-7xl on desktop */}
                <h2 className="text-7xl md:text-7xl font-bold text-gray-800 dark:text-gray-100 mb-8 md:mb-12 font-montserrat">
                    Event Roadmap
                </h2>
                
                <div className="border-t border-gray-100 dark:border-neutral-800 pt-6 md:pt-8">
                    {timeline.map((item, idx) => (
                        <RoadmapItem key={idx} {...item} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default RoadmapSection;