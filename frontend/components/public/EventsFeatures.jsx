'use client';

import { useEffect, useRef, useState } from 'react';

const features = [
  {
    title: 'Stronger Community',
    description: "The athlete spotting you today might be your teammate tomorrow.",
    icon: (
      <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    )
  },
  {
    title: 'EXCLUSIVE ACCESS',
    description: "Our partnerships give you access to products and services not available elsewhere.",
    icon: (
      <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    )
  },
  {
    title: 'Learn From Pros',
    description: "Our workshops are 80% drills, 20% lecture. You'll leave with calluses, not just notes.",
    icon: (
      <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    )
  }
];

const EventsFeatures = () => {
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
    <section ref={sectionRef} className="py-16 md:py-24 bg-zinc-950 px-4 md:px-8 border-t border-zinc-900">
      <div className="container mx-auto px-2 md:px-4 max-w-6xl">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`
          }>
          <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-wider mb-4 font-akira text-white">
            Prove Yourself
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-gray-400 font-degular text-lg md:text-xl max-w-2xl mx-auto tracking-wide">
            Trophies don&apos;t go to those who train hardest – they go to those who compete.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`bg-zinc-900/50 p-8 rounded-lg shadow-lg border-b-4 border-primary transition-all duration-1000 hover:-translate-y-2 hover:shadow-primary/10 hover:bg-zinc-900 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`
              }
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="bg-black/50 w-16 h-16 rounded-full flex items-center justify-center mb-6 border border-zinc-800">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold font-akira uppercase tracking-wider mb-4 text-white">
                {feature.title}
              </h3>
              <p className="text-gray-400 font-degular leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventsFeatures;
