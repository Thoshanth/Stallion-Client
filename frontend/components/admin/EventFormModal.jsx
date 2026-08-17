'use client';

import React, { useState, useEffect } from 'react';
import { X, Upload, Calendar, Clock, MapPin, User, Link as LinkIcon } from 'lucide-react';
import Image from 'next/image';

export default function EventFormModal({ isOpen, onClose, event, onSuccess, branches = [], trainers = [] }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    startTime: '',
    endTime: '',
    branch: '',
    trainer: '',
    registrationUrl: '',
    status: 'active',
    publishedState: 'draft',
  });
  const [coverImage, setCoverImage] = useState(null);
  const [coverImagePreview, setCoverImagePreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Reset form when modal opens/closes or when event changes
  useEffect(() => {
    if (isOpen) {
      if (event) {
        // Editing mode - populate with existing event data
        const eventDate = new Date(event.date);
        const formattedDate = eventDate.toISOString().split('T')[0];
        
        setFormData({
          title: event.title || '',
          description: event.description || '',
          date: formattedDate,
          startTime: event.startTime || '',
          endTime: event.endTime || '',
          branch: event.branch?._id || '',
          trainer: event.trainer?._id || '',
          registrationUrl: event.registrationUrl || '',
          status: event.status || 'active',
          publishedState: event.publishedState || 'draft',
        });
        setCoverImagePreview(event.coverImage || '');
      } else {
        // Creating mode - reset form
        setFormData({
          title: '',
          description: '',
          date: '',
          startTime: '',
          endTime: '',
          branch: '',
          trainer: '',
          registrationUrl: '',
          status: 'active',
          publishedState: 'draft',
        });
        setCoverImagePreview('');
      }
      setCoverImage(null);
      setErrors({});
    }
  }, [isOpen, event]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Event title is required';
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Event description is required';
    }
    if (!formData.date) {
      newErrors.date = 'Event date is required';
    }
    if (!formData.startTime) {
      newErrors.startTime = 'Start time is required';
    }
    if (!formData.endTime) {
      newErrors.endTime = 'End time is required';
    }
    if (!formData.branch) {
      newErrors.branch = 'Branch is required';
    }

    // Validate time range
    if (formData.startTime && formData.endTime) {
      const startMinutes = timeToMinutes(formData.startTime);
      const endMinutes = timeToMinutes(formData.endTime);
      
      if (endMinutes <= startMinutes) {
        newErrors.endTime = 'End time must be after start time';
      }
    }

    // Validate registration URL format
    if (formData.registrationUrl && formData.registrationUrl.trim()) {
      const urlPattern = /^https?:\/\/.+/;
      if (!urlPattern.test(formData.registrationUrl.trim())) {
        newErrors.registrationUrl = 'Please enter a valid URL (starting with http:// or https://)';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const timeToMinutes = (timeString) => {
    const [hours, minutes] = timeString.split(':').map(Number);
    return hours * 60 + minutes;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const formDataToSend = new FormData();
      
      // Add all form fields
      Object.keys(formData).forEach(key => {
        if (formData[key] !== null && formData[key] !== '') {
          formDataToSend.append(key, formData[key]);
        }
      });

      // Add image if selected
      if (coverImage) {
        formDataToSend.append('coverImage', coverImage);
      }

      const url = event 
        ? `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1'}/events/admin/${event._id}`
        : `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1'}/events/admin`;
      
      const method = event ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        credentials: 'include',
        body: formDataToSend,
      });

      const data = await response.json();

      if (data.success) {
        alert(event ? 'Event updated successfully!' : 'Event created successfully!');
        onSuccess();
      } else {
        alert(data.message || 'Failed to save event');
      }
    } catch (error) {
      console.error('Error saving event:', error);
      alert('Error saving event. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] border border-gray-700/50 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700/50">
          <h2 className="text-2xl font-bold text-white font-akira tracking-wider">
            {event ? 'EDIT EVENT' : 'CREATE NEW EVENT'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-all duration-300"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="p-6 space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-6">
                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3 font-degular">
                    Event Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-black/30 border ${errors.title ? 'border-red-500' : 'border-gray-600'} rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 font-degular`}
                    placeholder="Enter event title..."
                  />
                  {errors.title && <p className="text-red-400 text-sm mt-2 font-modernist">{errors.title}</p>}
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3 font-degular">
                    Description *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4}
                    className={`w-full px-4 py-3 bg-black/30 border ${errors.description ? 'border-red-500' : 'border-gray-600'} rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 font-degular resize-vertical`}
                    placeholder="Describe the event in detail..."
                  />
                  {errors.description && <p className="text-red-400 text-sm mt-2 font-modernist">{errors.description}</p>}
                </div>

                {/* Date and Time Row */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3 font-degular">
                      <Calendar className="w-4 h-4 inline mr-2" />
                      Date *
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 bg-black/30 border ${errors.date ? 'border-red-500' : 'border-gray-600'} rounded-lg text-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 font-degular`}
                    />
                    {errors.date && <p className="text-red-400 text-sm mt-2 font-modernist">{errors.date}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3 font-degular">
                      <Clock className="w-4 h-4 inline mr-2" />
                      Start Time *
                    </label>
                    <input
                      type="time"
                      name="startTime"
                      value={formData.startTime}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 bg-black/30 border ${errors.startTime ? 'border-red-500' : 'border-gray-600'} rounded-lg text-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 font-degular`}
                    />
                    {errors.startTime && <p className="text-red-400 text-sm mt-2 font-modernist">{errors.startTime}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3 font-degular">
                      <Clock className="w-4 h-4 inline mr-2" />
                      End Time *
                    </label>
                    <input
                      type="time"
                      name="endTime"
                      value={formData.endTime}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 bg-black/30 border ${errors.endTime ? 'border-red-500' : 'border-gray-600'} rounded-lg text-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 font-degular`}
                    />
                    {errors.endTime && <p className="text-red-400 text-sm mt-2 font-modernist">{errors.endTime}</p>}
                  </div>
                </div>

                {/* Branch and Trainer */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3 font-degular">
                      <MapPin className="w-4 h-4 inline mr-2" />
                      Branch *
                    </label>
                    <select
                      name="branch"
                      value={formData.branch}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 bg-black/30 border ${errors.branch ? 'border-red-500' : 'border-gray-600'} rounded-lg text-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 font-degular`}
                    >
                      <option value="">Select Branch</option>
                      {branches.map((branch) => (
                        <option key={branch._id} value={branch._id}>
                          {branch.name}
                        </option>
                      ))}
                    </select>
                    {errors.branch && <p className="text-red-400 text-sm mt-2 font-modernist">{errors.branch}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3 font-degular">
                      <User className="w-4 h-4 inline mr-2" />
                      Trainer (Optional)
                    </label>
                    <select
                      name="trainer"
                      value={formData.trainer}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-black/30 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 font-degular"
                    >
                      <option value="">Select Trainer (Optional)</option>
                      {trainers.map((trainer) => (
                        <option key={trainer._id} value={trainer._id}>
                          {trainer.name} - {trainer.designation}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Registration URL */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3 font-degular">
                    <LinkIcon className="w-4 h-4 inline mr-2" />
                    Registration URL (Optional)
                  </label>
                  <input
                    type="url"
                    name="registrationUrl"
                    value={formData.registrationUrl}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-black/30 border ${errors.registrationUrl ? 'border-red-500' : 'border-gray-600'} rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 font-degular`}
                    placeholder="https://forms.gle/example or booking link..."
                  />
                  {errors.registrationUrl && <p className="text-red-400 text-sm mt-2 font-modernist">{errors.registrationUrl}</p>}
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Cover Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3 font-degular">
                    Cover Image
                  </label>
                  <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 hover:border-primary/50 transition-all duration-300">
                    {coverImagePreview ? (
                      <div className="relative group">
                        <div className="relative w-full h-48 rounded-lg overflow-hidden">
                          <Image
                            src={coverImagePreview}
                            alt="Cover preview"
                            fill
                            className="object-cover"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setCoverImagePreview('');
                            setCoverImage(null);
                          }}
                          className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"
                        >
                          <X className="w-4 h-4" />
                        </button>
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center rounded-lg">
                          <label className="cursor-pointer bg-primary hover:bg-primary/80 text-white px-4 py-2 rounded-lg font-modernist font-semibold">
                            Change Image
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleImageChange}
                              className="hidden"
                            />
                          </label>
                        </div>
                      </div>
                    ) : (
                      <label className="cursor-pointer flex flex-col items-center justify-center h-48 text-gray-400 hover:text-primary transition-all duration-300">
                        <Upload className="w-12 h-12 mb-4" />
                        <span className="text-base font-degular">Click to upload cover image</span>
                        <span className="text-sm text-gray-500 mt-1 font-modernist">PNG, JPG up to 10MB</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>
                </div>

                {/* Status and Published State */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3 font-degular">
                      Status
                    </label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-black/30 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 font-degular"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3 font-degular">
                      Published State
                    </label>
                    <select
                      name="publishedState"
                      value={formData.publishedState}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-black/30 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 font-degular"
                    >
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                    </select>
                  </div>
                </div>

                {/* Info Box */}
                <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-lg p-4">
                  <h4 className="text-blue-400 font-semibold mb-2 font-akira text-sm tracking-wider">EVENT TIPS</h4>
                  <ul className="text-sm text-gray-300 space-y-1 font-modernist">
                    <li>• Add a compelling cover image to attract participants</li>
                    <li>• Include registration link for easy sign-up</li>
                    <li>• Set status to 'Active' and state to 'Published' when ready</li>
                    <li>• End time must be after start time</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-gray-700/50 flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-8 py-3 bg-gray-800 border border-gray-600 text-white hover:bg-gray-700 transition-all duration-300 font-modernist font-semibold tracking-wide rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`px-8 py-3 bg-primary hover:bg-primary/80 text-white transition-all duration-300 font-modernist font-semibold tracking-wide rounded-lg flex items-center gap-3 ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {loading && <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>}
              {event ? 'Update Event' : 'Create Event'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}