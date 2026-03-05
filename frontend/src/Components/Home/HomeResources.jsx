import React from 'react';
import { Link } from 'react-router-dom';
import useReveal from '../../common/Reveal';

const RESOURCE_CARDS = [
    {
        title: 'Academic & Setup',
        links: [
            { label: 'Question Papers', to: '/question-papers' },
            { label: 'Email Setup', to: 'https://csc.iitd.ac.in/howto' },
            { label: 'Internet Setup', to: 'https://csc.iitd.ac.in/howto' },
            { label: 'Software Access', to: 'https://csc.iitd.ac.in/services-software' },
        ],
    },
    {
        title: 'Health & Accessibility',
        links: [
            { label: 'Health Insurance', to: '/health-insurance' },
            { label: 'Wheelchair Support', to: '/forms' },
        ],
    },
    {
        title: 'Documents & Forms',
        links: [
            { label: 'BSW Diary', to: '/diary' },
            { label: 'Information Booklet', to: '/booklets' },
            { label: 'Official Forms', to: '/forms' },
        ],
    },
];

const HomeResources = () => {
    const [ref, visible] = useReveal();

    return (
        <div className='w-full py-14 px-4 flex justify-center bg-transparent'>
            <section
                ref={ref}
                className={`
                    w-full mx-auto            
                    p-10 md:p-16               
                    rounded-[3rem]            
                    shadow-2xl                 
                    bg-[#FDEEF3] dark:bg-[#1e1e1e] 
                    border border-transparent dark:border-[#333]
                    
                    transition-all duration-700 ease-out
                    ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
                `}
            >
                <div className="w-full mx-auto">
                    
                    {/* Section Heading */}
                    <div className="mb-12 text-center">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                            Because Searching Shouldn’t Be <span className="text-[#20AA9D]">Hard</span>
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg md:text-xl">
                            All the important resources you need, gathered in one convenient place.
                        </p>
                    </div>

                    {/* Cards Grid */}
                    <div className="grid gap-8 md:grid-cols-3">
                        {RESOURCE_CARDS.map((card, idx) => (
                            <div
                                key={idx}
                                className="
                                    bg-white dark:bg-[#121212]
                                    rounded-[2rem] p-8
                                    border border-gray-100 dark:border-[#2a2a2a]
                                    shadow-sm hover:shadow-md
                                    transition-all duration-300
                                "
                            >
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 border-b border-gray-100 dark:border-gray-800 pb-4">
                                    {card.title}
                                </h3>

                                <ul className="space-y-4">
                                    {card.links.map((item, i) => (
                                        <li key={i}>
                                            <Link
                                                to={item.to}
                                                className="
                                                    group flex items-center gap-3
                                                    text-gray-600 dark:text-gray-400
                                                    font-medium text-lg
                                                    hover:text-[#20AA9D] dark:hover:text-[#20AA9D]
                                                    transition-colors
                                                "
                                            >
                                                {/* Small square indicator */}
                                                <span className="
                                                    w-2 h-2 rounded-sm 
                                                    bg-gray-300 dark:bg-gray-700 
                                                    group-hover:bg-[#20AA9D] 
                                                    transition-colors
                                                "></span>
                                                {item.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomeResources;