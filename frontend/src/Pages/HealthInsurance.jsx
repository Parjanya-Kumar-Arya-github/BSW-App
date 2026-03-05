import React from 'react';
import {
  FaHeartbeat,
  FaFileMedical,
  FaUserMd,
  FaCalendarCheck,
  FaDownload,
  FaHospital,
} from 'react-icons/fa';
import useReveal from '../common/Reveal';

const HealthInsurance = () => {
  const [headerRef, headerVisible] = useReveal();
  const [contentRef, contentVisible] = useReveal();

  const insuranceDetails = [
    {
      icon: FaHospital,
      label: 'Insurance Provider',
      value: 'National Insurance Co. Ltd',
    },
    {
      icon: FaUserMd,
      label: 'TPA Services',
      value: 'Safeway TPA',
    },
    {
      icon: FaCalendarCheck,
      label: 'Help Desk Support',
      value: 'Every Thursday @ Zanskar Hostel',
    },
  ];

  return (
    <div className="min-h-screen bg-transparent dark:bg-[#0f0f0f] pt-8 pb-20 transition-colors">
      <div className="max-w-7xl mx-auto px-4">

        {/* Header Banner with Blobs */}
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
            className="absolute pointer-events-none bg-[#fbcfe8] dark:bg-[#500724]"
            style={{
              bottom: '-20%',
              left: '-5%',
              width: '500px',
              height: '600px',
              filter: 'blur(40px)',
              borderRadius: '50%',
              zIndex: 0,
              animation: 'blob 7s infinite',
            }}
          />

          {/* Blob 2: Middle/Transition Purple */}
          <div
            className="absolute pointer-events-none bg-[#c083eb] dark:bg-[#581c87]"
            style={{
              top: '25%',
              right: '45%',
              width: '350px',
              height: '350px',
              opacity: 0.3,
              filter: 'blur(80px)',
              borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
              transform: 'rotate(-30deg)',
              zIndex: 0,
              animation: 'blob-reverse 8s infinite',
              animationDelay: '1s',
            }}
          />

          {/* Blob 3: Deep Blue with 3-Step DIAGONAL Gradient */}
          <div
            className="
                absolute pointer-events-none 
                bg-[linear-gradient(75deg,#656df7_0%,#9DA2F3_70%,#f5f5f5_80%)]
                dark:bg-[linear-gradient(75deg,#1e1b4b_0%,#312e81_70%,#4338ca_80%)]
            "
            style={{
              top: '-23%',
              right: '-2%',
              width: '450px',
              height: '450px',
              opacity: 1,
              filter: 'blur(20px)',
              borderRadius: '30% 70% 70% 50% / 30% 30% 65% 70%',
              transform: 'rotate(-30deg)',
              zIndex: 0,
              animation: 'blob 7s infinite',
              animationDelay: '2s',
            }}
          />

          {/* Blob 4: Deep Purple blob in middle of top edge */}
          <div
            className="
                absolute pointer-events-none
                bg-[linear-gradient(75deg,#fadef0_0%,#7d83f793_80%)]
                dark:bg-[linear-gradient(75deg,#4a044e_0%,#2e1065_80%)]
            "
            style={{
              top: '-23%',
              right: '30%',
              width: '380px',
              height: '380px',
              opacity: 0.7,
              filter: 'blur(20px)',
              borderRadius: '30% 70% 70% 50% / 30% 30% 65% 70%',
              transform: 'rotate(-30deg)',
              zIndex: 0,
              animation: 'blob-reverse 8s infinite',
              animationDelay: '0.5s',
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

          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-red-100 dark:bg-red-900/20 text-red-500 mb-6 backdrop-blur-md">
              <FaHeartbeat className="text-3xl" />
            </div>

            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight leading-tight">
              Student <span className="text-[#20AA9D]">Health Insurance</span>
            </h1>

            <p className="text-lg text-slate-700 dark:text-slate-300 font-medium max-w-2xl mx-auto">
              Comprehensive health coverage for IIT Delhi students, including
              claim procedures and on-campus support.
            </p>
          </div>
        </div>

        {/* Content */}
        <div
          ref={contentRef}
          className={`
            max-w-5xl mx-auto
            transition-all duration-700 delay-100
            ${contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
          `}
        >
          <div className="grid md:grid-cols-3 gap-8">

            {/* Main Guide Card */}
            <div
              className="
                md:col-span-2
                bg-white dark:bg-[#121212]
                rounded-[2rem] p-8 md:p-10
                border border-gray-100 dark:border-[#2a2a2a]
                shadow-xl dark:shadow-none
                transition hover:-translate-y-1
              "
            >
              <div className="flex items-start justify-between mb-6">
                <div className="w-16 h-16 rounded-2xl bg-[#20AA9D]/10 text-[#20AA9D] flex items-center justify-center">
                  <FaFileMedical className="text-3xl" />
                </div>

                <span className="text-xs font-bold px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400">
                  Guide
                </span>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                Claim Process & Policy Guide
              </h2>

              <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                A step-by-step guide covering cashless facilities, reimbursement
                procedures, and required documentation for Safeway TPA claims.
              </p>

              <a
                href="/misc/health_insurance.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  inline-flex items-center justify-center gap-2
                  px-8 py-4 rounded-full
                  bg-[#20AA9D] hover:bg-[#17857a]
                  text-white font-bold text-lg
                  transition-all duration-300
                  shadow-lg shadow-[#20AA9D]/20
                  hover:shadow-xl hover:-translate-y-1
                "
              >
                <FaDownload />
                Download Policy Guide
              </a>
            </div>

            {/* Info Panel */}
            <div
              className="
                bg-white dark:bg-[#121212]
                rounded-[2rem] p-8
                border border-gray-100 dark:border-[#2a2a2a]
                shadow-xl dark:shadow-none
                flex flex-col justify-between
              "
            >
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 border-b border-gray-100 dark:border-[#2a2a2a] pb-4">
                  Key Information
                </h3>

                <div className="space-y-6">
                  {insuranceDetails.map((item, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-gray-50 dark:bg-[#1a1a1a] text-gray-400 dark:text-gray-500 flex items-center justify-center shrink-0">
                        <item.icon className="text-xl" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-[#20AA9D] uppercase tracking-wider mb-1">
                          {item.label}
                        </p>
                        <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                          {item.value}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Note */}
              <div className="mt-8 p-4 rounded-2xl bg-yellow-50 dark:bg-yellow-900/10 text-sm text-yellow-800 dark:text-yellow-200 border border-yellow-100 dark:border-yellow-900/30">
                <strong>Note:</strong> For urgent queries outside Thursday help
                desk hours, refer to the contact numbers provided in the guide.
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthInsurance;
