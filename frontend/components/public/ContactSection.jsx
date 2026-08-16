'use client';

import { useEffect, useRef, useState } from 'react';

const ContactSection = ({ branches = [] }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ loading: false, success: false, error: null });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    branch: '',
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

    let timeoutId = null;
    
    try {
      const controller = new AbortController();
      
      // Set timeout that will abort the request
      timeoutId = setTimeout(() => {
        controller.abort();
      }, 8000); // 8 second timeout

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1'}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        signal: controller.signal,
      });

      // Clear timeout if request completed
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }

      // Check if response is JSON
      const contentType = res.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Server is currently unavailable. Please try again later or contact us directly.');
      }

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || data.message || 'Failed to send message. Please try again.');
      }

      setSubmitStatus({ loading: false, success: true, error: null });
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        branch: '',
        message: ''
      });

      // Clear success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus(prev => ({ ...prev, success: false }));
      }, 5000);
    } catch (error) {
      // Clear timeout on error
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      
      // Only log non-abort errors to avoid console clutter
      if (error.name !== 'AbortError') {
        console.error('Error submitting form:', error);
      }
      
      let errorMessage = 'Failed to send message. Please try again.';
      
      if (error.name === 'AbortError') {
        errorMessage = 'Request timed out. Please check your connection and try again.';
      } else if (error.message.includes('fetch failed') || error.message.includes('Failed to fetch') || error.cause?.code === 'ECONNREFUSED') {
        errorMessage = 'Unable to connect to server. Please contact us directly at support@stallionxtremefitness.com or call +91 9876543210.';
      } else if (error.message.includes('Server is currently unavailable')) {
        errorMessage = error.message;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      setSubmitStatus({ loading: false, success: false, error: errorMessage });
      
      // Clear error message after 10 seconds
      setTimeout(() => {
        setSubmitStatus(prev => ({ ...prev, error: null }));
      }, 10000);
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
            Ready to start your journey?
          </h2>
          <p className="text-center text-gray-300 mb-10 md:mb-16 max-w-2xl mx-auto font-degular text-base md:text-lg tracking-wider">
            Fill out the form, and our team will hit you back within 24 hours. Six premier facilities across town, all with one mission: forge strength that extends beyond the gym.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16">
          {/* Contact Form */}
          
          <h2 className="text-2xl md:text-4xl font-bold uppercase tracking-wider text-center text-white mb-3 font-akira">
            Ready to start your journey?
          </h2>
          <p className="text-center text-gray-300 mb-10 md:mb-16 max-w-2xl mx-auto font-degular text-base md:text-lg tracking-wider">
            Fill out the form, and our team will hit you back within 24 hours. Six premier facilities across town, all with one mission: forge strength that extends beyond the gym.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16">
          {/* Contact Form */}
          <div
            className={`transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`
            }>
            
            <form onSubmit={handleSubmit} className="space-y-6">
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
                  Email Address *
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
                  Preferred Branch
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

              <div>
                <label htmlFor="message" className="block text-white font-degular mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-primary transition-colors duration-200 resize-vertical"
                  placeholder="Tell us about your fitness goals...">
                </textarea>
              </div>

              {submitStatus.success && (
                <div className="p-4 bg-green-500/20 border border-green-500 rounded-md">
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-green-400 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <p className="text-green-400 font-degular font-semibold">Message sent successfully!</p>
                      <p className="text-green-300 font-degular text-sm mt-1">We&apos;ll get back to you within 24 hours.</p>
                    </div>
                  </div>
                </div>
              )}
              
              {submitStatus.error && (
                <div className="p-4 bg-red-500/20 border border-red-500 rounded-md">
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-red-400 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <p className="text-red-400 font-degular">{submitStatus.error}</p>
                    </div>
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={submitStatus.loading}
                className="w-full bg-primary text-white px-8 py-4 font-semibold rounded-md hover:bg-primary-600 transition-colors duration-200 font-degular disabled:opacity-70">
                
                {submitStatus.loading ? 'Sending...' : 'SUBMIT'}
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div
            className={`transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`
            }>
            
            <div className="bg-gray-900 p-6 md:p-8 rounded-lg">
              <h3 className="text-xl md:text-2xl font-bold text-white mb-6 font-akira uppercase tracking-wider">
                Get in Touch
              </h3>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-6 h-6 text-primary mr-4 mt-1 flex-shrink-0">
                    <svg fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold font-degular mb-1">Address</h4>
                    <p className="text-gray-300 font-degular">
                      Plot No. 119/120, Kukatpally Rd, beside Ramky one marvel above More Super Market, 
                      Prakasham Panthulu Nagar, Rodamestri Nagar, Hyderabad Telangana 500055
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-6 h-6 text-primary mr-4 mt-1 flex-shrink-0">
                    <svg fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold font-degular mb-1">Email</h4>
                    <p className="text-gray-300 font-degular">support@stallionxtremefitness.com</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-6 h-6 text-primary mr-4 mt-1 flex-shrink-0">
                    <svg fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold font-degular mb-1">Phone</h4>
                    <p className="text-gray-300 font-degular">+91 9876543210</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-6 h-6 text-primary mr-4 mt-1 flex-shrink-0">
                    <svg fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold font-degular mb-1">Hours</h4>
                    <p className="text-gray-300 font-degular">
                      Monday - Sunday<br />
                      6:00 AM - 10:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;