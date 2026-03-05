import React, { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import { FaArrowRight, FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
    const containerRef = useRef(null);

    // Synchronized with your App Routes and MENU configuration
    const footerLinks = [
        {
            title: "Welfare",
            links: [
                { label: "Academic Portal", href: "https://bswacademicportal.iitd.ac.in" },
                { label: "Mental Health", href: "https://mentalhealth-bsw.iitd.ac.in" },
                { label: "Career Services", href: "https://bswcareerportal.iitd.ac.in" },
                { label: "Language Mentorship", href: "language-mentorship" },
                { label: "Alumni Mentorship", href: "mentorship/alumni" },
            ]
        },
        {
            title: "Connect",
            links: [
                { label: "Events", href: "/events" },
                { label: "Operations", href: "/#operations" },
                { label: "Technical Team", href: "/dev-team" },
                { label: "About Us", href: "/aboutus" },
                {lablel: "IITD Notices", href: "/#iitd-notices"},
                {label:"Emergency Contacts", href: "/emergency-contacts"}
            ]
        }
    ];

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end end"]
    });

    const endsY = useTransform(scrollYProgress, [0, 1], [2000, 250]);
    const controlY = useTransform(scrollYProgress, [0, 1], [-1500, 250]);

    return (
        <div 
            ref={containerRef} 
            className="relative bg-[#D6FAE9] dark:bg-[#121212] text-[#1f2937] dark:text-gray-200 pt-12 overflow-hidden font-sans flex flex-col justify-between items-center transition-colors duration-300 rounded-t-[52px] shadow-inner"
        >
            
            {/* --- MAIN CONTENT --- */}
            <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-20 w-full mb-2">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10">
                    
                    {/* Brand */}
                    <div className="md:col-span-4 space-y-4">
                        <div className="flex items-center gap-2">
                            <Link to="/">
                                <img src="/images/bsw_logo.png" alt="BSW Logo" className="h-10 w-auto cursor-pointer" /> 
                            </Link>
                        </div>
                        <div>
                            <h3 className="font-bold text-sm uppercase tracking-wide text-gray-900 dark:text-gray-100 mb-2">Board for Student Welfare</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed max-w-xs">
                                BSW (Board for Student Welfare) is primarily a student body consisting of student representatives from each hostel and a few faculty members.
                            </p>
                        </div>
                    </div>

                    {/* Links */}
                    {footerLinks.map((section, index) => (
                        <div key={index} className="md:col-span-2">
                            <h4 className="font-bold text-gray-900 dark:text-white mb-4">{section.title}</h4>
                            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                                {section.links.map((link, linkIndex) => (
                                    <li key={linkIndex} className="hover:text-[#4FA3A5] dark:hover:text-[#20AA9D] transition">
                                        <Link to={link.href}>{link.label}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    {/* Institute & Newsletter */}
                    <div className="md:col-span-4 space-y-6">
                        <div>
                            <h4 className="font-bold text-gray-900 dark:text-white mb-4">Institute</h4>
                            <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                                <li>Board for Students Welfare</li>
                                <li>Main Building, Hauz Khas,</li>
                                <li>IIT Delhi</li>
                                <li className="pt-2 hover:text-[#4FA3A5] dark:hover:text-[#20AA9D] transition font-medium">
                                    <a href="mailto:bsw@iitd.ac.in">bsw@iitd.ac.in</a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-900 dark:text-white mb-3 text-sm">Subscribe to Newsletter</h4>
                            <div className="relative max-w-xs">
                                <input 
                                    type="email" 
                                    placeholder="your email here" 
                                    className="w-full bg-[#96E6B3]/50 dark:bg-gray-800 text-gray-800 dark:text-white text-sm py-3 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-[#4FA3A5] dark:focus:ring-[#20AA9D] placeholder-gray-500 dark:placeholder-gray-400 border border-transparent dark:border-gray-700"
                                />
                                <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition">
                                    <FaArrowRight size={14} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- BIG ANIMATED TEXT --- */}
            <div className="relative bottom-0 left-0 w-full h-[20vw] pointer-events-none select-none overflow-visible">
                <svg 
                    className="w-full h-full overflow-visible" 
                    viewBox="0 0 1440 300" 
                    preserveAspectRatio="xMidYMid slice"
                >
                    <defs>
                        <motion.path
                            id="footerCurve"
                            fill="transparent"
                            d={useTransform(
                                [endsY, controlY], 
                                ([eY, cY]) => `M 0,${eY} Q 720,${cY} 1440,${eY}`
                            )}
                        />
                    </defs>

                    <text 
                        className="fill-[#56A8A0] dark:fill-[#20AA9D] transition-colors duration-300"
                        fontWeight="900"
                        fontSize="158" 
                        style={{ 
                            letterSpacing: "-0.01em" ,
                            transform: "scaleY(1.2)",
                            transformOrigin: "center bottom"
                        }}
                    >
                        <textPath 
                            href="#footerCurve" 
                            startOffset="50%" 
                            textAnchor="middle"
                            dominantBaseline="alphabetic"
                            method="align"
                            spacing="auto"
                        >
                            STUDENTWELFARE
                        </textPath>
                    </text>
                </svg>
            </div>

            {/* --- CREDITS REPOSITIONED BELOW TEXT --- */}
            <div className="relative z-30 pb-4 flex flex-col items-center justify-center space-y-1 opacity-80">
                <Link to="/dev-team">
                    <p className="text-[10px] md:text-xs font-medium text-gray-500 dark:text-gray-400 flex items-center gap-1 cursor-pointer">
                        Made with <FaHeart className="text-red-500 animate-pulse text-[8px]" /> by 
                        <span className="font-bold text-gray-800 dark:text-gray-200"> BSW Tech Team</span>
                    </p>
                </Link>
                <a href="https://www.linkedin.com/in/harsh-khemka/" target="_blank" rel="noopener noreferrer">
                    <p className="text-[8px] md:text-[10px] tracking-[0.2em] uppercase text-gray-400 dark:text-gray-500 font-bold cursor-pointer">
                        Designed by <span className="text-[#4FA3A5] dark:text-[#20AA9D]">Harsh Khemka</span>
                    </p>
                </a>
            </div>
        </div>
    );
};

export default Footer;