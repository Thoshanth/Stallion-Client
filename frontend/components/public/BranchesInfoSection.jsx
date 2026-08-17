'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const branchesData = [
  {
    name: "Stallion Xtreme Fitness - Gajulramaram Branch",
    badge: "CULT Partnered",
    description: "STALLION strength training meets CULT fitness innovation. This CULT-affiliated STALLION gym features specialized functional training zones, cardio theaters, and recovery facilities alongside our signature strength equipment. Get the best of both worlds!",
    location: "Gajulramaram, Hyderabad",
    phone: "+91 8885110136",
    email: "support@stallionxtremefitness.com",
    slug: "gajulramaram",
    image: "/images/branches/ramarambranch.JPG",
    hoverImage: "/images/branches/ramarambranch.JPG"
  },
  {
    name: "Stallion Xtreme Fitness - Chinthal Branch",
    badge: "",
    description: "Where it all began in 2018. Our original STALLION gym featuring no-frills hardcore equipment, championship powerlifting platforms, Atlas stones, and the original 'Wall of Shame' for unracked weights. Pure, raw gym experience for serious lifters.",
    location: "Chintal, Hyderabad",
    phone: "+91 8885110136",
    email: "support@stallionxtremefitness.com",
    slug: "chinthal",
    image: "https://stallionxtremefitness.com/images/branches/idplbranc.JPG",
    hoverImage: "https://stallionxtremefitness.com/images/branches/idplbranc.JPG"
  },
  {
    name: "Stallion Xtreme Fitness - Subash Nagar Branch",
    badge: "CULT Partnered",
    description: "Boutique STALLION gym with CULT affiliation offering a more personalized experience. Combines STALLION's strength-focused equipment with CULT's signature personalized training programs, nutrition counseling, and small group classes for a more intimate fitness journey.",
    location: "Subash Nagar, Hyderabad",
    phone: "+91 8885110136",
    email: "support@stallionxtremefitness.com",
    slug: "subash-nagar",
    image: "https://stallionxtremefitness.com/images/branches/komapllybranch.JPG",
    hoverImage: "https://stallionxtremefitness.com/images/branches/komapllybranch.JPG"
  },
  {
    name: "Stallion Xtreme Fitness - Kondapur Branch",
    badge: "CULT Partnered",
    description: "Tech-forward STALLION gym with CULT affiliation catering to IT professionals. Enjoy our STALLION strength equipment plus CULT-exclusive benefits like 24/7 access, smart workout tracking, and specialized programs designed for desk-bound warriors looking to break free.",
    location: "Kondapur, Hyderabad",
    phone: "+91 8885110136",
    email: "support@stallionxtremefitness.com",
    slug: "kondapur",
    image: "https://stallionxtremefitness.com/images/branches/kondapur.JPG",
    hoverImage: "https://stallionxtremefitness.com/images/branches/kondapur.JPG"
  },
  {
    name: "Stallion Xtreme Fitness - Suchitra Branch",
    badge: "CULT Partnered",
    description: "Our newest STALLION facility with CULT affiliation. Experience the raw power of STALLION equipment plus exclusive CULT benefits including a sprawling CrossFit arena, Olympic lifting platforms, and dedicated combat sports zone for the ultimate fitness warriors.",
    location: "Suchitra, Hyderabad",
    phone: "+91 8885110136",
    email: "support@stallionxtremefitness.com",
    slug: "suchitra",
    image: "https://stallionxtremefitness.com/images/branches/suchitra.JPG",
    hoverImage: "https://stallionxtremefitness.com/images/branches/suchitra.JPG"
  },
  {
    name: "Stallion Xtreme Fitness - Ashok Nagar BHEL Branch",
    badge: "CULT Partnered",
    description: "STALLION gym with CULT affiliation offering premium amenities and specialized programs. As a CULT-affiliated center, members enjoy access to exclusive group fitness classes, yoga studios, and dedicated wellness zones along with traditional STALLION strength training.",
    location: "Ashok Nagar, Hyderabad",
    phone: "+91 8885110136",
    email: "support@stallionxtremefitness.com",
    slug: "ashok-nagar-bhel",
    image: "https://stallionxtremefitness.com/images/branches/bhelnromal.jpg",
    hoverImage: "https://stallionxtremefitness.com/images/branches/bhelnromal.jpg"
  }
];

const BranchesInfoSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.05 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-zinc-950">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div 
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-3xl md:text-5xl font-akira text-white uppercase tracking-wider mb-4">
            YOUR STALLION FORTRESS AWAITS
          </h2>
          <p className="text-gray-400 font-degular text-lg md:text-xl uppercase tracking-wide">
            Locations built for warriors, not weekend gym-goers
          </p>
        </div>

        {/* Branches Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {branchesData.map((branch, index) => (
            <div 
              key={index}
              className={`bg-black border border-zinc-800 rounded-lg overflow-hidden flex flex-col transition-all duration-1000 group ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Image Container */}
              <div className="relative h-64 md:h-80 w-full overflow-hidden">
                <Image
                  src={branch.image}
                  alt={branch.name}
                  fill
                  className={`object-cover transition-all duration-700 ${hoveredIndex === index ? 'scale-110 opacity-0' : 'scale-100 opacity-100'}`}
                  unoptimized={true}
                />
                <Image
                  src={branch.hoverImage}
                  alt={`${branch.name} hover`}
                  fill
                  className={`object-cover transition-all duration-700 absolute inset-0 ${hoveredIndex === index ? 'scale-100 opacity-100' : 'scale-110 opacity-0'}`}
                  unoptimized={true}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
                
                {branch.badge && (
                  <div className="absolute top-4 right-4 bg-primary text-black font-akira text-xs px-3 py-1 uppercase tracking-wider z-10">
                    {branch.badge}
                  </div>
                )}
              </div>

              {/* Content Container */}
              <div className="p-6 md:p-8 flex-grow flex flex-col">
                <h3 className="text-xl md:text-2xl font-akira text-white uppercase tracking-wider mb-4">
                  {branch.name}
                </h3>
                
                <p className="text-gray-400 font-degular text-sm md:text-base leading-relaxed mb-6 flex-grow">
                  {branch.description}
                </p>
                
                <div className="space-y-3 mb-8">
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-gray-300 font-degular text-sm md:text-base">{branch.location}</span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span className="text-gray-300 font-degular text-sm md:text-base">{branch.phone}</span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span className="text-gray-300 font-degular text-sm md:text-base break-all">{branch.email}</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                  <Link 
                    href={`/branches/${branch.slug}`} 
                    className="flex-1 bg-primary text-black font-akira text-xs md:text-sm px-4 py-3 uppercase tracking-wider text-center hover:bg-primary/90 transition-colors"
                  >
                    View Details
                  </Link>
                  <a 
                    href="#contact" 
                    className="flex-1 border border-primary text-primary font-akira text-xs md:text-sm px-4 py-3 uppercase tracking-wider text-center hover:bg-primary/10 transition-colors"
                  >
                    Get Directions
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BranchesInfoSection;
