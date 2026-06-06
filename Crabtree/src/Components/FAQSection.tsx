
import type { Faq } from '../hooks/types';


import FaqItem from '../Components/FaqItem';

type FAQSectionProps = {
  faqs: Faq[];
};

export default function FAQSection({ faqs }: FAQSectionProps) {
  return (
    <section className="py-20 sm:py-24 bg-transparent">
      <div className="max-w-4xl mx-auto px-6 sm:px-8">
        <div className="text-center space-y-3 mb-12">
          <span className="text-[10px] tracking-widest text-[#D43444] uppercase font-extrabold bg-red-50 dark:bg-red-900/10 px-3 py-1 rounded-full inline-block">
            Frequently Asked Questions
          </span>
          <h2 className="serif-title text-2xl sm:text-3xl font-extrabold">Professional Estate Insights</h2>
          <p className="text-xs text-gray-500 font-light">
            Hover over any option below to instantly expand clear legal definitions.
          </p>
        </div>

        <div className="space-y-4 text-left">
          {faqs.map((faq, idx) => (
            <FaqItem key={idx} faq={faq} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}

