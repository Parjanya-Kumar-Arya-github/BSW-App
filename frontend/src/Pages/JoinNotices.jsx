import React, { useState, useEffect } from 'react';
import {
    FaUser,
    FaIdCard,
    FaEnvelope,
    FaPhoneAlt,
    FaArrowRight,
    FaGoogle,
    FaCheckCircle,
    FaGraduationCap,
    FaUserGraduate,
    FaUniversity
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import useReveal from '../common/Reveal';
import Loader from '../Components/Loader';
import config from '../config';
import SmilingFaceLoader from '../Components/SmilingFaceLoader';

const JoinGoogleGroup = () => {
    // Reveal Hooks for scroll animations
    const [headerRef, headerVisible] = useReveal();
    const [formRef, formVisible] = useReveal();

    // State Management
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');
    const [programType, setProgramType] = useState('UG'); // Default to UG

    const [formData, setFormData] = useState({
        name: '',
        entryNumber: '',
        email: '',
        phone: '',
    });

    // --- AUTO SCROLL TO SUCCESS MESSAGE ---
    useEffect(() => {
        if (success && formRef.current) {
            formRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, [success, formRef]);

    // Handle Input Changes
    const handleChange = (e) => {
        setError('');
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Logic to resolve Google Group URL
    const resolveGroupURL = (entryNumber, type) => {
        // Extract year from the first 4 digits
        const year = entryNumber.substring(0, 4);
        const yearInt = parseInt(year);

        // Basic validation
        if (isNaN(yearInt) || year.length !== 4) return null;

        // Determine slug based on program type
        let groupSlug = 'ug';
        if (type === 'PG') {
            groupSlug = 'pg';
        } else if (type === 'PhD') {
            groupSlug = 'phd';
        }

        return `https://groups.google.com/g/iit-delhi-${groupSlug}-${year}`;
    };

    // Form Submission Handler
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        
        const { name, entryNumber, email, phone } = formData;

        if (!name || !entryNumber || !email || !phone) {
            setError('All fields are required.');
            return;
        }

        try {
            setLoading(true);

            // 1. Resolve URL
            const groupURL = resolveGroupURL(entryNumber, programType);
            
            if (!groupURL) {
                setError('Invalid entry number. Could not extract year.');
                setLoading(false);
                return;
            }

            // 2. Record Data in Backend
            await fetch(`${config.baseAPIURL}/notices/record`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                // credentials: "include", // Uncomment if your backend requires cookies
                body: JSON.stringify({
                    name,
                    entryNumber,
                    email,
                    phoneNumber: phone,
                    program: programType
                }),
            });

            // 3. Show Success State & Redirect
            setLoading(false);
            setSuccess(true); // This triggers the useEffect to scroll

            setTimeout(() => {
                window.location.href = groupURL;
            }, 2000);

        } catch (err) {
            console.error(err);
            setError('Failed to record entry. Please try again.');
            setLoading(false);
        }
    };

    if (loading) return <SmilingFaceLoader />;

    return (
        <div className="w-full max-w-6xl mx-auto px-4 py-8 md:py-12 min-h-screen">
            
            {/* Header Section */}
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
                // Moved background color here to support Dark Mode
                className="absolute pointer-events-none bg-[#fbcfe8] dark:bg-[#500724]"
                style={{
                    bottom: '-20%',
                    left: '-5%',
                    width: '500px', // Increased size
                    height: '600px', // Increased size
                    // background: '#fbcfe8',  <-- REMOVED from style
                    filter: 'blur(40px)',
                    borderRadius: '50%',
                    zIndex: 0,
                    animation: 'blob 7s infinite', // Slower
                }}
                />

                {/* Blob 2: Middle/Transition Purple */}
                <div
                // Light: #c083eb | Dark: Deep Purple
                className="absolute pointer-events-none bg-[#c083eb] dark:bg-[#581c87]"
                style={{
                    top: '25%',
                    right: '45%', 
                    width: '350px', // Increased size
                    height: '350px', // Increased size
                    // background: '#c083eb', <-- REMOVED from style
                    opacity: 0.3,
                    filter: 'blur(80px)',
                    borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
                    transform: 'rotate(-30deg)',
                    zIndex: 0,
                    animation: 'blob-reverse 8s infinite', // Variant, Slower
                    animationDelay: '1s',
                }}
                />

                {/* Blob 3: Deep Blue with 3-Step DIAGONAL Gradient */}
                <div
                // We use arbitrary tailwind values for the gradient to support dark mode switching
                // Light: Your exact gradient
                // Dark: A deep indigo/navy gradient (no white/grey edge)
                className="
                    absolute pointer-events-none 
                    bg-[linear-gradient(75deg,#656df7_0%,#9DA2F3_70%,#f5f5f5_80%)]
                    dark:bg-[linear-gradient(75deg,#1e1b4b_0%,#312e81_70%,#4338ca_80%)]
                "
                style={{
                    top: '-23%',
                    right: '-2%',
                    width: '450px', // Increased size
                    height: '450px', // Increased size
                    // background: ... <-- REMOVED from style
                    opacity: 1,
                    filter: 'blur(20px)', 
                    borderRadius: '30% 70% 70% 50% / 30% 30% 65% 70%',
                    transform: 'rotate(-30deg)',
                    zIndex: 0,
                    animation: 'blob 7s infinite', // Slower
                    animationDelay: '2s',
                }}
                />

                {/* Blob 4: Deep Purple blob in middle of top edge */}
                <div
                // Light: Your exact gradient
                // Dark: Deep violet gradient
                className="
                    absolute pointer-events-none
                    bg-[linear-gradient(75deg,#fadef0_0%,#7d83f793_80%)]
                    dark:bg-[linear-gradient(75deg,#4a044e_0%,#2e1065_80%)]
                "
                style={{
                    top: '-23%',
                    right: '30%',
                    width: '380px', // Increased size
                    height: '380px', // Increased size
                    // background: ... <-- REMOVED from style
                    opacity: 0.7,
                    filter: 'blur(20px)', 
                    borderRadius: '30% 70% 70% 50% / 30% 30% 65% 70%',
                    transform: 'rotate(-30deg)',
                    zIndex: 0,
                    animation: 'blob-reverse 8s infinite', // Variant, Slower
                    animationDelay: '0.5s', // slightly offset
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
                
                {/* Glass Overlay - Ensures text contrast in both modes */}
                <div 
                className="absolute inset-0 z-0 bg-white/30 backdrop-blur-[1px] dark:bg-slate-900/30"
                />

                {/* --- BACKGROUND BLOBS END --- */}

                <div className="relative z-10 max-w-3xl">
                    <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight leading-tight">
                        Join Official <br />
                        <span className="text-[#20AA9D]">IITD Notices</span>
                    </h1>
                    
                    <p className="text-lg text-slate-700 dark:text-slate-300 font-medium mb-8 max-w-xl">
                        Receive important academic & administrative notices directly to your inbox.
                    </p>

                    <div className="flex flex-wrap items-center gap-4">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-black/30 border border-transparent dark:border-white/10 rounded-full text-sm font-semibold text-gray-700 dark:text-gray-300 shadow-sm">
                            <FaGoogle className="text-[#20AA9D]" />
                            <span>Google Groups Integration</span>
                        </div>
                        <Link 
                            to="/noticesForm"
                            className="text-[#20AA9D] font-bold hover:underline underline-offset-4 text-sm transition-colors"
                        >
                            Submit a notice instead?
                        </Link>
                    </div>
                </div>
            </div>

            {/* Form Section / Success Section */}
            <div 
                ref={formRef}
                className={`
                    max-w-2xl mx-auto
                    bg-white dark:bg-[#121212] 
                    rounded-[2rem] p-8 md:p-10
                    border border-gray-100 dark:border-[#2a2a2a]
                    shadow-xl dark:shadow-none
                    transition-all duration-700 delay-100 ease-out transform
                    ${formVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
                `}
            >
                {success ? (
                    // --- SUCCESS STATE ---
                    <div className="flex flex-col items-center justify-center py-10 text-center animate-fadeIn">
                        <div className="w-24 h-24 bg-green-50 dark:bg-green-900/20 rounded-full flex items-center justify-center mb-6 shadow-inner">
                            <FaCheckCircle className="text-5xl text-green-500" />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                            Details Verified!
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto leading-relaxed">
                            Your entry has been recorded successfully. You are now being redirected to the Google Group page.
                        </p>
                        <div className="flex items-center gap-2 text-[#20AA9D] font-bold animate-pulse bg-[#20AA9D]/10 px-4 py-2 rounded-full">
                            <span>Redirecting</span>
                            <FaArrowRight className="text-sm" />
                        </div>
                    </div>
                ) : (
                    // --- FORM STATE ---
                    <>
                        <div className="mb-8 border-b border-gray-100 dark:border-[#2a2a2a] pb-6">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                                Student Verification
                            </h2>
                            <p className="text-gray-500 dark:text-gray-400 text-sm">
                                Please select your program and enter your details to verify your identity.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit}>
                            {error && (
                                <div className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm font-medium border border-red-100 dark:border-red-800/30 flex items-center gap-2">
                                    <span>⚠️</span> {error}
                                </div>
                            )}

                            {/* Program Type Selection */}
                            <div className="mb-8">
                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3 pl-1">
                                    Select Program
                                </label>
                                <div className="grid grid-cols-3 gap-3">
                                    <ProgramOption 
                                        label="UG" 
                                        subLabel="(Bachelors)"
                                        icon={<FaGraduationCap />}
                                        value="UG"
                                        selected={programType === 'UG'}
                                        onClick={() => setProgramType('UG')}
                                    />
                                    <ProgramOption 
                                        label="PG" 
                                        subLabel="(Masters)"
                                        icon={<FaUserGraduate />}
                                        value="PG"
                                        selected={programType === 'PG'}
                                        onClick={() => setProgramType('PG')}
                                    />
                                    <ProgramOption 
                                        label="PhD" 
                                        subLabel="(Research)"
                                        icon={<FaUniversity />}
                                        value="PhD"
                                        selected={programType === 'PhD'}
                                        onClick={() => setProgramType('PhD')}
                                    />
                                </div>
                            </div>

                            <div className="space-y-6">
                                <ThemedInput
                                    label="Full Name"
                                    placeholder="e.g. Rohit Kumar"
                                    icon={<FaUser />}
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                />

                                <ThemedInput
                                    label="Entry Number"
                                    placeholder={programType === 'UG' ? "e.g. 2023CS10234" : "e.g. 2023PEZ1234"}
                                    icon={<FaIdCard />}
                                    name="entryNumber"
                                    value={formData.entryNumber}
                                    onChange={handleChange}
                                />

                                <ThemedInput
                                    label="Email Address"
                                    placeholder="kerry@iitd.ac.in"
                                    icon={<FaEnvelope />}
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                />

                                <ThemedInput
                                    label="Phone Number"
                                    placeholder="+91 98765 43210"
                                    icon={<FaPhoneAlt />}
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                />
                            </div>

                            <button
                                type="submit"
                                className="
                                    mt-10 w-full flex items-center justify-center gap-2
                                    px-8 py-4 rounded-xl 
                                    bg-[#20AA9D] hover:bg-[#17857a] 
                                    text-white font-bold text-lg
                                    transition-all duration-300 shadow-lg shadow-[#20AA9D]/20
                                    hover:shadow-xl hover:-translate-y-1 active:scale-[0.98]
                                "
                            >
                                Join {programType} Group
                                <FaArrowRight />
                            </button>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
};

/* ---------------- Helper Components ---------------- */

const ProgramOption = ({ label, subLabel, icon, value, selected, onClick }) => (
    <label
        onClick={onClick}
        className={`
            cursor-pointer relative overflow-hidden
            border rounded-xl p-3 md:p-4 
            flex flex-col items-center justify-center gap-2 
            transition-all duration-200 text-center select-none
            ${selected 
                ? 'border-[#20AA9D] bg-[#20AA9D]/5 text-[#20AA9D] shadow-sm ring-1 ring-[#20AA9D]' 
                : 'border-gray-200 dark:border-[#333] text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-[#1a1a1a] hover:border-gray-300 dark:hover:border-[#444]'
            }
        `}
    >
        <div className={`text-2xl mb-1 ${selected ? 'scale-110' : 'scale-100'} transition-transform duration-200`}>
            {icon}
        </div>
        <div className="leading-tight">
            <span className="block text-sm font-bold">{label}</span>
            <span className="block text-[10px] opacity-70 font-medium uppercase tracking-wide">{subLabel}</span>
        </div>
    </label>
);

const ThemedInput = ({ label, icon, ...props }) => (
    <div>
        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 pl-1">
            {label}
        </label>
        <div className="relative group">
            {icon && (
                <span 
                    className="
                        absolute left-4 top-1/2 -translate-y-1/2 
                        text-gray-400 group-focus-within:text-[#20AA9D] 
                        transition-colors duration-200 text-lg
                    "
                >
                    {icon}
                </span>
            )}
            <input
                {...props}
                className="
                    w-full pl-12 pr-4 py-3.5 rounded-xl
                    bg-gray-50 dark:bg-[#1f1f1f]
                    border border-gray-200 dark:border-[#333]
                    text-gray-900 dark:text-white
                    placeholder-gray-400 dark:placeholder-gray-600
                    font-medium outline-none
                    focus:bg-white dark:focus:bg-[#1a1a1a]
                    focus:ring-2 focus:ring-[#20AA9D] focus:border-transparent
                    transition-all duration-200
                "
            />
        </div>
    </div>
);

export default JoinGoogleGroup;