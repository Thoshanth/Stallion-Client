'use client';

import { useEffect, useRef, useState } from 'react';

const AboutStory = () => {
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
    <section ref={sectionRef} className="py-20 md:py-32 bg-gray-100 px-4 md:px-8">
      <div className="container mx-auto px-2 md:px-4 max-w-5xl">
        <div
          className={`transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`
          }
        >
          <div className="bg-white p-8 md:p-16 rounded-2xl shadow-xl relative text-center">
            {/* Top Accent */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-2 bg-primary rounded-b-md"></div>
            
            <p className="text-gray-800 mb-8 text-lg md:text-2xl font-degular leading-relaxed md:leading-loose tracking-wide">
              Founded by <strong>Mr. Abhilash</strong> and <strong>Mr. Suresh</strong>, Stallion Xtreme Fitness began in 2018 as a 9,000 sq ft battleground in Gajularamaram — built on raw iron and relentless effort. Today, our six branches host 3,000+ members who share one belief: comfort is the enemy of growth.
            </p>
            <p className="text-gray-800 text-lg md:text-2xl font-degular leading-relaxed md:leading-loose tracking-wide">
              This isn&apos;t a gym chain; it&apos;s a sweat-drenched proving ground where national powerlifters, corporate warriors, and future champions train side-by-side. Every rack, kettlebell, and battle rope is battle-tested to deliver one result: transformation. But what truly sets us apart isn&apos;t our premium equipment — it&apos;s how we&apos;ve redefined fitness culture itself.
            </p>

            {/* Bottom Accent */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-2 bg-secondary-950 rounded-t-md"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutStory;
