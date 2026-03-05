import React from 'react';
import useReveal from '../../common/Reveal';

const EventsHeader = () => {
    const [ref, visible] = useReveal();

    // Replace with your actual banner image path
    const bgImage = "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=2000"; 

    return (
        // Outer container handles the whitespace/background behind the card
        <div className="w-full bg-gray/800 dark:bg-neutral-900 pt-4 pb-10 px-4 md:px-2 transition-colors duration-300">
            
            {/* The Floating Banner Card */}
            <div 
                ref={ref}
                className={`relative w-full max-w-[98%] mx-auto h-[400px] md:h-[600px] rounded-[2.5rem] overflow-hidden shadow-sm transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            >
                {/* Background Image */}
                <div className="absolute inset-0">
                    <img 
                        src={bgImage} 
                        alt="Events Banner" 
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                    {/* Subtle Overlay to ensure text pops against any image */}
                    <div className="absolute inset-0 bg-black/20 dark:bg-black/40"></div>
                </div>

                {/* Centered Title */}
                <div className="relative z-10 w-full h-full flex items-center justify-center">
                    <h1 className="text-6xl md:text-8xl font-bold font-montserrat text-white tracking-tight drop-shadow-xl">
                        Events
                    </h1>
                </div>
            </div>
        </div>
    );
};

export default EventsHeader;