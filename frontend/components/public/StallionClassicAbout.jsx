'use client';

import { useEffect, useRef, useState } from 'react';

const StallionClassicAbout = () => {
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
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-zinc-950 px-4 md:px-6 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-primary/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="container mx-auto max-w-5xl relative z-10">
        <div 
          className={`transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          {/* Main About Section */}
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-akira text-white uppercase tracking-wider mb-8">
              ABOUT STALLION CLASSIC
            </h2>
            
            <div className="space-y-6 text-gray-300 font-degular text-base md:text-lg lg:text-xl leading-relaxed max-w-4xl mx-auto text-left">
              <p>
                Stallion Classic is Hyderabad&apos;s premier elite physique competition, where raw discipline meets the spotlight. Founded under the Stallion Xtreme Fitness legacy, this pro-level showdown elevates amateur athletes into champions across Bodybuilding, Fitness Modeling, Figure, and Physique divisions.
              </p>
              <p>
                With judges from the IFBB and national magazines, it&apos;s the only stage in India where conditioning, symmetry, and stage presence are tested under championship lights. Winners don&apos;t just take home trophies&mdash;they earn sponsorships, media features, and a ticket to the pros. Whether you&apos;re sculpted for the camera or built for the platform, Stallion Classic separates the dedicated from the dreamers.
              </p>
            </div>
          </div>

          {/* CTA Box */}
          <div 
            className={`mt-16 bg-black border border-zinc-800 p-8 md:p-12 text-center transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
          >
            <h3 className="text-2xl md:text-3xl font-akira text-white uppercase tracking-wider mb-4">
              &quot;TO ENTER THE STAGE, VISIT STALLION CLASSIC&quot;
            </h3>
            
            <p className="text-gray-400 font-degular text-sm md:text-base leading-relaxed mb-8 max-w-2xl mx-auto">
              Stallion Classic operates on a dedicated platform for competitors. To register, view rules, or see prize details, visit our official competition website. This is where dreams become trophies.
            </p>
            
            <a 
              href="https://stallionclassic.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block bg-primary text-black font-akira text-sm md:text-base px-8 py-4 uppercase tracking-wider hover:bg-primary/90 transition-all duration-300 transform hover:scale-105"
            >
              GO TO STALLION CLASSIC WEBSITE
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StallionClassicAbout;
