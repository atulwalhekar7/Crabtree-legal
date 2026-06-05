import React from 'react';
import HeroCarousel from '../Components/HeroCarousel';
import FAQSection from '../components/FAQSection';
import { ArrowRight } from 'lucide-react';
import type { Article, CarouselSlide, FAQ, Service } from '../types';

import { SERVICES_DATA } from '../data/services';

type HomeProps = {
  slides: CarouselSlide[];
  currentSlide: number;
  setCurrentSlide: (idx: number) => void;
  onBook: () => void;
  onGoServices: () => void;
  faqItems: FAQ[];
};

export default function Home({
  slides,
  currentSlide,
  setCurrentSlide,
  onBook,
  onGoServices,
  faqItems,
}: HomeProps) {
  return (
    <div>
      <HeroCarousel
        slides={slides}
        currentSlide={currentSlide}
        onPickSlide={(idx) => setCurrentSlide(idx)}
        onBook={onBook}
        onGoServices={onGoServices}
      />

      {/* Quick Credibility Bar + Specialty Cards + FAQ Section are omitted for now */}
      <FAQSection faqs={faqItems} />

      <span className="hidden">
        <ArrowRight />
      </span>
    </div>
  );
}

