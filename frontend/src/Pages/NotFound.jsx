import React from 'react';
import { Link } from 'react-router-dom';
import { FaExclamationTriangle, FaHome, FaEnvelope } from 'react-icons/fa';
import useReveal from '../common/Reveal'; // Assuming you have this hook based on previous files

const NotFound = () => {
    const [headerRef, headerVisible] = useReveal();

    return (
        <div className="min-h-screen bg-transparent dark:bg-[#0f0f0f] pt-8 pb-20 transition-colors flex items-center">
            <div className="max-w-7xl mx-auto px-4 w-full">

                {/* Main Card with Blobs */}
                <div 
                    ref={headerRef} 
                    className={`
                        relative w-full overflow-hidden rounded-[3rem] p-10 md:p-20 bg-white dark:bg-slate-900
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

                    <div className="relative z-10 max-w-2xl mx-auto text-center flex flex-col items-center">
                        
                        {/* Icon */}
                        <div className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-red-100 dark:bg-red-900/20 text-red-500 mb-8 backdrop-blur-md shadow-lg">
                            <FaExclamationTriangle className="text-4xl" />
                        </div>

                        {/* Text */}
                        <h2 className="text-6xl md:text-8xl font-black text-[#20AA9D] mb-4 tracking-tighter opacity-90">
                            404
                        </h2>
                        
                        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight leading-tight">
                            Page Not Found
                        </h1>

                        <p className="text-lg text-slate-700 dark:text-slate-300 font-medium mb-10 max-w-lg">
                            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                        </p>

                        {/* Actions */}
                        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                            <Link
                                to="/"
                                className="
                                    px-8 py-4 rounded-full 
                                    bg-[#20AA9D] hover:bg-[#17857a] 
                                    text-white font-bold text-lg
                                    transition-all duration-300 shadow-lg shadow-[#20AA9D]/20
                                    hover:shadow-xl hover:-translate-y-1
                                    flex items-center justify-center gap-2
                                "
                            >
                                <FaHome /> Go Home
                            </Link>

                            <Link
                                to="/aboutus"
                                className="
                                    px-8 py-4 rounded-full 
                                    bg-white/50 dark:bg-black/20 
                                    border-2 border-[#20AA9D] 
                                    text-[#20AA9D] font-bold text-lg
                                    hover:bg-[#20AA9D] hover:text-white
                                    transition-all duration-300
                                    backdrop-blur-sm
                                    flex items-center justify-center gap-2
                                "
                            >
                                <FaEnvelope /> Contact Us
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotFound;