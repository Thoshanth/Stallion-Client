'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

const EventsHero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background Image / Video */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/70 z-10"></div>
        {/* We can use a placeholder image here */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/hero.png')" }}
        ></div>
      </div>

      <div className="container mx-auto px-4 relative z-20 pt-20">
        <div className="max-w-4xl mx-auto text-center">
          <div
            className={`transition-all duration-1000 transform ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase text-white tracking-widest font-akira mb-6">
              SWEAT ALONGSIDE <br className="hidden md:block" /> THE ELITE
            </h1>
            
            <p className="text-lg md:text-2xl text-gray-300 font-degular mb-10 max-w-2xl mx-auto">
              Events that push physical limits and forge mental warriors
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link 
                href="/events#join"
                className="w-full sm:w-auto bg-primary text-white px-10 py-4 font-bold uppercase tracking-wider hover:bg-primary-600 transition-all duration-300 hover:scale-105"
              >
                Join now
              </Link>
              <Link 
                href="/branches"
                className="w-full sm:w-auto border-2 border-white text-white px-10 py-4 font-bold uppercase tracking-wider hover:bg-white hover:text-black transition-all duration-300 hover:scale-105"
              >
                Explore Branches
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventsHero;
