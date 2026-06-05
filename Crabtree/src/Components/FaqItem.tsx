import React from 'react';
import type { Faq } from '../hooks/types';
import { ChevronDown } from 'lucide-react';

type Props = {
  faq: Faq;
  index: number;
};

export default function FaqItem({ faq, index }: Props) {
  const [open, setOpen] = React.useState(false);

  return (
    <div
      className={`transition-all duration-300 ${
        open ? 'border-[#D43444] shadow-md' : 'border-transparent'
      } rounded-xl overflow-hidden border bg-transparent`}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <div
        className="w-full flex justify-between items-center p-5 cursor-pointer"
        onClick={() => setOpen((v) => !v)}
      >
        <span className="serif-title text-xs sm:text-sm font-extrabold pr-4 text-neutral-800 dark:text-neutral-200">
          {faq.question}
        </span>
        <span className="text-[#D43444] flex-shrink-0 transition-transform duration-300">
          <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
        </span>
      </div>

      <div className={`transition-all duration-500 ease-in-out overflow-hidden ${open ? 'max-h-[250px]' : 'max-h-0'}`}>
        <div className="p-5 text-xs sm:text-sm font-light leading-relaxed text-gray-500 dark:text-gray-400">
          {faq.answer}
        </div>
      </div>
    </div>
  );
}

