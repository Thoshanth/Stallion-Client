'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

interface PricingPlan {
  name: string;
  popular?: boolean;
  features: string[];
}

const PricingSection = ({ pricingPlans }: { pricingPlans: PricingPlan[] }) => {
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
    <section ref={sectionRef} className="py-16 md:py-20 bg-black px-4 md:px-6">
      <div className="container mx-auto px-2 md:px-4">
        {/* Header */}
        <div
          className={`transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-2xl md:text-4xl font-bold uppercase tracking-wider text-center text-white mb-3 font-akira">
            Invest in your strongest self
          </h2>
          <p className="text-center text-gray-300 mb-10 md:mb-16 max-w-2xl mx-auto font-degular text-base md:text-lg tracking-wider">
            No hidden fees. Cancel anytime. Results guaranteed.
          </p>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {pricingPlans.map((plan, index) => (
            <div
              key={plan.name}
              className={`transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div
                className={`relative bg-white rounded-lg p-6 md:p-8 h-full flex flex-col ${
                  plan.popular
                    ? 'ring-2 ring-primary transform scale-105'
                    : 'hover:shadow-xl transition-shadow duration-300'
                }`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-primary text-white px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}

                {/* Plan Name */}
                <h3 className="text-xl md:text-2xl font-bold text-center text-gray-900 mb-6 font-akira uppercase tracking-wider">
                  {plan.name}
                </h3>

                {/* Features */}
                <div className="flex-1 mb-8">
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <svg
                          className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-gray-700 font-degular">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button */}
                <Link
                  href="/contact"
                  className={`block text-center px-6 py-3 font-semibold rounded-md transition-colors duration-200 ${
                    plan.popular
                      ? 'bg-primary text-white hover:bg-primary-600'
                      : 'bg-gray-900 text-white hover:bg-gray-800'
                  }`}
                >
                  Join Now
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;