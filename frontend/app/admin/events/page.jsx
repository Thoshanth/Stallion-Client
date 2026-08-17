'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Search, Calendar, Clock, MapPin, Eye, FileText, Archive, Users } from 'lucide-react';
import Image from 'next/image';
import EventFormModal from '@/components/admin/EventFormModal';
import DeleteConfirmModal from '@/components/admin/DeleteConfirmModal';

export default function AdminEventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBranch, setFilterBranch] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [branches, setBranches] = useState([]);
  const [trainers, setTrainers] = useState([]);
  
  // Modal states
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [deleteEventId, setDeleteEventId] = useState(null);

  useEffect(() => {
    fetchEvents();
    fetchBranches();
    fetchTrainers();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1'}/events/admin/all`, {
        credentials: 'include',
      });
      const data = await res.json();
      if (data.success) {
        setEvents(data.data || []);
      }
    } catch (error) {
      console.error('Failed to fetch events:', error);
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchBranches = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1'}/branches`);
      const data = await res.json();
      if (data.success) {
        setBranches(data.data || []);
      }
    } catch (error) {
      console.error('Failed to fetch branches:', error);
      setBranches([]);
    }
  };

  const fetchTrainers = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1'}/trainers`);
      const data = await res.json();
      if (data.success) {
        setTrainers(data.data || []);
      }
    } catch (error) {
      console.error('Failed to fetch trainers:', error);
      setTrainers([]);
    }
  };

  const handleAddEvent = () => {
    setSelectedEvent(null);
    setIsFormModalOpen(true);
  };

  const handleEditEvent = (event) => {
    setSelectedEvent(event);
    setIsFormModalOpen(true);
  };

  const handleDeleteClick = (eventId) => {
    setDeleteEventId(eventId);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1'}/events/admin/${deleteEventId}`,
        {
          method: 'DELETE',
          credentials: 'include',
        }
      );

      if (res.ok) {
        await fetchEvents();
        setIsDeleteModalOpen(false);
        setDeleteEventId(null);
        alert('Event deleted successfully!');
      } else {
        alert('Failed to delete event');
      }
    } catch (error) {
      console.error('Error deleting event:', error);
      alert('Error deleting event');
    }
  };

  const handleFormSuccess = () => {
    fetchEvents();
    setIsFormModalOpen(false);
    setSelectedEvent(null);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatTime = (timeString) => {
    if (!timeString) return '';
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  };

  const isEventUpcoming = (eventDate) => {
    return new Date(eventDate) > new Date();
  };

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBranch = filterBranch === '' || event.branch?._id === filterBranch;
    const matchesStatus = filterStatus === '' || event.status === filterStatus;
    return matchesSearch && matchesBranch && matchesStatus;
  });

  const stats = {
    total: events.length,
    upcoming: events.filter((e) => isEventUpcoming(e.date)).length,
    published: events.filter((e) => e.publishedState === 'published').length,
    draft: events.filter((e) => e.publishedState === 'draft').length,
  };

  return (
    <div className="min-h-screen bg-[#262626] px-6 py-8">
      {/* Header Section */}
      <div className="mb-12">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <h1 className="text-4xl lg:text-5xl font-bold text-white font-akira tracking-wider uppercase">
              EVENTS
            </h1>
            <p className="mt-4 text-gray-300 font-degular text-lg lg:text-xl max-w-2xl tracking-wide">
              Create and manage fitness events, workshops, and special programs that energize your community.
            </p>
          </div>
          <button
            onClick={handleAddEvent}
            className="bg-primary hover:bg-primary/80 text-white px-8 py-4 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-3 text-lg font-modernist font-semibold tracking-wide rounded-lg"
          >
            <Plus className="w-6 h-6" />
            Create New Event
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="bg-gradient-to-br from-black/40 to-black/20 backdrop-blur-sm border border-gray-700/50 rounded-lg p-6 hover:border-primary/50 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm font-degular uppercase tracking-wide mb-2">Total Events</p>
              <p className="text-3xl font-bold text-white font-akira">{stats.total}</p>
            </div>
            <div className="p-3 bg-primary/20 rounded-lg">
              <Calendar className="w-8 h-8 text-primary" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-black/40 to-black/20 backdrop-blur-sm border border-gray-700/50 rounded-lg p-6 hover:border-green-500/50 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm font-degular uppercase tracking-wide mb-2">Upcoming</p>
              <p className="text-3xl font-bold text-green-400 font-akira">{stats.upcoming}</p>
            </div>
            <div className="p-3 bg-green-500/20 rounded-lg">
              <Clock className="w-8 h-8 text-green-400" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-black/40 to-black/20 backdrop-blur-sm border border-gray-700/50 rounded-lg p-6 hover:border-blue-500/50 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm font-degular uppercase tracking-wide mb-2">Published</p>
              <p className="text-3xl font-bold text-blue-400 font-akira">{stats.published}</p>
            </div>
            <div className="p-3 bg-blue-500/20 rounded-lg">
              <Eye className="w-8 h-8 text-blue-400" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-black/40 to-black/20 backdrop-blur-sm border border-gray-700/50 rounded-lg p-6 hover:border-yellow-500/50 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm font-degular uppercase tracking-wide mb-2">Draft</p>
              <p className="text-3xl font-bold text-yellow-400 font-akira">{stats.draft}</p>
            </div>
            <div className="p-3 bg-yellow-500/20 rounded-lg">
              <FileText className="w-8 h-8 text-yellow-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="bg-gradient-to-br from-black/40 to-black/20 backdrop-blur-sm border border-gray-700/50 rounded-lg mb-8 overflow-hidden">
        <div className="p-6 border-b border-gray-700/50">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-12 pr-4 py-4 bg-black/30 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 font-degular"
                placeholder="Search events by title or description..."
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <select
                value={filterBranch}
                onChange={(e) => setFilterBranch(e.target.value)}
                className="px-4 py-4 bg-black/30 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 font-degular min-w-[180px]"
              >
                <option value="">All Branches</option>
                {branches.map((branch) => (
                  <option key={branch._id} value={branch._id}>
                    {branch.name}
                  </option>
                ))}
              </select>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-4 bg-black/30 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 font-degular min-w-[150px]"
              >
                <option value="">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="p-16 text-center">
            <div className="inline-flex items-center gap-3 text-gray-400 font-degular text-lg">
              <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-primary"></div>
              Loading events...
            </div>
          </div>
        ) : filteredEvents.length === 0 ? (
          <div className="p-16 text-center">
            <div className="text-gray-400 font-degular text-lg mb-6">
              {searchTerm || filterBranch || filterStatus
                ? 'No events found matching your filters.'
                : 'No events found. Create your first event to get started.'}
            </div>
            {!searchTerm && !filterBranch && !filterStatus && (
              <button
                onClick={handleAddEvent}
                className="bg-primary hover:bg-primary/80 text-white px-8 py-4 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3 font-modernist font-semibold tracking-wide mx-auto rounded-lg"
              >
                <Plus className="w-5 h-5" />
                Create Your First Event
              </button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-gray-700/50">
                  <th className="px-6 py-6 text-left text-sm font-medium text-gray-300 uppercase tracking-wider font-akira">
                    Event
                  </th>
                  <th className="px-6 py-6 text-left text-sm font-medium text-gray-300 uppercase tracking-wider font-akira">
                    Date & Time
                  </th>
                  <th className="px-6 py-6 text-left text-sm font-medium text-gray-300 uppercase tracking-wider font-akira">
                    Location
                  </th>
                  <th className="px-6 py-6 text-left text-sm font-medium text-gray-300 uppercase tracking-wider font-akira">
                    Status
                  </th>
                  <th className="px-6 py-6 text-right text-sm font-medium text-gray-300 uppercase tracking-wider font-akira">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700/50">
                {filteredEvents.map((event) => (
                  <tr key={event._id} className="hover:bg-black/20 transition-all duration-300">
                    <td className="px-6 py-6 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-16 w-16 relative rounded-lg overflow-hidden bg-gradient-to-br from-primary/20 to-secondary/20 border-2 border-gray-600">
                          {event.coverImage ? (
                            <Image
                              src={event.coverImage}
                              alt={event.title}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-primary text-xl font-bold font-akira">
                              {event.title.charAt(0)}
                            </div>
                          )}
                        </div>
                        <div className="ml-6">
                          <div className="text-lg font-semibold text-white font-degular">
                            {event.title}
                          </div>
                          <div className="text-sm text-gray-400 font-modernist max-w-md truncate">
                            {event.description}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-6 whitespace-nowrap">
                      <div className="text-white font-degular text-base">
                        {formatDate(event.date)}
                      </div>
                      <div className="text-sm text-gray-400 font-modernist">
                        {formatTime(event.startTime)} - {formatTime(event.endTime)}
                      </div>
                      {isEventUpcoming(event.date) && (
                        <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-green-500/20 text-green-400 border border-green-500/30 mt-1">
                          Upcoming
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-6 whitespace-nowrap">
                      <div className="text-white font-degular text-base flex items-center">
                        <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                        {event.branch?.name || 'N/A'}
                      </div>
                      {event.trainer && (
                        <div className="text-sm text-gray-400 font-modernist flex items-center mt-1">
                          <Users className="w-3 h-3 mr-2" />
                          {event.trainer.name}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-6 whitespace-nowrap">
                      <div className="flex flex-col gap-2">
                        <span
                          className={`px-3 py-1 text-xs font-semibold rounded-full text-center font-modernist tracking-wide ${
                            event.status === 'active'
                              ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                              : 'bg-gray-500/20 text-gray-400 border border-gray-500/30'
                          }`}
                        >
                          {event.status}
                        </span>
                        <span
                          className={`px-3 py-1 text-xs font-semibold rounded-full text-center font-modernist tracking-wide ${
                            event.publishedState === 'published'
                              ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                              : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                          }`}
                        >
                          {event.publishedState}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-6 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-3">
                        <button
                          onClick={() => handleEditEvent(event)}
                          className="p-2 text-blue-400 hover:text-blue-300 hover:bg-blue-500/20 rounded-lg transition-all duration-300"
                          title="Edit event"
                        >
                          <Edit2 className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(event._id)}
                          className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-lg transition-all duration-300"
                          title="Delete event"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modals */}
      <EventFormModal
        isOpen={isFormModalOpen}
        onClose={() => {
          setIsFormModalOpen(false);
          setSelectedEvent(null);
        }}
        event={selectedEvent}
        onSuccess={handleFormSuccess}
        branches={branches}
        trainers={trainers}
      />

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setDeleteEventId(null);
        }}
        onConfirm={handleDeleteConfirm}
        title="Delete Event"
        message="Are you sure you want to delete this event? This action cannot be undone."
      />
    </div>
  );
}