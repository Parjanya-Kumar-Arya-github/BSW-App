import React from 'react';
import {
    FaPhoneAlt,
    FaAmbulance,
    FaShieldAlt,
    FaFireExtinguisher,
    FaHospital,
    FaBuilding,
    FaExclamationCircle,
} from 'react-icons/fa';
import useReveal from '../common/Reveal';

const EmergencyContacts = () => {
    const [headerRef, headerVisible] = useReveal();
    const [contentRef, contentVisible] = useReveal();

    const contactsByCategory = {
        'Critical Services': [
            {
                title: 'Ambulance',
                number: '011-2659-6666',
                link: 'tel:+911126596666',
                icon: FaAmbulance,
                accent: 'red',
            },
            {
                title: 'IIT Hospital',
                number: '011-2659-1500',
                link: 'tel:+911126591500',
                icon: FaHospital,
                accent: 'blue',
            },
            {
                title: 'Security Control',
                number: '011-2659-1000',
                link: 'tel:+911126591000',
                icon: FaShieldAlt,
                accent: 'gray',
            },
            {
                title: 'Fire Service',
                number: '011-2659-6101',
                link: 'tel:+911126596101',
                icon: FaFireExtinguisher,
                accent: 'orange',
            },
        ],
        'Hostel Reception (Sample)': [
            { title: 'Aravali', number: '011-2659-6911', link: 'tel:+911126596911', icon: FaBuilding },
            { title: 'Karakoram', number: '011-2659-6915', link: 'tel:+911126596915', icon: FaBuilding },
            { title: 'Nilgiri', number: '011-2659-6919', link: 'tel:+911126596919', icon: FaBuilding },
            { title: 'Zanskar', number: '011-2659-6925', link: 'tel:+911126596925', icon: FaBuilding },
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
                        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-red-100 dark:bg-red-900/20 text-red-500 mb-6 backdrop-blur-md">
                            <FaExclamationCircle className="text-2xl" />
                        </div>

                        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight leading-tight">
                            Emergency <span className="text-[#20AA9D]">Contacts</span>
                        </h1>

                        <p className="text-lg text-slate-700 dark:text-slate-300 font-medium max-w-2xl mx-auto">
                            Tap any card to dial immediately. Use <span className="font-mono bg-white/50 dark:bg-black/30 px-2 py-0.5 rounded border border-gray-200 dark:border-gray-700">011-2659</span> prefix if calling from outside campus.
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
                    {Object.entries(contactsByCategory).map(([category, items], idx) => (
                        <div key={idx} className="mb-14 last:mb-0">
                            <h2
                                className={`text-2xl font-bold mb-6 flex items-center gap-3 ${
                                    category.includes('Critical')
                                        ? 'text-red-600 dark:text-red-400'
                                        : 'text-gray-900 dark:text-white'
                                }`}
                            >
                                {category.includes('Critical') && <div className="w-2 h-8 bg-red-500 rounded-full"></div>}
                                {category}
                            </h2>

                            <div className="grid md:grid-cols-2 gap-4">
                                {items.map((contact, index) => (
                                    <a
                                        key={index}
                                        href={contact.link}
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
                                            className={`
                                                w-14 h-14 rounded-2xl flex items-center justify-center shrink-0
                                                transition-transform duration-300 group-hover:scale-110
                                                ${
                                                    contact.accent === 'red'
                                                        ? 'bg-red-50 dark:bg-red-900/20 text-red-500'
                                                        : contact.accent === 'blue'
                                                            ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-500'
                                                            : contact.accent === 'orange'
                                                                ? 'bg-orange-50 dark:bg-orange-900/20 text-orange-500'
                                                                : 'bg-[#20AA9D]/10 text-[#20AA9D]'
                                                }
                                            `}
                                        >
                                            <contact.icon className="text-2xl" />
                                        </div>

                                        {/* Info */}
                                        <div className="flex-1">
                                            <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-[#20AA9D] transition-colors">
                                                {contact.title}
                                            </h3>
                                            <p className="font-mono text-gray-500 dark:text-gray-400 text-sm mt-1">
                                                {contact.number}
                                            </p>
                                        </div>

                                        {/* Call Button */}
                                        <div
                                            className="
                                                w-12 h-12 rounded-full
                                                bg-gray-50 dark:bg-[#1a1a1a]
                                                flex items-center justify-center
                                                text-gray-400
                                                group-hover:bg-[#20AA9D]
                                                group-hover:text-white
                                                transition-all duration-300
                                                shadow-sm
                                            "
                                        >
                                            <FaPhoneAlt className="text-sm" />
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </div>
                    ))}

                    {/* Footer Note */}
                    <div className="mt-16 text-center text-sm text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-[#121212] py-4 px-6 rounded-2xl inline-block mx-auto">
                        <p>
                            <strong>Note:</strong> On campus, you can dial the intercom extension
                            (last 4 digits) directly from any internal phone.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmergencyContacts;