'use client';

import { useState } from 'react';

interface FAQItemProps {
  question: string;
  answer: string;
}

export function FAQItem({ question, answer }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-white/5 py-6">
      <button
        className="flex w-full items-center justify-between text-left font-serif text-base md:text-lg tracking-wide"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={`transition-opacity duration-300 ${isOpen ? 'opacity-70' : 'opacity-100'}`}>{question}</span>
        <span className="text-sm ml-4 border border-white/20 w-6 h-6 flex items-center justify-center transition-all duration-300 ease-in-out" 
          style={{ transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)' }}>
          +
        </span>
      </button>
      <div 
        className="overflow-hidden transition-all duration-500 ease-in-out" 
        style={{ 
          maxHeight: isOpen ? '200px' : '0', 
          opacity: isOpen ? 1 : 0,
          marginTop: isOpen ? '12px' : '0'
        }}
      >
        <div className="text-accent/80 text-sm leading-relaxed pl-4 border-l border-white/10">
          <p>{answer}</p>
        </div>
      </div>
    </div>
  );
}

export default function FAQAccordion() {
  const faqs = [
    {
      question: "What is ENO-YEK?",
      answer: "ENO-YEK is an exclusive signal. A matte black magnetic box containing a metal necklace with an embedded NFC chip, a black card, and a sealed welcome note. 1 in 100 necklaces unlock access to our private society."
    },
    {
      question: "Can I resell my access?",
      answer: "Access is tied to the unique NFC identifier embedded in your necklace. Reselling physical items is permitted, but access rights remain at our discretion and may be revoked if terms are violated."
    },
    {
      question: "What happens if I don't get in?",
      answer: "99 out of 100 receive our standard experience package. This includes the physical items and basic access to our community. The 1 in 100 gain elevated status and entry to our private events and inner circle."
    }
  ];

  return (
    <div className="w-full max-w-xl mx-auto">
      <h2 className="font-serif text-xl md:text-2xl mb-10 uppercase tracking-widest text-center opacity-80 font-light">Inquiries</h2>
      <div className="space-y-2">
        {faqs.map((faq, index) => (
          <FAQItem key={index} question={faq.question} answer={faq.answer} />
        ))}
      </div>
    </div>
  );
}
