import React from 'react';
import { FaStore } from 'react-icons/fa';
import { MdBrokenImage } from "react-icons/md";
import useReveal from '../common/Reveal';

const Scoops = () => {
    const [headerRef, headerVisible] = useReveal();
    const [contentRef, contentVisible] = useReveal();

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
                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-[#20AA9D]/10 text-[#20AA9D] mb-6 backdrop-blur-md shadow-sm border border-[#20AA9D]/20">
                            <FaStore className="text-4xl" />
                        </div>

                        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight leading-tight">
                            SCOOPS
                        </h1>

                        <p className="text-lg md:text-xl text-slate-700 dark:text-slate-300 font-medium max-w-2xl mx-auto">
                            Student Cooperative Society — Your one-stop shop for academic essentials.
                        </p>
                    </div>
                </div>

                {/* Content */}
                <div
                    ref={contentRef}
                    className={`
                        max-w-5xl mx-auto
                        transition-all duration-700 delay-100
                        ${contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
                    `}
                >
                    {/* Description Card */}
                    <div
                        className="
                            bg-white dark:bg-[#121212]
                            rounded-[2.5rem] p-8 md:p-12
                            border border-gray-100 dark:border-[#2a2a2a]
                            shadow-xl dark:shadow-none
                            mb-12 text-center md:text-left
                        "
                    >
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                            About <span className="text-[#20AA9D]">SCOOPS</span>
                        </h2>
                        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-8 text-center max-w-4xl mx-auto">
                            Students Co-operative Society (SCOOPS) is a store under the aegis of BSW, 
                            situated in the institute area near <span className="font-bold text-gray-800 dark:text-gray-100">Wind-T</span> and <span className="font-bold text-gray-800 dark:text-gray-100">Block II</span>. 
                            It provides stationary products and accessories relevant to all academic needs, including notebooks, 
                            record books, file folders, journal sheets, chart papers, rulers, pens, calculators, 
                            as well as art & craft materials.
                        </p>

                        {/* Image Grid */}
                        <div className="grid md:grid-cols-2 gap-8 mt-12">
                            <div className="group rounded-[1.5rem] overflow-hidden shadow-lg border border-gray-100 dark:border-[#333] relative">
                                <div className="absolute inset-0 bg-[#20AA9D]/10 group-hover:bg-transparent transition-colors duration-300"></div>
                                <img 
                                    src="/images/scoops1.svg" 
                                    alt="Scoops Store Front" 
                                    className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-500"
                                    onError={(e) => { 
                                        e.target.style.display='none'; 
                                        e.target.nextSibling.style.display='flex'; 
                                    }} 
                                />
                                {/* Fallback if image fails */}
                                <div className="hidden w-full h-64 bg-gray-100 dark:bg-[#1a1a1a] flex-col items-center justify-center text-gray-400">
                                    <MdBrokenImage className="text-4xl mb-2" />
                                    <span>Image Unavailable</span>
                                </div>
                            </div>

                            <div className="group rounded-[1.5rem] overflow-hidden shadow-lg border border-gray-100 dark:border-[#333] relative">
                                <div className="absolute inset-0 bg-[#20AA9D]/10 group-hover:bg-transparent transition-colors duration-300"></div>
                                <img 
                                    src="/images/scoops2.svg" 
                                    alt="Scoops Interior" 
                                    className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-500"
                                    onError={(e) => { 
                                        e.target.style.display='none'; 
                                        e.target.nextSibling.style.display='flex'; 
                                    }} 
                                />
                                {/* Fallback if image fails */}
                                <div className="hidden w-full h-64 bg-gray-100 dark:bg-[#1a1a1a] flex-col items-center justify-center text-gray-400">
                                    <MdBrokenImage className="text-4xl mb-2" />
                                    <span>Image Unavailable</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Scoops;