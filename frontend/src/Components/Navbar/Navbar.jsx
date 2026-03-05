import { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";

import NavLinks from "./NavLinks";
import MobileMenu from "./MobileMenu";
import ThemeToggle from "./ThemeToggle";
import { useAuth } from "../../Context/AuthContext/AuthContext";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, isLoggedIn } = useAuth();

  return (
    <nav className="relative top-0 left-0 w-full z-50 transition-all duration-300 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0 cursor-pointer">
            <Link to="/" onClick={() => setMobileOpen(false)}>
              <img
                src="/images/bsw_logo.png"
                alt="BSW Logo"
                className="h-8 w-auto"
              />
            </Link>
          </div>

          {/* Center: Nav Tabs */}
          <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2">
            <NavLinks />
          </div>

          {/* Right: Actions */}
          <div className="flex-1 hidden lg:flex items-center justify-end gap-4">
            <ThemeToggle />
            
            {/* Conditional Rendering based on Auth State */}
            {isLoggedIn ? (
              <Link
                to="/profile"
                className="bg-[#2EBF70] text-white px-8 font-lexend py-1.5 text-[13px] rounded-[7px] hover:bg-green-600 transition"
              >
                Profile
              </Link>
            ) : (
              <Link
                to="/login"
                className="bg-[#2EBF70] text-white px-8 font-lexend py-1.5 text-[13px] rounded-[7px] hover:bg-green-600 transition"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex justify-between gap-4 lg:hidden">
            <ThemeToggle />
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden ml-auto text-2xl text-gray-700 dark:text-gray-200"
              aria-label="Open menu"
            >
              <FaBars />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <MobileMenu
        open={mobileOpen}
        setOpen={setMobileOpen}
        onClose={() => setMobileOpen(false)}
      />
    </nav>
  );
};

export default Navbar;