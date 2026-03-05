import { MENU } from "./menuConfig";
import { useState, useEffect } from "react";
import { FaTimes, FaChevronDown } from "react-icons/fa"; // Added FaChevronDown
import { Link, useNavigate } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { useAuth } from "../../Context/AuthContext/AuthContext"; // Import Auth

export default function MobileMenu({ open, onClose, setOpen }) {
  const [openIndex, setOpenIndex] = useState(null);
  const [openSubIndex, setOpenSubIndex] = useState(null);
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth(); // Get auth state

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (open) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => document.body.classList.remove("overflow-hidden");
  }, [open]);

  // Helper to close menu
  const handleClose = () => {
    if (onClose) onClose();
    if (setOpen) setOpen(false);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={handleClose}
        className={`
          fixed inset-0 z-40
          bg-black/30 backdrop-blur-sm
          transition-opacity duration-300
          ${open ? "opacity-100" : "opacity-0 pointer-events-none"}
        `}
      />

      {/* Drawer */}
      <div
        className={`
          fixed top-0 right-0 z-50
          h-full w-[85%] max-w-sm
          bg-white dark:bg-black
          text-black dark:text-white
          shadow-xl
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "translate-x-full"}
          overflow-y-auto
        `}
      >
        {/* Header */}
        <div 
          className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-800" 
        >
          <img 
            src="/images/bsw_logo.png" 
            alt="Logo" 
            className="h-8 cursor-pointer" 
            onClick={() => {
              handleClose();
              navigate('/');
            }}
          />
          <button onClick={handleClose} aria-label="Close menu">
            <FaTimes className="text-xl" />
          </button>
        </div>

        {/* Menu */}
        <nav className="flex-1 overflow-y-auto">
          <ul>
            {MENU.map((item, idx) => (
              <li
                key={idx}
                className="border-b border-gray-200 dark:border-gray-800"
              >
                {/* Top level */}
                <div className="px-6 py-3">
                  {item.href ? (
                    <Link
                      to={item.href}
                      onClick={handleClose}
                      className="block font-medium text-sm"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <button
                      onClick={() =>
                        setOpenIndex(openIndex === idx ? null : idx)
                      }
                      className="font-medium text-sm w-full flex justify-between items-center text-left"
                    >
                      {item.label}
                      {/* Dropdown Marker */}
                      <FaChevronDown 
                        className={`text-xs text-gray-400 transition-transform duration-200 ${
                          openIndex === idx ? "rotate-180" : ""
                        }`} 
                      />
                    </button>
                  )}
                </div>

                {/* Submenu */}
                {item.children && openIndex === idx && (
                  <ul className="bg-gray-50 dark:bg-zinc-900 border-t border-gray-100 dark:border-gray-800">
                    {item.children.map((child, cidx) => (
                      <li
                        key={cidx}
                        className="border-t border-gray-200 dark:border-gray-800 first:border-0"
                      >
                        <div className="px-10 py-2">
                          {child.href ? (
                            <Link
                              to={child.href}
                              onClick={handleClose}
                              className="block text-sm text-gray-700 dark:text-gray-300"
                            >
                              {child.label}
                            </Link>
                          ) : (
                            <button
                              onClick={() =>
                                setOpenSubIndex(
                                  openSubIndex === cidx ? null : cidx
                                )
                              }
                              className="text-sm w-full flex justify-between items-center text-left text-gray-700 dark:text-gray-300"
                            >
                              {child.label}
                              {/* Submenu Marker */}
                              <FaChevronDown 
                                className={`text-[10px] text-gray-400 transition-transform duration-200 ${
                                  openSubIndex === cidx ? "rotate-180" : ""
                                }`} 
                              />
                            </button>
                          )}
                        </div>

                        {/* Sub-submenu */}
                        {child.children && openSubIndex === cidx && (
                          <ul className="bg-gray-100 dark:bg-zinc-800 border-t border-gray-200 dark:border-gray-700">
                            {child.children.map((sub, sidx) => (
                              <li
                                key={sidx}
                                className="border-t border-gray-200 dark:border-gray-700 first:border-0"
                              >
                                <Link
                                  to={sub.href}
                                  onClick={handleClose}
                                  className="
                                    block px-14 py-2
                                    text-sm
                                    text-gray-600
                                    dark:text-gray-400
                                    hover:text-[#2EBF70]
                                  "
                                >
                                  {sub.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Bottom actions */}
        <div className="px-6 pb-8 pt-8 space-y-4 border-t border-gray-200 dark:border-gray-800">
          {isLoggedIn ? (
            <Link
              to="/profile"
              onClick={handleClose}
              className="block bg-[#2EBF70] text-white text-center py-3 rounded-lg font-medium hover:bg-green-600 transition"
            >
              Profile
            </Link>
          ) : (
            <Link
              to="/login"
              onClick={handleClose}
              className="block bg-[#2EBF70] text-white text-center py-3 rounded-lg font-medium hover:bg-green-600 transition"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </>
  );
}