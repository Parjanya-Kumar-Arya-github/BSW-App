import React from 'react';
import { useNavigate } from 'react-router-dom';

const NoticesLanding = () => {
  const avatars = [
    'https://i.pravatar.cc/150?u=a1',
    'https://i.pravatar.cc/150?u=a2',
    'https://i.pravatar.cc/150?u=a3',
    'https://i.pravatar.cc/150?u=a4',
    'https://i.pravatar.cc/150?u=a5',
  ];

  const navigate = useNavigate();

  return (
    <div className="w-full py-14 px-4 flex justify-center bg-transparent" id="iitd-notices">
      <div
        className="
          relative w-full overflow-hidden rounded-[3rem]
          p-10 md:p-16
          bg-white
          dark:bg-slate-900
          shadow-2xl border border-gray-200 dark:border-gray-700
        "
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

        <div className="relative z-10 max-w-2xl">
          <h1
            className="
              text-[2.6rem] md:text-[3.2rem]
              font-semibold leading-tight tracking-tight mb-5
              text-slate-900 dark:text-slate-100
            "
          >
            Subscribe to Exclusive <br />
            IIT Delhi Notices
          </h1>

          <p
            className="
              text-lg max-w-xl mb-9
              text-slate-700 dark:text-slate-300
            "
          >
            Get exclusive access to internships, campus events and official
            notices. Exclusively for the IIT Delhi community.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <button
              className="
                px-8 py-3.5 rounded-xl font-semibold text-base
                bg-[#1f4ea8] text-white hover:bg-[#183f8c]
                dark:bg-slate-200 dark:text-slate-900
                dark:hover:bg-white
                transition
                shadow-lg shadow-blue-900/20
              "
              onClick={() => navigate('/joinNotices')}
            >
              Join IITD Notices
            </button>

            <button
              className="
                px-8 py-3.5 rounded-xl font-semibold text-base
                bg-white/80 text-[#1f4ea8] border-2 border-[#1f4ea8]
                hover:bg-[#f1f4ff]
                dark:bg-transparent dark:text-slate-200
                dark:border-slate-600 dark:hover:bg-slate-800
                transition backdrop-blur-sm
              "
              onClick={() => navigate('/noticesForm')}
            >
              Publish a Notice
            </button>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex -space-x-3">
              {avatars.map((src, i) => (
                <div
                  key={i}
                  className="
                    w-9 h-9 rounded-full overflow-hidden
                    border-[2.5px]
                    border-white dark:border-slate-900
                    bg-white dark:bg-slate-800
                  "
                >
                  <img
                    src={src}
                    alt="user"
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>

            <p className="text-sm text-slate-700 dark:text-slate-400">
              Joined by <span className="font-semibold">10000+</span> IIT Delhi
              students and alumni
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoticesLanding;