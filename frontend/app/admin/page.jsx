'use client';

import React, { useState, useEffect } from 'react';
import { Users, Calendar, Dumbbell, MapPin } from 'lucide-react';
import { useAuth } from '@/lib/AuthContext';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const { user } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState({
    totalTrainers: 0,
    activePrograms: 0,
    totalBranches: 0,
    upcomingEvents: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);
      
      // Fetch all data in parallel
      const [trainersRes, programsRes, branchesRes, eventsRes] = await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1'}/trainers`),
        fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1'}/programs`),
        fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1'}/branches`),
        fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1'}/events`),
      ]);

      const [trainersData, programsData, branchesData, eventsData] = await Promise.all([
        trainersRes.json(),
        programsRes.json(),
        branchesRes.json(),
        eventsRes.json(),
      ]);

      // Filter active/published items
      const activeTrainers = trainersData.success ? 
        trainersData.data.filter(t => t.status === 'active' && t.publishedState === 'published').length : 0;
      
      const activePrograms = programsData.success ? 
        programsData.data.filter(p => p.status === 'active').length : 0;
      
      const totalBranches = branchesData.success ? branchesData.data.length : 0;
      
      // Count upcoming events (events with future dates)
      const now = new Date();
      const upcomingEvents = eventsData.success ? 
        eventsData.data.filter(e => new Date(e.date) > now).length : 0;

      setStats({
        totalTrainers: activeTrainers,
        activePrograms: activePrograms,
        totalBranches: totalBranches,
        upcomingEvents: upcomingEvents,
      });
    } catch (error) {
      console.error('Failed to fetch dashboard stats:', error);
      // Keep default values on error
    } finally {
      setLoading(false);
    }
  };

  const statsConfig = [
    { name: 'Total Trainers', value: stats.totalTrainers, icon: Users, color: 'text-blue-400' },
    { name: 'Active Programs', value: stats.activePrograms, icon: Dumbbell, color: 'text-primary' },
    { name: 'Total Branches', value: stats.totalBranches, icon: MapPin, color: 'text-green-400' },
    { name: 'Upcoming Events', value: stats.upcomingEvents, icon: Calendar, color: 'text-purple-400' }
  ];


  return (
    <div className="min-h-screen bg-[#262626] px-6 py-8">
      <div className="mb-12">
        <h1 className="text-4xl lg:text-5xl font-bold text-white font-akira tracking-wider uppercase">
          DASHBOARD
        </h1>
        <p className="mt-4 text-gray-300 font-degular text-lg lg:text-xl">
          Welcome back, <span className="text-primary font-semibold">{user?.name || 'Admin'}</span>. Here's your fitness empire overview.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-12">
        {statsConfig.map((item) =>
        <div
          key={item.name}
          className="bg-gradient-to-br from-black/40 to-black/20 backdrop-blur-sm border border-gray-700/50 rounded-lg p-6 hover:border-primary/50 transition-all duration-300">
          
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-degular uppercase tracking-wide mb-2">
                  {item.name}
                </p>
                <div className="text-3xl font-bold text-white font-akira">
                  {loading ? (
                    <span className="inline-block animate-pulse bg-gray-600 h-8 w-12 rounded"></span>
                  ) : (
                    item.value
                  )}
                </div>
              </div>
              <div className="p-3 bg-primary/20 rounded-lg">
                <item.icon className={`w-8 h-8 ${item.color}`} aria-hidden="true" />
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="bg-gradient-to-br from-black/40 to-black/20 backdrop-blur-sm border border-gray-700/50 rounded-lg p-8">
        <h2 className="text-2xl font-bold text-white mb-6 font-akira uppercase tracking-wider">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <button 
            onClick={() => router.push('/admin/trainers')}
            className="bg-primary hover:bg-primary/80 text-white px-8 py-4 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center text-lg font-modernist font-semibold tracking-wide rounded-lg">
            Add New Trainer
          </button>
          <button 
            onClick={() => router.push('/admin/events')}
            className="bg-gray-800 border border-gray-600 text-white px-8 py-4 hover:bg-gray-700 transition-all duration-300 flex items-center justify-center text-lg font-modernist font-semibold tracking-wide rounded-lg">
            Create Event
          </button>
          <button 
            onClick={() => router.push('/admin/reviews')}
            className="bg-gray-800 border border-gray-600 text-white px-8 py-4 hover:bg-gray-700 transition-all duration-300 flex items-center justify-center text-lg font-modernist font-semibold tracking-wide rounded-lg">
            Review Approvals ({stats.upcomingEvents || 0})
          </button>
        </div>
      </div>
    </div>);

}