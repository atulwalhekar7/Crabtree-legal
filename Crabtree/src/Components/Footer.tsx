import React from 'react';
import { LOGO_URL } from '../constants/assets';
import { NAV_ITEMS } from '../constants/colours';


type FooterProps = {
  onNavClick?: (tab: string) => void;
};

export default function Footer({ onNavClick }: FooterProps) {
  return (
    <footer className="bg-[#0F0F0F] text-white pt-16 pb-8 border-t border-neutral-900 text-left">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-neutral-900">
          {/* Brand Block */}
          <div className="md:col-span-5 space-y-4 group">
            <div
              className="flex items-center space-x-3 cursor-pointer"
              onClick={() => onNavClick?.('Home')}
            >
              <div className="w-9 h-9 flex-shrink-0 transition-transform duration-500 group-hover:scale-105">
                <img
                  src={LOGO_URL}
                  alt="Crabtree Legal Logo"
                  className="w-full h-full object-contain filter brightness-110"
                />
              </div>
              <span className="serif-title text-base tracking-widest font-extrabold text-white">
                CRABTREE <span className="text-[#D43444]">LEGAL</span>
              </span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed font-light max-w-sm">
              Helping families, executors, retirees, and business owners protect what matters most
              through precise, strategic legal advice and uncompromised succession structures.
            </p>
            <p className="text-[9px] text-gray-500 font-light">
              &copy; {new Date().getFullYear()} Crabtree Legal Pty Ltd. All Rights Reserved.
            </p>
          </div>

          {/* Nav Map */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-[10px] uppercase tracking-widest font-black text-gray-300">
              Navigation Map
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-400">
              {NAV_ITEMS.map((item: string) => (

                <li key={item}>
                  <button
                    onClick={() => onNavClick?.(item)}
                    className="hover:text-[#D43444] transition-colors"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* WA Regulations */}
          <div className="md:col-span-4 space-y-3 text-xs text-gray-400 font-light leading-relaxed">
            <h4 className="text-[10px] uppercase tracking-widest font-black text-gray-300">
              WA Regulations
            </h4>
            <p className="text-[9px] text-gray-500 leading-normal">
              Liability limited by a scheme approved under Professional Standards Legislation. Legal
              practitioners of Crabtree Legal are governed by the Legal Practice Board of Western
              Australia.
            </p>
            <p className="text-[9px] text-gray-500 leading-normal">
              We acknowledge the Whadjuk Noongar people, traditional custodians of the land on which
              our Perth CBD St Georges Terrace chambers are established.
            </p>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center text-[9px] text-gray-500 font-bold uppercase tracking-wider space-y-3 sm:space-y-0">
          <p>Designed for absolute precision, stability and uncompromised security.</p>
          <div className="flex space-x-4">
            <span className="cursor-pointer hover:text-white transition">Privacy Charter</span>
            <span>•</span>
            <span className="cursor-pointer hover:text-white transition">Client Terms</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

