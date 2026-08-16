'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

const VisionariesSection = () => {
  const [isVisible, setIsVisible] = useState(false);
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

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-black px-4 md:px-8 text-white">
      <div className="container mx-auto px-2 md:px-4">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`
          }>
          <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-wider mb-4 font-akira">
            MEET THE VISIONARIES
          </h2>
          <p className="text-primary text-lg md:text-xl font-degular max-w-2xl mx-auto">
            Driven by Passion, Built on Grit.
          </p>
        </div>

        {/* Visionaries Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
          
          {/* Abhilash */}
          <div
            className={`transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`
            }>
            <div className="relative h-96 w-full mb-6 rounded-lg overflow-hidden border border-gray-800 group">
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
              <Image
                src="/images/hero.png" // Replace with actual image later
                alt="Paravasthu Abhilash"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-60"
              />
              <div className="absolute bottom-6 left-6 z-20">
                <h3 className="text-2xl font-bold font-akira uppercase tracking-wider mb-1">
                  PARAVASTHU ABHILASH
                </h3>
                <p className="text-primary font-degular">The Relentless Visionary</p>
              </div>
            </div>
            <p className="text-gray-300 font-degular leading-relaxed">
              From training clients on the gym floor to building one of India&apos;s fastest-growing fitness empires, Abhilash&apos;s journey is fueled by pure determination. What started as a dream during his days as a gym trainer has now grown into Stallion Xtreme Fitness– a powerhouse with 6 thriving branches, a nationwide fitness movement, and a legacy that inspires thousands. Abhilash didn&apos;t just build a gym — he created a platform for transformation, community, and excellence. His commitment to the grind laid the foundation for what Stallion is today.
            </p>
          </div>

          {/* Suresh */}
          <div
            className={`transition-all duration-1000 delay-400 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`
            }>
            <div className="relative h-96 w-full mb-6 rounded-lg overflow-hidden border border-gray-800 group">
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
              <Image
                src="/images/hero.png" // Replace with actual image later
                alt="Suresh Choudhary"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-60"
              />
              <div className="absolute bottom-6 left-6 z-20">
                <h3 className="text-2xl font-bold font-akira uppercase tracking-wider mb-1">
                  SURESH CHOUDHARY
                </h3>
                <p className="text-primary font-degular">The Backbone of the Brand</p>
              </div>
            </div>
            <p className="text-gray-300 font-degular leading-relaxed">
              Not just an investor — Suresh Choudhary is the driving force behind the rise of Stallion. With unmatched work ethic, business instinct, and a hands-on approach, Suresh has been in the trenches from day one. He&apos;s strategized, hustled, and built shoulder-to-shoulder with Abhilash. Suresh&apos;s leadership, discipline, and vision played an equal role in shaping Stallion Xtreme Fitness into a dominant brand — not just in fitness, but in business culture. He isn&apos;t behind the scenes — he&apos;s in the spotlight, earning every bit of the success.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div
          className={`mt-20 text-center transition-all duration-1000 delay-500 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`
          }>
          <h4 className="text-xl md:text-3xl font-akira uppercase tracking-wider mb-8">
            TWO MEN. ONE OBSESSION. ZERO COMPROMISES.
          </h4>
          <a
            href="/contact"
            className="inline-block bg-primary text-white px-10 py-4 font-semibold uppercase tracking-wider hover:bg-primary-600 transition-colors duration-200"
          >
            JOIN NOW
          </a>
        </div>
      </div>
    </section>
  );
};

export default VisionariesSection;
