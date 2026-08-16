'use client';

import { useEffect, useRef, useState } from 'react';

const reasons = [
  {
    title: 'CERTIFIED TRAINERS WHO ACTUALLY TRAIN',
    description: "Our coaches sweat beside you. Every trainer completes 500 hours of in-gym apprenticeship before leading sessions. They'll spot your deadlift at 6AM and celebrate your PR at midnight.",
  },
  {
    title: 'ADVANCED EQUIPMENT THAT PUSHES BACK',
    description: "Olympic Eleiko bars. Competition-grade racks. Sleds with real tires – not plastic imitations. We invest in tools that force adaptation, not just movement.",
  },
  {
    title: 'POST-WORKOUT RECOVERY SANCTUARY',
    description: "Our steam baths aren't spas - they're strategic tools. Lowers injury risk by 22%. Boosts next-day performance. Included in all memberships.",
  },
  {
    title: 'GOAL-BLUE PRINTED PROGRAMS',
    description: "Whether it's 10kg fat loss or a 150kg squat, our 8-phase system tracks Progressive overload, Recovery quality, Nutrition compliance.",
  },
  {
    title: 'POWERLIFTING MEETS FUNCTIONAL TRAINING',
    description: "Our training zone is where classic powerlifting collides with brutal, functional movement. From heavy compound lifts to explosive full-body circuits, we train you to dominate inside the gym.",
  },
  {
    title: 'GROUP CLASSES THAT DELIVER RESULTS',
    description: "Our group classes blend energy, community, and expert coaching to keep you motivated and moving. From fat-burning Zumba to strength-building HIIT and mind-centering yoga.",
  },
];

const WhyChooseUsSection = () => {
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
    <section ref={sectionRef} className="py-16 md:py-24 bg-gray-100 px-4 md:px-8">
      <div className="container mx-auto px-2 md:px-4">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`
          }>
          <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-wider mb-4 font-akira">
            WHY CHOOSE US
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
        </div>

        {/* Reasons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className={`bg-white p-8 rounded-lg shadow-lg border-b-4 border-primary transition-all duration-1000 hover:-translate-y-2 hover:shadow-xl ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`
              }
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <h3 className="text-xl font-bold font-akira uppercase tracking-wider mb-4 text-black">
                {reason.title}
              </h3>
              <p className="text-gray-600 font-degular leading-relaxed">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
