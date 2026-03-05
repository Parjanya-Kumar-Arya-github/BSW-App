import { MENU } from "./menuConfig";
import { FaChevronRight } from "react-icons/fa";

export default function NavLinks() {
  return (
    <ul className="flex items-center gap-8 font-lexend text-[13px] font-semibold text-gray-800 dark:text-white">
      {MENU.map((item, idx) => (
        <li key={idx} className="relative group">
          {/* Top-level link */}
          <a
            href={item.href || "#"}
            className="hover:text-[#2EBF70] transition-colors"
          >
            {item.label}
          </a>

          {/* Level 1 dropdown */}
          {item.children && (
            <ul
              className="
                absolute left-0 top-full mt-3
                min-w-60
                bg-white dark:bg-gray-900
                rounded-xl
                shadow-lg
                py-2
                opacity-0 invisible
                group-hover:opacity-100 group-hover:visible
                transition-all duration-200
              "
            >
              {item.children.map((child, cidx) => (
                <li key={cidx} className="relative group/sub">
                  {/* Level 1 item */}
                  <a
                    href={child.href || "#"}
                    className="
                      flex items-center justify-between
                      px-4 py-2 text-sm
                      text-gray-700 dark:text-gray-200
                      hover:text-[#2EBF70]
                      hover:bg-gray-100 dark:hover:bg-gray-800
                      transition
                    "
                  >
                    <span>{child.label}</span>

                    {/* Right arrow only if sub-submenu exists */}
                    {child.children && (
                      <FaChevronRight className="text-xs opacity-70" />
                    )}
                  </a>

                  {/* Level 2 dropdown (sub-submenu) */}
                  {child.children && (
                    <ul
                      className="
                        absolute left-full top-0 ml-2
                        min-w-60
                        bg-white dark:bg-gray-900
                        rounded-xl
                        shadow-lg
                        py-2
                        opacity-0 invisible
                        group-hover/sub:opacity-100 group-hover/sub:visible
                        transition-all duration-200
                      "
                    >
                      {child.children.map((sub, sidx) => (
                        <li key={sidx}>
                          <a
                            href={sub.href}
                            className="
                              block px-4 py-2 text-sm
                              text-gray-700 dark:text-gray-200
                              hover:text-[#2EBF70]
                              hover:bg-gray-100 dark:hover:bg-gray-800
                              transition
                            "
                          >
                            {sub.label}
                          </a>
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
  );
}
