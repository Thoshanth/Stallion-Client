'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const StallionClassicHero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section ref={heroRef} className="relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero.png" // Placeholder, they probably want a stage shot image
          alt="Stallion Classic Hero"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-black/70 z-10" />
      </div>

      {/* Content */}
      <div className="relative z-20 text-center px-4 w-full max-w-5xl mx-auto mt-16">
        <div
          className={`transition-all duration-1000 transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-akira text-white mb-6 uppercase tracking-wider leading-tight">
            STAGE SHOT WITH SPOTLIGHTS <br className="hidden md:block" /> ON POSEDOWN
          </h1>
          
          <p className="text-lg md:text-2xl text-gray-300 font-degular mb-10 max-w-3xl mx-auto uppercase tracking-wide">
            Pro athletes train here. So should you.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="#contact" className="w-full sm:w-auto px-8 py-4 bg-primary text-black font-akira text-sm md:text-base hover:bg-primary/90 transition-all duration-300 transform hover:scale-105 uppercase tracking-wider text-center">
              Join now
            </Link>
            <a href="https://stallionclassic.com" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto px-8 py-4 bg-transparent border-2 border-primary text-primary font-akira text-sm md:text-base hover:bg-primary/10 transition-all duration-300 uppercase tracking-wider text-center">
              Stallion Classic
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div 
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 z-20 transition-all duration-1000 delay-500 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        <div className="animate-bounce">
          <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default StallionClassicHero;
