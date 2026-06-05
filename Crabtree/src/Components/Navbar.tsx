import React from "react";
import { Phone, Menu, X, Moon, Sun } from "lucide-react";
import { LOGO_URL } from "../constants/assets";
import {  NAV_ITEMS } from "../constants/colours";

import type { NavTab } from "../hooks/types";

// Local prop typing (HeaderProps was removed from hooks/types)
type HeaderProps = {
  activeTab: NavTab;
  scrolled: boolean;
  theme: "light" | "dark";
  mobileMenuOpen: boolean;
  onNavClick: (tab: NavTab) => void;
  onToggleTheme: () => void;
  onToggleMobile: () => void;
  colors: {
    navBg: string;
    border: string;
    text: string;
    textMuted: string;
    textLight: string;
  };
};


const Header: React.FC<HeaderProps> = ({
  activeTab,
  scrolled,
  theme,
  mobileMenuOpen,
  onNavClick,
  onToggleTheme,
  onToggleMobile,
  colors,
}) => {
  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? `${colors.navBg} shadow-md border-b ${colors.border} py-3.5`
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="flex justify-between items-center">
          {/* Brand */}
          <div
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => onNavClick("Home")}
          >
            <div className="relative w-11 h-11 flex-shrink-0 transition-transform duration-500 group-hover:scale-105">
              <img
                src={LOGO_URL}
                alt="Crabtree Legal Logo"
                className="w-full h-full object-contain"
              />
            </div>

            <div className="hidden sm:block text-left">
              <span
                className={`serif-title text-base tracking-widest font-extrabold ${
                  scrolled
                    ? colors.text
                    : theme === "dark"
                    ? "text-white"
                    : "text-[#2B2B2B]"
                }`}
              >
                CRABTREE <span className="text-[#D43444]">LEGAL</span>
              </span>

              <p
                className={`text-[8px] tracking-[0.35em] uppercase -mt-0.5 font-bold ${
                  scrolled ? colors.textLight : "text-gray-300"
                }`}
              >
                Succession &amp; Estates
              </p>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-8">
            {NAV_ITEMS.map((item: NavTab) => (
              <button
                key={item}
                onClick={() => onNavClick(item)}
                className={`text-[10px] font-extrabold uppercase tracking-widest transition-colors py-1 relative nav-link ${
                  activeTab === item
                    ? "text-[#D43444]"
                    : scrolled
                    ? colors.textMuted
                    : theme === "dark"
                    ? "text-gray-300 hover:text-white"
                    : "text-gray-200 hover:text-white"
                }`}
              >
                {item}
              </button>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-6">
            <button
              onClick={onToggleTheme}
              aria-label="Toggle Theme"
              className={`p-2 rounded-full border transition-all duration-300 ${
                scrolled
                  ? `${colors.border} hover:bg-gray-100 dark:hover:bg-neutral-800`
                  : "border-white/20 hover:bg-white/10 text-white"
              }`}
            >
              {theme === "light" ? (
                <Moon className="w-3.5 h-3.5 text-gray-700" />
              ) : (
                <Sun className="w-3.5 h-3.5 text-yellow-400" />
              )}
            </button>

            <a
              href="tel:0865578939"
              className={`text-[11px] font-bold tracking-widest uppercase flex items-center transition-colors ${
                scrolled ? colors.text : "text-white hover:text-[#D43444]"
              }`}
            >
              <Phone className="w-3.5 h-3.5 text-[#D43444] mr-2 animate-pulse" />
              (08) 6557 8939
            </a>

            <button
              onClick={() => onNavClick("Contact")}
              className="bg-[#D43444] text-white px-5 py-2.5 rounded text-[10px] font-bold tracking-widest uppercase hover:bg-[#b02c38] hover:shadow-lg transition-all duration-300"
            >
              Enquire
            </button>
          </div>

          {/* Mobile Toggles */}
          <div className="flex lg:hidden items-center space-x-3">
            <button
              onClick={onToggleTheme}
              className="p-2 rounded-full border border-gray-300 text-gray-600 dark:border-neutral-700 dark:text-gray-300"
            >
              {theme === "light" ? (
                <Moon className="w-4 h-4" />
              ) : (
                <Sun className="w-4 h-4" />
              )}
            </button>

            <button
              onClick={onToggleMobile}
              className={`p-2 transition-colors ${
                scrolled ? colors.text : "text-white"
              }`}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;