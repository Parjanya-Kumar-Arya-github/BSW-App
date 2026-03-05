import React from 'react';
import useReveal from '../../common/Reveal';

const StatItem = ({ number, label }) => {
    return (
        <div className="text-center p-4 border-r border-gray-700 last:border-0 border-b md:border-b-0">
            <h3 className="text-4xl md:text-6xl font-black text-white mb-2 italic font-montserrat">
                {number}
            </h3>
            <p className="text-[#2dd4b6] font-bold tracking-widest text-sm uppercase">
                {label}
            </p>
        </div>
    );
};

const ImpactSection = () => {
    const [ref, visible] = useReveal();

    return (
        <section className="bg-[#111827] py-20"> {/* Dark navy background */}
            <div 
                ref={ref}
                className={`max-w-7xl mx-auto px-4 text-center transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            >
                <div className="mb-12">
                    {/* <p className="text-gray-400 uppercase tracking-[0.3em] text-xs font-bold mb-4">The Scale of BSW</p> */}
                    <h2 className="text-4xl md:text-7xl font-bold text-white font-montserrat">
                        Impact by Numbers
                    </h2>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-0 md:gap-8 border-t border-b border-gray-800 py-12">
                    <StatItem number="40+" label="Events Per Year" />
                    <StatItem number="150+" label="Active Volunteers" />
                    <StatItem number="12,000+" label="Student Outreach" />
                    <StatItem number="50+" label="Years of Legacy" />
                </div>
            </div>
        </section>
    );
};

export default ImpactSection;