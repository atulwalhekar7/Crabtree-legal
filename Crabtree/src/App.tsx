import React, { useEffect, useMemo, useState } from 'react';
import Navbar from './Components/Navbar';

import Footer from './Components/Footer';

import { CAROUSEL_SLIDES } from './data/carousel';
import { SERVICES_DATA } from './data/services';
import { FAQS } from './data/faqs';
import { ARTICLES_DATA } from './data/articles';
import Home from './Pages/HomePage';

import type { Article, ContactForm, Service } from './hooks/types';

const LOGO_URL =

  'https://lirp.cdn-website.com/715c0405/dms3rep/multi/opt/USE+-+Social+Media+-+Crabtree+Legal+Logo+-+No+Background+-+Large-1920w.png';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('Home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);

  const [contactSubmitted, setContactSubmitted] = useState<boolean>(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [activeServiceTab, setActiveServiceTab] = useState<string>('all');
  const [hoveredFaq, setHoveredFaq] = useState<number | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const [contactForm, setContactForm] = useState<ContactForm>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    referral: 'Google Search',
    message: '',
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const slideInterval = window.setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % CAROUSEL_SLIDES.length);
    }, 8500);
    return () => window.clearInterval(slideInterval);
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSubmitted(true);
    setTimeout(() => {
      setContactSubmitted(false);
      setContactForm({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        referral: 'Google Search',
        message: '',
      });
    }, 5000);
  };

  const handleNavClick = (tabName: string) => {
    setActiveTab(tabName);
    setSelectedArticle(null);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const colors = useMemo(
    () => ({
      bg: theme === 'dark' ? 'bg-[#121212]' : 'bg-white',
      bgAlt: theme === 'dark' ? 'bg-[#1C1C1C]' : 'bg-[#F8F8F8]',
      text: theme === 'dark' ? 'text-[#F5F5F5]' : 'text-[#2B2B2B]',
      textMuted: theme === 'dark' ? 'text-[#B0B0B0]' : 'text-gray-600',
      textLight: theme === 'dark' ? 'text-gray-400' : 'text-gray-500',
      border: theme === 'dark' ? 'border-[#2D2D2D]' : 'border-gray-200',
      cardBg: theme === 'dark' ? 'bg-[#1A1A1A]' : 'bg-white',
      navBg: theme === 'dark' ? 'bg-[#121212]/95' : 'bg-white/95',
    }),
    [theme],
  );

  const filteredServices: Service[] =
    activeServiceTab === 'all'
      ? SERVICES_DATA
      : SERVICES_DATA.filter((s) => s.category === activeServiceTab);

  const filteredArticles = ARTICLES_DATA.filter(

    (art) =>
      art.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      art.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      art.category.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div
      className={`min-h-screen ${colors.bg} ${colors.text} font-sans antialiased selection:bg-[#D43444] selection:text-white transition-colors duration-500`}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;800&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');
      `}</style>

      <Navbar
        activeTab={activeTab}
        scrolled={scrolled}
        theme={theme}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        onNavClick={handleNavClick}
        onToggleTheme={toggleTheme}
        onToggleMobile={() => setMobileMenuOpen((v) => !v)}
        colors={colors}
      />

      <main className="pt-0">
        {activeTab === 'Home' && (
          <Home faqItems={FAQS} />
        )}

      </main>

      <Footer onNavClick={handleNavClick} />

      <img src={LOGO_URL} alt="" className="hidden" />

      {/* Prevent unused handlers from being pruned; will be used once other pages are wired */}
      <form onSubmit={handleContactSubmit} className="hidden" />
      <div className="hidden">
        {contactSubmitted ? 'submitted' : ''}
        {filteredServices.length}
        {filteredArticles.length}
        {hoveredFaq ?? ''}
      </div>
    </div>
  );
}

