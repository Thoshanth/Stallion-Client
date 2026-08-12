'use client';

import React from 'react';
import { Users, Calendar, Dumbbell, MapPin } from 'lucide-react';
import { useAuth } from '@/lib/AuthContext';

export default function AdminDashboard() {
  const { user } = useAuth();

  const stats = [
    { name: 'Total Trainers', value: '24', icon: Users, color: 'text-blue-500' },
    { name: 'Active Programs', value: '12', icon: Dumbbell, color: 'text-primary' },
    { name: 'Total Branches', value: '6', icon: MapPin, color: 'text-green-500' },
    { name: 'Upcoming Events', value: '3', icon: Calendar, color: 'text-purple-500' },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 font-akira tracking-wider">
          Dashboard
        </h1>
        <p className="mt-2 text-gray-600 font-degular text-lg">
          Welcome back, {user?.name}. Here's what's happening today.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {stats.map((item) => (
          <div
            key={item.name}
            className="bg-white overflow-hidden shadow rounded-lg border border-gray-100"
          >
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <item.icon className={`h-8 w-8 ${item.color}`} aria-hidden="true" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate font-degular">
                      {item.name}
                    </dt>
                    <dd>
                      <div className="text-2xl font-bold text-gray-900 font-akira mt-1">
                        {item.value}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white shadow rounded-lg border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4 font-akira">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center justify-center px-4 py-3 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90 transition-colors">
            Add New Trainer
          </button>
          <button className="flex items-center justify-center px-4 py-3 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors">
            Create Event
          </button>
          <button className="flex items-center justify-center px-4 py-3 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors">
            Review Approvals (12)
          </button>
        </div>
      </div>
    </div>
  );
}
