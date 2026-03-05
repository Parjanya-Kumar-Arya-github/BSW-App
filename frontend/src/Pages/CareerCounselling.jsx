import React from 'react';
import { 
    FaChartLine, FaLightbulb, FaBriefcase, FaArrowRight, 
    FaLaptopCode, FaUserTie, FaYoutube, FaExternalLinkAlt 
} from 'react-icons/fa';
import useReveal from '../common/Reveal';

const CareerCounselling = () => {
    const [headerRef, headerVisible] = useReveal();
    const [tradingRef, tradingVisible] = useReveal();
    const [entrepreneurRef, entrepreneurVisible] = useReveal();
    const [internshipRef, internshipVisible] = useReveal();

    return (
        <div className="min-h-screen bg-[#e9fbf7] dark:bg-[#121212] pt-20 pb-20 transition-colors duration-300">
            
            {/* 1. Header Section */}
            <div 
                ref={headerRef}
                className={`relative py-4 bg-gradient-to-b from-[#20AA9D]/10 to-transparent dark:from-[#20AA9D]/15 pb-16 px-4 mb-8 transition-all duration-700 ease-out ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            >
                <div className="max-w-4xl mx-auto text-center">
                    <div className="inline-flex items-center justify-center p-4 mb-6 bg-white dark:bg-gray-800 rounded-2xl shadow-md transform rotate-3 hover:rotate-0 transition-transform duration-300">
                        <FaBriefcase className="text-5xl text-[#20AA9D]" />
                    </div>
                    <h1 className="text-4xl md:text-6xl font-extrabold text-gray-800 dark:text-gray-100 mb-6 font-montserrat tracking-tight">
                        Career Counselling
                    </h1>
                    <div className="max-w-3xl mx-auto bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm p-6 rounded-2xl border border-gray-100 dark:border-gray-700">
                        <h3 className="text-lg font-bold text-[#20AA9D] mb-2 uppercase tracking-wide">Why this initiative?</h3>
                        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                            Students often lack awareness of future opportunities until late in their college life. 
                            This initiative aims to build a repository of domains and opportunities by partnering with alumni and excelling students.
                        </p>
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">

                {/* 2. Trading Section */}
                <div 
                    ref={tradingRef}
                    className={`bg-white dark:bg-gray-800 rounded-3xl shadow-xl dark:shadow-none overflow-hidden flex flex-col lg:flex-row transition-all duration-700 delay-100 ${tradingVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                >
                    {/* Visual Side */}
                    <div className="lg:w-2/5 bg-gradient-to-br from-blue-600 to-blue-800 p-8 flex flex-col justify-center text-white relative overflow-hidden">
                        <FaChartLine className="text-9xl opacity-20 absolute -bottom-4 -right-4" />
                        <div className="relative z-10">
                            <div className="p-3 bg-white/20 w-fit rounded-xl mb-4 backdrop-blur-md">
                                <FaChartLine className="text-3xl" />
                            </div>
                            <h2 className="text-3xl font-bold mb-2">Trading</h2>
                            <p className="text-blue-100 text-sm font-medium">Financial Markets & Analysis</p>
                        </div>
                    </div>

                    {/* Content Side */}
                    <div className="lg:w-3/5 p-8 md:p-10 flex flex-col">
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6 text-lg">
                            Before the markets spring to life, traders catch up on overnight events. This involves reading financial news, listening to updates, and analyzing market trends.
                        </p>
                        
                        {/* Video Container */}
                        <div className="rounded-xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700 mb-6 group">
                            <div className="aspect-w-16 aspect-h-9 bg-black">
                                <iframe
                                    src="https://www.youtube.com/embed/wWlcTdLyXNw"
                                    title="Trading Video"
                                    className="w-full h-[250px] md:h-[300px]"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        </div>

                        <a 
                            href="https://docs.google.com/document/d/1DBRmAKIOMI3R7s7-svZEACdyaUZMpG7Y1IW1-N9TSwQ/edit#"
                            target="_blank" rel="noreferrer"
                            className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold hover:underline mt-auto group"
                        >
                            Read full guide on Trading 
                            <FaArrowRight className="transform group-hover:translate-x-1 transition-transform" />
                        </a>
                    </div>
                </div>

                {/* 3. Entrepreneurship Section */}
                <div 
                    ref={entrepreneurRef}
                    className={`bg-white dark:bg-gray-800 rounded-3xl shadow-xl dark:shadow-none overflow-hidden flex flex-col lg:flex-row-reverse transition-all duration-700 delay-200 ${entrepreneurVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                >
                    {/* Visual Side */}
                    <div className="lg:w-2/5 bg-gradient-to-br from-orange-500 to-red-600 p-8 flex flex-col justify-center text-white relative overflow-hidden">
                        <FaLightbulb className="text-9xl opacity-20 absolute -bottom-4 -left-4 transform scale-x-[-1]" />
                        <div className="relative z-10">
                            <div className="p-3 bg-white/20 w-fit rounded-xl mb-4 backdrop-blur-md">
                                <FaLightbulb className="text-3xl" />
                            </div>
                            <h2 className="text-3xl font-bold mb-2">Entrepreneurship</h2>
                            <p className="text-orange-100 text-sm font-medium">Innovation & Startups</p>
                        </div>
                    </div>

                    {/* Content Side */}
                    <div className="lg:w-3/5 p-8 md:p-10 flex flex-col">
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6 text-lg">
                            Insights from Mark Leruste regarding Entrepreneurship. Learn what it takes to build something from the ground up.
                        </p>
                        
                        {/* Video Grid */}
                        <div className="grid md:grid-cols-2 gap-4 mb-6">
                            {[
                                "https://www.youtube.com/embed/h-KHWUq3B7I",
                                "https://www.youtube.com/embed/f6nxcfbDfZo"
                            ].map((url, idx) => (
                                <div key={idx} className="rounded-xl overflow-hidden shadow-md border border-gray-200 dark:border-gray-700">
                                    <iframe
                                        src={url}
                                        title={`Entrepreneurship Video ${idx+1}`}
                                        className="w-full h-40"
                                        allowFullScreen
                                    ></iframe>
                                </div>
                            ))}
                        </div>

                        <a 
                            href="https://docs.google.com/document/d/1ClX5hx2F07fCM_Pa_n-9OwZBlByeEeDdz7E6_ZUuPEQ/edit"
                            target="_blank" rel="noreferrer"
                            className="inline-flex items-center gap-2 text-orange-600 dark:text-orange-400 font-bold hover:underline mt-auto group"
                        >
                            Read full guide on Entrepreneurship
                            <FaArrowRight className="transform group-hover:translate-x-1 transition-transform" />
                        </a>
                    </div>
                </div>

                {/* 4. Internships & Placements Section */}
                <div 
                    ref={internshipRef}
                    className={`relative bg-[#20AA9D]/10 dark:bg-[#20AA9D]/5 rounded-3xl p-8 md:p-12 border border-[#20AA9D]/20 transition-all duration-700 delay-300 ${internshipVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                >
                    <div className="text-center max-w-3xl mx-auto mb-10">
                        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4">Internships & Placements</h2>
                        <p className="text-gray-600 dark:text-gray-300">
                            Confused about where to start? Check out these compiled resources for the most popular career paths.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                        {/* Coding Card */}
                        <a 
                            href="https://docs.google.com/document/d/1Jr8s9MINrwSjW0DFM9cfsRljTlo04NlG9KoxQlLhI3E/edit"
                            target="_blank" rel="noreferrer"
                            className="flex items-center gap-5 p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-xl dark:shadow-none hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-blue-500 group"
                        >
                            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                <FaLaptopCode className="text-2xl" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">Coding Resources</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">DSA, Web Dev, CP & more</p>
                            </div>
                            <FaExternalLinkAlt className="ml-auto text-gray-300 group-hover:text-blue-500" />
                        </a>

                        {/* Consulting Card */}
                        <a 
                            href="https://docs.google.com/document/d/1fdUTzg7auwv5u_md9yhL7st1zaF2Cm2LunwuLPvnYsQ/edit"
                            target="_blank" rel="noreferrer"
                            className="flex items-center gap-5 p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-xl dark:shadow-none hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-purple-500 group"
                        >
                            <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl text-purple-600 dark:text-purple-400 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                                <FaUserTie className="text-2xl" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-800 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">Consulting Resources</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Case studies, Guesstimates</p>
                            </div>
                            <FaExternalLinkAlt className="ml-auto text-gray-300 group-hover:text-purple-500" />
                        </a>
                    </div>

                    <div className="mt-10 text-center">
                        <span className="inline-block px-4 py-2 bg-white/50 dark:bg-gray-800/50 rounded-full text-sm text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700">
                            🚀 Coming Soon: Finance, IAS, Freelancing, Research, MBA...
                        </span>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default CareerCounselling;