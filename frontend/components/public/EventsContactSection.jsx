'use client';

import { useEffect, useRef, useState } from 'react';

const EventsContactSection = ({ branches = [] }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ loading: false, success: false, error: null });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    branch: '',
    subject: '',
    message: ''
  });
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus({ loading: true, success: false, error: null });

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1'}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to send message');
      }

      setSubmitStatus({ loading: false, success: true, error: null });
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        branch: '',
        subject: '',
        message: ''
      });

      // Clear success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus(prev => ({ ...prev, success: false }));
      }, 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus({ loading: false, success: false, error: error.message });
    }
  };

  return (
    <section ref={sectionRef} className="py-16 md:py-20 bg-black px-4 md:px-6">
      <div className="container mx-auto px-2 md:px-4 max-w-6xl">
        {/* Header */}
        <div
          className={`transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`
          }>
          
          <h2 className="text-2xl md:text-4xl font-bold uppercase tracking-wider text-center text-white mb-3 font-akira">
            GOT QUESTIONS WE&apos;VE GOT ANSWERS.
          </h2>
          <p className="text-center text-gray-300 mb-10 md:mb-16 max-w-2xl mx-auto font-degular text-base md:text-lg tracking-wider">
            Fill out the form, and our team will hit you back within 24 hours.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {/* Contact Form */}
          <div
            className={`transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`
            }>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-white font-degular mb-2">
                    FULL NAME
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-primary transition-colors duration-200"
                    placeholder="Enter your full name" />
                </div>

                <div>
                  <label htmlFor="email" className="block text-white font-degular mb-2">
                    EMAIL
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-primary transition-colors duration-200"
                    placeholder="Enter your email" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-white font-degular mb-2">
                    PHONE NO.
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-primary transition-colors duration-200"
                    placeholder="Enter your phone number" />
                </div>

                <div>
                  <label htmlFor="branch" className="block text-white font-degular mb-2">
                    SELECT BRANCH
                  </label>
                  <select
                    id="branch"
                    name="branch"
                    value={formData.branch}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-md text-white focus:outline-none focus:border-primary transition-colors duration-200">
                    
                    <option value="">Select your preferred branch</option>
                    {branches.map((b) => (
                      <option key={b._id} value={b.name}>
                        {b.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-white font-degular mb-2">
                  SUBJECT
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-md text-white focus:outline-none focus:border-primary transition-colors duration-200">
                  
                  <option value="">Select a subject</option>
                  <option value="Event Inquiry">Event Inquiry</option>
                  <option value="Sponsorship">Sponsorship</option>
                  <option value="Volunteering">Volunteering</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-white font-degular mb-2">
                  MESSAGE
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-primary transition-colors duration-200 resize-vertical"
                  placeholder="Your message...">
                </textarea>
              </div>

              {submitStatus.success && (
                <div className="p-4 bg-green-500/20 border border-green-500 rounded-md text-green-400 font-degular">
                  Message sent successfully! We&apos;ll get back to you soon.
                </div>
              )}
              
              {submitStatus.error && (
                <div className="p-4 bg-red-500/20 border border-red-500 rounded-md text-red-400 font-degular">
                  {submitStatus.error}
                </div>
              )}

              <button
                type="submit"
                disabled={submitStatus.loading}
                className="w-full bg-primary text-white px-8 py-4 font-semibold rounded-md hover:bg-primary-600 transition-colors duration-200 font-degular disabled:opacity-70">
                
                {submitStatus.loading ? 'SENDING...' : 'SUBMIT'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventsContactSection;
