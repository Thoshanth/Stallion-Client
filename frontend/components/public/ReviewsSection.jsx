'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';









const ReviewsSection = ({ reviews }) => {
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
    <section ref={sectionRef} className="py-16 md:py-20 bg-gray-100 px-4 md:px-6">
      <div className="container mx-auto px-2 md:px-4">
        {/* Header */}
        <div
          className={`transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`
          }>
          
          <h2 className="text-2xl md:text-4xl font-bold uppercase tracking-wider text-center text-black mb-3 font-akira">
            Hear from the Stallion herd
          </h2>
          <p className="text-center text-gray-600 mb-10 md:mb-16 max-w-2xl mx-auto font-degular text-base md:text-lg tracking-wider">
            Real transformations from real members.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {reviews.map((review, index) =>
          <div
            key={review._id || index}
            className={`transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`
            }
            style={{ transitionDelay: `${index * 200}ms` }}>
            
              <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                {/* Stars */}
                <div className="flex mb-4">
                  {[...Array(review.rating)].map((_, i) =>
                <svg
                  key={i}
                  className="w-5 h-5 text-primary"
                  fill="currentColor"
                  viewBox="0 0 20 20">
                  
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                )}
                </div>

                {/* Review Text */}
                <p className="text-gray-700 mb-6 font-degular text-base leading-relaxed">
                  &quot;{review.reviewText}&quot;
                </p>

                {/* Author */}
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4 bg-gray-200">
                    {review.avatar &&
                  <Image
                    src={review.avatar}
                    alt={review.name}
                    width={64}
                    height={64}
                    className="w-full h-full object-cover" />

                  }
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 font-akira">-{review.name}</p>
                    <p className="text-sm text-gray-600 font-degular">{review.designation}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>);

};

export default ReviewsSection;