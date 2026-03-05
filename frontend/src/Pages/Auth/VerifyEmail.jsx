import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { 
    FaLock, 
    FaEye, 
    FaEyeSlash, 
    FaSpinner, 
    FaExclamationTriangle,
    FaUserCheck,
    FaArrowRight
} from 'react-icons/fa';
import config from '../../config';

const VerifyEmail = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const token = searchParams.get('token');

    // States
    const [pageState, setPageState] = useState('VERIFYING'); // VERIFYING, FORM, SUBMITTING, ERROR
    const [error, setError] = useState('');
    const [prefilledData, setPrefilledData] = useState(null);
    
    // Form Data
    const [onboardData, setOnboardData] = useState({
        password: '',
        confirmPassword: '',
        bio: ''
    });
    
    const [showPass, setShowPass] = useState(false);
    const [showConfirmPass, setShowConfirmPass] = useState(false);

    // 1. Verify Token on Mount
    useEffect(() => {
        if (!token) {
            setPageState('ERROR');
            setError('Missing verification token.');
            return;
        }

        const verifyToken = async () => {
            try {
                const res = await fetch(`${config.baseAPIURL}/auth/verifyToken?token=${token}`,{
                    credentials:"include"
                });
                const data = await res.json();

                if (!res.ok) throw new Error(data.message || 'Invalid or Expired Token');

                setPrefilledData(data); // Expecting { name, email, dob, phoneNumber... }
                setPageState('FORM');
            } catch (err) {
                setPageState('ERROR');
                setError(err.message || 'Verification failed. The link may have expired.');
            }
        };

        verifyToken();
    }, [token]);

    // 2. Handle Onboarding Submit
    const handleOnboard = async (e) => {
        e.preventDefault();
        setError('');

        if (onboardData.password !== onboardData.confirmPassword) {
            setError("Passwords do not match.");
            return;
        }
        
        if (onboardData.password.length < 6) {
            setError("Password must be at least 6 characters.");
            return;
        }

        setPageState('SUBMITTING');

        try {
            const res = await fetch(`${config.baseAPIURL}/auth/onboard?token=${token}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials:"include",
                body: JSON.stringify({
                    password: onboardData.password,
                    bio: onboardData.bio
                })
            });

            const data = await res.json();

            if (!res.ok) throw new Error(data.message || 'Onboarding failed');

            // Success! Redirect to profile
            navigate('/profile'); 
        } catch (err) {
            setPageState('FORM');
            setError(err.message);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    /* --- RENDER STATES --- */

    // Loading State
    if (pageState === 'VERIFYING') {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-[#e9fbf7] dark:bg-[#121212] transition-colors">
                <div className="bg-white dark:bg-[#1a1a1a] p-8 rounded-[2rem] shadow-xl text-center">
                    <FaSpinner className="text-5xl text-[#20AA9D] animate-spin mx-auto mb-6" />
                    <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">Verifying your link...</h2>
                    <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm">Please wait a moment.</p>
                </div>
            </div>
        );
    }

    // Error State
    if (pageState === 'ERROR') {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#e9fbf7] dark:bg-[#121212] px-4">
                <div className="max-w-md w-full bg-white dark:bg-[#1a1a1a] rounded-[2.5rem] p-10 text-center shadow-xl">
                    <div className="w-20 h-20 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <FaExclamationTriangle className="text-4xl text-red-500" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Link Expired or Invalid</h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed font-medium">
                        {error}. <br/>Please sign up again to get a new link.
                    </p>
                    <button 
                        onClick={() => navigate('/signup')} 
                        className="w-full py-3.5 rounded-xl bg-gray-100 dark:bg-[#333] hover:bg-gray-200 dark:hover:bg-[#444] text-gray-800 dark:text-white font-bold transition-colors"
                    >
                        Go to Signup
                    </button>
                </div>
            </div>
        );
    }

    // Main Form State
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#e9fbf7] dark:bg-[#121212] px-4 py-10 transition-colors duration-300">
            <div className="max-w-2xl w-full bg-white dark:bg-[#1a1a1a] rounded-[2.5rem] shadow-2xl overflow-hidden p-8 md:p-12 relative">
                
                {/* Header Section */}
                <div className="text-center mb-10">
                    <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-5 animate-bounce-slow">
                        <FaUserCheck className="text-3xl text-green-600 dark:text-green-400" />
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                        Welcome, {prefilledData.name.split(' ')[0]}!
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 font-medium">
                        Your email <span className="text-[#20AA9D] font-bold">{prefilledData.email}</span> is verified. <br/>
                        Let's set up your security to finish.
                    </p>
                </div>

                {error && (
                    <div className="mb-8 p-4 rounded-2xl bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm font-semibold border border-red-100 dark:border-red-800/30 text-center animate-shake">
                        {error}
                    </div>
                )}

                <form onSubmit={handleOnboard} className="space-y-6">
                    
                    {/* Read-Only Prefilled Data Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-gray-50 dark:bg-[#121212] p-6 rounded-2xl border border-gray-100 dark:border-[#2a2a2a]">
                        <LockedField label="Full Name" value={prefilledData.name} />
                        <LockedField label="Email" value={prefilledData.email} />
                        <LockedField label="Phone" value={prefilledData.phoneNumber} />
                        <LockedField label="DOB" value={new Date(prefilledData.dob).toLocaleDateString()} />
                    </div>

                    <div className="space-y-5 pt-2">
                        {/* Password Field */}
                        <div className="relative group">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#20AA9D] transition-colors"><FaLock /></span>
                            <input 
                                type={showPass ? "text" : "password"}
                                placeholder="Create Password"
                                className="w-full pl-11 pr-12 py-4 rounded-xl bg-gray-50 dark:bg-[#121212] border border-gray-200 dark:border-[#333] text-gray-900 dark:text-white focus:ring-2 focus:ring-[#20AA9D] outline-none font-medium transition-all"
                                value={onboardData.password}
                                onChange={e => setOnboardData({...onboardData, password: e.target.value})}
                                required
                            />
                            <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-2">
                                {showPass ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>

                        {/* Confirm Password Field */}
                        <div className="relative group">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#20AA9D] transition-colors"><FaLock /></span>
                            <input 
                                type={showConfirmPass ? "text" : "password"}
                                placeholder="Confirm Password"
                                className="w-full pl-11 pr-12 py-4 rounded-xl bg-gray-50 dark:bg-[#121212] border border-gray-200 dark:border-[#333] text-gray-900 dark:text-white focus:ring-2 focus:ring-[#20AA9D] outline-none font-medium transition-all"
                                value={onboardData.confirmPassword}
                                onChange={e => setOnboardData({...onboardData, confirmPassword: e.target.value})}
                                required
                            />
                            <button type="button" onClick={() => setShowConfirmPass(!showConfirmPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-2">
                                {showConfirmPass ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                        
                        {/* Bio Field */}
                        <div>
                            <textarea 
                                placeholder="Tell us a bit about yourself (Bio)..."
                                className="w-full px-5 py-4 rounded-xl bg-gray-50 dark:bg-[#121212] border border-gray-200 dark:border-[#333] text-gray-900 dark:text-white focus:ring-2 focus:ring-[#20AA9D] outline-none resize-none h-28 font-medium transition-all"
                                value={onboardData.bio}
                                onChange={e => setOnboardData({...onboardData, bio: e.target.value})}
                            />
                        </div>
                    </div>

                    <button 
                        type="submit" 
                        disabled={pageState === 'SUBMITTING'}
                        className="w-full mt-4 py-4 rounded-xl bg-[#20AA9D] hover:bg-[#17857a] text-white font-bold text-lg shadow-lg shadow-[#20AA9D]/20 transition-all transform hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {pageState === 'SUBMITTING' ? (
                            <>Setting up Profile <FaSpinner className="animate-spin" /></>
                        ) : (
                            <>Complete Registration <FaArrowRight /></>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

/* Helper for Locked Fields */
const LockedField = ({ label, value }) => (
    <div>
        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{label}</label>
        <div className="text-gray-800 dark:text-gray-200 font-semibold truncate flex items-center gap-2 bg-white dark:bg-[#1a1a1a] px-3 py-2 rounded-lg border border-gray-100 dark:border-[#333]">
            {value} <FaLock className="text-xs text-gray-300 ml-auto" />
        </div>
    </div>
);

export default VerifyEmail;