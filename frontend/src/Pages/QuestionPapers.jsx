import React, { useEffect, useState } from 'react';
import { 
    FaSearch, 
    FaFolder, 
    FaFilePdf, 
    FaDownload, 
    FaEye, 
    FaArrowLeft, 
    FaHome, 
    FaExclamationTriangle
} from 'react-icons/fa';
import config from '../config';
import Loader from '../Components/Loader'; 
import SmilingFaceLoader from '../Components/SmilingFaceLoader';

const QuestionPapers = () => {
    const [searchTerm, setSearchTerm] = useState('');
    
    // State for Data
    const [fullData, setFullData] = useState([]); 
    const [currentView, setCurrentView] = useState([]); 
    const [breadcrumbs, setBreadcrumbs] = useState([]); 
    
    // State for UI
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [animationTrigger, setAnimationTrigger] = useState(false); 

    // Scroll to top automatically when directory changes
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [currentView]); 

    useEffect(() => {
        fetchQuestionPapers();
    }, []);

    const fetchQuestionPapers = async () => {
        try {
            setIsLoading(true);
            setError(null);
            
            const url = `${config.baseAPIURL}/pyqs/`; 
            const resp = await fetch(url);
            
            if (!resp.ok) {
                throw new Error(`Failed to load papers: ${resp.statusText}`);
            }

            const data = await resp.json();
            setFullData(data);
            setCurrentView(data);
            
        } catch (err) {
            console.error("Error fetching papers:", err);
            // Set specific error message for connection failure
            setError("Could not connect to the server. Please check your internet connection or try again later.");
        } finally {
            setIsLoading(false);
            // FIX: Moved here so the UI fades in even if there is an error
            setTimeout(() => setAnimationTrigger(true), 100);
        }
    };

    // --- Navigation Logic ---
    const enterFolder = (folder) => {
        if (!folder.children) return;
        setBreadcrumbs([...breadcrumbs, folder]);
        setCurrentView(folder.children);
        setSearchTerm('');
    };

    const navigateUp = (index) => {
        if (index === -1) {
            setBreadcrumbs([]);
            setCurrentView(fullData);
        } else {
            const crumbs = breadcrumbs.slice(0, index + 1);
            setBreadcrumbs(crumbs);
            setCurrentView(crumbs[crumbs.length - 1].children);
        }
    };

    // --- File Handling ---
    const getFileUrl = (relativePath) => {
        const cleanPath = relativePath.startsWith('/') ? relativePath.slice(1) : relativePath;
        return `${config.baseFILEURL}/${cleanPath}`;
    };

    const handleView = (e, item) => {
        e.stopPropagation();
        // Assuming item has a 'path' property
        if(item.path) {
             window.open(getFileUrl(item.path), '_blank');
        }
    };

    const handleDownload = async (e, item) => {
        e.stopPropagation();
         if(!item.path) return;
        const url = getFileUrl(item.path);
        try {
            const response = await fetch(url);
            const blob = await response.blob();
            const downloadUrl = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.download = item.name; 
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(downloadUrl);
        } catch (err) {
            console.error("Download failed", err);
            alert("Failed to download file. Try viewing it instead.");
        }
    };

    // --- Filtering ---
    const filteredItems = currentView.filter(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (isLoading) return <SmilingFaceLoader />;

    return (
        <div className="min-h-screen bg-white dark:bg-[#0f0f0f] pt-8 pb-20 transition-colors duration-300 relative overflow-x-hidden">
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Header Section - Themed Banner */}
                <div 
                    className={`
                        relative overflow-hidden
                        bg-white dark:bg-slate-900 
                        rounded-[2.5rem] p-8 md:p-12 mb-8 
                        transition-all duration-700 ease-out
                        shadow-2xl border border-gray-200 dark:border-gray-700
                        ${animationTrigger ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
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

                    <div className="relative z-10 max-w-3xl mx-auto text-center">
                        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">
                            Question <span className="text-[#20AA9D]">Papers</span>
                        </h1>
                        <p className="text-lg text-gray-600 dark:text-gray-400 font-medium mb-8 max-w-xl mx-auto">
                            Access previous year major and minor question papers organized by department.
                        </p>

                        {/* Search Bar Floating Over Header */}
                        <div className="relative max-w-lg mx-auto group">
                            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                                <FaSearch className="text-gray-400 group-focus-within:text-[#20AA9D] text-lg transition-colors" />
                            </div>
                            <input
                                type="text"
                                className="
                                    block w-full pl-14 pr-6 py-4 rounded-full 
                                    bg-white dark:bg-black/40 
                                    text-gray-900 dark:text-white 
                                    placeholder-gray-400 dark:placeholder-gray-500
                                    shadow-lg shadow-black/5 dark:shadow-black/20
                                    outline-none border border-transparent focus:border-[#20AA9D]
                                    transition-all duration-300 text-base font-medium
                                "
                                placeholder={breadcrumbs.length === 0 ? "Search Departments..." : "Search files..."}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                disabled={!!error} // Disable search if there is an error
                            />
                        </div>
                    </div>
                </div>

                {/* Main Content Area */}
                <div 
                    className={`
                        transition-all duration-700 delay-200
                        ${animationTrigger ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
                    `}
                >
                    {error ? (
                        // --- ERROR STATE UI ---
                        <div className="flex flex-col items-center justify-center p-12 bg-red-50 dark:bg-red-900/10 rounded-[2rem] border border-red-100 dark:border-red-900/30 text-center animate-fadeIn">
                            <div className="w-20 h-20 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-6">
                                <FaExclamationTriangle className="text-4xl text-red-500 dark:text-red-400" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-3">
                                Unable to Load Papers
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
                                {error}
                            </p>
                            <button 
                                onClick={fetchQuestionPapers}
                                className="
                                    px-8 py-3 bg-red-500 hover:bg-red-600 
                                    text-white rounded-xl font-bold 
                                    shadow-lg shadow-red-500/20 
                                    transition-all hover:-translate-y-1 active:scale-95
                                "
                            >
                                Retry Connection
                            </button>
                        </div>
                    ) : (
                        <>
                            {/* Breadcrumbs Navigation */}
                            <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div className="flex items-center space-x-2 overflow-x-auto whitespace-nowrap pb-2 md:pb-0 text-sm font-medium scrollbar-hide">
                                    <button 
                                        onClick={() => navigateUp(-1)}
                                        className={`flex items-center px-3 py-1.5 rounded-lg transition-colors ${breadcrumbs.length === 0 ? 'bg-[#20AA9D]/10 text-[#20AA9D]' : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-[#1a1a1a] dark:text-gray-400'}`}
                                    >
                                        <FaHome className="mr-1.5" /> Root
                                    </button>
                                    
                                    {breadcrumbs.map((crumb, index) => (
                                        <React.Fragment key={index}>
                                            <span className="text-gray-300 dark:text-gray-600">/</span>
                                            <button
                                                onClick={() => navigateUp(index)}
                                                className={`px-3 py-1.5 rounded-lg transition-colors ${index === breadcrumbs.length - 1 ? 'bg-[#20AA9D]/10 text-[#20AA9D]' : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-[#1a1a1a] dark:text-gray-400'}`}
                                            >
                                                {crumb.name}
                                            </button>
                                        </React.Fragment>
                                    ))}
                                </div>

                                {breadcrumbs.length > 0 && (
                                    <button 
                                        onClick={() => navigateUp(breadcrumbs.length - 2)}
                                        className="self-start md:self-auto flex items-center text-sm font-semibold text-gray-500 hover:text-[#20AA9D] dark:text-gray-400 transition-colors"
                                    >
                                        <FaArrowLeft className="mr-2" /> Back
                                    </button>
                                )}
                            </div>

                            {/* Grid View */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                                {filteredItems.map((item, index) => {
                                    // Use 'type' property if available, otherwise check for children
                                    const isFolder = item.type === 'folder' || (item.children && Array.isArray(item.children));
                                    
                                    return (
                                        <div 
                                            key={index}
                                            onClick={() => isFolder ? enterFolder(item) : handleView({}, item)}
                                            className={`
                                                group relative p-5 rounded-[1.5rem] 
                                                bg-white dark:bg-[#121212] 
                                                border border-gray-100 dark:border-[#2a2a2a]
                                                shadow-[0_4px_20px_rgb(0,0,0,0.03)] dark:shadow-none
                                                hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] dark:hover:bg-[#1a1a1a]
                                                hover:-translate-y-1
                                                transition-all duration-300 cursor-pointer flex items-center justify-between
                                            `}
                                        >
                                            <div className="flex items-center gap-4 overflow-hidden">
                                                {/* Icon Box */}
                                                <div className={`
                                                    w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-colors duration-300
                                                    ${isFolder 
                                                        ? 'bg-blue-50 text-blue-500 dark:bg-blue-900/20 dark:text-blue-400 group-hover:bg-blue-500 group-hover:text-white' 
                                                        : 'bg-red-50 text-red-500 dark:bg-red-900/20 dark:text-red-400 group-hover:bg-red-500 group-hover:text-white'
                                                    }
                                                `}>
                                                    {isFolder ? <FaFolder className="text-xl" /> : <FaFilePdf className="text-xl" />}
                                                </div>

                                                {/* Text Info */}
                                                <div className="min-w-0 flex-1">
                                                    <h3 className="font-bold text-gray-800 dark:text-gray-200 truncate pr-2 group-hover:text-[#20AA9D] transition-colors text-base">
                                                        {item.name}
                                                    </h3>
                                                    <p className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider mt-0.5">
                                                        {isFolder ? 'Folder' : 'PDF File'}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Action Buttons */}
                                            {!isFolder ? (
                                                <div className="flex items-center gap-1 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-200">
                                                    <button 
                                                        onClick={(e) => handleView(e, item)} 
                                                        className="p-2 text-gray-400 hover:text-[#20AA9D] hover:bg-gray-100 dark:hover:bg-[#333] rounded-full transition-colors"
                                                        title="View"
                                                    >
                                                        <FaEye />
                                                    </button>
                                                    <button 
                                                        onClick={(e) => handleDownload(e, item)} 
                                                        className="p-2 text-gray-400 hover:text-[#20AA9D] hover:bg-gray-100 dark:hover:bg-[#333] rounded-full transition-colors"
                                                        title="Download"
                                                    >
                                                        <FaDownload />
                                                    </button>
                                                </div>
                                            ) : (
                                                <div className="text-gray-300 dark:text-gray-600 group-hover:translate-x-1 transition-transform">
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7"></path></svg>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Empty State */}
                            {filteredItems.length === 0 && (
                                <div className="text-center py-20">
                                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-50 dark:bg-[#1a1a1a] mb-6">
                                        <FaFolder className="text-4xl text-gray-300 dark:text-gray-600" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No items found</h3>
                                    <p className="text-gray-500 dark:text-gray-400">Try adjusting your search terms.</p>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default QuestionPapers;