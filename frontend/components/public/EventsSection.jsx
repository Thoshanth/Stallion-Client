'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const EventCard = ({ event, isVisible, index, isCompleted }) => (
  <div
    className={`bg-gray-900 rounded-lg overflow-hidden transition-all duration-1000 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/20 ${
    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`
    }
    style={{ transitionDelay: `${index * 100}ms` }}>
    
    <div className="relative h-64 w-full">
      <Image
        src={event.coverImage || '/images/hero.png'}
        alt={event.title || 'Event image'}
        fill
        className={`object-cover ${isCompleted ? 'grayscale opacity-70' : ''}`}
      />
      <div className={`absolute top-4 right-4 text-white px-3 py-1 text-sm font-bold font-degular rounded ${isCompleted ? 'bg-gray-600' : 'bg-primary'}`}>
        {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
      </div>
      {isCompleted && (
        <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 text-sm font-bold font-degular rounded uppercase tracking-wider">
          Completed
        </div>
      )}
    </div>
    
    <div className="p-6">
      <h3 className={`text-xl font-bold mb-2 font-akira uppercase tracking-wider truncate ${isCompleted ? 'text-gray-400' : 'text-white'}`}>
        {event.title}
      </h3>
      <div className="flex items-center text-gray-400 text-sm mb-4 font-degular">
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        {event.startTime} - {event.endTime}
      </div>
      {event.branch && (
        <div className="flex items-center text-gray-400 text-sm mb-4 font-degular">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {event.branch.name}
        </div>
      )}
      <p className="text-gray-300 font-degular text-sm mb-6 line-clamp-3">
        {event.description}
      </p>
      <Link
        href={`/events/${event.slug}`}
        className={`inline-block border px-6 py-2 transition text-sm font-semibold uppercase tracking-wider ${
          isCompleted 
            ? 'border-gray-500 text-gray-400 hover:bg-gray-800 hover:text-white' 
            : 'border-primary text-primary hover:bg-primary hover:text-white'
        }`}>
        View Details
      </Link>
    </div>
  </div>
);

const EventsSection = ({ events = [] }) => {
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

  const now = new Date();
  
  const isEventCompleted = (e) => {
    const eventDate = new Date(e.date);
    if (e.endTime) {
      const [hours, minutes] = e.endTime.split(':');
      eventDate.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0, 0);
    } else if (e.startTime) {
      const [hours, minutes] = e.startTime.split(':');
      eventDate.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0, 0);
    } else {
      eventDate.setHours(23, 59, 59, 999);
    }
    return eventDate <= now;
  };

  const upcomingEvents = events.filter(e => !isEventCompleted(e));
  const completedEvents = events.filter(e => isEventCompleted(e));

  return (
    <section ref={sectionRef} className="py-16 md:py-20 bg-black px-4 md:px-6">
      <div className="container mx-auto px-2 md:px-4">
        
        {/* Header */}
        <div
          className={`transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`
          }>
          <h2 className="text-2xl md:text-4xl font-bold uppercase tracking-wider text-center text-white mb-3 font-akira">
            Events
          </h2>
          <p className="text-center text-gray-300 mb-10 md:mb-16 max-w-2xl mx-auto font-degular text-base md:text-lg tracking-wider">
            Join our community challenges, workshops, and exclusive fitness events.
          </p>
        </div>

        {events.length === 0 ? (
          <div className="text-center text-gray-400 font-degular">
            No events at the moment. Check back soon!
          </div>
        ) : (
          <div className="space-y-16">
            {/* Upcoming Events Section */}
            {upcomingEvents.length > 0 && (
              <div>
                <h3 className="text-xl md:text-2xl font-bold uppercase tracking-wider text-primary mb-8 font-akira border-b border-gray-800 pb-4">
                  Upcoming Events
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {upcomingEvents.map((event, index) => (
                    <EventCard 
                      key={event._id} 
                      event={event} 
                      isVisible={isVisible} 
                      index={index} 
                      isCompleted={false} 
                    />
                  ))}
                </div>
              </div>
            )}
            
            {/* Completed Events Section */}
            {completedEvents.length > 0 && (
              <div>
                <h3 className="text-xl md:text-2xl font-bold uppercase tracking-wider text-gray-500 mb-8 font-akira border-b border-gray-800 pb-4">
                  Completed Events
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {completedEvents.map((event, index) => (
                    <EventCard 
                      key={event._id} 
                      event={event} 
                      isVisible={isVisible} 
                      index={index} 
                      isCompleted={true} 
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default EventsSection;
