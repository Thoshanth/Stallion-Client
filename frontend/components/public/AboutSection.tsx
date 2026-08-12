'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const AboutSection = () => {
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
    <section ref={sectionRef} className="py-16 sm:py-20 bg-gray-100 px-4 md:px-8">
      <div className="container mx-auto px-2 md:px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left Content */}
          <div
            className={`transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="flex flex-col relative">
              {/* Top Accent */}
              <div className="h-[20vh] w-full relative">
                <div className="absolute left-0 bottom-0 w-12 md:w-16 flex space-x-1 md:space-x-2">
                  <div className="bg-primary w-5 md:w-8 h-[20vh]"></div>
                  <div className="bg-primary w-5 md:w-8 h-[20vh]"></div>
                </div>
              </div>

              {/* Content */}
              <div className="w-full">
                <h2 className="text-2xl md:text-4xl font-bold text-black uppercase tracking-wider mb-1 pt-6 md:pt-8 font-akira">
                  More than a gym
                </h2>
                <h3 className="text-2xl md:text-4xl font-bold font-akira uppercase tracking-wider mb-4 md:mb-6 text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary-950">
                  A home for champions
                </h3>

                <p className="text-gray-800 mb-6 md:mb-8 text-base md:text-lg font-degular leading-relaxed md:leading-loose tracking-wide">
                  Founded by <strong>Mr. Abhilash</strong> & <strong>Mr. Suresh</strong>, Stallion
                  Xtreme Fitness began in 2018 as a <strong>9,000 sq ft</strong> battleground in
                  Gajularamaram, no distractions, just raw iron and relentless effort. Today, our
                  six branches host <strong>3,000+</strong> members who share one belief: comfort is
                  the enemy of growth. This isn't a gym chain; it's a sweat-drenched proving ground
                  where national powerlifters, corporate warriors, and future champions train side
                  by side. Every rack, kettlebell, battle rope, and professional equipment is battle
                  tested to deliver one result: transformation. But what truly sets us apart isn't
                  just our <strong>premium comprehensive equipment</strong> selection; it's how
                  we've redefined fitness culture itself, all within the comfort of{' '}
                  <strong>fully air conditioned spaces</strong>.
                </p>
              </div>

              {/* Bottom Accent */}
              <div className="h-[20vh] w-full relative">
                <div className="absolute left-0 top-0 w-12 md:w-16 flex space-x-1 md:space-x-2">
                  <div className="bg-secondary-950 w-5 md:w-8 h-[20vh]"></div>
                  <div className="bg-secondary-950 w-5 md:w-8 h-[20vh]"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div
            className={`transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="relative py-6">
              <div className="flex justify-end mb-4">
                <Link
                  href="/about"
                  className="bg-primary text-white px-6 md:px-8 py-2 flex items-center hover:bg-primary-600 transition text-sm md:text-base font-semibold"
                >
                  Know More
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="ml-2 h-4 md:h-5 w-4 md:w-5"
                  >
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                  </svg>
                </Link>
              </div>

              <div className="relative h-[350px] md:h-[600px] w-full">
                <Image
                  src="/images/two.png"
                  alt="Fitness training collage"
                  fill
                  className="object-contain"
                  quality={90}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
