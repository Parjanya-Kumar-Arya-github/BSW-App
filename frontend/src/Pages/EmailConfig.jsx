import React, { useState } from 'react';
import {
    FaChevronDown,
    FaChevronUp,
    FaAndroid,
    FaApple,
    FaWindows,
} from 'react-icons/fa';
import useReveal from '../common/Reveal';

/* ---------------- Accordion Item ---------------- */

const AccordionItem = ({ title, icon: Icon, children, isOpen, onClick }) => {
    return (
        <div
            className="
        bg-white dark:bg-[#121212]
        border border-gray-100 dark:border-[#2a2a2a]
        rounded-[1.5rem]
        shadow-[0_4px_20px_rgb(0,0,0,0.03)] dark:shadow-none
        overflow-hidden
        transition-all
      "
        >
            <button
                onClick={onClick}
                className="
          w-full px-6 py-5
          flex items-center justify-between
          text-left
          focus:outline-none
          group
        "
            >
                <div className="flex items-center gap-4">
                    {Icon && (
                        <div
                            className="
                w-12 h-12 rounded-2xl
                bg-[#20AA9D]/10 text-[#20AA9D]
                flex items-center justify-center
                transition-colors
                group-hover:bg-[#20AA9D] group-hover:text-white
              "
                        >
                            <Icon className="text-xl" />
                        </div>
                    )}
                    <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200">
                        {title}
                    </h3>
                </div>

                {isOpen ? (
                    <FaChevronUp className="text-gray-400" />
                ) : (
                    <FaChevronDown className="text-gray-400" />
                )}
            </button>

            <div
                className={`
          px-6 transition-all duration-300 ease-in-out
          ${isOpen ? 'max-h-[500px] pb-6 opacity-100' : 'max-h-0 opacity-0'}
        `}
            >
                <div className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {children}
                </div>
            </div>
        </div>
    );
};

/* ---------------- Page ---------------- */

const EmailConfig = () => {
    const [openIndex, setOpenIndex] = useState(0);
    const [headerRef, headerVisible] = useReveal();
    const [contentRef, contentVisible] = useReveal();

    return (
        <div className="min-h-screen bg-white dark:bg-[#0f0f0f] pt-8 pb-20 transition-colors">
            <div className="max-w-7xl mx-auto px-4">

                {/* Header Banner (MATCHES QUESTION PAPERS) */}
                <div
                    ref={headerRef}
                    className={`
            bg-gray-200 dark:bg-[#1a1a1a]
            rounded-[2.5rem] p-8 md:p-12 mb-12
            transition-all duration-700 ease-out
            ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
          `}
                >
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">
                            Email <span className="text-[#20AA9D]">Configuration</span>
                        </h1>
                        <p className="text-lg text-gray-600 dark:text-gray-400 font-medium">
                            Step-by-step guides to set up your IIT Delhi email on various devices.
                        </p>
                    </div>
                </div>

                {/* Content */}
                <div
                    ref={contentRef}
                    className={`
            max-w-3xl mx-auto space-y-6
            transition-all duration-700 delay-100
            ${contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
          `}
                >
                    <AccordionItem
                        title="Android Mobile Phones"
                        icon={FaAndroid}
                        isOpen={openIndex === 0}
                        onClick={() => setOpenIndex(openIndex === 0 ? -1 : 0)}
                    >
                        <ul className="list-disc pl-5 space-y-2">
                            <li>Go to <strong>Settings &gt; Accounts &gt; Add Account &gt; Email</strong>.</li>
                            <li>Enter <code>kerberos_id@iitd.ac.in</code>.</li>
                            <li>Enter your <strong>Kerberos Password</strong>.</li>
                            <li>Select <strong>Manual Setup → IMAP</strong>.</li>
                            <li><strong>Incoming:</strong> <code>mailstore.iitd.ac.in</code> (SSL).</li>
                            <li><strong>Outgoing:</strong> <code>smtp.iitd.ac.in</code> (SSL).</li>
                        </ul>
                    </AccordionItem>

                    <AccordionItem
                        title="iPhone and iPad"
                        icon={FaApple}
                        isOpen={openIndex === 1}
                        onClick={() => setOpenIndex(openIndex === 1 ? -1 : 1)}
                    >
                        <ul className="list-disc pl-5 space-y-2">
                            <li>Go to <strong>Settings &gt; Mail &gt; Accounts &gt; Add Account</strong>.</li>
                            <li>Select <strong>Other → Add Mail Account</strong>.</li>
                            <li>Use <code>kerberos_id@iitd.ac.in</code>.</li>
                            <li>Select <strong>IMAP</strong>.</li>
                            <li><strong>Incoming:</strong> <code>mailstore.iitd.ac.in</code>.</li>
                            <li><strong>Outgoing:</strong> <code>smtp.iitd.ac.in</code>.</li>
                        </ul>
                    </AccordionItem>

                    <AccordionItem
                        title="Windows / Other Devices"
                        icon={FaWindows}
                        isOpen={openIndex === 2}
                        onClick={() => setOpenIndex(openIndex === 2 ? -1 : 2)}
                    >
                        <ul className="list-disc pl-5 space-y-2">
                            <li>Select <strong>Advanced Setup → Internet Email</strong>.</li>
                            <li>Account Type: <strong>IMAP4</strong>.</li>
                            <li><strong>Incoming:</strong> <code>mailstore.iitd.ac.in</code>.</li>
                            <li><strong>Outgoing:</strong> <code>smtp.iitd.ac.in</code>.</li>
                            <li>Enable <strong>SSL</strong> and authentication.</li>
                        </ul>
                    </AccordionItem>
                </div>
            </div>
        </div>
    );
};

export default EmailConfig;
