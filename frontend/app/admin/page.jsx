'use client';

import React, { useState, useEffect } from 'react';
import { Users, Calendar, Dumbbell, MapPin, MessageSquare, Star, Activity, CheckCircle2, XCircle, Clock } from 'lucide-react';
import { useAuth } from '@/lib/AuthContext';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function AdminDashboard() {
  const { user } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState({
    totalTrainers: 0,
    activePrograms: 0,
    totalBranches: 0,
    upcomingEvents: 0,
    pendingReviews: 0,
    unreadMessages: 0,
  });
  
  const [systemStatus, setSystemStatus] = useState({
    api: 'checking',
    database: 'checking',
    storage: 'checking'
  });
  
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';
      const HEALTH_URL = API_URL.replace('/api/v1', '') + '/health';
      
      // Fetch all data in parallel
      const [trainersRes, programsRes, branchesRes, eventsRes, reviewsRes, contactRes, healthRes] = await Promise.all([
        fetch(`${API_URL}/trainers`),
        fetch(`${API_URL}/programs`),
        fetch(`${API_URL}/branches`),
        fetch(`${API_URL}/events`),
        axios.get(`${API_URL}/reviews/admin`, { withCredentials: true }).catch(() => ({ data: { data: [] } })),
        axios.get(`${API_URL}/contact`, { withCredentials: true }).catch(() => ({ data: { data: [] } })),
        axios.get(HEALTH_URL).catch(() => ({ data: { success: false } })),
      ]);

      const [trainersData, programsData, branchesData, eventsData] = await Promise.all([
        trainersRes.json().catch(() => ({ data: [] })),
        programsRes.json().catch(() => ({ data: [] })),
        branchesRes.json().catch(() => ({ data: [] })),
        eventsRes.json().catch(() => ({ data: [] })),
      ]);

      // Filter active/published items
      const activeTrainers = trainersData.success ? 
        trainersData.data.filter(t => t.status === 'active' && t.publishedState === 'published').length : 0;
      
      const activePrograms = programsData.success ? 
        programsData.data.filter(p => p.status === 'active').length : 0;
      
      const totalBranches = branchesData.success ? branchesData.data.length : 0;
      
      const now = new Date();
      const upcomingEvents = eventsData.success ? 
        eventsData.data.filter(e => new Date(e.date) > now).length : 0;

      // Extract reviews and contact
      const reviews = reviewsRes.data?.data || [];
      const pendingReviews = reviews.filter(r => r.status === 'pending').length;

      const contacts = contactRes.data?.data || [];
      const unreadMessages = contacts.filter(m => m.status === 'new' || !m.status).length;

      setStats({
        totalTrainers: activeTrainers,
        activePrograms: activePrograms,
        totalBranches: totalBranches,
        upcomingEvents: upcomingEvents,
        pendingReviews,
        unreadMessages
      });

      // Status Check
      const isApiUp = healthRes.data?.success;
      setSystemStatus({
        api: isApiUp ? 'operational' : 'offline',
        database: isApiUp ? 'operational' : 'offline', // Assuming if API is up, DB is connected
        storage: isApiUp ? 'operational' : 'offline'
      });

      // Construct recent activity feed
      const activities = [
        ...reviews.slice(0, 5).map(r => ({
          id: r._id,
          type: 'review',
          title: `New review from ${r.customerName || 'Customer'}`,
          date: new Date(r.createdAt),
          status: r.status
        })),
        ...contacts.slice(0, 5).map(m => ({
          id: m._id || m.email,
          type: 'contact',
          title: `New message from ${m.name}`,
          date: new Date(m.timestamp || m.createdAt || Date.now()),
          status: m.status || 'new'
        }))
      ].sort((a, b) => b.date - a.date).slice(0, 5);

      setRecentActivity(activities);

    } catch (error) {
      console.error('Failed to fetch dashboard stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statsConfig = [
    { name: 'Total Trainers', value: stats.totalTrainers, icon: Users, color: 'text-blue-400' },
    { name: 'Active Programs', value: stats.activePrograms, icon: Dumbbell, color: 'text-primary' },
    { name: 'Total Branches', value: stats.totalBranches, icon: MapPin, color: 'text-green-400' },
    { name: 'Upcoming Events', value: stats.upcomingEvents, icon: Calendar, color: 'text-purple-400' },
    { name: 'Pending Reviews', value: stats.pendingReviews, icon: Star, color: 'text-yellow-400' },
    { name: 'Unread Messages', value: stats.unreadMessages, icon: MessageSquare, color: 'text-pink-400' }
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

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-12">
        {statsConfig.map((item) => (
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
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {/* System Status Indicators */}
        <div className="bg-gradient-to-br from-black/40 to-black/20 backdrop-blur-sm border border-gray-700/50 rounded-lg p-8 col-span-1">
          <h2 className="text-xl font-bold text-white mb-6 font-akira uppercase tracking-wider flex items-center gap-2">
            <Activity className="text-primary w-6 h-6" /> System Status
          </h2>
          <div className="space-y-6">
            {Object.entries(systemStatus).map(([key, status]) => (
              <div key={key} className="flex items-center justify-between">
                <span className="text-gray-300 capitalize font-degular text-lg">{key}</span>
                <div className="flex items-center gap-2">
                  {status === 'operational' ? (
                    <CheckCircle2 className="w-5 h-5 text-green-400" />
                  ) : status === 'checking' ? (
                    <Clock className="w-5 h-5 text-yellow-400 animate-spin" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-400" />
                  )}
                  <span className={`text-sm font-semibold capitalize ${
                    status === 'operational' ? 'text-green-400' : 
                    status === 'checking' ? 'text-yellow-400' : 'text-red-400'
                  }`}>
                    {status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity Feed */}
        <div className="bg-gradient-to-br from-black/40 to-black/20 backdrop-blur-sm border border-gray-700/50 rounded-lg p-8 col-span-1 lg:col-span-2">
          <h2 className="text-xl font-bold text-white mb-6 font-akira uppercase tracking-wider flex items-center gap-2">
            <Clock className="text-primary w-6 h-6" /> Recent Activity
          </h2>
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="animate-pulse flex items-center gap-4">
                  <div className="w-10 h-10 bg-gray-700 rounded-full"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-700 rounded w-1/4"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : recentActivity.length > 0 ? (
            <div className="space-y-4">
              {recentActivity.map((activity, idx) => (
                <div key={`${activity.id}-${idx}`} className="flex items-center justify-between p-4 bg-black/20 rounded-lg border border-gray-700/30 hover:border-gray-600 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-full ${activity.type === 'review' ? 'bg-yellow-400/20 text-yellow-400' : 'bg-pink-400/20 text-pink-400'}`}>
                      {activity.type === 'review' ? <Star className="w-5 h-5" /> : <MessageSquare className="w-5 h-5" />}
                    </div>
                    <div>
                      <p className="text-white font-medium">{activity.title}</p>
                      <p className="text-gray-400 text-sm">
                        {activity.date.toLocaleDateString()} at {activity.date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                      </p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${
                    activity.status === 'pending' || activity.status === 'new' ? 'bg-blue-500/20 text-blue-400' : 'bg-gray-700 text-gray-300'
                  }`}>
                    {activity.status || 'New'}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-400">
              No recent activity found.
            </div>
          )}
        </div>
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
            className="bg-gray-800 border border-gray-600 text-white px-8 py-4 hover:bg-gray-700 transition-all duration-300 flex items-center justify-center text-lg font-modernist font-semibold tracking-wide rounded-lg relative">
            Review Approvals
            {stats.pendingReviews > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center animate-pulse">
                {stats.pendingReviews}
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}