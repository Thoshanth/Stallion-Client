'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

const brands = [
  { name: 'LifeSpan', image: '/images/lifespan.PNG' },
  { name: 'TechMocha', image: '/images/techmocha.png' },
  { name: 'CNES', image: '/images/cnes.jpg' },
];

const BrandsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
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

  return (
    <section ref={sectionRef} className="py-10 md:py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div
          className={`transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-wider text-center text-black mb-2 font-akira">
            Powered by the best
          </h2>
          <p className="text-center text-gray-600 mb-8 md:mb-12 text-lg md:text-2xl tracking-wider font-degular">
            We only work with brands that match our extreme standards.
          </p>
        </div>

        {/* Infinite Scroll Animation */}
        <div className="relative overflow-hidden">
          <div className="flex items-center animate-slide-infinite">
            {/* Duplicate brands for seamless loop */}
            {[...brands, ...brands, ...brands].map((brand, index) => (
              <div
                key={`${brand.name}-${index}`}
                className="py-6 md:py-8 flex items-center justify-center min-w-[160px] md:min-w-[200px] w-[240px] md:w-[300px] px-6 md:px-8 flex-shrink-0"
              >
                <div className="relative h-20 md:h-28 w-auto">
                  <Image
                    src={brand.image}
                    alt={brand.name}
                    width={240}
                    height={120}
                    className="h-20 md:h-28 w-auto object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                    quality={85}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slide-infinite {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }

        .animate-slide-infinite {
          animation: slide-infinite 20s linear infinite;
          will-change: transform;
        }

        .animate-slide-infinite:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default BrandsSection;
