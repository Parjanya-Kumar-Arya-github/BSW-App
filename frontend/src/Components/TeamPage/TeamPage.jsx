import React, { useState, useMemo } from 'react';
import { FaPhone, FaEnvelope, FaLinkedinIn, FaInstagram, FaChevronDown } from 'react-icons/fa';
import teamDataRaw from '../../Data/team.json'; 
import config from '../../config';
import AboutUs from '../AboutUs/AboutUs';
// --- Color Palette & Shape Logic ---
const COLORS = ['#dcdde6', '#f2ece4', '#e8e8e8', '#dbe4e8', '#e6e1d6'];

const createBrushStrokePath = (width, height) => {
  const margin = 8;
  const left = margin;
  const right = width - margin;
  const top = margin + Math.random() * 10;
  const bottom = height - margin - Math.random() * 10;
  const segments = 6;
  const step = (right - left) / segments;
  let pointsTop = [], pointsBottom = [];

  for (let i = 0; i <= segments; i++) {
    pointsTop.push({ x: left + i * step, y: top + (Math.random() * 15 - 7) });
    pointsBottom.push({ x: left + i * step, y: bottom + (Math.random() * 15 - 7) });
  }

  let d = `M ${pointsTop[0].x},${pointsTop[0].y} `;
  for (let i = 1; i < pointsTop.length; i++) {
    d += `Q ${pointsTop[i - 1].x},${pointsTop[i - 1].y} ${(pointsTop[i - 1].x + pointsTop[i].x) / 2},${(pointsTop[i - 1].y + pointsTop[i].y) / 2} `;
  }
  d += `L ${pointsBottom[segments].x},${pointsBottom[segments].y} `;
  for (let i = segments - 1; i >= 0; i--) {
    d += `Q ${pointsBottom[i + 1].x},${pointsBottom[i + 1].y} ${(pointsBottom[i + 1].x + pointsBottom[i].x) / 2},${(pointsBottom[i + 1].y + pointsBottom[i].y) / 2} `;
  }
  return d + "Z";
};

// --- Helper: Normalize Data & Handle Social Media Logic ---
const getMemberDisplayData = (member) => {
  let imgSrc = member.image;
  if (!imgSrc && member.photo) {
    imgSrc = member.photo.startsWith('/') ? member.photo : `/imgs/team/${member.photo}`; 
  }
  if (!imgSrc) imgSrc = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400";

  let email = member.mail || member.webmail;
  if (!email && member.email && Array.isArray(member.email)) {
    email = member.email[0];
  }

  const phone = member.phone || member.phone_no || '';

  let linkedin = null;
  if (member.linkedin && member.linkedin !== "none" && member.linkedin.trim() !== "") {
    let cleanLink = member.linkedin.trim();
    if (!cleanLink.startsWith('http')) {
      cleanLink = `https://${cleanLink}`;
    }
    linkedin = cleanLink;
  }

  let instagram = null;
  if (member.instagram && member.instagram !== "none" && member.instagram.trim() !== "") {
    let cleanInsta = member.instagram.trim();
    if (cleanInsta.startsWith('http')) {
      instagram = cleanInsta;
    } else {
      const handle = cleanInsta.replace('@', '');
      instagram = `https://www.instagram.com/${handle}`;
    }
  }

  return {
    name: member.name,
    position: member.position || member.hostel || member.department || '',
    email: email,
    phone: phone,
    image: imgSrc,
    linkedin: linkedin,
    instagram: instagram
  };
};

// --- Sub-Components ---

const TeamCard = ({ rawMember, index }) => {
  const member = getMemberDisplayData(rawMember);

  const { pathData, rotation, color, uniqueId } = useMemo(() => ({
    pathData: createBrushStrokePath(220, 220),
    rotation: Math.random() * 6 - 3,
    color: COLORS[index % COLORS.length],
    uniqueId: `clip-${Math.random().toString(36).substr(2, 9)}`
  }), [index]);

  const socialLinkClasses = "w-8 h-8 bg-[#222222] text-white dark:bg-white dark:text-[#222] rounded-full flex items-center justify-center text-sm transition-colors hover:bg-[#444] dark:hover:bg-zinc-200 no-underline";

  return (
    
    <div className="border border-[#eaeaea] dark:border-neutral-700 py-10 px-5 text-center bg-white dark:bg-neutral-800 transition-all duration-300 ease-in-out flex flex-col items-center hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,0,0,0.05)]">
      
      
      <div className="w-[220px] h-[220px] mb-5 relative flex justify-center items-center">
        <svg viewBox="0 0 220 220" className="w-full h-full overflow-visible">
          <defs>
            <clipPath id={uniqueId}>
              <path d={pathData} />
            </clipPath>
          </defs>
          <path 
            d={pathData} 
            fill={color} 
            transform={`rotate(${rotation},110,110) scale(1.05)`} 
          />
          <image 
            href={member.image} 
            width="100%" 
            height="100%" 
            clipPath={`url(#${uniqueId})`} 
            preserveAspectRatio="xMidYMid slice" 
          />
        </svg>
      </div>
      <h3 className="text-lg font-bold mb-1.5 text-[#222] dark:text-gray-100">{member.name}</h3>
      <p className="text-[13px] text-[#666] dark:text-gray-300 mb-4 font-medium px-2 min-h-[20px]">
        {member.position}
      </p>
      
      <div className="flex gap-2.5 justify-center mt-auto">
        {member.phone && (
          <a href={`tel:${member.phone}`} className={socialLinkClasses} title="Call">
            <FaPhone size={12} />
          </a>
        )}
        
        {member.email && (
          <a href={`mailto:${member.email}`} className={socialLinkClasses} title="Email">
            <FaEnvelope size={12} />
          </a>
        )}
        
        {member.linkedin && (
          <a href={member.linkedin} target="_blank" rel="noreferrer" className={socialLinkClasses} title="LinkedIn">
            <FaLinkedinIn size={14} />
          </a>
        )}

        {member.instagram && (
          <a href={member.instagram} target="_blank" rel="noreferrer" className={socialLinkClasses} title="Instagram">
            <FaInstagram size={14} />
          </a>
        )}
      </div>
    </div>
  );
};

const SectionGroup = ({ title, children }) => (
  <div className="flex flex-col gap-5">
    <h2 className="text-2xl font-semibold text-[#222] dark:text-gray-100 mb-5 uppercase tracking-[0.5px] text-center border-b border-gray-100 dark:border-neutral-700 pb-4">
      {title}
    </h2>
    {children}
  </div>
);

// --- Main Component ---

const TeamPage = () => {
  const [activeTab, setActiveTab] = useState('Admins');
  
  // 1. Get available years from data keys (sorted descending)
  const availableYears = useMemo(() => Object.keys(teamDataRaw).sort().reverse(), []);
  
  // 2. Year Selection State
  const [selectedYear, setSelectedYear] = useState(config.currentTeamYear || availableYears[0] || "2025-26");

  // 3. Derived Data for Selected Year
  const teamData = teamDataRaw[selectedYear] || null;

  // 4. Dynamic Tabs
  const tabs = useMemo(() => {
    if (teamData && teamData.sections) {
      return Object.keys(teamData.sections);
    }
    return ['Admins', 'Student Team', 'Tech Team', 'Design Team','Counsellors','SAC Office']; // Fallback
  }, [teamData]);

  // Debug: log selected year/tabs/activeTab at runtime
  // Remove or guard this in production if noisy
  console.log('TeamPage debug', { selectedYear, tabs, activeTab, sections: Object.keys(teamData?.sections || {}) });

  React.useEffect(() => {
    if (tabs.length > 0 && !tabs.includes(activeTab)) {
      setActiveTab(tabs[0]);
    }
  }, [selectedYear, tabs, activeTab]);

  const handleTabChange = (category) => {
    if (document.startViewTransition) {
      document.startViewTransition(() => {
        setActiveTab(category);
      });
    } else {
      setActiveTab(category);
    }
  };

  const renderContent = () => {
    if (!teamData || !teamData.sections || !teamData.sections[activeTab]) {
      return (
        <div className="text-center p-5 text-gray-500">
          No data available for <strong>{activeTab}</strong> in {selectedYear}.
        </div>
      );
    }

    const sectionData = teamData.sections[activeTab].section;

    return Object.entries(sectionData).map(([subsectionName, members]) => {
      if (subsectionName === 'Representatives') {
        const hostelGroups = members.reduce((acc, member) => {
          const hostel = member.hostel ? member.hostel.trim() : 'Other';
          if (!acc[hostel]) acc[hostel] = [];
          acc[hostel].push(member);
          return acc;
        }, {});

        return (
          <SectionGroup key={subsectionName} title={subsectionName}>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-[30px]">
              {Object.entries(hostelGroups).map(([hostelName, hostelMembers]) => (
                <div key={hostelName} className="border-2 border-[#67B26F] rounded-[10px] p-5 bg-[#f9fdf8]">
                  <h3 className="text-base font-semibold text-[#67B26F] mb-[15px] text-center">
                    {hostelName}
                  </h3>
                  <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-5">
                    {hostelMembers.map((member, idx) => (
                      <TeamCard key={`${hostelName}-${idx}`} rawMember={member} index={idx} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </SectionGroup>
        );
      }

      return (
        <SectionGroup key={subsectionName} title={subsectionName}>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-[30px]">
            {members.map((member, idx) => (
              <TeamCard key={`${subsectionName}-${idx}`} rawMember={member} index={idx} />
            ))}
          </div>
        </SectionGroup>
      );
    });
  };

  return (
    
    <div className="font-sans bg-white text-[#222] dark:bg-neutral-900 dark:text-gray-100 px-5 min-h-screen mt-5">
      <AboutUs></AboutUs>
      <style>{`
        @keyframes shine {
          0% { left: -150%; }
          60% { left: 150%; }
          100% { left: 150%; }
        }
        .animate-shine::after {
          content: "";
          position: absolute;
          top: 0;
          left: -150%;
          width: 150%;
          height: 100%;
          background: linear-gradient(120deg, transparent 30%, rgba(255, 255, 255, 0.35), transparent 70%);
          animation: shine 1.6s ease-in-out infinite;
        }
        ::view-transition-group(active-toggle-button) {
          z-index: 1;
        }
      `}</style>

      {/* Header Container */}
      <div className="max-w-[1200px] mx-auto relative mb-[60px]">
        
        {/* Year Dropdown - Right aligned on desktop, centered on mobile */}
        <div className="flex justify-center md:absolute md:top-0 md:right-0 w-full md:w-auto z-20 mb-6 md:mb-0">
          <div className="relative inline-block group">
            <select 
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="appearance-none bg-white border border-[#eaeaea] text-[#222] py-2 px-6 pr-10 rounded-full focus:outline-none focus:border-[#67B26F] focus:ring-1 focus:ring-[#67B26F] font-medium shadow-sm transition-all cursor-pointer hover:border-[#67B26F]"
            >
              {availableYears.map((yr) => (
                <option key={yr} value={yr}>Session {yr}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-[#666] group-hover:text-[#67B26F] transition-colors">
              <FaChevronDown size={12} />
            </div>
          </div>
        </div>

        {/* Text Content - Centered */}
        <div className="text-center max-w-[800px] mx-auto pt-2">
          <h4 className="text-xs uppercase tracking-[1px] font-semibold mb-2.5">Who we are</h4>
          <h1 className="text-[42px] font-bold mb-5">Meet our team</h1>
          <p className="text-[#666] text-base leading-relaxed">
            Just take a look - each member of the team is watching your every gesture.
          </p>
        </div>
      </div>

      {/* Slider / Navigation (responsive) */}
      <div className="font-sans leading-normal bg-transparent text-white grid place-items-center antialiased mb-[50px]">
        {/* Mobile: simple select (does not affect desktop UI) */}
        <div className="w-full max-w-[720px] px-4 sm:hidden">
          <select
            aria-label="Select team section"
            value={activeTab}
            onChange={(e) => handleTabChange(e.target.value)}
            className="w-full py-2 px-3 border border-gray-200 rounded-md bg-white text-[#222]"
          >
            {tabs.map((tab) => (
              <option key={tab} value={tab}>{tab}</option>
            ))}
          </select>
        </div>

        {/* Desktop: preserve existing pill tabs exactly */}
        <div className="hidden sm:block">
          <ul className="list-none flex gap-1 p-1 rounded-[3rem] bg-black" role="tablist">
            {tabs.map((tab) => {
              const isActive = activeTab === tab;
              return (
                <li key={tab} className="grid relative" style={{ gridArea: '1 / 1' }}>
                  {isActive && (
                    <span 
                      className="animate-shine bg-[#67B26F] rounded-[3rem] relative overflow-hidden w-full h-full block"
                      style={{ 
                        gridArea: '1 / 1', 
                        viewTransitionName: 'active-toggle-button'
                      }} 
                    />
                  )}
                  <button
                    onClick={() => handleTabChange(tab)}
                    className="py-2 px-5 relative z-10 bg-transparent outline-none cursor-pointer focus-visible:outline-2 focus-visible:outline-white/20 transition-colors"
                    style={{ gridArea: '1 / 1' }}
                  >
                    {tab}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* Content Grid */}
      <div className="flex flex-col gap-[50px] max-w-[1200px] mx-auto">
        {renderContent()}
      </div>
    </div>
  );
};

export default TeamPage;