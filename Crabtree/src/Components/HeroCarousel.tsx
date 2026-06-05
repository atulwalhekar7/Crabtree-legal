import { useEffect, useState } from 'react';

import { Award, ChevronRight, ArrowRight, ChevronDown } from 'lucide-react';
import { CAROUSEL_SLIDES } from '../data/carousel';

import { SERVICES_DATA } from '../data/services';
import { FAQS } from '../data/faqs';

type HeroColors = {
  border: string;
  bgAlt: string;
  text: string;
  textMuted: string;
  textLight: string;
  cardBg: string;
};

export default function Home({
  colors,
  onNavClick,
}: {
  colors: HeroColors;
  onNavClick: (tab: string) => void;
}) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [hoveredFaq, setHoveredFaq] = useState<number | null>(null);


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % CAROUSEL_SLIDES.length);
    }, 8500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {/* ── Hero Carousel ── */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-black">
        {CAROUSEL_SLIDES.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              index === currentSlide
                ? 'opacity-45 scale-100'
                : 'opacity-0 scale-105 pointer-events-none'
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black via-neutral-900/90 to-transparent z-10" />
            <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
          </div>
        ))}

        {/* Dots */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex space-x-2.5">
          {CAROUSEL_SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === currentSlide ? 'w-8 bg-[#D43444]' : 'w-2 bg-white/40 hover:bg-white/60'
              }`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>

        {/* Hero Content */}
        <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-20 w-full py-24 flex items-center min-h-[92vh]">
          <div className="max-w-2xl space-y-6 text-left">
            <div className="inline-flex items-center space-x-2 bg-red-600/15 border border-red-500/30 text-red-400 px-4 py-1.5 rounded-full text-[9px] font-bold tracking-widest uppercase">
              <Award className="w-3.5 h-3.5 text-[#D43444]" />
              <span>Veteran Owned &amp; Operated • Perth</span>
            </div>

            <div className="space-y-3">
              <p className="text-[#D43444] text-xs font-black uppercase tracking-widest">
                {CAROUSEL_SLIDES[currentSlide].accent}
              </p>
              <h1 className="serif-title text-4xl sm:text-6xl text-white font-extrabold leading-tight tracking-tight">
                {CAROUSEL_SLIDES[currentSlide].title}
              </h1>
            </div>

            <p className="text-sm sm:text-base text-gray-300 leading-relaxed max-w-xl font-light">
              {CAROUSEL_SLIDES[currentSlide].subtitle}
            </p>

            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 pt-4">
              <button
                onClick={() => onNavClick('Contact')}
                className="bg-[#D43444] text-white px-8 py-4 rounded text-[10px] font-bold tracking-widest uppercase hover:bg-[#b02c38] transition shadow-lg inline-flex items-center justify-center glow-button"
              >
                Book a Consultation
              </button>
              <button
                onClick={() => onNavClick('Services')}
                className="bg-white/10 border border-white/20 text-white hover:bg-white/20 px-8 py-4 rounded text-[10px] font-bold tracking-widest uppercase transition-all"
              >
                Our Practice Specialties
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Credibility Bar ── */}
      <section className={`py-8 border-b ${colors.border} ${colors.bgAlt} transition-colors duration-500`}>
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-center text-center">
            {[
              { label: 'Jurisdictions', value: 'Supreme & High Court WA' },
              { label: 'Legal Precision', value: 'Tactical Military Rigour' },
              { label: 'Accreditation', value: 'Veteran-Owned Business' },
              { label: 'Fee Assurance', value: 'Transparent Fixed Pricing' },
            ].map((item, i) => (
              <div key={i} className={i > 0 ? 'border-l border-gray-200 dark:border-neutral-800' : ''}>
                <p className="text-[9px] uppercase tracking-widest text-[#D43444] font-black">{item.label}</p>
                <p className={`text-[11px] font-semibold mt-1 ${colors.text}`}>{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Intro ── */}
      <section className="py-16 bg-transparent">
        <div className="max-w-3xl mx-auto px-6 text-center space-y-6">
          <span className="text-[10px] tracking-widest text-[#D43444] uppercase font-extrabold bg-red-50 dark:bg-red-900/10 px-3 py-1 rounded-full inline-block">
            Perth's Estate Authority
          </span>
          <h2 className="serif-title text-2xl sm:text-3xl font-extrabold">
            Clear, pragmatic answers for asset preservation.
          </h2>
          <p className={`text-xs sm:text-sm font-light leading-relaxed ${colors.textMuted}`}>
            Crabtree Legal is built around straightforward, professional guidance. Founded by a former
            Australian Defence Force Legal Officer, we replace confusion and opaque billing with clear,
            custom-built estates and corporate succession planning deeds.
          </p>
          <button
            onClick={() => onNavClick('About')}
            className="text-[10px] font-bold text-[#D43444] uppercase tracking-widest inline-flex items-center group hover:underline"
          >
            Learn About the Director{' '}
            <ChevronRight className="w-3 h-3 ml-1 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </section>

      {/* ── Service Cards ── */}
      <section className={`py-16 ${colors.bgAlt} border-y ${colors.border}`}>
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="text-center space-y-3 mb-10">
            <h3 className="serif-title text-xl sm:text-2xl font-bold">Specialized Areas of Focus</h3>
            <p className={`text-xs font-light ${colors.textMuted}`}>
              Clean, highly protective structures designed for Western Australian compliance.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {SERVICES_DATA.map((svc) => (
              <div
                key={svc.id}
                className={`${colors.cardBg} border ${colors.border} p-6 rounded-xl premium-hover-shadow text-left flex flex-col justify-between`}
              >
                <div className="space-y-4">
                  <div className="h-36 w-full rounded-lg overflow-hidden bg-neutral-100">
                    <img src={svc.image} alt={svc.title} className="w-full h-full object-cover" />
                  </div>
                  <h4 className="serif-title text-base font-bold text-neutral-800 dark:text-white">
                    {svc.title}
                  </h4>
                  <p className={`text-[11px] leading-relaxed font-light ${colors.textLight}`}>
                    {svc.subtitle}
                  </p>
                </div>
                <div className={`pt-4 mt-4 border-t border-gray-100 dark:border-neutral-800`}>
                  <button
                    onClick={() => onNavClick('Services')}
                    className="text-[10px] font-bold uppercase tracking-wider text-[#D43444] inline-flex items-center hover:underline"
                  >
                    View Full Services <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQs ── */}
      <section className="py-20 sm:py-24 bg-transparent">
        <div className="max-w-4xl mx-auto px-6 sm:px-8">
          <div className="text-center space-y-3 mb-12">
            <span className="text-[10px] tracking-widest text-[#D43444] uppercase font-extrabold bg-red-50 dark:bg-red-900/10 px-3 py-1 rounded-full inline-block">
              Frequently Asked Questions
            </span>
            <h2 className="serif-title text-2xl sm:text-3xl font-extrabold">
              Professional Estate Insights
            </h2>
            <p className={`text-xs ${colors.textMuted} font-light`}>
              Hover over any option below to instantly expand clear legal definitions.
            </p>
          </div>

          <div className="space-y-4 text-left">
            {FAQS.map((faq, idx) => {
              const isOpen = hoveredFaq === idx;
              return (
                <div
                  key={idx}
                  onMouseEnter={() => setHoveredFaq(idx)}
                  onMouseLeave={() => setHoveredFaq(null)}
                  className={`transition-all duration-300 ${colors.cardBg} border ${
                    isOpen ? 'border-[#D43444] shadow-md' : colors.border
                  } rounded-xl overflow-hidden`}
                >
                  <div className="w-full flex justify-between items-center p-5 cursor-pointer">
                    <span className="serif-title text-xs sm:text-sm font-extrabold pr-4 text-neutral-800 dark:text-neutral-200">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#D43444] flex-shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </div>
                  <div
                    className={`transition-all duration-500 ease-in-out overflow-hidden ${
                      isOpen ? `max-h-[250px] border-t ${colors.border}` : 'max-h-0'
                    }`}
                  >
                    <div className="p-5 text-xs sm:text-sm font-light leading-relaxed text-gray-500 dark:text-gray-400">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}