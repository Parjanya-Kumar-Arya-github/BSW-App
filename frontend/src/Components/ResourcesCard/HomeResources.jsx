import React from 'react';
import { Link } from 'react-router-dom';
import useReveal from '../common/Reveal';

const RESOURCE_CARDS = [
    {
        title: 'Academic & Setup',
        links: [
            { label: 'Question Papers', to: '/question-papers' },
            { label: 'Email Setup', to: '/email-config' },
            { label: 'Internet Setup', to: '/wifi-config' },
            { label: 'Software Access', to: '/softwares' },
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
        <section
            ref={ref}
            className={`
        max-w-7xl mx-auto px-4 mt-20
        transition-all duration-700 ease-out
        ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
      `}
        >
            {/* Section Heading */}
            <div className="mb-10 text-center">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    Because Searching Shouldn’t Be <span className="text-[#20AA9D]">Hard</span>
                </h2>
                <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                    All the important resources you need, gathered in one convenient place.
                </p>
            </div>

            {/* Cards */}
            <div className="grid gap-6 md:grid-cols-3">
                {RESOURCE_CARDS.map((card, idx) => (
                    <div
                        key={idx}
                        className="
              bg-white dark:bg-[#121212]
              rounded-[1.75rem] p-6
              border border-gray-100 dark:border-[#2a2a2a]
              shadow-[0_4px_20px_rgb(0,0,0,0.03)] dark:shadow-none
            "
                    >
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                            {card.title}
                        </h3>

                        <ul className="space-y-3">
                            {card.links.map((item, i) => (
                                <li key={i}>
                                    <Link
                                        to={item.to}
                                        className="
                      flex items-center gap-3
                      text-gray-700 dark:text-gray-300
                      font-medium
                      hover:text-[#20AA9D]
                      transition-colors
                    "
                                    >
                                        <span className="w-2.5 h-2.5 rounded bg-gray-300 dark:bg-gray-600"></span>
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default HomeResources;
