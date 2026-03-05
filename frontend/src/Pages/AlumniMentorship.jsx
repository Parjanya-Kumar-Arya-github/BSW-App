import React from 'react';
import { 
    FaUserTie, 
    FaUsers, 
    FaArrowRight, 
    FaLightbulb,
    FaHandshake,
    FaQuoteLeft
} from 'react-icons/fa';
import useReveal from '../common/Reveal';

const AlumniMentorship = () => {
    const [headerRef, headerVisible] = useReveal();
    const [contentRef, contentVisible] = useReveal();

    return (
        <div className="min-h-screen bg-transparent dark:bg-[#0f0f0f] pt-8 pb-20 transition-colors">
            <div className="max-w-7xl mx-auto px-4">

                {/* --- HEADER SECTION --- */}
                <div 
                    ref={headerRef} 
                    className={`
                        relative w-full overflow-hidden rounded-[3rem] p-10 md:p-20 bg-white dark:bg-slate-900 mb-12
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

                    <div className="relative z-10 text-center flex flex-col items-center">
                        <div className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-[#20AA9D]/10 text-[#20AA9D] mb-8 backdrop-blur-md shadow-sm border border-[#20AA9D]/20">
                            <FaUserTie className="text-5xl" />
                        </div>

                        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-8 tracking-tight leading-tight">
                            Alumni <span className="text-[#20AA9D]">Mentorship</span>
                        </h1>

                        <blockquote className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 font-serif italic max-w-3xl mx-auto leading-relaxed relative">
                            <FaQuoteLeft className="absolute -top-6 -left-8 text-4xl text-[#20AA9D]/20" />
                            "The mind is not a vessel that needs filling, but wood that needs igniting."
                            <footer className="text-sm md:text-base text-[#20AA9D] font-bold mt-4 not-italic uppercase tracking-widest font-sans">— Mestrius Plutarchus</footer>
                        </blockquote>
                    </div>
                </div>

                {/* --- MAIN CONTENT --- */}
                <div 
                    ref={contentRef}
                    className={`
                        space-y-16
                        transition-all duration-700 delay-100
                        ${contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
                    `}
                >
                    {/* Why Section */}
                    <div className="bg-white dark:bg-[#1a1a1a] rounded-[2.5rem] p-8 md:p-12 shadow-xl dark:shadow-none border border-gray-100 dark:border-[#2a2a2a] text-center">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Why do we need this program?</h2>
                        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-4xl mx-auto">
                            Students often feel overwhelmed by the multitude of opportunities at IIT. This program taps into our diverse global alumni network to grant new perspectives, helping students responsibly plan career trajectories and navigate life beyond campus.
                        </p>
                    </div>

                    {/* How it Works Section */}
                    <div>
                        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-10">How does it work?</h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            {[
                                { step: 1, title: "Registration", text: "Present IITD students and Alumni fill our exhaustive Registration Form.", color: "bg-rose-500", icon: "📝" },
                                { step: 2, title: "Mapping", text: "Algorithm driven mapping connects students and mentors based on interests and goals.", color: "bg-amber-500", icon: "🔗" },
                                { step: 3, title: "Repository", text: "A repository of Alumni testimonials is made available for unmatched students.", color: "bg-teal-500", icon: "📚" }
                            ].map((item, idx) => (
                                <div key={idx} className="bg-white dark:bg-[#1a1a1a] p-8 rounded-[2rem] shadow-lg dark:shadow-none border border-gray-100 dark:border-[#2a2a2a] hover:-translate-y-2 transition-transform duration-300 flex flex-col items-center text-center">
                                    <div className={`${item.color} w-16 h-16 rounded-2xl flex items-center justify-center text-white font-bold text-3xl mb-6 shadow-md rotate-3`}>
                                        {item.icon}
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{item.title}</h3>
                                    <p className="text-gray-600 dark:text-gray-400 font-medium">{item.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Benefits Grid */}
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* For Alumni */}
                        <div className="bg-gradient-to-br from-blue-50 to-white dark:from-[#1a1a1a] dark:to-[#121212] p-10 rounded-[2.5rem] shadow-xl dark:shadow-none border border-blue-100 dark:border-[#2a2a2a] relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100 dark:bg-blue-900/20 rounded-bl-[100%] z-0 transition-transform group-hover:scale-110"></div>
                            <div className="relative z-10">
                                <div className="w-16 h-16 bg-white dark:bg-[#222] rounded-2xl flex items-center justify-center text-blue-500 shadow-sm mb-6">
                                    <FaHandshake className="text-3xl" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">For Alumni</h3>
                                <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                                    Contribute to your alma mater by guiding students. Form meaningful relationships and prepare the next generation for the world beyond IIT.
                                </p>
                            </div>
                        </div>

                        {/* For Students */}
                        <div className="bg-gradient-to-br from-teal-50 to-white dark:from-[#1a1a1a] dark:to-[#121212] p-10 rounded-[2.5rem] shadow-xl dark:shadow-none border border-teal-100 dark:border-[#2a2a2a] relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-teal-100 dark:bg-teal-900/20 rounded-bl-[100%] z-0 transition-transform group-hover:scale-110"></div>
                            <div className="relative z-10">
                                <div className="w-16 h-16 bg-white dark:bg-[#222] rounded-2xl flex items-center justify-center text-teal-500 shadow-sm mb-6">
                                    <FaLightbulb className="text-3xl" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">For Students</h3>
                                <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                                    Access the vast alumni network. Learn from their experiences, gain mature perspectives, and grow personally and professionally.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Registration CTA */}
                    <div className="relative overflow-hidden bg-[#20AA9D] rounded-[3rem] p-12 md:p-20 text-center shadow-2xl">
                        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                        
                        <div className="relative z-10 max-w-4xl mx-auto">
                            <h2 className="text-3xl md:text-5xl font-bold text-white mb-12">Ready to Connect?</h2>

                            <div className="grid md:grid-cols-2 gap-8">
                                {/* Mentor CTA */}
                                <a
                                    href="https://iitd.almaconnect.com/mentorship"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="group bg-white/10 backdrop-blur-md border-2 border-white/30 hover:bg-white hover:text-[#20AA9D] text-white p-8 rounded-[2rem] transition-all duration-300 flex flex-col items-center justify-center"
                                >
                                    <span className="text-xl font-bold mb-2">I am an Alumnus</span>
                                    <div className="flex items-center gap-2 text-2xl font-black">
                                        Register as Mentor <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                                    </div>
                                    <span className="text-sm opacity-70 mt-4 font-mono uppercase tracking-widest">via AlmaConnect</span>
                                </a>

                                {/* Student CTA */}
                                <a
                                    href="https://iitd.almaconnect.com/mentorship"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="group bg-white text-[#20AA9D] hover:bg-teal-50 p-8 rounded-[2rem] transition-all duration-300 shadow-lg flex flex-col items-center justify-center"
                                >
                                    <span className="text-xl font-bold mb-2 text-gray-500">I am a Student</span>
                                    <div className="flex items-center gap-2 text-2xl font-black">
                                        Find a Mentor <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                                    </div>
                                    <span className="text-sm text-gray-400 mt-4 font-mono uppercase tracking-widest">via AlmaConnect</span>
                                </a>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default AlumniMentorship;