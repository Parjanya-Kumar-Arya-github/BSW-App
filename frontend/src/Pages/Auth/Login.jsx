import React, { useState, useMemo } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { 
    FaEnvelope, 
    FaLock, 
    FaSignInAlt, 
    FaUniversity,
} from 'react-icons/fa';
import useReveal from '../../common/Reveal';
import config from '../../config'; 
import SmilingFaceLoader from '../../Components/SmilingFaceLoader';
import { useAuth } from '../../Context/AuthContext/AuthContext';

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation(); 
    const { setUser } = useAuth();
    
    const [headerRef, headerVisible] = useReveal();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    // 1. Parse query parameters and internal state
    const destination = useMemo(() => {
        const queryParams = new URLSearchParams(location.search);
        const redirectUri = queryParams.get('redirectURI');
        const internalState = location.state?.from?.pathname;

        // Priority 1: Internal Protected Route redirect
        if (internalState) return internalState;
        // Priority 2: External redirect_uri (Subdomain logic)
        if (redirectUri) {
            try {
                // If it's a full URL
                if (redirectUri.startsWith('http')) {
                    const url = new URL(redirectUri);
                    // SECURITY: Only allow redirects to your official subdomains
                    if (url.hostname.endsWith('bsw.iitd.ac.in') || url.hostname === 'localhost') {
                        return redirectUri;
                    }
                } else if (redirectUri.startsWith('/')) {
                    // If it's a relative path
                    return redirectUri;
                }
            } catch (e) {
                console.error("Invalid redirect_uri", e);
            }
        }

        // Default fallback
        return '/profile';
    }, [location]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError('');
    };

    const handleStandardLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await axios.post(`${config.baseAPIURL}/auth/login`, formData, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true 
            });

            if (res.data.success) {
                setUser(res.data.user);
                
                // 2. Perform the actual redirection
                if (destination.startsWith('http')) {
                    // Cross-domain redirect for subdomains
                    window.location.href = destination;
                } else {
                    // Internal SPA navigation
                    navigate(destination, { replace: true });
                }
            } else {
                 setError(res.data.message || 'Login failed.');
                 setLoading(false);
            }
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Login failed. Please check your credentials.';
            setError(errorMessage);
            setLoading(false); 
        }
    };

    const handleIITDLogin = () => {
        setLoading(true);
        setError('');
        // NOTE: For OAuth to return to the correct site, 
        // you may need to pass 'destination' as a state param to your backend
        window.location.href = `${config.baseAPIURL}/auth/google`; 
    };

    if (loading) return <SmilingFaceLoader />;

    return (
        <div className="min-h-screen flex items-center justify-center bg-transparent dark:bg-[#0f0f0f] px-4 transition-colors duration-300 font-lexend">
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
                {/* --- BACKGROUND BLOBS --- */}
                <div className="absolute pointer-events-none bg-[#fbcfe8] dark:bg-[#500724]" style={{ bottom: '-10%', left: '-10%', width: '500px', height: '600px', filter: 'blur(50px)', borderRadius: '50%', zIndex: 0, animation: 'blob 7s infinite' }} />
                <div className="absolute pointer-events-none bg-[#c083eb] dark:bg-[#581c87]" style={{ top: '10%', right: '10%', width: '400px', height: '400px', opacity: 0.3, filter: 'blur(80px)', borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%', transform: 'rotate(-30deg)', zIndex: 0, animation: 'blob-reverse 8s infinite', animationDelay: '1s' }} />
                <div className="absolute inset-0 z-0 bg-white/40 backdrop-blur-[2px] dark:bg-slate-900/40" />

                {/* Left Side - Brand */}
                <div className="hidden md:flex md:w-5/12 bg-[#20AA9D]/90 dark:bg-[#20AA9D]/80 p-12 flex-col justify-between text-white relative z-10 backdrop-blur-md">
                    <div>
                        <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mb-8 backdrop-blur-sm border border-white/30">
                            <FaUniversity className="text-4xl text-white" />
                        </div>
                        <h1 className="text-5xl font-bold mb-6 leading-tight">Welcome<br/>Back!</h1>
                        <p className="text-white/90 text-lg font-medium leading-relaxed">
                            Sign in to access student welfare services, subdomains, and manage your profile.
                        </p>
                    </div>
                    <div className="text-sm opacity-80 font-medium">© {new Date().getFullYear()} Board for Student Welfare</div>
                </div>

                {/* Right Side - Form */}
                <div className="w-full md:w-7/12 p-8 md:p-14 relative z-10 flex flex-col justify-center bg-white/60 dark:bg-black/20 backdrop-blur-sm">
                    <div className="max-w-md mx-auto w-full">
                        <div className="mb-8">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">Sign In</h2>
                            {destination !== '/profile' && (
                                <p className="text-[#20AA9D] text-xs font-bold bg-[#20AA9D]/10 px-3 py-1.5 rounded-lg inline-block uppercase tracking-wider">
                                    Redirecting to {destination.length > 20 ? 'Subdomain' : destination.split('/').pop()}
                                </p>
                            )}
                        </div>
                        
                        {error && (
                            <div className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm font-semibold border border-red-100 dark:border-red-800/30 flex items-start gap-3">
                                <span>⚠️</span> {error}
                            </div>
                        )}

                        <form onSubmit={handleStandardLogin} className="space-y-5">
                            <ThemedInput icon={<FaEnvelope />} type="email" placeholder="Email Address" name="email" value={formData.email} onChange={handleChange} required />
                            <div>
                                <ThemedInput icon={<FaLock />} type="password" placeholder="Password" name="password" value={formData.password} onChange={handleChange} required />
                                <div className="text-right mt-2">
                                    <Link to="/forgotPassword" className="text-sm font-bold text-[#20AA9D] hover:underline transition-colors">Forgot Password?</Link>
                                </div>
                            </div>

                            <button type="submit" disabled={loading} className="w-full py-4 rounded-xl bg-[#20AA9D] hover:bg-[#17857a] text-white font-bold text-lg shadow-lg shadow-[#20AA9D]/20 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2">
                                Log In <FaSignInAlt />
                            </button>
                        </form>

                        <div className="relative flex py-8 items-center uppercase text-xs text-gray-400 font-bold">
                            <div className="flex-grow border-t border-gray-200 dark:border-gray-700"></div>
                            <span className="mx-4">OR</span>
                            <div className="flex-grow border-t border-gray-200 dark:border-gray-700"></div>
                        </div>

                        <button type="button" onClick={handleIITDLogin} className="w-full py-4 rounded-xl bg-[#A91B0D] hover:bg-[#8f160b] text-white font-bold text-lg shadow-lg flex items-center justify-center gap-3 transform hover:-translate-y-1 transition-all">
                            <FaUniversity className="text-xl" /> Log in with IITD
                        </button>

                        <div className="mt-8 text-center text-sm font-medium text-gray-500 dark:text-gray-400">
                            Don't have an account? <Link to="/signup" className="text-[#20AA9D] font-bold hover:underline">Create Account</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ThemedInput = ({ icon, ...props }) => (
    <div className="relative group">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#20AA9D] transition-colors text-lg">
            {icon}
        </span>
        <input {...props} className="w-full pl-12 pr-4 py-4 rounded-xl bg-gray-50 dark:bg-[#121212] border border-gray-200 dark:border-[#333] text-gray-900 dark:text-white placeholder-gray-400 font-medium outline-none focus:ring-2 focus:ring-[#20AA9D] focus:bg-white transition-all duration-200" />
    </div>
);

export default Login;