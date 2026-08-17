'use client';

import { useState } from 'react';
import Navbar from '@/components/public/Navbar';
import Footer from '@/components/public/Footer';
import { ChevronDown } from 'lucide-react';

// This will be replaced with API call later
const defaultFAQs = [
  {
    id: 1,
    question: "What are your gym timings?",
    answer: "Our gyms are open from 5:00 AM to 11:00 PM, Monday through Sunday. Some locations may have extended hours."
  },
  {
    id: 2,
    question: "Do you offer personal training sessions?",
    answer: "Yes, we offer personalized one-on-one training sessions with our certified trainers. Contact us to book your session."
  },
  {
    id: 3,
    question: "What safety protocols do you follow?",
    answer: "We maintain strict hygiene standards, regular equipment sanitization, and follow all health guidelines to ensure your safety."
  },
  {
    id: 4,
    question: "Can I freeze my membership?",
    answer: "Yes, you can freeze your membership for medical reasons or extended travel. Terms and conditions apply."
  },
  {
    id: 5,
    question: "Do you have nutritionist consultations?",
    answer: "We provide nutrition guidance and can connect you with certified nutritionists for comprehensive wellness support."
  }
];

export default function FAQPage() {
  const [openFAQ, setOpenFAQ] = useState(null);
  
  const toggleFAQ = (id) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  return (
    <main className="min-h-screen">
      <Navbar />
      
      <section className="pt-20 bg-[#262626] text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 font-akira tracking-wider uppercase">
              FAQ
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto font-degular">
              Find answers to commonly asked questions about our services, memberships, and facilities.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-4">
              {defaultFAQs.map((faq) => (
                <div 
                  key={faq.id} 
                  className="bg-gradient-to-br from-black/40 to-black/20 rounded-lg border border-gray-700/50 overflow-hidden"
                >
                  <button
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-black/20 transition-all duration-300"
                    onClick={() => toggleFAQ(faq.id)}
                  >
                    <span className="text-lg font-semibold text-white font-degular pr-4">
                      {faq.question}
                    </span>
                    <ChevronDown 
                      className={`w-5 h-5 text-primary transition-transform duration-300 flex-shrink-0 ${
                        openFAQ === faq.id ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  
                  {openFAQ === faq.id && (
                    <div className="px-6 pb-4 border-t border-gray-700/50 bg-black/10">
                      <div className="pt-4">
                        <p className="text-gray-300 font-modernist leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="text-center mt-16">
              <h3 className="text-2xl font-bold mb-4 font-akira text-white">
                STILL HAVE QUESTIONS?
              </h3>
              <p className="text-gray-400 mb-6 font-degular">
                Can't find what you're looking for? Get in touch with our team.
              </p>
              <a 
                href="/contact" 
                className="bg-primary hover:bg-primary/80 text-white px-8 py-3 font-semibold transition-all duration-300 inline-block font-modernist"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
}