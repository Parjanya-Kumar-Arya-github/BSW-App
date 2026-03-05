import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaPaperPlane, FaArrowRight, FaEnvelope } from 'react-icons/fa';

const EmailSent = () => {
    const location = useLocation();
    const email = location.state?.email || 'your email';
    const type = location.state?.type || 'verification'; // 'reset' or 'verification'

    return (
        <div className="min-h-screen flex items-center justify-center dark:bg-[#121212] px-4 transition-colors duration-300">
            <div className="max-w-md w-full bg-white dark:bg-[#1a1a1a] rounded-[2rem] shadow-2xl p-8 md:p-12 text-center relative overflow-hidden">
                
                {/* Success Visual */}
                <div className="inline-flex items-center justify-center w-24 h-24 bg-[#e9fbf7] text-[#20AA9D] rounded-full mb-8 text-4xl shadow-inner animate-bounce">
                    <FaPaperPlane />
                </div>

                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Check Your Mail</h2>
                
                <p className="text-gray-500 dark:text-gray-400 mb-8 leading-relaxed">
                    We have sent a {type === 'reset' ? 'password reset link' : 'verification link'} to <br/>
                    <span className="font-bold text-gray-800 dark:text-gray-200">{email}</span>.
                </p>

                {/* Info Box */}
                <div className="bg-gray-50 dark:bg-[#222] p-5 rounded-xl border border-gray-100 dark:border-[#333] mb-8 text-sm text-gray-500">
                    <p className="mb-2 font-bold">Did not receive the email?</p>
                    <p>Check your spam filter or <span className="text-[#20AA9D] cursor-pointer hover:underline">try another email address</span>.</p>
                </div>

                {/* Buttons Container */}
                <div className="flex flex-col gap-4">
                    {/* Open Gmail Button */}
                    <a 
                        href="https://mail.google.com/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-full py-4 rounded-xl border-2 border-[#20AA9D] text-[#20AA9D] hover:bg-[#e9fbf7] dark:hover:bg-[#20AA9D]/10 font-bold text-lg transition-all flex items-center justify-center gap-2"
                    >
                        <FaEnvelope /> Open Gmail
                    </a>

                    {/* Back to Login Button */}
                    <Link 
                        to="/login" 
                        className="w-full py-4 rounded-xl bg-[#20AA9D] hover:bg-[#17857a] text-white font-bold text-lg shadow-lg shadow-[#20AA9D]/20 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2"
                    >
                        Back to Login <FaArrowRight />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default EmailSent;