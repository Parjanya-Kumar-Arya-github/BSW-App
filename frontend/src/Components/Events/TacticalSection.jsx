import React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import useReveal from '../../common/Reveal';
import stickDinner from "../../assets/imagesv2/CampusLife/STICDinner.webp";
import suitCamp from "../../assets/imagesv2/CampusLife/SuitCamp.webp";

const TacticalCard = ({ title, description, image }) => {
    const [ref, visible] = useReveal({ threshold: 0.1 });

    return (
        <div 
            ref={ref}
            className={`
                group bg-white dark:bg-neutral-900 rounded-2xl p-4 md:p-6 
                shadow-sm hover:shadow-2xl border border-gray-100 dark:border-neutral-800 
                transition-all duration-500 mb-6 flex flex-col md:flex-row items-center gap-8
                ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
            `}
        >
            {/* Image Thumbnail - Optimized sizing and GPU acceleration */}
            <div className="w-full md:w-72 h-48 rounded-xl overflow-hidden flex-shrink-0 transform-gpu">
                <img 
                    src={image} 
                    alt={title} 
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                />
            </div>

            {/* Content - Improved typography and spacing */}
            <div className="flex-grow text-center md:text-left">
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-3 font-montserrat tracking-tight">
                    {title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-base md:text-lg leading-relaxed max-w-2xl font-inter">
                    {description}
                </p>
            </div>

            {/* Action Button - Corrected Dark Mode Logic */}
            <div className="flex-shrink-0">
                <button 
                    aria-label={`Learn more about ${title}`}
                    className="
                        w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300
                        bg-black text-white 
                        dark:bg-white dark:text-black
                        hover:bg-[#20AA9D] dark:hover:bg-[#20AA9D] hover:text-white dark:hover:text-white
                        hover:scale-110
                    "
                >
                    <FaArrowRight className="text-xl -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                </button>
            </div>
        </div>
    );
};

const TacticalSection = () => {
    const initiatives = [
        {
            title: "STIC Dinner",
            description: "An informal dinner where students and professors sit together to talk openly, share ideas, and discuss campus life beyond classrooms.",
            image: stickDinner 
        },
        {
            title: "Suit Camp",
            description: "A student initiative that provides access to formal wear for placements, interviews, and formal occasions without added expense.",
            image: suitCamp
        }
    ];

    return (
        <section className="py-20 bg-gray-50 dark:bg-neutral-950 transition-colors duration-500 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 md:px-10">
                <h2 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-16 font-montserrat tracking-tighter">
                    Tactical <span className="text-gray-400">Initiatives</span>
                </h2>
                
                <div className="flex flex-col">
                    {initiatives.map((item, idx) => (
                        <TacticalCard key={idx} {...item} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TacticalSection;