'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/lib/AuthContext';
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  Dumbbell, 
  MapPin, 
  Star, 
  Settings, 
  LogOut 
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Trainers', href: '/admin/trainers', icon: Users },
  { name: 'Programs', href: '/admin/programs', icon: Dumbbell },
  { name: 'Branches', href: '/admin/branches', icon: MapPin },
  { name: 'Events', href: '/admin/events', icon: Calendar },
  { name: 'Reviews', href: '/admin/reviews', icon: Star },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
];

const AdminSidebar = () => {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  return (
    <div className="flex flex-col w-64 bg-gray-900 text-white h-screen fixed top-0 left-0">
      <div className="flex items-center justify-center h-16 bg-black border-b border-gray-800">
        <Link href="/admin">
          <span className="font-akira uppercase tracking-wider text-xl text-white">Stallion CMS</span>
        </Link>
      </div>
      
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-1 px-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md font-degular transition-colors ${
                  isActive
                    ? 'bg-primary text-white'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <item.icon
                  className={`mr-3 flex-shrink-0 h-5 w-5 ${
                    isActive ? 'text-white' : 'text-gray-400 group-hover:text-gray-300'
                  }`}
                  aria-hidden="true"
                />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="flex-shrink-0 flex bg-gray-800 p-4 border-t border-gray-700 items-center justify-between">
        <div className="flex items-center">
          <div>
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-sm font-bold text-white">
              {user?.name?.charAt(0) || 'A'}
            </div>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-white">{user?.name || 'Admin'}</p>
            <p className="text-xs font-medium text-gray-400 group-hover:text-gray-300">
              {user?.role || 'Super Admin'}
            </p>
          </div>
        </div>
        <button
          onClick={() => logout()}
          className="text-gray-400 hover:text-red-500 transition-colors p-1"
          title="Logout"
        >
          <LogOut size={18} />
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
