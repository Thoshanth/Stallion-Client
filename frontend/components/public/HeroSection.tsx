'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showPromo, setShowPromo] = useState(true);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-black">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero.png"
          alt="Bodybuilder showing muscular back in gym"
          fill
          className="object-cover object-center opacity-70"
          priority
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
      </div>

      {/* Scroll Anchor */}
      <div id="next-section" className="absolute bottom-0" />

      {/* Content */}
      <div className="container mx-auto px-4 md:px-6 z-20 text-center mt-24 md:mt-0">
        <div
          className={`flex flex-col items-center transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h1 className="font-akira text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold uppercase tracking-wider mb-3 md:mb-4 leading-tight text-white">
            Unleash your inner
            <br />
            stallion
          </h1>

          <p className="text-base sm:text-lg md:text-xl mb-6 md:mb-8 font-degular text-white max-w-md mx-auto">
            Train Like an Athlete, Look Like a Champion
          </p>

          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            <Link
              href="/contact"
              className="bg-primary text-white px-6 py-3 flex items-center hover:bg-primary-600 transition text-sm sm:text-base font-semibold"
            >
              Join now
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
                className="ml-2 h-4 w-4 sm:h-5 sm:w-5"
              >
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </Link>

            <a
              href="#next-section"
              className="border border-white text-white px-6 py-3 flex items-center hover:bg-white/10 transition text-sm sm:text-base font-semibold"
            >
              Explore now
            </a>
          </div>

          {/* Promotional Banner */}
          {showPromo && (
            <div className="mt-12 w-full max-w-md mx-4 bg-white border border-gray-200 rounded-lg shadow-xl relative overflow-hidden animate-fade-in">
              <button
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-all duration-200 z-10"
                onClick={() => setShowPromo(false)}
                aria-label="Close promotion"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>

              <div className="h-1 bg-primary w-full"></div>

              <div className="p-5 pr-10">
                <div className="mb-4">
                  <h3 className="text-gray-900 font-semibold text-lg mb-2">
                    Stallion Xtreme Fitness
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Wanna get fit? then why the Wait? join any one of our premium gyms right now!
                    Have queries about our services? tap the link below to get in touch with us.
                  </p>
                </div>

                <Link
                  href="/contact"
                  className="inline-block bg-primary text-white px-5 py-2.5 rounded-md text-sm font-medium hover:bg-primary-600 transition-colors duration-200 shadow-sm"
                >
                  Contact us
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
        <a href="#next-section" className="text-white opacity-70 hover:opacity-100 transition">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m6 9 6 6 6-6"></path>
          </svg>
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
