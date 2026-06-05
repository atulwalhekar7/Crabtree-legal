export type Theme = 'light' | 'dark';

export type NavTab = 'Home' | 'About' | 'Services' | 'News & Articles' | 'Contact';

export interface CarouselSlide {
  title: string;
  subtitle: string;
  image: string;
  accent: string;
}

export interface Service {
  id: string;
  category: string;
  title: string;
  subtitle: string;
  image: string;
  points: string[];
}

export interface Article {
  id: number;
  date: string;
  author: string;
  title: string;
  summary: string;
  category: string;
  content: string;
}

export interface Faq {
  question: string;
  answer: string;
}

export interface ContactForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  referral: string;
  message: string;
}

export interface ColorTokens {
  bg: string;
  bgAlt: string;
  text: string;
  textMuted: string;
  textLight: string;
  border: string;
  cardBg: string;
  navBg: string;
}