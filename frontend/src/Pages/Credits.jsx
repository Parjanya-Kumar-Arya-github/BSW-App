import React from 'react';
import useReveal from '../common/Reveal';

const TEAM_DATA = [
    {
        section: 'Core Development',
        members: [
            {
                name: 'Rohit',
                role: 'Project Lead',
                image: '/imgs/team/rohit_photo.jpg',
                contributions: ['Architecture Planning', 'IITD Notice System', 'Auth System', 'API Integration', 'Code Review'],
            },
            {
                name: 'Akshat',
                role: 'Backend Developer',
                image: 'imgs/team/akshat_khandelwal.jpeg',
                contributions: ['Complaint Portal Modules', 'Authentication Logic', 'Notice Backend API'],
            },
            {
                name: 'Ashmit',
                role: 'Frontend Developer',
                image: 'imgs/team/ashmit_kaushik_photo.jpg',
                contributions: ['Updated Navbar', 'Mobile Menu System', 'Meet the Team Component'],
            },
            {
                name: 'Divyansh',
                role: 'Frontend Developer',
                image: 'imgs/team/divyansh_nagpal.png',
                contributions: ['Resource Pages Redesign', 'Home Resources Section', 'Theme System Alignment'],
            },
            {
                name: 'Lovish',
                role: 'Frontend Developer',
                image: 'imgs/team/lovish_meghwanshi_photo.jpeg',
                contributions: ['Hero Section', 'Operations & Welfare', 'Animations & Gradients', 'Dark Mode Logic'],
            },
        ],
    },
    {
        section: 'Design & Experience',
        members: [
            {
                name: 'Harsh Khemka',
                role: 'UI/UX Designer',
                image: null,
                contributions: ['Component Design System', 'Layout Guidelines', 'Form UX Flow'],
            },
        ],
    },
];

const Credits = () => {
    const [headerRef, headerVisible] = useReveal();
    const [contentRef, contentVisible] = useReveal();

    return (
        <div className="min-h-screen bg-white dark:bg-[#0f0f0f] pt-8 pb-20 transition-colors overflow-hidden">
            <div className="max-w-7xl mx-auto px-4">

                {/* Header Section - With Blob Background Animation */}
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
                    <div className="absolute pointer-events-none bg-[#fbcfe8] dark:bg-[#500724]"
                        style={{ bottom: '-20%', left: '-5%', width: '500px', height: '600px', filter: 'blur(40px)', borderRadius: '50%', zIndex: 0, animation: 'blob 7s infinite' }}
                    />
                    <div className="absolute pointer-events-none bg-[#c083eb] dark:bg-[#581c87]"
                        style={{ top: '25%', right: '45%', width: '350px', height: '350px', opacity: 0.3, filter: 'blur(80px)', borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%', transform: 'rotate(-30deg)', zIndex: 0, animation: 'blob-reverse 8s infinite', animationDelay: '1s' }}
                    />
                    <div className="absolute pointer-events-none bg-[linear-gradient(75deg,#656df7_0%,#9DA2F3_70%,#f5f5f5_80%)] dark:bg-[linear-gradient(75deg,#1e1b4b_0%,#312e81_70%,#4338ca_80%)]"
                        style={{ top: '-23%', right: '-2%', width: '450px', height: '450px', filter: 'blur(20px)', borderRadius: '30% 70% 70% 50% / 30% 30% 65% 70%', transform: 'rotate(-30deg)', zIndex: 0, animation: 'blob 7s infinite', animationDelay: '2s' }}
                    />
                    <div className="absolute pointer-events-none bg-[linear-gradient(75deg,#fadef0_0%,#7d83f793_80%)] dark:bg-[linear-gradient(75deg,#4a044e_0%,#2e1065_80%)]"
                        style={{ top: '-23%', right: '30%', width: '380px', height: '380px', opacity: 0.7, filter: 'blur(20px)', borderRadius: '30% 70% 70% 50% / 30% 30% 65% 70%', transform: 'rotate(-30deg)', zIndex: 0, animation: 'blob-reverse 8s infinite', animationDelay: '0.5s' }}
                    />

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

                    <div className="absolute inset-0 z-0 bg-white/30 backdrop-blur-[1px] dark:bg-slate-900/30" />
                    {/* --- BACKGROUND BLOBS END --- */}

                    <div className="relative z-10 max-w-3xl mx-auto text-center">
                        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">
                            Meet the <span className="text-[#20AA9D]">Development Team</span>
                        </h1>
                        <p className="text-lg text-slate-700 dark:text-slate-300 font-medium">
                            The minds behind the platform, built with care by students for students.
                        </p>
                    </div>
                </div>

                {/* Team Sections */}
                <div
                    ref={contentRef}
                    className={`
                        transition-all duration-700 delay-100
                        ${contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
                    `}
                >
                    {TEAM_DATA.map((group, index) => (
                        <div key={index} className="mb-16">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-8 ml-2 border-l-4 border-[#20AA9D] pl-4">
                                {group.section}
                            </h2>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {group.members.map((member, i) => (
                                    <div
                                        key={i}
                                        className="
                                            bg-white dark:bg-[#121212]
                                            border border-gray-100 dark:border-[#2a2a2a]
                                            rounded-[2rem] p-6 flex flex-col items-center
                                            shadow-[0_4px_20px_rgb(0,0,0,0.03)] dark:shadow-none
                                            transition-all duration-300
                                            hover:-translate-y-2 hover:shadow-xl dark:hover:bg-[#161616]
                                        "
                                    >
                                        <div className="relative mb-4">
                                            <img
                                                className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 dark:bg-[#1a1a1a] object-cover border-4 border-white dark:border-[#121212] shadow-sm"
                                                src={member.image || '/imgs/default_avatar.png'}
                                                alt={member.name}
                                            />
                                        </div>

                                        <div className="text-center mb-4">
                                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                                                {member.name}
                                            </h3>
                                            <p className="text-sm font-medium text-[#20AA9D]">
                                                {member.role}
                                            </p>
                                        </div>

                                        <div className="flex flex-wrap gap-2 justify-center">
                                            {member.contributions.map((item, idx) => (
                                                <span
                                                    key={idx}
                                                    className="
                                                        text-[10px] uppercase tracking-wider font-bold
                                                        px-2.5 py-1 rounded-md
                                                        bg-gray-100 dark:bg-[#1e1e1e]
                                                        text-gray-600 dark:text-gray-400
                                                        border border-transparent dark:border-[#2a2a2a]
                                                    "
                                                >
                                                    {item}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Credits;