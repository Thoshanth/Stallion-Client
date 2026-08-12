'use client';

import { useEffect, useRef, useState } from 'react';

const faqs = [
  {
    question: 'What are the gym timings?',
    answer: 'Our gyms are open from 6:00 AM to 10:00 PM, 7 days a week. Some branches may have extended hours.',
  },
  {
    question: 'Do I need to bring my own equipment?',
    answer: 'No, we provide all the equipment you need including towels, mats, and professional-grade fitness equipment. Just bring your water bottle and workout attire.',
  },
  {
    question: 'Are personal trainers available?',
    answer: 'Yes, we have certified personal trainers available at all branches. You can book sessions as part of your membership or pay per session.',
  },
  {
    question: 'Can I freeze my membership?',
    answer: 'Yes, you can freeze your membership for up to 3 months per year for medical reasons or extended travel with proper documentation.',
  },
  {
    question: 'Do you offer trial sessions?',
    answer: 'Absolutely! We offer complimentary trial sessions for first-time visitors. Contact us to schedule your trial.',
  },
  {
    question: 'What safety measures do you have in place?',
    answer: 'We maintain strict safety protocols including regular equipment sanitization, proper ventilation, emergency procedures, and trained staff on-site.',
  },
];

const FAQSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

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

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section ref={sectionRef} className="py-16 md:py-20 bg-gray-100 px-4 md:px-6">
      <div className="container mx-auto px-2 md:px-4 max-w-4xl">
        {/* Header */}
        <div
          className={`transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-2xl md:text-4xl font-bold uppercase tracking-wider text-center text-black mb-3 font-akira">
            Frequently Asked Questions
          </h2>
          <p className="text-center text-gray-600 mb-10 md:mb-16 max-w-2xl mx-auto font-degular text-base md:text-lg tracking-wider">
            Got questions? We've got answers.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <button
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition-colors duration-200"
                  onClick={() => toggleFAQ(index)}
                >
                  <span className="font-semibold text-gray-900 font-degular pr-4">
                    {faq.question}
                  </span>
                  <svg
                    className={`w-5 h-5 text-gray-500 transform transition-transform duration-200 flex-shrink-0 ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-6 pb-4">
                    <p className="text-gray-700 font-degular leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;