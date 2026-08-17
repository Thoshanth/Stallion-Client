'use client';

import { useEffect, useRef, useState } from 'react';

const FAQSection = ({ faqs = [] }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [openIndex, setOpenIndex] = useState(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const defaultFaqs = [
    { question: "I'm a beginner. Will I get crushed here?", answer: "Everyone starts somewhere. Our coaches scale workouts - but expect to be pushed harder than you'd push yourself." },
    { question: "I'm intimidated by serious lifters - will I fit in here?", answer: "Our community is built on respect. The most serious lifters are often the most supportive. You'll fit right in if you're willing to work hard." },
    { question: "Can I still get results if I can only train 2x/week?", answer: "Absolutely. Consistency is more important than frequency. We'll design a program that maximizes your time in the gym." },
    { question: "Is the nutrition guidance just another cookie-cutter meal plan?", answer: "No. We provide personalized nutrition coaching based on your lifestyle, preferences, and specific goals." },
    { question: "What makes your trainers worth higher rates?", answer: "Our trainers are certified experts with years of experience. We invest in continuous education to ensure you get the best possible guidance." }
  ];

  const displayFaqs = faqs && faqs.length > 0 ? faqs : defaultFaqs;

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-[#f4f4f4] px-4 md:px-6">
      <div className="container mx-auto px-2 md:px-4 max-w-4xl">
        {/* Header */}
        <div
          className={`transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`
          }>
          
          <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-wider text-center text-black mb-2 font-akira">
            FAQ'S
          </h2>
          <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-wider text-center text-black mb-6 font-akira">
            ANY QUESTION? WE GOT YOU.
          </h2>
          <p className="text-center text-gray-600 mb-12 md:mb-16 max-w-3xl mx-auto font-medium text-base md:text-lg">
            No fluff. No jargon. Just straight facts about our gym memberships, and training philosophy. If you're serious about results, start here.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-0 border-t border-[#e71b4b]/30">
          {displayFaqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`transition-all duration-1000 border-b border-[#e71b4b]/30 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="relative">
                  {/* Red left border for active state */}
                  {isOpen && (
                    <div className="absolute left-0 top-4 bottom-4 w-0.5 bg-[#e71b4b]" />
                  )}
                  
                  <button
                    className={`w-full px-4 md:px-6 py-6 text-left flex justify-between items-center hover:bg-black/5 focus:outline-none transition-colors duration-200 ${
                      isOpen ? 'pl-6 md:pl-8' : ''
                    }`}
                    onClick={() => toggleFAQ(index)}
                  >
                    <span className="font-medium text-black pr-4 text-base md:text-lg">
                      {faq.question}
                    </span>
                    <span className="text-[#e71b4b] text-2xl font-light flex-shrink-0">
                      {isOpen ? '—' : '+'}
                    </span>
                  </button>
                  
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="px-6 md:px-8 pb-6 text-gray-700 font-medium leading-relaxed">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;