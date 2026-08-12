'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const branches = [
  {
    name: 'GajulRamaram',
    image: '/images/ramaramherosection.JPG',
    hoverImage: '/images/ramaramhover.JPG',
    slug: 'gajulramaram',
  },
  {
    name: 'IDPL',
    image: '/images/idplherosec.JPG',
    hoverImage: '/images/chinthalhover.JPG',
    slug: 'idpl',
  },
  {
    name: 'Kompally',
    image: '/images/kompallyherosec.JPG',
    hoverImage: '/images/subashhover.JPG',
    slug: 'kompally',
  },
  {
    name: 'Kondapur',
    image: '/images/kondapurhero.JPG',
    hoverImage: '/images/kondapurhover.JPG',
    slug: 'kondapur',
  },
  {
    name: 'Suchitra',
    image: '/images/suchitrahero.JPG',
    hoverImage: '/images/suchitrahover.JPG',
    slug: 'suchitra',
  },
  {
    name: 'Ashok Nagar Bhel',
    image: '/images/bhelhover.jpg',
    hoverImage: '/images/bhelcover.jpg',
    slug: 'ashok-nagar-bhel',
  },
];

const BranchesSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
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
            Find your stallion home
          </h2>
          <p className="text-center text-gray-300 mb-10 md:mb-16 max-w-2xl mx-auto font-degular text-base md:text-lg tracking-wider">
            Six top-tier facilities across the city – same uncompromising standards.
          </p>
        </div>

        {/* Branches Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {branches.map((branch, index) => (
            <div
              key={branch.name}
              className={`transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <Link href={`/branches/${branch.slug}`}>
                <div
                  className="relative overflow-hidden group aspect-[4/3] cursor-pointer"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {/* Base Image */}
                  <Image
                    src={branch.image}
                    alt={branch.name}
                    fill
                    className={`object-cover transition-opacity duration-500 ${
                      hoveredIndex === index ? 'opacity-0' : 'opacity-100'
                    }`}
                    quality={85}
                  />

                  {/* Hover Image */}
                  <Image
                    src={branch.hoverImage}
                    alt={`${branch.name} hover`}
                    fill
                    className={`object-cover transition-opacity duration-500 absolute inset-0 ${
                      hoveredIndex === index ? 'opacity-100' : 'opacity-0'
                    }`}
                    quality={85}
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 text-center">
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2 font-akira uppercase tracking-wider">
                      {branch.name}
                    </h3>
                    <p className="text-gray-200 text-sm md:text-base font-degular">
                      Stallion Xtreme Fitness, {branch.name} Branch
                    </p>
                    <div className="mt-3 inline-flex items-center text-primary font-semibold text-sm md:text-base group-hover:translate-x-2 transition-transform duration-300">
                      Know More
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="ml-1"
                      >
                        <path d="M5 12h14"></path>
                        <path d="m12 5 7 7-7 7"></path>
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BranchesSection;
