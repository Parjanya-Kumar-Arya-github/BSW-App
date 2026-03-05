import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
    FaUser, 
    FaEnvelope, 
    FaPhoneAlt, 
    FaCalendarAlt, 
    FaVenusMars, 
    FaArrowRight,
    FaArrowLeft
} from 'react-icons/fa';
import useReveal from '../../common/Reveal';
import config from '../../config';
import SmilingFaceLoader from '../../Components/SmilingFaceLoader';

const Signup = () => {
    const navigate = useNavigate();
    const [headerRef, headerVisible] = useReveal();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        dob: '',
        phoneNumber: '',
        gender: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await fetch(`${config.baseAPIURL}/auth/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || 'Signup failed. Please try again.');
            }

            navigate('/email-sent', { state: { email: formData.email } });

        } catch (err) {
            setError(err.message);
            setLoading(false); 
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    if (loading) {
        return <SmilingFaceLoader />;
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-transparent dark:bg-[#0f0f0f] px-4 transition-colors duration-300">
            <div 
                ref={headerRef}
                className={`
                    relative w-full max-w-5xl min-h-[600px] 
                    bg-white dark:bg-slate-900 
                    rounded-[3rem] shadow-2xl overflow-hidden 
                    border border-gray-200 dark:border-gray-700
                    flex flex-col md:flex-row
                    transition-all duration-700 ease-out transform
                    ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
                `}
            >
                 {/* --- BACKGROUND BLOBS START --- */}
        
                {/* Blob 1: Pink/Lavender (Bottom Left) */}
                <div
                    className="absolute pointer-events-none bg-[#fbcfe8] dark:bg-[#500724]"
                    style={{
                        bottom: '-10%',
                        left: '-10%',
                        width: '500px', 
                        height: '600px', 
                        filter: 'blur(50px)',
                        borderRadius: '50%',
                        zIndex: 0,
                        animation: 'blob 7s infinite', 
                    }}
                />

                {/* Blob 2: Middle/Transition Purple */}
                <div
                    className="absolute pointer-events-none bg-[#c083eb] dark:bg-[#581c87]"
                    style={{
                        top: '10%',
                        right: '10%', 
                        width: '400px', 
                        height: '400px', 
                        opacity: 0.3,
                        filter: 'blur(80px)',
                        borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
                        transform: 'rotate(-30deg)',
                        zIndex: 0,
                        animation: 'blob-reverse 8s infinite', 
                        animationDelay: '1s',
                    }}
                />

                {/* Glass Overlay */}
                <div className="absolute inset-0 z-0 bg-white/40 backdrop-blur-[2px] dark:bg-slate-900/40" />
                {/* --- BACKGROUND BLOBS END --- */}

                {/* Left Side - Brand Visual */}
                <div className="hidden md:flex md:w-5/12 bg-[#20AA9D]/90 dark:bg-[#20AA9D]/80 p-12 flex-col justify-between text-white relative z-10 backdrop-blur-md">
                    <div className="relative z-10">
                        <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mb-8 backdrop-blur-sm shadow-inner border border-white/30">
                            <FaUser className="text-4xl text-white" />
                        </div>
                        
                        <h1 className="text-5xl font-bold mb-6 leading-tight tracking-tight">
                            Join the<br/>Family
                        </h1>
                        <p className="text-white/90 text-lg leading-relaxed font-medium">
                            Your gateway to student welfare, resources, and community at IIT Delhi.
                        </p>
                    </div>
                    
                    <div className="relative z-10 text-sm opacity-80 font-medium">
                        © {new Date().getFullYear()} Board for Student Welfare
                    </div>
                    
                    {/* Decorative Abstract Shapes */}
                    <div className="absolute -top-20 -right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
                    <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-black/5 rounded-full blur-2xl"></div>
                </div>

                {/* Right Side - Form */}
                <div className="w-full md:w-7/12 p-8 md:p-14 relative z-10 flex flex-col justify-center bg-white/60 dark:bg-black/20 backdrop-blur-sm">
                    <div className="max-w-md mx-auto w-full">
                        <div className="mb-8">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2 tracking-tight">Create Account</h2>
                            <p className="text-gray-500 dark:text-gray-400 font-medium">Enter your details to register.</p>
                        </div>
                        
                        {error && (
                            <div className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm font-semibold border border-red-100 dark:border-red-800/30 flex items-start gap-3">
                                <span className="mt-0.5 text-lg">⚠️</span>
                                <span>{error}</span>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <ThemedInput 
                                icon={<FaUser />} 
                                placeholder="Full Name" 
                                name="name" 
                                value={formData.name} 
                                onChange={handleChange} 
                                required 
                            />
                            
                            <ThemedInput 
                                icon={<FaEnvelope />} 
                                type="email" 
                                placeholder="Email Address" 
                                name="email" 
                                value={formData.email} 
                                onChange={handleChange} 
                                required 
                            />

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <ThemedInput 
                                    icon={<FaCalendarAlt />} 
                                    type="date" 
                                    name="dob" 
                                    value={formData.dob} 
                                    onChange={handleChange} 
                                    required 
                                    label="Date of Birth"
                                />
                                
                                <div className="relative group">
                                    <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1.5 ml-1 uppercase tracking-wider">Gender</label>
                                    <span className="absolute left-4 top-[62%] -translate-y-1/2 text-gray-400 group-focus-within:text-[#20AA9D] transition-colors z-10 text-lg">
                                        <FaVenusMars />
                                    </span>
                                    <select
                                        name="gender"
                                        value={formData.gender}
                                        onChange={handleChange}
                                        required
                                        className="
                                            w-full pl-12 pr-4 py-4 rounded-xl 
                                            bg-gray-50 dark:bg-[#121212] 
                                            border border-gray-200 dark:border-[#333] 
                                            text-gray-900 dark:text-white 
                                            outline-none focus:ring-2 focus:ring-[#20AA9D] focus:bg-white dark:focus:bg-[#0f0f0f]
                                            appearance-none transition-all font-medium cursor-pointer text-base
                                        "
                                    >
                                        <option value="" disabled>Select</option>
                                        <option value="MALE">Male</option>
                                        <option value="FEMALE">Female</option>
                                        <option value="OTHERS">Others</option>
                                    </select>
                                    <div className="absolute right-4 top-[62%] -translate-y-1/2 pointer-events-none text-gray-400 text-xs">▼</div>
                                </div>
                            </div>

                            <ThemedInput 
                                icon={<FaPhoneAlt />} 
                                placeholder="Phone Number (10 digits)" 
                                name="phoneNumber" 
                                value={formData.phoneNumber} 
                                onChange={handleChange} 
                                required 
                            />

                            <button 
                                type="submit" 
                                disabled={loading}
                                className="
                                    w-full mt-4 py-4 rounded-xl 
                                    bg-[#20AA9D] hover:bg-[#17857a] 
                                    text-white font-bold text-lg 
                                    shadow-lg shadow-[#20AA9D]/20 
                                    transition-all transform hover:-translate-y-1 
                                    flex items-center justify-center gap-2 
                                    disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none
                                    min-h-[56px]
                                "
                            >
                                Continue <FaArrowRight />
                            </button>
                        </form>

                        <div className="mt-8 text-center text-sm font-medium text-gray-500 dark:text-gray-400">
                            Already have an account? <Link to="/login" className="text-[#20AA9D] font-bold hover:underline underline-offset-2">Log In</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

/* Reusable Input Component */
const ThemedInput = ({ icon, label, ...props }) => (
    <div className="relative group">
        {label && <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1.5 ml-1 uppercase tracking-wider">{label}</label>}
        <span className={`absolute left-4 ${label ? 'top-[62%]' : 'top-1/2'} -translate-y-1/2 text-gray-400 group-focus-within:text-[#20AA9D] transition-colors text-lg`}>
            {icon}
        </span>
        <input 
            {...props} 
            className={`
                w-full pl-12 pr-4 py-4 rounded-xl 
                bg-gray-50 dark:bg-[#121212] 
                border border-gray-200 dark:border-[#333] 
                text-gray-900 dark:text-white 
                placeholder-gray-400 dark:placeholder-gray-600
                font-medium text-base
                outline-none focus:ring-2 focus:ring-[#20AA9D] focus:bg-white dark:focus:bg-[#0f0f0f]
                transition-all duration-200
                [&::-webkit-calendar-picker-indicator]:opacity-0
                [&::-webkit-calendar-picker-indicator]:absolute
                [&::-webkit-calendar-picker-indicator]:w-full
                [&::-webkit-calendar-picker-indicator]:cursor-pointer
            `}
        />
    </div>
);

export default Signup;