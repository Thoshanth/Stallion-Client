'use client';

import React, { useState, useEffect } from 'react';
import { X, Upload, Plus, Trash2 } from 'lucide-react';
import Image from 'next/image';

export default function TrainerFormModal({ isOpen, onClose, trainer, onSuccess, branches }) {
  const [formData, setFormData] = useState({
    name: '',
    designation: '',
    specialization: [],
    biography: '',
    experience: 0,
    branch: '',
    programs: [],
    socialLinks: {
      instagram: '',
      twitter: '',
      linkedin: '',
      facebook: '',
    },
    displayOrder: 0,
    status: 'active',
    publishedState: 'draft',
  });

  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [specializationInput, setSpecializationInput] = useState('');
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (trainer) {
      setFormData({
        name: trainer.name || '',
        designation: trainer.designation || '',
        specialization: trainer.specialization || [],
        biography: trainer.biography || '',
        experience: trainer.experience || 0,
        branch: trainer.branch?._id || '',
        programs: trainer.programs?.map((p) => p._id) || [],
        socialLinks: trainer.socialLinks || {
          instagram: '',
          twitter: '',
          linkedin: '',
          facebook: '',
        },
        displayOrder: trainer.displayOrder || 0,
        status: trainer.status || 'active',
        publishedState: trainer.publishedState || 'draft',
      });
      setImagePreview(trainer.profileImage || '');
    } else {
      resetForm();
    }
  }, [trainer, isOpen]);

  useEffect(() => {
    if (isOpen) {
      fetchPrograms();
    }
  }, [isOpen]);

  const fetchPrograms = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1'}/programs`
      );
      const data = await res.json();
      if (data.success) {
        setPrograms(data.data || []);
      }
    } catch (error) {
      console.error('Failed to fetch programs:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      designation: '',
      specialization: [],
      biography: '',
      experience: 0,
      branch: '',
      programs: [],
      socialLinks: {
        instagram: '',
        twitter: '',
        linkedin: '',
        facebook: '',
      },
      displayOrder: 0,
      status: 'active',
      publishedState: 'draft',
    });
    setProfileImage(null);
    setImagePreview('');
    setSpecializationInput('');
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddSpecialization = () => {
    if (specializationInput.trim() && !formData.specialization.includes(specializationInput.trim())) {
      setFormData({
        ...formData,
        specialization: [...formData.specialization, specializationInput.trim()],
      });
      setSpecializationInput('');
    }
  };

  const handleRemoveSpecialization = (index) => {
    setFormData({
      ...formData,
      specialization: formData.specialization.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const submitData = new FormData();
      
      // Append all form fields (convert numbers properly)
      submitData.append('name', formData.name);
      submitData.append('designation', formData.designation);
      submitData.append('biography', formData.biography);
      submitData.append('experience', Number(formData.experience));
      submitData.append('branch', formData.branch);
      submitData.append('displayOrder', Number(formData.displayOrder));
      submitData.append('status', formData.status);
      submitData.append('publishedState', formData.publishedState);
      
      // Append arrays as JSON strings (but parse them on backend)
      if (formData.specialization && formData.specialization.length > 0) {
        submitData.append('specialization', JSON.stringify(formData.specialization));
      }
      if (formData.programs && formData.programs.length > 0) {
        submitData.append('programs', JSON.stringify(formData.programs));
      }
      if (formData.socialLinks) {
        // Only send non-empty social links
        const cleanSocialLinks = Object.fromEntries(
          Object.entries(formData.socialLinks).filter(([_, value]) => value && value.trim() !== '')
        );
        if (Object.keys(cleanSocialLinks).length > 0) {
          submitData.append('socialLinks', JSON.stringify(cleanSocialLinks));
        }
      }
      
      // Append image if selected
      if (profileImage) {
        submitData.append('profileImage', profileImage);
      }

      const url = trainer
        ? `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1'}/trainers/${trainer._id}`
        : `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1'}/trainers`;

      const method = trainer ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        body: submitData,
        credentials: 'include',
      });

      const data = await res.json();

      if (data.success) {
        onSuccess();
        resetForm();
        alert(trainer ? 'Trainer updated successfully!' : 'Trainer created successfully!');
      } else {
        let errorMessage = data.error || 'Failed to save trainer';
        
        // Show specific validation errors if available
        if (data.details && Array.isArray(data.details)) {
          const fieldErrors = data.details.map(err => `${err.field}: ${err.message}`).join('\n');
          errorMessage = `Validation failed:\n\n${fieldErrors}`;
        }
        
        alert(errorMessage);
      }
    } catch (error) {
      console.error('Error saving trainer:', error);
      alert('Error saving trainer');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        {/* Overlay */}
        <div
          className="fixed inset-0 transition-opacity bg-black bg-opacity-80 backdrop-blur-sm"
          onClick={onClose}
        ></div>

        {/* Modal */}
        <div className="inline-block w-full max-w-3xl my-8 overflow-hidden text-left align-middle transition-all transform bg-gradient-to-br from-gray-900 to-black shadow-2xl rounded-lg border border-gray-700">
          {/* Header */}
          <div className="flex items-center justify-between px-8 py-6 border-b border-gray-700 bg-gradient-to-r from-primary/10 to-transparent">
            <h3 className="text-2xl font-bold text-white font-akira tracking-wider uppercase">
              {trainer ? 'EDIT TRAINER' : 'ADD NEW TRAINER'}
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white hover:bg-gray-800 transition-all duration-300 p-2 rounded-lg"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="px-8 py-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
            <div className="space-y-6">
              {/* Profile Image */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3 font-degular tracking-wide">
                  Profile Image
                </label>
                <div className="flex items-center gap-6">
                  <div className="relative w-24 h-24 rounded-full overflow-hidden bg-gradient-to-br from-primary/20 to-secondary/20 border-2 border-gray-700">
                    {imagePreview ? (
                      <Image src={imagePreview} alt="Preview" fill className="object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-500 text-3xl font-bold font-akira">
                        {formData.name ? formData.name.charAt(0) : '?'}
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="cursor-pointer inline-flex items-center px-6 py-3 border border-gray-600 rounded-lg shadow-sm text-sm font-medium text-white bg-gray-800 hover:bg-gray-700 transition-all duration-300 font-degular">
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Image
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                    </label>
                    <p className="text-xs text-gray-500 mt-2 font-modernist">JPG, PNG, max 5MB</p>
                  </div>
                </div>
              </div>

              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2 font-degular">
                  Name <span className="text-primary">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 font-degular"
                  placeholder="Enter trainer name"
                />
              </div>

              {/* Designation */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2 font-degular">
                  Designation <span className="text-primary">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.designation}
                  onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 font-degular"
                  placeholder="e.g., Head Trainer, Yoga Instructor"
                />
              </div>

              {/* Specialization */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Specialization
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={specializationInput}
                    onChange={(e) => setSpecializationInput(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddSpecialization();
                      }
                    }}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                    placeholder="e.g., Strength Training, Yoga"
                  />
                  <button
                    type="button"
                    onClick={handleAddSpecialization}
                    className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.specialization.map((spec, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
                    >
                      {spec}
                      <button
                        type="button"
                        onClick={() => handleRemoveSpecialization(index)}
                        className="ml-2 text-blue-600 hover:text-blue-800"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Biography */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Biography <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  value={formData.biography}
                  onChange={(e) => setFormData({ ...formData, biography: e.target.value })}
                  rows={4}
                  maxLength={1000}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                  placeholder="Tell us about the trainer..."
                />
                <p className="text-xs text-gray-500 mt-1">
                  {formData.biography.length}/1000 characters
                </p>
              </div>

              {/* Experience and Branch Row */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Experience (Years) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    max="50"
                    value={formData.experience}
                    onChange={(e) =>
                      setFormData({ ...formData, experience: parseInt(e.target.value) || 0 })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Branch <span className="text-red-500">*</span>
                  </label>
                  <select
                    required
                    value={formData.branch}
                    onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                  >
                    <option value="">Select Branch</option>
                    {branches.map((branch) => (
                      <option key={branch._id} value={branch._id}>
                        {branch.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Programs */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Programs (Optional)
                </label>
                <select
                  multiple
                  value={formData.programs}
                  onChange={(e) => {
                    const selected = Array.from(e.target.selectedOptions, (option) => option.value);
                    setFormData({ ...formData, programs: selected });
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                  size={4}
                >
                  {programs.map((program) => (
                    <option key={program._id} value={program._id}>
                      {program.name}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-gray-500 mt-1">Hold Ctrl/Cmd to select multiple</p>
              </div>

              {/* Social Links */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Social Links (Optional)
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="url"
                    value={formData.socialLinks.instagram}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        socialLinks: { ...formData.socialLinks, instagram: e.target.value },
                      })
                    }
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                    placeholder="Instagram URL"
                  />
                  <input
                    type="url"
                    value={formData.socialLinks.twitter}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        socialLinks: { ...formData.socialLinks, twitter: e.target.value },
                      })
                    }
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                    placeholder="Twitter URL"
                  />
                  <input
                    type="url"
                    value={formData.socialLinks.linkedin}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        socialLinks: { ...formData.socialLinks, linkedin: e.target.value },
                      })
                    }
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                    placeholder="LinkedIn URL"
                  />
                  <input
                    type="url"
                    value={formData.socialLinks.facebook}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        socialLinks: { ...formData.socialLinks, facebook: e.target.value },
                      })
                    }
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                    placeholder="Facebook URL"
                  />
                </div>
              </div>

              {/* Status and Published State */}
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Display Order
                  </label>
                  <input
                    type="number"
                    value={formData.displayOrder}
                    onChange={(e) =>
                      setFormData({ ...formData, displayOrder: parseInt(e.target.value) || 0 })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Published State
                  </label>
                  <select
                    value={formData.publishedState}
                    onChange={(e) => setFormData({ ...formData, publishedState: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </div>
              </div>
            </div>
          </form>

          {/* Footer */}
          <div className="flex items-center justify-end gap-4 px-8 py-6 border-t border-gray-700 bg-gradient-to-r from-transparent to-primary/5">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 text-base font-medium text-gray-300 bg-gray-800 border border-gray-600 rounded-lg hover:bg-gray-700 hover:text-white transition-all duration-300 font-degular"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="px-8 py-3 text-base font-semibold text-white bg-primary rounded-lg hover:bg-primary/80 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-105 font-modernist tracking-wide"
            >
              {loading ? 'Saving...' : trainer ? 'Update Trainer' : 'Create Trainer'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
