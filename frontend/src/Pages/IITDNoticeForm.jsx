import React, { useEffect, useState } from 'react';
import {
    FaEnvelope,
    FaPaperPlane,
    FaCheckCircle,
    FaTimes,
    FaInfoCircle
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import useReveal from '../common/Reveal';
import { useAuth } from '../Context/AuthContext/AuthContext';
import Loader from '../Components/Loader';
import config from '../config';
import SmilingFaceLoader from '../Components/SmilingFaceLoader';

const IITDNoticeForm = () => {
    const [headerRef, headerVisible] = useReveal();
    const [formRef, formVisible] = useReveal();
    const { loading, setLoading } = useAuth();

    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    
    const [formData, setFormData] = useState({
        requesterName: '',
        email: '',
        mobile: '',
        organization: '',
        category: '',
        categoryOther: '',
        subject: '',
        content: '',
        recipients: '',
        recipientsOther: '',
        date: '',
        time: '',
        notes: '',
        attachments: [],
    });

    const showRecipientDetail = ['OTHERS', 'SPECIFIC_DEPARTMENT', 'SPECIFIC_HOSTEL'].includes(formData.recipients);

    const getRecipientLabel = () => {
        switch (formData.recipients) {
            case 'SPECIFIC_HOSTEL': return 'Specify Hostel Name *';
            case 'SPECIFIC_DEPARTMENT': return 'Specify Department Name *';
            default: return 'Specify Recipients *';
        }
    };

    const handleChange = (e) => {
        setError('');
        if (success) setSuccess(false);
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        
        const validFiles = selectedFiles.filter(file => 
            file.type.startsWith('image/') || file.type === 'application/pdf'
        );

        if (validFiles.length !== selectedFiles.length) {
            setError('Some files were rejected. Only Images and PDFs are allowed.');
        } else {
            setError('');
        }

        setFormData(prev => ({
            ...prev,
            attachments: [...prev.attachments, ...validFiles],
        }));
    };

    const removeFile = (index) => {
        setFormData(prev => ({
            ...prev,
            attachments: prev.attachments.filter((_, i) => i !== index),
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const {
            requesterName,
            email,
            mobile,
            organization,
            category,
            categoryOther,
            subject,
            content,
            recipients,
            recipientsOther,
            date,
            time,
            notes,
            attachments,
        } = formData;

        if (
            !requesterName || !email || !mobile || !organization ||
            !category || !subject || !content ||
            !recipients || !date || !time
        ) {
            setError('All required fields must be filled.');
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        try {
            setLoading(true);

            const payload = new FormData();
            
            Object.entries({
                requesterName,
                email,
                mobile,
                organization,
                category,
                subject,
                content,
                recipients,
                preferredDate: date,
                preferredTime: time,
            }).forEach(([k, v]) => payload.append(k, v));

            if (category === 'OTHERS') payload.append('categoryOther', categoryOther.trim());
            if (showRecipientDetail) payload.append('recipientsOther', recipientsOther.trim());
            if (notes?.trim()) payload.append('notes', notes.trim());

            attachments.forEach(file => payload.append('attachments', file));

            const res = await fetch(`${config.baseAPIURL}/notices/submitNotice`, {
                method: 'POST',
                credentials:"include",
                body: payload,
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || 'Failed to submit notice.');
            }

            setFormData({
                requesterName: '',
                email: '',
                mobile: '',
                organization: '',
                category: '',
                categoryOther: '',
                subject: '',
                content: '',
                recipients: '',
                recipientsOther: '',
                date: '',
                time: '',
                notes: '',
                attachments: [],
            });
            
            setSuccess(true);
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setTimeout(() => setSuccess(false), 3000);

        } catch (err) {
            setError(err.message);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        return () => {
            formData.attachments.forEach(f => {
                if (f.type.startsWith('image/')) URL.revokeObjectURL(f);
            });
        };
    }, [formData.attachments]);

    if (loading) return <SmilingFaceLoader />;

    return (
        <div className="w-full max-w-6xl mx-auto px-4 py-8 md:py-12 min-h-screen">
            
            <GlassyToast show={success} onClose={() => setSuccess(false)} message="Notice submitted successfully!" />

            {/* Header Section - With Blobx Background but Original Colors */}
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
                
                {/* Glass Overlay */}
                <div className="absolute inset-0 z-0 bg-white/30 backdrop-blur-[1px] dark:bg-slate-900/30" />
                {/* --- BACKGROUND BLOBS END --- */}

                <div className="relative z-10 max-w-4xl">
                    <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight leading-tight">
                        Submit <br/>
                        <span className="text-[#20AA9D]">IITD Notices</span>
                    </h1>
                    <p className="text-lg text-slate-700 dark:text-slate-300 font-medium mb-8 max-w-2xl">
                        Submit official notices to be circulated via the IIT Delhi Notices portal. Ensure all details are accurate before submission.
                    </p>
                    
                    <div className="flex flex-wrap items-center gap-4">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-black/30 border border-transparent dark:border-white/10 rounded-full text-sm font-semibold text-gray-700 dark:text-gray-300 shadow-sm">
                            <FaInfoCircle className="text-[#20AA9D]" />
                            <span>Official Use Only</span>
                        </div>
                        <Link 
                            to="/joinNotices" 
                            className="text-[#20AA9D] font-bold hover:underline underline-offset-4 text-sm"
                        >
                            Want to receive notices instead?
                        </Link>
                    </div>
                </div>
            </div>

            {/* Form Section */}
            <div 
                ref={formRef} 
                className={`
                    max-w-4xl mx-auto
                    bg-white dark:bg-[#121212] 
                    rounded-[2rem] p-8 md:p-12
                    border border-gray-100 dark:border-[#2a2a2a]
                    shadow-xl dark:shadow-none
                    transition-all duration-700 delay-100 ease-out transform
                    ${formVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
                `}
            >
                <div className="mb-10 pb-6 border-b border-gray-100 dark:border-[#2a2a2a]">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Notice Details</h2>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">Fields marked with * are mandatory.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    {error && (
                        <div className="p-4 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm font-medium border border-red-100 dark:border-red-800/30">
                            {error}
                        </div>
                    )}

                    {/* Section 1: Requester Info */}
                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                            <span className="w-6 h-6 rounded-full bg-[#20AA9D]/10 text-[#20AA9D] flex items-center justify-center text-xs">1</span>
                            Requester Information
                        </h3>
                        <div className="grid md:grid-cols-2 gap-6 pl-8">
                            <ThemedInput label="Name of Requester *" name="requesterName" placeholder="e.g. Prof. John Doe" value={formData.requesterName} onChange={handleChange} />
                            <ThemedInput label="Mobile No. *" name="mobile" placeholder="+91 98765 43210" value={formData.mobile} onChange={handleChange} />
                            <ThemedInput label="Email ID *" type="email" name="email" placeholder="email@iitd.ac.in" value={formData.email} onChange={handleChange} />
                            <ThemedInput label="Department / Body *" name="organization" placeholder="e.g. Civil Dept / BSW" value={formData.organization} onChange={handleChange} />
                        </div>
                    </div>

                    <div className="h-px bg-gray-100 dark:bg-[#2a2a2a] w-full" />

                    {/* Section 2: Notice Content */}
                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                            <span className="w-6 h-6 rounded-full bg-[#20AA9D]/10 text-[#20AA9D] flex items-center justify-center text-xs">2</span>
                            Notice Content
                        </h3>
                        <div className="space-y-6 pl-8">
                            <div className="grid md:grid-cols-2 gap-6">
                                <ThemedSelect
                                    label="Category *"
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    options={['ACADEMIC', 'ADMINISTRATIVE', 'HOSTEL_STUDENT_WELLNESS', 'CLUB_EVENT', 'INTERNSHIP_OPPORTUNITY', 'OTHERS']}
                                />
                                {formData.category === 'OTHERS' && (
                                    <ThemedInput label="Specify Category *" name="categoryOther" value={formData.categoryOther} onChange={handleChange} />
                                )}
                            </div>

                            <ThemedInput label="Subject *" name="subject" placeholder="Brief subject of the notice" value={formData.subject} onChange={handleChange} />

                            <ThemedTextarea label="Notice Content *" name="content" placeholder="Detailed content..." value={formData.content} onChange={handleChange} rows={8} />
                        </div>
                    </div>

                    <div className="h-px bg-gray-100 dark:bg-[#2a2a2a] w-full" />

                    {/* Section 3: Recipients & Schedule */}
                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                            <span className="w-6 h-6 rounded-full bg-[#20AA9D]/10 text-[#20AA9D] flex items-center justify-center text-xs">3</span>
                            Audience & Schedule
                        </h3>
                        <div className="space-y-6 pl-8">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="md:col-span-2">
                                    <ThemedSelect
                                        label="Recipients *"
                                        name="recipients"
                                        value={formData.recipients}
                                        onChange={handleChange}
                                        options={['ENTIRE_CAMPUS', 'UG_ONLY', 'PG_ONLY', 'SPECIFIC_DEPARTMENT', 'SPECIFIC_HOSTEL', 'OTHERS']}
                                    />
                                    {showRecipientDetail && (
                                        <div className="mt-4">
                                            <ThemedInput label={getRecipientLabel()} name="recipientsOther" value={formData.recipientsOther} onChange={handleChange} />
                                        </div>
                                    )}
                                </div>
                                <ThemedInput 
                                    type="date" 
                                    label="Preferred Date *" 
                                    name="date" 
                                    value={formData.date} 
                                    onChange={handleChange} 
                                    onClick={(e) => e.target.showPicker && e.target.showPicker()}
                                />
                                <ThemedInput 
                                    type="time" 
                                    label="Preferred Time *" 
                                    name="time" 
                                    value={formData.time} 
                                    onChange={handleChange} 
                                    onClick={(e) => e.target.showPicker && e.target.showPicker()}
                                />
                            </div>
                            
                            <ThemedTextarea label="Additional Notes (Optional)" placeholder="Any specific instructions for the admin..." name="notes" value={formData.notes} onChange={handleChange} rows={3} />
                            
                            <div>
                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Attachments (PDF/Image)</label>
                                <div className="border-2 border-dashed border-gray-300 dark:border-[#333] rounded-xl p-6 text-center hover:bg-gray-50 dark:hover:bg-[#1a1a1a] transition-colors cursor-pointer relative">
                                    <input 
                                        type="file" 
                                        multiple 
                                        accept="image/*,application/pdf"
                                        onChange={handleFileChange} 
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    />
                                    <div className="text-gray-500 dark:text-gray-400">
                                        <span className="text-[#20AA9D] font-bold">Click to upload</span> or drag and drop
                                    </div>
                                </div>
                                <FilePreview files={formData.attachments} onRemove={removeFile} />
                            </div>
                        </div>
                    </div>

                    <button 
                        type="submit" 
                        className="
                            mt-8 w-full flex items-center justify-center gap-2
                            px-8 py-4 rounded-full 
                            bg-[#20AA9D] hover:bg-[#17857a] 
                            text-white font-bold text-lg
                            transition-all duration-300 shadow-lg shadow-[#20AA9D]/20
                            hover:shadow-xl hover:-translate-y-1
                        "
                    >
                        Submit Notice <FaPaperPlane />
                    </button>
                </form>
            </div>
        </div>
    );
};

/* ---------------- Glassy Toast Component ---------------- */
const GlassyToast = ({ show, onClose, message }) => (
    <div className={`
        fixed bottom-8 right-8 z-50 flex items-center gap-4
        px-6 py-4 rounded-2xl shadow-2xl border 
        transition-all duration-500 ease-out transform 
        ${show ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'} 
        bg-white/90 dark:bg-[#1a1a1a]/90 backdrop-blur-md border-[#20AA9D]/30
        max-w-md
    `}>
        <div className="p-2 rounded-full bg-[#20AA9D]/20 shrink-0">
            <FaCheckCircle className="text-[#20AA9D] text-xl" />
        </div>
        <div>
            <h4 className="font-bold text-gray-900 dark:text-white text-sm">Success</h4>
            <p className="text-gray-600 dark:text-gray-300 text-xs">{message}</p>
        </div>
        <button onClick={onClose} className="ml-auto text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
            <FaTimes />
        </button>
    </div>
);

/* ---------------- Themed Components ---------------- */
const ThemedInput = ({ label, ...props }) => (
    <div className="w-full">
        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 pl-1">{label}</label>
        <input 
            {...props} 
            className="
                w-full px-4 py-3.5 rounded-xl outline-none 
                bg-gray-50 text-gray-900 border border-gray-200 
                focus:ring-2 focus:ring-[#20AA9D] focus:border-transparent focus:bg-white
                transition-all duration-200 
                
                dark:bg-[#1f1f1f] 
                dark:text-gray-100 
                dark:border-[#333] 
                dark:placeholder-gray-500
                dark:focus:bg-[#1a1a1a]
                
                [&::-webkit-calendar-picker-indicator]:dark:invert
                [&::-webkit-calendar-picker-indicator]:cursor-pointer
                [&::-webkit-calendar-picker-indicator]:opacity-60
                [&::-webkit-calendar-picker-indicator]:hover:opacity-100
            " 
        />
    </div>
);

const ThemedTextarea = ({ label, ...props }) => (
    <div className="w-full">
        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 pl-1">{label}</label>
        <textarea 
            {...props} 
            className="
                w-full px-4 py-3.5 rounded-xl resize-none outline-none 
                bg-gray-50 text-gray-900 border border-gray-200 
                focus:ring-2 focus:ring-[#20AA9D] focus:border-transparent focus:bg-white
                transition-all duration-200 
                dark:bg-[#1f1f1f] dark:text-gray-100 dark:border-[#333] dark:focus:bg-[#1a1a1a] dark:placeholder-gray-500
            " 
        />
    </div>
);

const ThemedSelect = ({ label, options, ...props }) => (
    <div className="w-full">
        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 pl-1">{label}</label>
        <div className="relative">
            <select 
                {...props} 
                className="
                    w-full px-4 py-3.5 rounded-xl outline-none appearance-none
                    bg-gray-50 text-gray-900 border border-gray-200 
                    focus:ring-2 focus:ring-[#20AA9D] focus:border-transparent focus:bg-white
                    transition-all duration-200 
                    dark:bg-[#1f1f1f] dark:text-gray-100 dark:border-[#333] dark:focus:bg-[#1a1a1a]
                "
            >
                <option value="">Select Option</option>
                {options.map(o => <option key={o} value={o}>{o.replace(/_/g, ' ')}</option>)}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500 text-xs">
                ▼
            </div>
        </div>
    </div>
);

const FilePreview = ({ files, onRemove }) => {
    if (!files.length) return null;
    return (
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-4">
            {files.map((file, i) => (
                <div key={i} className="relative p-3 rounded-xl border bg-gray-50 dark:bg-[#1f1f1f] border-gray-200 dark:border-[#333] group">
                    <button 
                        type="button" 
                        onClick={() => onRemove(i)} 
                        className="absolute -top-2 -right-2 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                        <FaTimes />
                    </button>
                    <div className="flex items-center justify-center h-12 bg-gray-100 dark:bg-[#121212] rounded-lg mb-2 text-2xl text-gray-400">
                        📄
                    </div>
                    <p className="text-xs truncate text-gray-700 dark:text-gray-300 font-medium" title={file.name}>{file.name}</p>
                </div>
            ))}
        </div>
    );
};

export default IITDNoticeForm;