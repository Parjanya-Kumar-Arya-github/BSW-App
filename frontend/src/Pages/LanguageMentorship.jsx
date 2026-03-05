import React, { useState } from "react";
import landingimg from "../assets/images/main.svg"; // Ensure this path is correct
import { 
  FaLanguage, 
  FaDownload, 
  FaLightbulb, 
  FaBookOpen, 
  FaGlobeAsia,
  FaChalkboardTeacher,
  FaBriefcase,
  FaComments
} from "react-icons/fa";
import { MdBrokenImage } from "react-icons/md";
import useReveal from "../common/Reveal";

/* ================= CONTENT DATA ================= */
const CONTENT = {
  en: {
    header: {
      title: "Language Mentorship",
      tagline: "Bridging The Communication Gap",
    },
    sections: [
      {
        key: 'introduction',
        title: "Introduction",
        icon: FaComments,
        points: [
          "Language Mentorship is an initiative of BSW that aims to create a holistic ecosystem where students can learn and practice language.",
          "The objective is to help students who are not comfortable with English or Hindi understand and comprehend the language.",
          "This helps students adapt to the academic system in IITD, interact with peers, and gain confidence to speak to professors."
        ],
        image: "https://illustrations.popsy.co/teal/surr-getting-coffee.svg", // Placeholder illustrative style
      },
      {
        key: 'importance',
        title: "Importance Of Communication",
        subtitle: "Skills Aren't Everything",
        icon: FaLightbulb,
        points: [
          "Every person is unique and we all possess valuable skill sets.",
          "Naturally, our skills are the ones that earn us a status of some kind.",
          "Skill is only an ingredient for success, which displays its true potential only when supported by the way you communicate and showcase your ideas."
        ],
        image: "https://illustrations.popsy.co/teal/surr-payment-success.svg",
      },
      {
        key: 'necessity',
        title: "Necessity Of Learning English",
        subtitle: "Even On A Global Level",
        icon: FaGlobeAsia,
        points: [
          "English is a globally accepted language. Its use has become so common that having a good command over the language is essential.",
          "When you attend seminars or travel, you need to know English to navigate and communicate.",
          "Students often don't realise the importance on time and end up being a victim of language barriers."
        ],
        image: "https://illustrations.popsy.co/teal/surr-working.svg",
      },
      {
        key: 'motivationCollege',
        title: "Motivation: College Life",
        subtitle: "Academics & Daily Interactions",
        icon: FaChalkboardTeacher,
        points: [
          "It forms a part of your daily lives where all the lectures, assignments and interactions are given to you.",
          "Constant interactions with professors and Teaching assistants.",
          "All of the presentations and informative sessions usually have information compiled in English."
        ],
        // No image for this one to vary layout
      },
      {
        key: 'motivationCareer',
        title: "Motivation: Career",
        subtitle: "Internships & Placements",
        icon: FaBriefcase,
        points: [
          "Interviews and placements have a major part of English speaking.",
          "The way you communicate makes a huge difference and makes you stand out from the crowd.",
          "From writing emails for internships to showcasing achievements, language lies at the core."
        ],
        image: "https://illustrations.popsy.co/teal/surr-success.svg",
      },
      {
        key: 'future',
        title: "English Required In The Future",
        icon: FaBookOpen,
        points: [
          "Most meetings, webinars, and articles are in English.",
          "Announcements and instructions at your daily job are conveyed in English.",
          "Even if it doesn’t seem useful right now, your communication skills will come in handy later."
        ],
        image: "https://illustrations.popsy.co/teal/surr-reading.svg",
      }
    ],
    workbook: {
      title: "The Workbook",
      description: "The WorkBook is a complete A To Z module designed to help any Beginner become College Ready. It allows people with no prior knowledge of English to work on their own.",
      button: "Download Workbook",
    },
    insights: {
      title: "Insights & Talks",
    }
  },

  hi: {
    header: {
      title: "भाषा मार्गदर्शन",
      tagline: "संचार की दूरी को पाटते हुए",
    },
    sections: [
      {
        key: 'introduction',
        title: "परिचय",
        icon: FaComments,
        points: [
          "भाषा मार्गदर्शन बीएसडब्ल्यू की एक पहल है जिसका उद्देश्य छात्रों के लिए ऐसा वातावरण बनाना है जहाँ वे भाषा सीख और अभ्यास कर सकें।",
          "इसका उद्देश्य उन छात्रों की सहायता करना है जो अंग्रेज़ी या हिंदी में सहज नहीं हैं।",
          "यह छात्रों को आईआईटी दिल्ली की शैक्षणिक प्रणाली में ढलने और आत्मविश्वास के साथ संवाद करने में मदद करता है।"
        ],
        image: "https://illustrations.popsy.co/teal/surr-getting-coffee.svg",
      },
      {
        key: 'importance',
        title: "संचार का महत्व",
        subtitle: "केवल कौशल ही सब कुछ नहीं है",
        icon: FaLightbulb,
        points: [
          "हर व्यक्ति अद्वितीय होता है और सभी के पास मूल्यवान कौशल होते हैं।",
          "स्वाभाविक रूप से, हमारे कौशल ही हमें पहचान दिलाते हैं।",
          "सफलता तभी पूर्ण होती है जब कौशल के साथ प्रभावी संचार भी हो, और आप अपने विचारों को सही ढंग से प्रस्तुत कर सकें।"
        ],
        image: "https://illustrations.popsy.co/teal/surr-payment-success.svg",
      },
      {
        key: 'necessity',
        title: "अंग्रेज़ी सीखने की आवश्यकता",
        subtitle: "वैश्विक स्तर पर",
        icon: FaGlobeAsia,
        points: [
          "अंग्रेज़ी एक वैश्विक भाषा है और इसका ज्ञान आवश्यक है।",
          "बैठकों, सेमिनारों, यात्राओं और संवाद के लिए अंग्रेज़ी की आवश्यकता होती है।",
          "समय पर इसका महत्व न समझने से छात्र भाषा बाधाओं का सामना करते हैं।"
        ],
        image: "https://illustrations.popsy.co/teal/surr-working.svg",
      },
      {
        key: 'motivationCollege',
        title: "प्रेरणा: कॉलेज जीवन",
        subtitle: "अकादमिक और दैनिक जीवन",
        icon: FaChalkboardTeacher,
        points: [
          "लेक्चर, असाइनमेंट और संवाद अंग्रेज़ी में होते हैं।",
          "प्रोफेसरों और टीए के साथ निरंतर बातचीत होती है।",
          "प्रस्तुतियाँ और सेमिनार सामान्यतः अंग्रेज़ी में होते हैं।"
        ],
      },
      {
        key: 'motivationCareer',
        title: "प्रेरणा: करियर",
        subtitle: "इंटर्नशिप और प्लेसमेंट",
        icon: FaBriefcase,
        points: [
          "इंटरव्यू और प्लेसमेंट में अंग्रेज़ी की महत्वपूर्ण भूमिका होती है।",
          "आपका संचार कौशल आपको दूसरों से अलग बनाता है।",
          "ईमेल, इंटरव्यू और उपलब्धियों की प्रस्तुति भाषा पर निर्भर करती है।"
        ],
        image: "https://illustrations.popsy.co/teal/surr-success.svg",
      },
      {
        key: 'future',
        title: "भविष्य में आवश्यकता",
        icon: FaBookOpen,
        points: [
          " अधिकांश मीटिंग और वेबिनार अंग्रेज़ी में होते हैं।",
          "लेख, न्यूज़लेटर और प्रस्तुतियाँ अंग्रेज़ी में होती हैं।",
          "संचार कौशल जीवनभर उपयोगी रहते हैं, चाहे आप बाद में कुछ भी करें।"
        ],
        image: "https://illustrations.popsy.co/teal/surr-reading.svg",
      }
    ],
    workbook: {
      title: "वर्कबुक",
      description: "वर्कबुक एक संपूर्ण A से Z मॉड्यूल है जो शुरुआती छात्रों को कॉलेज के लिए तैयार करता है, भले ही उन्हें अंग्रेज़ी का पूर्व ज्ञान न हो।",
      button: "वर्कबुक डाउनलोड करें",
    },
    insights: {
      title: "इनसाइट्स और वार्ताएँ",
    }
  },
};

