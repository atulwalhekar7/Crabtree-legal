import React from 'react';
import HeroCarousel from '../Components/HeroCarousel';
import FAQSection from '../Components/FAQSection';


import { ArrowRight } from 'lucide-react';
import type { CarouselSlide, Faq } from '../hooks/types';



// NOTE: HeroCarousel currently manages its own carousel state (it does not accept props like slides/currentSlide).
type HomeProps = {
  faqItems: Faq[];
};

export default function Home({
  faqItems,
}: HomeProps) {
  return (
    <div>
      <HeroCarousel
        colors={{
          border: '#e5e7eb',
          bgAlt: 'transparent',
          text: '#111827',
          textMuted: '#6b7280',
          textLight: '#374151',
          cardBg: 'rgba(255,255,255,0.06)',
        }}
        onNavClick={() => {}}
      />


      {/* Quick Credibility Bar + Specialty Cards + FAQ Section are omitted for now */}
      <FAQSection faqs={faqItems} />

      <span className="hidden">
        <ArrowRight />
      </span>
    </div>
  );
}

 