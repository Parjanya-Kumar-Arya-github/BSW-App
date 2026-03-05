import React, { useState } from 'react';
import { 
    FaGraduationCap, FaHome, FaUniversity, 
    FaChevronDown, FaChevronUp, FaQuestionCircle, FaInfoCircle 
} from 'react-icons/fa';
import useReveal from '../common/Reveal';

const FAQs = () => {
    const [activeCategory, setActiveCategory] = useState('Academics');
    const [openIndex, setOpenIndex] = useState(0);
    const [headerRef, headerVisible] = useReveal();
    const [faqRef, faqVisible] = useReveal();

    const categories = [
        { id: 'Academics', icon: <FaGraduationCap />, label: 'Academics' },
        { id: 'Hostel', icon: <FaHome />, label: 'Hostel Life' },
        { id: 'Life', icon: <FaUniversity />, label: 'Life in IITD' },
    ];

    const faqData = {
        Academics: [
            {
                q: "IMPORTANT NOTE",
                a: "Before reading the Qs below, we urge you to go through curriculum info for a detailed insight about academic structure at IIT Delhi.",
                isHighlight: true
            },
            {
                q: "What will be the strength of a single class?",
                a: "In first year 900(approx.) students will be divided into two batches which will further be divided into 20-20 groups. Each group contains 22-25 students. Strength of a single class depends on the course which you would be studying."
            },
            {
                q: "Is there any attendance policy here?",
                a: "The attendance policy is different for different courses depending on Professors. In general, the students need to have a minimum attendance of 75%."
            },
            {
                q: "How and where to get books?",
                a: "There is a book camp held at the beginning of every semester by BSW which provides books at cheap prices. Apart from that notes and lab manuals are available at SCOOPS."
            },
            {
                q: "Can I get my department changed?",
                a: "Yes, you can get the department changed. Rules can be read on the academics website. It is quite competitive."
            }
        ],
        Hostel: [
            {
                q: "Is it necessary to take hostel?",
                a: "It is voluntary but generally recommended to stay on campus to have the full IIT experience."
            },
            {
                q: "When would the freshers be allotted hostels?",
                a: "You would be allotted a hostel before coming to IIT Delhi, usually 2-3 days prior."
            },
            {
                q: "What facilities are available in the hostel?",
                a: "Mess food, RO water, Wired Internet, Sports equipment, TV room, Common Room, Washing Machines, Library, 24x7 WiFi in common areas."
            }
        ],
        Life: [
            {
                q: "How different is College from High School?",
                a: "IIT Delhi allows you to fully take ownership of your time. You have to balance academics, extra-curriculars, and social life."
            },
            {
                q: "What to do on the weekends?",
                a: "Join clubs! There are many technical, cultural, and sports clubs. Attend events, workshops, or just hang out with friends."
            }
        ]
    };

    return (
        <div className="min-h-screen bg-[#e9fbf7] dark:bg-[#121212] pt-20 pb-20 transition-colors duration-300">
            
            {/* Header Section */}
            <div 
                ref={headerRef}
                className={`relative py-4 bg-gradient-to-b from-[#20AA9D]/10 to-transparent dark:from-[#20AA9D]/15 pb-12 px-4 mb-8 transition-all duration-700 ease-out ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            >
                <div className="max-w-4xl mx-auto text-center">
                    <div className="inline-flex items-center justify-center p-3 mb-6 bg-white dark:bg-gray-800 rounded-full shadow-md animate-bounce-slow">
                        <FaQuestionCircle className="text-[#20AA9D] text-2xl" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 dark:text-gray-100 mb-4 font-montserrat tracking-tight">
                        Frequently Asked Questions
                    </h1>
                    <p className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                        Find answers to the most common questions about academics, accommodation, and life at IIT Delhi.
                    </p>
                </div>
            </div>

            {/* Content Section */}
            <div 
                ref={faqRef}
                className={`max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-700 delay-100 ${faqVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            >

                {/* Category Navigation Pills */}
                <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-12">
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => { setActiveCategory(cat.id); setOpenIndex(0); }}
                            className={`flex items-center px-6 py-3 rounded-full text-sm md:text-base font-bold transition-all duration-300 border-2 ${activeCategory === cat.id
                                    ? 'bg-[#20AA9D] border-[#20AA9D] text-white shadow-lg shadow-[#20AA9D]/30 transform scale-105'
                                    : 'bg-white dark:bg-gray-800 border-transparent text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-200 dark:hover:border-gray-600'
                                }`}
                        >
                            <span className="mr-2 text-lg">{cat.icon}</span>
                            {cat.label}
                        </button>
                    ))}
                </div>

                {/* Accordion List */}
                <div className="space-y-4">
                    {faqData[activeCategory].map((item, index) => (
                        <div
                            key={index}
                            className={`rounded-2xl overflow-hidden transition-all duration-300 ${
                                item.isHighlight 
                                    ? 'bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700' 
                                    : `bg-white dark:bg-gray-800 border border-transparent dark:border-gray-700 ${openIndex === index ? 'shadow-lg ring-1 ring-[#20AA9D]/30 dark:ring-[#20AA9D]/50' : 'shadow-sm hover:shadow-md'}`
                            }`}
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                                className="w-full text-left px-6 py-5 flex justify-between items-center focus:outline-none group"
                            >
                                <div className="flex items-center gap-3">
                                    {item.isHighlight && <FaInfoCircle className="text-amber-500 flex-shrink-0" />}
                                    <span className={`text-lg font-bold pr-4 transition-colors ${
                                        item.isHighlight 
                                            ? 'text-amber-800 dark:text-amber-200' 
                                            : (openIndex === index ? 'text-[#20AA9D]' : 'text-gray-800 dark:text-gray-200 group-hover:text-[#20AA9D]')
                                    }`}>
                                        {item.q}
                                    </span>
                                </div>
                                <div className={`flex-shrink-0 ml-4 p-2 rounded-full transition-all duration-300 ${openIndex === index ? 'bg-[#20AA9D]/10 rotate-180' : 'bg-gray-100 dark:bg-gray-700'}`}>
                                    {openIndex === index ? (
                                        <FaChevronUp className="text-[#20AA9D]" />
                                    ) : (
                                        <FaChevronDown className="text-gray-400 dark:text-gray-400" />
                                    )}
                                </div>
                            </button>

                            <div
                                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                                    openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                                }`}
                            >
                                <div className={`px-6 pb-6 pt-0 text-base leading-relaxed ${
                                    item.isHighlight 
                                        ? 'text-amber-900 dark:text-amber-100' 
                                        : 'text-gray-600 dark:text-gray-300'
                                }`}>
                                    {item.a}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer Note */}
                <div className="mt-16 text-center">
                    <p className="text-gray-500 dark:text-gray-400">
                        Still have questions? <a href="/aboutus" className="text-[#20AA9D] font-bold hover:underline">Contact the BSW Team</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default FAQs;