const VIDEOS = [
  {
    title: "How language shapes the way we think",
    url: "https://www.youtube.com/embed/RKK7wGAYP6k",
  },
  {
    title: "Does Grammar matter?",
    url: "https://www.youtube.com/embed/Wn_eBrIDUuc",
  },
];

/* ================= COMPONENT ================= */

const LanguageMentorship = () => {
  const [language, setLanguage] = useState("en");
  const t = CONTENT[language];
  const [headerRef, headerVisible] = useReveal();
  const [contentRef, contentVisible] = useReveal();

  return (
    <div className="min-h-screen bg-transparent dark:bg-[#0f0f0f] pt-8 pb-20 transition-colors">
      <div className="max-w-7xl mx-auto px-4">

        {/* --- HEADER SECTION --- */}
        <div
          ref={headerRef}
          className={`
            relative w-full overflow-hidden rounded-[3rem] p-10 md:p-16 bg-white dark:bg-slate-900 mb-12
            transition-all duration-700 ease-out transform
            shadow-2xl border border-gray-200 dark:border-gray-700
            ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
          `}
        >
           {/* --- BACKGROUND BLOBS --- */}
           <div className="absolute pointer-events-none bg-[#fbcfe8] dark:bg-[#500724] bottom-[-20%] left-[-5%] w-[500px] h-[600px] blur-[40px] rounded-full z-0 animate-blob" />
           <div className="absolute pointer-events-none bg-[#c083eb] dark:bg-[#581c87] top-[25%] right-[45%] w-[350px] h-[350px] opacity-30 blur-[80px] rounded-full z-0 animate-blob-reverse animation-delay-1000" />
           <div className="absolute pointer-events-none bg-gradient-to-r from-[#656df7] to-[#9DA2F3] dark:from-[#1e1b4b] dark:to-[#312e81] top-[-23%] right-[-2%] w-[450px] h-[450px] opacity-80 blur-[20px] rounded-full z-0 animate-blob animation-delay-2000" />
           <div className="absolute inset-0 z-0 bg-white/30 backdrop-blur-[1px] dark:bg-slate-900/30" />
           {/* --- END BLOBS --- */}

           {/* Header Content */}
           <div className="relative z-10 grid md:grid-cols-2 gap-10 items-center">
              <div>
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#20AA9D]/10 text-[#20AA9D] mb-6 backdrop-blur-md border border-[#20AA9D]/20">
                      <FaLanguage className="text-3xl" />
                  </div>
                  
                  <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">
                    {t.header.title}
                  </h1>
                  <p className="text-xl text-[#20AA9D] font-medium italic mb-8">
                    "{t.header.tagline}"
                  </p>

                  {/* Language Toggle */}
                  <div className="inline-flex bg-white dark:bg-black/20 rounded-full p-1.5 border border-gray-200 dark:border-gray-700 shadow-sm">
                      <button 
                        onClick={() => setLanguage("en")}
                        className={`px-6 py-2 rounded-full font-bold text-sm transition-all ${language === 'en' ? 'bg-[#20AA9D] text-white shadow-md' : 'text-gray-500 hover:text-gray-800 dark:text-gray-400'}`}
                      >
                        English
                      </button>
                      <button 
                        onClick={() => setLanguage("hi")}
                        className={`px-6 py-2 rounded-full font-bold text-sm transition-all ${language === 'hi' ? 'bg-[#20AA9D] text-white shadow-md' : 'text-gray-500 hover:text-gray-800 dark:text-gray-400'}`}
                      >
                        हिंदी
                      </button>
                  </div>
              </div>

              {/* Hero Image */}
              <div className="flex justify-center md:justify-end">
                  <img src={landingimg} alt="Language Mentorship" className="w-full max-w-sm drop-shadow-2xl hover:scale-105 transition-transform duration-500" />
              </div>
           </div>
        </div>

        {/* --- MAIN CONTENT --- */}
        <div
            ref={contentRef}
            className={`
                space-y-12
                transition-all duration-700 delay-100
                ${contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
            `}
        >
            {/* Info Cards */}
            {t.sections.map((section, index) => (
                <div 
                    key={index}
                    className={`
                        group flex flex-col md:flex-row items-center gap-8 md:gap-14 p-8 md:p-12
                        bg-white dark:bg-[#1a1a1a] rounded-[2.5rem]
                        border border-gray-100 dark:border-[#2a2a2a]
                        shadow-[0_4px_20px_rgb(0,0,0,0.03)] dark:shadow-none
                        transition-all duration-300 hover:-translate-y-1
                        ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}
                    `}
                >
                    {/* Text Side */}
                    <div className="flex-1">
                        <div className="flex items-center gap-4 mb-4">
                             <div className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-[#222] text-[#20AA9D] flex items-center justify-center shrink-0">
                                <section.icon className="text-xl" />
                             </div>
                             <div>
                                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                                    {section.title}
                                </h2>
                                {section.subtitle && (
                                    <p className="text-sm font-bold text-gray-400 uppercase tracking-wider">{section.subtitle}</p>
                                )}
                             </div>
                        </div>
                        
                        <ul className="space-y-3">
                            {section.points.map((point, i) => (
                                <li key={i} className="flex gap-3 text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                                    <span className="text-[#20AA9D] mt-1.5">•</span>
                                    {point}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Image Side (If exists) */}
                    {section.image && (
                        <div className="w-full md:w-5/12 flex justify-center">
                            <img 
                                src={section.image} 
                                alt={section.title} 
                                className="w-full max-w-[300px] object-contain drop-shadow-lg"
                                onError={(e) => (e.target.src = MdBrokenImage)}
                            />
                        </div>
                    )}
                </div>
            ))}

            {/* Workbook Banner */}
            <div className="relative overflow-hidden bg-[#20AA9D] rounded-[2.5rem] p-10 md:p-16 text-center text-white shadow-xl">
                <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                
                <div className="relative z-10 max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">{t.workbook.title}</h2>
                    <p className="text-lg md:text-xl text-white/90 mb-8 font-medium leading-relaxed">
                        {t.workbook.description}
                    </p>
                    <button className="px-10 py-4 bg-white text-[#20AA9D] rounded-full font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg flex items-center gap-3 mx-auto">
                        <FaDownload /> {t.workbook.button}
                    </button>
                </div>
            </div>

            {/* Videos Section */}
            <div className="pt-8">
                <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-10">
                    {t.insights.title}
                </h2>
                <div className="grid md:grid-cols-2 gap-8">
                    {VIDEOS.map((v, i) => (
                        <div 
                            key={i} 
                            className="bg-white dark:bg-[#1a1a1a] p-4 rounded-[2rem] border border-gray-100 dark:border-[#2a2a2a] shadow-lg group hover:-translate-y-1 transition-transform"
                        >
                            <div className="relative pt-[56.25%] rounded-[1.5rem] overflow-hidden mb-4 bg-gray-200 dark:bg-gray-800">
                                <iframe
                                    src={v.url}
                                    title={v.title}
                                    className="absolute inset-0 w-full h-full"
                                    allowFullScreen
                                />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white px-2 mb-2">
                                {v.title}
                            </h3>
                        </div>
                    ))}
                </div>
            </div>

        </div>
      </div>

      <style>{`
         @keyframes blob {
            0% { transform: translate(0px, 0px) scale(1); }
            33% { transform: translate(30px, -50px) scale(1.1); }
            66% { transform: translate(-20px, 20px) scale(0.9); }
            100% { transform: translate(0px, 0px) scale(1); }
          }
          @keyframes blob-reverse {
            0% { transform: translate(0px, 0px) scale(1); }
            33% { transform: translate(-30px, 40px) scale(1.1); }
            66% { transform: translate(20px, -20px) scale(0.9); }
            100% { transform: translate(0px, 0px) scale(1); }
          }
          .animate-blob { animation: blob 7s infinite; }
          .animate-blob-reverse { animation: blob-reverse 7s infinite; }
          .animation-delay-1000 { animation-delay: 1s; }
          .animation-delay-2000 { animation-delay: 2s; }
      `}</style>
    </div>
  );
};

export default LanguageMentorship;