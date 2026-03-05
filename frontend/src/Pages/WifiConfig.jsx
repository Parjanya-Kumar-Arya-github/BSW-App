import React, { useState } from 'react';
import { FaWifi, FaChevronDown, FaChevronUp, FaAndroid, FaApple, FaWindows, FaLaptop } from 'react-icons/fa';
import useReveal from '../common/Reveal';

const AccordionItem = ({ title, icon: Icon, children, isOpen, onClick }) => {
    return (
        <div className="border border-gray-200 dark:border-slate-700 rounded-lg mb-4 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <button
                className="w-full px-6 py-4 text-left bg-white dark:bg-neutral-700 flex justify-between items-center focus:outline-none"
                onClick={onClick}
            >
                <div className="flex items-center text-lg font-semibold text-gray-800 dark:text-gray-100">
                    {Icon && <Icon className="mr-3 text-[#20AA9D]" />}
                    {title}
                </div>
                {isOpen ? <FaChevronUp className="text-gray-500 dark:text-gray-400" /> : <FaChevronDown className="text-gray-500 dark:text-gray-400" />}
            </button>
            <div className={`bg-gray-50 dark:bg-slate-800 px-6 overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[800px] py-4 opacity-100' : 'max-h-0 py-0 opacity-0'}`}>
                <div className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {children}
                </div>
            </div>
        </div>
    );
};

const WifiConfig = () => {
    const [openIndex, setOpenIndex] = useState(0);
    const [headerRef, headerVisible] = useReveal();
    const [contentRef, contentVisible] = useReveal();

    return (
        <div className="min-h-screen bg-[#e9fbf7] dark:bg-neutral-800 pt-20 pb-20 transition-colors duration-300">
            <div 
                ref={headerRef}
                className={`bg-gradient-to-br from-[#20AA9D]/10 to-white dark:from-[#20AA9D]/20 dark:to-dark-card py-12 px-4 mb-12 transition-all duration-700 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            >
                <div className="max-w-7xl mx-auto text-center">
                    <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4 font-montserrat">Wi-Fi Configuration</h1>
                    <p className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300">
                        Connect to IITD_WIFI (or IITD_WIFI3) securely with these settings.
                    </p>
                </div>
            </div>

            <div 
                ref={contentRef}
                className={`max-w-3xl mx-auto px-4 transition-all duration-700 ${contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            >
                <AccordionItem
                    title="Note on Proxies"
                    icon={FaWifi}
                    isOpen={openIndex === 0}
                    onClick={() => setOpenIndex(prev => prev === 0 ? -1 : 0)}
                >
                    <p className="mb-2"><strong>Proxy Configuration URL:</strong> <code className="bg-gray-200 px-1 rounded">http://www.cc.iitd.ernet.in/cgi-bin/proxy.'category'</code></p>
                    <p className="mb-2">Where 'category' is one of: <code>btech</code>, <code>dual</code>, <code>mtech</code>, <code>phd</code>, <code>faculty</code>, <code>staff</code>, etc.</p>
                    <p className="mb-2"><strong>Manual Proxy:</strong> <code>proxyXX.iitd.ac.in</code> (XX=22 for B.Tech, 62 for M.Tech/PhD). Port: <code>3128</code>.</p>
                </AccordionItem>

                <AccordionItem
                    title="Android Mobile Phones"
                    icon={FaAndroid}
                    isOpen={openIndex === 1}
                    onClick={() => setOpenIndex(prev => prev === 1 ? -1 : 1)}
                >
                    <ul className="list-disc pl-5 space-y-2">
                        <li>Select <strong>IITD_WIFI</strong> (or IITD_WIFI3).</li>
                        <li><strong>EAP Method:</strong> PEAP.</li>
                        <li><strong>Phase 2 Authentication:</strong> MSCHAPV2.</li>
                        <li><strong>CA Certificate:</strong> Select 'Do not validate' (or install IITD CA Cert if mandatory).</li>
                        <li><strong>Identity:</strong> Your Kerberos ID.</li>
                        <li><strong>Password:</strong> Your Kerberos Password.</li>
                        <li><strong>Advanced Options {'>'} Proxy:</strong> Manual (see Proxy Note above) or Auto Config.</li>
                    </ul>
                </AccordionItem>

                <AccordionItem
                    title="iPhone and iPad"
                    icon={FaApple}
                    isOpen={openIndex === 2}
                    onClick={() => setOpenIndex(prev => prev === 2 ? -1 : 2)}
                >
                    <ul className="list-disc pl-5 space-y-2">
                        <li>Select <strong>IITD_WIFI</strong>. Enter credentials.</li>
                        <li>Click the 'i' icon next to the network.</li>
                        <li>Scroll to <strong>HTTP Proxy</strong> {'>'} Select <strong>Auto</strong>.</li>
                        <li>Enter the URL mentioned in the "Note on Proxies" section.</li>
                    </ul>
                </AccordionItem>

                <AccordionItem
                    title="Windows 10/11"
                    icon={FaWindows}
                    isOpen={openIndex === 3}
                    onClick={() => setOpenIndex(prev => prev === 3 ? -1 : 3)}
                >
                    <ul className="list-disc pl-5 space-y-2">
                        <li>Connect to <strong>IITD_WIFI</strong>. Enter username and password.</li>
                        <li>Accept the certificate warning if prompted.</li>
                        <li>Go to <strong>Settings {'>'} Network & Internet {'>'} Proxy</strong>.</li>
                        <li>Turn on "Use setup script" and paste the Proxy URL.</li>
                    </ul>
                </AccordionItem>

                <AccordionItem
                    title="MacOS"
                    icon={FaLaptop}
                    isOpen={openIndex === 4}
                    onClick={() => setOpenIndex(prev => prev === 4 ? -1 : 4)}
                >
                    <ul className="list-disc pl-5 space-y-2">
                        <li>Connect to <strong>IITD_WIFI</strong>.</li>
                        <li>Open <strong>System Preferences {'>'} Network {'>'} Wi-Fi {'>'} Advanced</strong>.</li>
                        <li>Go to <strong>Proxies</strong> tab.</li>
                        <li>Select <strong>Automatic Proxy Configuration</strong>.</li>
                        <li>Enter the Proxy URL. Click OK and Apply.</li>
                    </ul>
                </AccordionItem>
            </div>
        </div>
    );
};

export default WifiConfig;
