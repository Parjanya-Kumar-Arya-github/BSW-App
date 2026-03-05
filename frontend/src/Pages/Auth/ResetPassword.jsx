import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { FaLock, FaCheckCircle } from 'react-icons/fa';
import config from '../../config';
import Loader from '../../Components/Loader';
import SmilingFaceLoader from '../../Components/SmilingFaceLoader';

const ResetPassword = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');

    const [formData, setFormData] = useState({
        password: '',
        confirmPassword: ''
    });
    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!token) {
            setError('Invalid or missing reset token.');
            return;
        }


        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        setLoading(true);

        try {
            // Updated to match backend: Post to /auth/reset-password?token=XYZ
            const res = await axios.post(`${config.baseAPIURL}/auth/reset-password?token=${token}`, {
                newPassword: formData.password
            });

            if (res.data) {
                setSuccess(true);
                // Redirect after 2 seconds
                setTimeout(() => navigate('/login'), 3000);
            }
        } catch (err) {
            const msg = err.response?.data?.message || 'Failed to reset password. Link may be expired.';
            setError(msg);
            setLoading(false);
        }
    };

    if (loading && !success) return <SmilingFaceLoader />;

    return (
        <div className="min-h-screen flex items-center justify-center px-4 transition-colors duration-300">
            <div className="max-w-md w-full bg-white dark:bg-[#1a1a1a] rounded-[2rem] shadow-2xl p-8 md:p-12 relative overflow-hidden">
                
                {success ? (
                    <div className="text-center py-10">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 text-green-500 rounded-full mb-6 text-4xl shadow-sm animate-pulse">
                            <FaCheckCircle />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Password Reset!</h2>
                        <p className="text-gray-500 mb-6">Your password has been updated successfully.</p>
                        <p className="text-sm text-[#20AA9D] font-bold">Redirecting to login...</p>
                    </div>
                ) : (
                    <>
                        <div className="text-center mb-10">
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Set New Password</h2>
                            <p className="text-gray-500 dark:text-gray-400">
                                Create a strong password for your account.
                            </p>
                        </div>

                        {error && (
                            <div className="mb-6 p-4 rounded-xl bg-red-50 text-red-600 text-sm font-semibold border border-red-100">
                                ⚠️ {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <ThemedInput 
                                icon={<FaLock />} 
                                type="password" 
                                name="password"
                                placeholder="New Password" 
                                value={formData.password} 
                                onChange={handleChange} 
                                required 
                            />
                            
                            <ThemedInput 
                                icon={<FaLock />} 
                                type="password" 
                                name="confirmPassword"
                                placeholder="Confirm New Password" 
                                value={formData.confirmPassword} 
                                onChange={handleChange} 
                                required 
                            />

                            <button 
                                type="submit" 
                                disabled={loading}
                                className="w-full py-4 rounded-xl bg-[#20AA9D] hover:bg-[#17857a] text-white font-bold text-lg shadow-lg shadow-[#20AA9D]/20 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2"
                            >
                                Reset Password
                            </button>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
};

// Reusable Input
const ThemedInput = ({ icon, ...props }) => (
    <div className="relative group">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#20AA9D] transition-colors">
            {icon}
        </span>
        <input 
            {...props} 
            className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-gray-50 dark:bg-[#121212] border border-gray-200 dark:border-[#333] text-gray-900 dark:text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-[#20AA9D] focus:bg-white dark:focus:bg-[#0f0f0f] transition-all"
        />
    </div>
);

export default ResetPassword;