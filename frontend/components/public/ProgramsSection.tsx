'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

const programs = [
  {
    name: 'Stallion Strength',
    description:
      'Build raw power with Olympic lifts, deadlifts, and our signature strength protocols',
    image: '/images/strength.png',
  },
  {
    name: 'HIIT Inferno',
    description:
      'Torch fat in 30 mins with battle ropes, sled pushes, and metabolic conditioning',
    image: '/images/inferno.png',
  },
  {
    name: 'Functional Warrior',
    description: 'Train like an athlete—agility drills, sandbag work, and real-world mobility',
    image: '/images/warrior.png',
  },
  {
    name: 'Boxing Conditioning',
    description:
      'Combines heavy bag work, footwork drills, and fight-ready endurance training',
    image: '/images/boxing.png',
  },
  {
    name: 'Mobility Mastery',
    description:
      'Recover smarter with guided stretching, yoga flows, and injury prevention',
    image: '/images/mobility.png',
  },
  {
    name: 'Elite 1:1 Coaching',
    description: 'Fully customized plans with your dedicated trainer (nutrition included)',
    image: '/images/coaching.png',
  },
];

const ProgramsSection = () => {
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
    <section
      ref={sectionRef}
      className="py-16 md:py-20 bg-[#262626] px-4 md:px-6 pb-20 md:pb-30"
    >
      <div className="container mx-auto px-2 md:px-4">
        {/* Header */}
        <div
          className={`transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-2xl md:text-4xl font-bold uppercase tracking-wider text-center text-white mb-3 font-akira">
            Your transformation starts here
          </h2>
          <p className="text-center text-gray-300 mb-10 md:mb-16 max-w-2xl mx-auto font-degular text-base md:text-lg tracking-wider">
            Tailored programs for every fitness level—from first-timers to elite athletes.
          </p>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {programs.map((program, index) => (
            <div
              key={program.name}
              className={`transition-all duration-1000 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="relative overflow-hidden group aspect-[418/532] cursor-pointer">
                <Image
                  src={program.image}
                  alt={program.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  quality={85}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>

                <div className="absolute bottom-0 left-0 p-4 md:p-6 w-full transform transition-transform duration-300 group-hover:translate-y-0">
                  <h3 className="text-lg md:text-xl font-bold uppercase tracking-wider text-center text-white mb-2 font-akira">
                    {program.name}
                  </h3>
                  <p className="text-gray-200 text-sm md:text-base tracking-wider font-degular opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {program.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProgramsSection;
