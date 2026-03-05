import React from 'react';
import {
    FaMoneyBillWave,
    FaUniversity,
    FaGraduationCap,
    FaFilePdf,
    FaArrowRight,
} from 'react-icons/fa';
import useReveal from '../common/Reveal';

const Booklets = () => {
    const [headerRef, headerVisible] = useReveal();
    const [contentRef, contentVisible] = useReveal();

    const resources = [
        {
            title: 'BSW Finance Booklet',
            description:
                'Know the procedure on how to pass a bill for any Board of IIT Delhi. Essential for club representatives.',
            link: '/booklets/f_book.pdf',
            icon: FaMoneyBillWave,
        },
        {
            title: 'BSW Academic Booklet',
            description:
                'A short and precise booklet explaining important academic rules in simplified language.',
            link: '/booklets/a_bookcomp.pdf',
            icon: FaUniversity,
        },
        {
            title: 'BSW Scholarships Booklet',
            description:
                'Comprehensive information on scholarships, eligibility criteria, and application processes.',
            link: '/booklets/s_book.pdf',
            icon: FaGraduationCap,
        },
    ];

    return (
        <div className="min-h-screen bg-transparent dark:bg-[#0f0f0f] pt-8 pb-20 transition-colors">
            <div className="max-w-7xl mx-auto px-4">

                {/* Header Banner with Blobs */}
                <div 
                    ref={headerRef} 
                    className={`
                        relative w-full overflow-hidden rounded-[3rem] p-10 md:p-16 bg-white dark:bg-slate-900 mb-12
                        transition-all duration-700 ease-out transform
                        shadow-2xl border border-gray-200 dark:border-gray-700
                        ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
                    `}
                >
                     {/* --- BACKGROUND BLOBS START --- */}
            
                    {/* Blob 1: Pink/Lavender (Bottom Left) */}
                    <div
                    className="absolute pointer-events-none bg-[#fbcfe8] dark:bg-[#500724]"
                    style={{
                        bottom: '-20%',
                        left: '-5%',
                        width: '500px', 
                        height: '600px', 
                        filter: 'blur(40px)',
                        borderRadius: '50%',
                        zIndex: 0,
                        animation: 'blob 7s infinite', 
                    }}
                    />

                    {/* Blob 2: Middle/Transition Purple */}
                    <div
                    className="absolute pointer-events-none bg-[#c083eb] dark:bg-[#581c87]"
                    style={{
                        top: '25%',
                        right: '45%', 
                        width: '350px', 
                        height: '350px', 
                        opacity: 0.3,
                        filter: 'blur(80px)',
                        borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
                        transform: 'rotate(-30deg)',
                        zIndex: 0,
                        animation: 'blob-reverse 8s infinite', 
                        animationDelay: '1s',
                    }}
                    />

                    {/* Blob 3: Deep Blue with 3-Step DIAGONAL Gradient */}
                    <div
                    className="
                        absolute pointer-events-none 
                        bg-[linear-gradient(75deg,#656df7_0%,#9DA2F3_70%,#f5f5f5_80%)]
                        dark:bg-[linear-gradient(75deg,#1e1b4b_0%,#312e81_70%,#4338ca_80%)]
                    "
                    style={{
                        top: '-23%',
                        right: '-2%',
                        width: '450px', 
                        height: '450px', 
                        opacity: 1,
                        filter: 'blur(20px)', 
                        borderRadius: '30% 70% 70% 50% / 30% 30% 65% 70%',
                        transform: 'rotate(-30deg)',
                        zIndex: 0,
                        animation: 'blob 7s infinite', 
                        animationDelay: '2s',
                    }}
                    />

                    {/* Blob 4: Deep Purple blob in middle of top edge */}
                    <div
                    className="
                        absolute pointer-events-none
                        bg-[linear-gradient(75deg,#fadef0_0%,#7d83f793_80%)]
                        dark:bg-[linear-gradient(75deg,#4a044e_0%,#2e1065_80%)]
                    "
                    style={{
                        top: '-23%',
                        right: '30%',
                        width: '380px', 
                        height: '380px', 
                        opacity: 0.7,
                        filter: 'blur(20px)', 
                        borderRadius: '30% 70% 70% 50% / 30% 30% 65% 70%',
                        transform: 'rotate(-30deg)',
                        zIndex: 0,
                        animation: 'blob-reverse 8s infinite', 
                        animationDelay: '0.5s', 
                    }}
                    />
                    
                    {/* Style block for the blob animation keyframes */}
                    <style>
                      {`
                        @keyframes blob {
                          0% { transform: translate(0px, 0px) scale(1); }
                          33% { transform: translate(60px, -80px) scale(1.2); }
                          66% { transform: translate(-40px, 40px) scale(0.85); }
                          100% { transform: translate(0px, 0px) scale(1); }
                        }
                        @keyframes blob-reverse {
                          0% { transform: translate(0px, 0px) scale(1); }
                          33% { transform: translate(-50px, 60px) scale(1.15); }
                          66% { transform: translate(30px, -30px) scale(0.9); }
                          100% { transform: translate(0px, 0px) scale(1); }
                        }
                      `}
                    </style>
                    
                    {/* Glass Overlay */}
                    <div className="absolute inset-0 z-0 bg-white/30 backdrop-blur-[1px] dark:bg-slate-900/30" />
                    {/* --- BACKGROUND BLOBS END --- */}

                    <div className="relative z-10 max-w-3xl mx-auto text-center">
                        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight leading-tight">
                            Essential <span className="text-[#20AA9D]">Booklets</span>
                        </h1>
                        <p className="text-lg text-slate-700 dark:text-slate-300 font-medium max-w-2xl mx-auto">
                            Simplified guides covering finances, academics, and scholarships — curated for IIT Delhi students.
                        </p>
                    </div>
                </div>

                {/* Content */}
                <div
                    ref={contentRef}
                    className={`
                        transition-all duration-700 delay-100
                        ${contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
                    `}
                >
                    {/* Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {resources.map((item, index) => (
                            <a
                                key={index}
                                href={item.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="
                                    group
                                    bg-white dark:bg-[#121212]
                                    rounded-[2rem] p-8
                                    border border-gray-100 dark:border-[#2a2a2a]
                                    shadow-lg hover:shadow-xl dark:shadow-none
                                    transition-all duration-300
                                    hover:-translate-y-1
                                    flex flex-col
                                "
                            >
                                {/* Icon Row */}
                                <div className="flex items-center justify-between mb-6">
                                    <div
                                        className="
                                            w-16 h-16 rounded-2xl
                                            bg-[#20AA9D]/10 text-[#20AA9D]
                                            flex items-center justify-center
                                            transition-colors duration-300
                                            group-hover:bg-[#20AA9D] group-hover:text-white
                                        "
                                    >
                                        <item.icon className="text-3xl" />
                                    </div>

                                    <div className="p-2 rounded-full bg-gray-50 dark:bg-[#1a1a1a]">
                                        <FaFilePdf className="text-gray-400 dark:text-gray-500 text-xl" />
                                    </div>
                                </div>

                                {/* Text */}
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-[#20AA9D] transition-colors">
                                    {item.title}
                                </h3>

                                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-8 flex-grow">
                                    {item.description}
                                </p>

                                {/* Action */}
                                <div className="
                                    mt-auto pt-6 border-t border-gray-100 dark:border-[#2a2a2a]
                                    flex items-center justify-between
                                    text-[#20AA9D] font-bold text-sm uppercase tracking-wider
                                ">
                                    Read Booklet
                                    <div className="w-8 h-8 rounded-full bg-[#20AA9D]/10 flex items-center justify-center group-hover:bg-[#20AA9D] group-hover:text-white transition-all">
                                        <FaArrowRight className="text-xs transition-transform group-hover:translate-x-0.5" />
                                    </div>
                                </div>
                            </a>
                        ))}
                    </div>

                    {/* Footer Note */}
                    <div className="mt-16 text-center">
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Information is updated regularly according to the latest senate guidelines.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Booklets;