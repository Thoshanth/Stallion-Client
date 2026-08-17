'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

const GymVideoSection = ({ branchSlug }) => {
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

  // For now, we only show this on Subash Nagar branch based on the mockup.
  if (branchSlug !== 'subash-nagar') {
    return null;
  }

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-[#0B1120] px-4 md:px-6 border-b border-gray-800">
      <div className="container mx-auto max-w-7xl">
        <div
          className={`transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`
          }>
          
          <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-wider text-center text-white mb-12 md:mb-16 font-akira drop-shadow-lg">
            INSIDE OUR GYM
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
            
            {/* Main Video */}
            <div className="lg:col-span-2">
              <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-2xl bg-black border border-gray-800">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/5U7zB1qg9B8" 
                  title="Stallion Xtreme Fitness Pipeline, Kompally"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute top-0 left-0 w-full h-full"
                ></iframe>
              </div>
            </div>

            {/* More Videos Sidebar */}
            <div className="flex flex-col">
              <h3 className="text-xl font-bold text-white mb-6 font-degular">More Videos</h3>
              
              <div className="bg-[#e71b4b] p-2 rounded-xl">
                <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-black cursor-pointer group">
                  <div className="absolute inset-0 z-10 bg-black/20 group-hover:bg-transparent transition-colors duration-300" />
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                    title="Stallion Xtreme fitness Subash Nagar- Gym Tour"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute top-0 left-0 w-full h-full pointer-events-none"
                  ></iframe>
                </div>
                <div className="mt-2 text-white font-degular font-medium text-sm px-2">
                  Stallion Xtreme fitness Subash Nagar- Gym Tour
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default GymVideoSection;
