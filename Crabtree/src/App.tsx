import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from './components/Footer';

import { CAROUSEL_SLIDES, SERVICES_DATA, FAQS, ARTICLES_DATA } from './data';

import Home from './pages/Home';

import type { Article, ContactFormState, Service } from './types';

const LOGO_URL =
  'https://lirp.cdn-website.com/715c0405/dms3rep/multi/opt/USE+-+Social+Media+-+Crabtree+Legal+Logo+-+No+Background+-+Large-1920w.png';

export default function App() {
  const [activeTab, setActiveTab] = useState('Home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeServiceTab, setActiveServiceTab] = useState('all');
  const [hoveredFaq, setHoveredFaq] = useState<number | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const [contactForm, setContactForm] = useState<ContactFormState>({
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

  const colors = {
    bg: theme === 'dark' ? 'bg-[#121212]' : 'bg-white',
    bgAlt: theme === 'dark' ? 'bg-[#1C1C1C]' : 'bg-[#F8F8F8]',
    text: theme === 'dark' ? 'text-[#F5F5F5]' : 'text-[#2B2B2B]',
    textMuted: theme === 'dark' ? 'text-[#B0B0B0]' : 'text-gray-600',
    textLight: theme === 'dark' ? 'text-gray-400' : 'text-gray-500',
    border: theme === 'dark' ? 'border-[#2D2D2D]' : 'border-gray-200',
    cardBg: theme === 'dark' ? 'bg-[#1A1A1A]' : 'bg-white',
    navBg: theme === 'dark' ? 'bg-[#121212]/95' : 'bg-white/95',
  };

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
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;800&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');
        `}
      </style>

      <Header
        activeTab={activeTab}
        setActiveTab={handleNavClick}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        scrolled={scrolled}
        theme={theme}
        onToggleTheme={toggleTheme}
        onEnquire={() => handleNavClick('Contact')}
      />

      <main className="pt-0">
        {activeTab === 'Home' && (
          <Home
            slides={CAROUSEL_SLIDES}
            currentSlide={currentSlide}
            setCurrentSlide={setCurrentSlide}
            onBook={() => handleNavClick('Contact')}
            onGoServices={() => handleNavClick('Services')}
            faqItems={FAQS}
          />
        )}

        {/* TODO: About / Services / Articles / Contact pages will be wired next */}
      </main>

      <Footer />

      <img src={LOGO_URL} alt="" className="hidden" />
    </div>
  );
}

