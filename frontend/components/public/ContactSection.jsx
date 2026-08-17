'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

const ContactSection = ({ branches = [] }) => {
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
        throw new Error(data.error || 'Failed to send message.');
      }

      setSubmitStatus({ loading: false, success: true, error: null });
      setFormData({ name: '', email: '', phone: '', branch: '', subject: '', message: '' });
      setTimeout(() => setSubmitStatus(prev => ({ ...prev, success: false })), 5000);
    } catch (error) {
      setSubmitStatus({ loading: false, success: false, error: error.message });
      setTimeout(() => setSubmitStatus(prev => ({ ...prev, error: null })), 5000);
    }
  };

  return (
    <section ref={sectionRef} className="bg-black">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">
        
        {/* Left Side: Image & Text */}
        <div className="relative p-12 md:p-24 flex flex-col justify-center bg-black min-h-[400px]">
          <Image
            src="/images/hero.png" // Fallback to hero image, matching the vibe
            alt="Handstand Pushups"
            fill
            className="object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent" />
          
          <div className="relative z-10 max-w-lg">
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold uppercase tracking-widest text-white mb-6 font-akira leading-tight drop-shadow-lg">
              GOT<br />QUESTIONS<br />WE'VE GOT<br />ANSWERS.
            </h2>
            <p className="text-gray-200 text-lg md:text-xl font-medium leading-relaxed drop-shadow-md">
              Fill out the form, and our team will hit you back within 24 hours.
            </p>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="bg-white p-12 md:p-24 flex flex-col justify-center">
          <form onSubmit={handleSubmit} className="w-full max-w-xl mx-auto space-y-10">
            
            <div>
              <label htmlFor="name" className="block text-black font-semibold uppercase tracking-wider text-sm mb-2">
                FULL NAME
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleInputChange}
                className="w-full pb-3 border-b border-gray-400 bg-transparent text-black focus:outline-none focus:border-[#e71b4b] transition-colors duration-200"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div>
                <label htmlFor="email" className="block text-black font-semibold uppercase tracking-wider text-sm mb-2">
                  EMAIL
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pb-3 border-b border-gray-400 bg-transparent text-black focus:outline-none focus:border-[#e71b4b] transition-colors duration-200"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-black font-semibold uppercase tracking-wider text-sm mb-2">
                  PHONE NO.
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full pb-3 border-b border-gray-400 bg-transparent text-black focus:outline-none focus:border-[#e71b4b] transition-colors duration-200"
                />
              </div>
            </div>

            <div>
              <label htmlFor="branch" className="block text-black font-semibold uppercase tracking-wider text-sm mb-2">
                SELECT BRANCH
              </label>
              <select
                id="branch"
                name="branch"
                value={formData.branch}
                onChange={handleInputChange}
                className="w-full pb-3 border-b border-gray-400 bg-transparent text-black focus:outline-none focus:border-[#e71b4b] transition-colors duration-200 appearance-none"
              >
                <option value="" disabled>Select your preferred branch</option>
                <option value="General">General Inquiry</option>
                {branches.map((b) => (
                  <option key={b._id} value={b.name}>{b.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="subject" className="block text-black font-semibold uppercase tracking-wider text-sm mb-2">
                SUBJECT
              </label>
              <select
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                className="w-full pb-3 border-b border-gray-400 bg-transparent text-black focus:outline-none focus:border-[#e71b4b] transition-colors duration-200 appearance-none"
              >
                <option value="" disabled>Select a subject</option>
                <option value="Membership">Membership Details</option>
                <option value="Personal Training">Personal Training</option>
                <option value="Feedback">Feedback</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="message" className="block text-black font-semibold uppercase tracking-wider text-sm mb-2">
                MESSAGE
              </label>
              <textarea
                id="message"
                name="message"
                rows={1}
                required
                value={formData.message}
                onChange={handleInputChange}
                className="w-full pb-3 border-b border-gray-400 bg-transparent text-black focus:outline-none focus:border-[#e71b4b] transition-colors duration-200 resize-none min-h-[40px]"
              />
            </div>

            {submitStatus.success && (
              <p className="text-green-600 font-medium">Message sent successfully!</p>
            )}
            {submitStatus.error && (
              <p className="text-[#e71b4b] font-medium">{submitStatus.error}</p>
            )}

            <div className="flex justify-end pt-4">
              <button
                type="submit"
                disabled={submitStatus.loading}
                className="bg-[#e71b4b] hover:bg-[#c91841] text-white font-medium uppercase tracking-wider px-10 py-3 rounded-none transition-colors duration-200 disabled:opacity-50 flex items-center gap-2"
              >
                {submitStatus.loading ? 'SENDING...' : 'SUBMIT'}
                {!submitStatus.loading && <span>→</span>}
              </button>
            </div>
            
          </form>
        </div>
        
      </div>
    </section>
  );
};

export default ContactSection;