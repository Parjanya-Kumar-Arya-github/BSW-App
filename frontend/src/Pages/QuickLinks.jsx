import React from 'react';
import {
    FaUniversity,
    FaEnvelope,
    FaLaptopCode,
    FaChalkboardTeacher,
    FaCalendarAlt,
    FaClock,
    FaCloud,
    FaServer,
    FaBook,
    FaHospital,
    FaBriefcase,
    FaWifi,
    FaUserTie,
    FaFileAlt,
    FaExternalLinkAlt,
    FaGlobe,
} from 'react-icons/fa';
import useReveal from '../common/Reveal';

const QuickLinks = () => {
    const [headerRef, headerVisible] = useReveal();
    const [contentRef, contentVisible] = useReveal();

    const linksByCategory = {
        'Institute Essentials': [
            { title: 'IIT Delhi Website', link: 'https://home.iitd.ac.in/', icon: FaGlobe },
            { title: 'Webmail', link: 'https://webmail.iitd.ac.in/roundcube/', icon: FaEnvelope },
            { title: 'Dean of Student Affairs', link: 'https://dos.iitd.ac.in/', icon: FaUserTie },
        ],
        'Academics & Exams': [
            { title: 'E-Academics (ERP)', link: 'https://eacademics.iitd.ac.in/sportal/login', icon: FaLaptopCode },
            { title: 'Moodle', link: 'https://moodle.iitd.ac.in/', icon: FaChalkboardTeacher },
            { title: 'Curriculum Info', link: 'https://home.iitd.ac.in/curriculum.php', icon: FaFileAlt },
            { title: 'Time Table', link: 'https://timetable.iitd.ac.in/calendar', icon: FaClock },
            { title: 'Exam Schedule', link: 'https://exam.iitd.ac.in/', icon: FaCalendarAlt },
            { title: 'NGU Portal', link: 'https://ngu.iitd.ac.in/index', icon: FaUniversity },
            { title: 'Academic Circulars', link: 'https://academics.iitd.ac.in/acad/circulars', icon: FaFileAlt },
        ],
        'Campus Services': [
            { title: 'OwnCloud', link: 'https://owncloud.iitd.ac.in/', icon: FaCloud },
            { title: 'Computer Services (CSC)', link: 'https://csc.iitd.ac.in', icon: FaServer },
            { title: 'Central Library', link: 'https://library.iitd.ac.in/', icon: FaBook },
            { title: 'IITD Hospital', link: 'https://hospital.iitd.ac.in/', icon: FaHospital },
            { title: 'Career Services (OCS)', link: 'https://ocs.iitd.ac.in/ocs/index.php', icon: FaBriefcase },
            { title: 'Edu-Tech (ETSC)', link: 'https://etsc.iitd.ac.in/', icon: FaWifi },
        ],
    };

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
                            Quick <span className="text-[#20AA9D]">Links</span>
                        </h1>
                        <p className="text-lg text-slate-700 dark:text-slate-300 font-medium max-w-2xl mx-auto">
                            One-click access to official portals, academic resources, and essential campus services.
                        </p>
                    </div>
                </div>

                {/* Content */}
                <div
                    ref={contentRef}
                    className={`
                        max-w-6xl mx-auto
                        transition-all duration-700 delay-100
                        ${contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
                    `}
                >
                    {Object.entries(linksByCategory).map(([category, links], idx) => (
                        <div key={idx} className="mb-14 last:mb-0">
                            {/* Category Heading */}
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                                <span className="w-1.5 h-8 bg-[#20AA9D] rounded-full"></span>
                                {category}
                            </h2>

                            {/* Grid */}
                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {links.map((item, index) => (
                                    <a
                                        key={index}
                                        href={item.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="
                                            group flex items-center gap-5 p-6
                                            bg-white dark:bg-[#121212]
                                            border border-gray-100 dark:border-[#2a2a2a]
                                            rounded-[1.5rem]
                                            shadow-lg hover:shadow-xl dark:shadow-none
                                            transition-all duration-300
                                            hover:-translate-y-1
                                        "
                                    >
                                        {/* Icon */}
                                        <div
                                            className="
                                                w-14 h-14 rounded-2xl
                                                bg-[#20AA9D]/10 text-[#20AA9D]
                                                flex items-center justify-center shrink-0
                                                transition-colors duration-300
                                                group-hover:bg-[#20AA9D] group-hover:text-white
                                            "
                                        >
                                            <item.icon className="text-2xl" />
                                        </div>

                                        {/* Text */}
                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-base font-bold text-gray-800 dark:text-gray-200 group-hover:text-[#20AA9D] transition-colors truncate mb-1">
                                                {item.title}
                                            </h3>
                                            <p className="text-xs text-gray-400 dark:text-gray-500 truncate font-mono bg-gray-50 dark:bg-[#1a1a1a] px-2 py-0.5 rounded-md inline-block">
                                                {new URL(item.link).hostname}
                                            </p>
                                        </div>

                                        {/* External icon */}
                                        <div className="w-8 h-8 rounded-full bg-gray-50 dark:bg-[#1a1a1a] flex items-center justify-center text-gray-400 group-hover:text-[#20AA9D] group-hover:bg-[#20AA9D]/10 transition-colors opacity-0 group-hover:opacity-100">
                                            <FaExternalLinkAlt className="text-xs" />
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </div>
                    ))}

                    {/* Footer */}
                    <div className="mt-16 text-center text-sm text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-[#121212] py-4 px-6 rounded-2xl inline-block mx-auto">
                        <p>
                            Links redirect to official IIT Delhi domains.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuickLinks;