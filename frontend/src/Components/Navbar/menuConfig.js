export const MENU = [
  

  {
    label: "Welfare Portals",
    href: "/#welfare-portal",
    
  },

  {
    label: "Resources",
    children: [
      
      { label: "Question Papers", href: "/question-papers" },
      {
        label: "Internet & Email",
        children: [
          {
            label: "Email Configuration",
            href: "https://csc.iitd.ac.in/howto",
          },
          { label: "Internet Setup", href: "https://csc.iitd.ac.in/howto" },
        ],
      },
      { label: "Diary", href: "/diary" },
      { label: "Booklets", href: "/booklets" },
      {
        label: "Medical Facilities",
        children: [
          { label: "Health Insurance", href: "/health-insurance" },
          { label: "Wheelchair Form", href: "/forms/wheelchair.pdf" },
        ],
      },
      { label: "Forms", href: "/forms" },
      { label: "Emergency Contacts", href: "/emergency-contacts" },
      { label: "Quick Links", href: "/quick-links" },
      {label: "IITD Notices", href: "/#iitd-notices"}
      
    ],
  },

  {
    label: "Events",
    href: "/events",
  },
  {
    label: "Operations",
    href: "/#operations"
  },
  
  { label: "About Us", href: "/aboutus" },
];
