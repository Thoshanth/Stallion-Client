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
  LogOut } from
'lucide-react';

const navigation = [
{ name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
{ name: 'Trainers', href: '/admin/trainers', icon: Users },
{ name: 'Programs', href: '/admin/programs', icon: Dumbbell },
{ name: 'Branches', href: '/admin/branches', icon: MapPin },
{ name: 'Events', href: '/admin/events', icon: Calendar },
{ name: 'Reviews', href: '/admin/reviews', icon: Star },
{ name: 'Settings', href: '/admin/settings', icon: Settings }];


const AdminSidebar = () => {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  return (
    <div className="flex flex-col w-64 bg-black text-white h-screen fixed top-0 left-0 border-r border-gray-800">
      <div className="flex items-center justify-center h-20 bg-gradient-to-r from-primary/10 to-secondary/10 border-b border-gray-800">
        <Link href="/admin" className="flex items-center gap-2">
          <span className="font-akira uppercase tracking-wider text-2xl text-white">STALLION</span>
          <span className="text-xs font-degular text-gray-400 mt-2">CMS</span>
        </Link>
      </div>
      
      <div className="flex-1 overflow-y-auto py-6">
        <nav className="space-y-2 px-3">
          {navigation.map((item) => {
            const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`group flex items-center px-4 py-3 text-base font-medium rounded-lg font-degular transition-all duration-300 ${
                isActive ?
                'bg-gradient-to-r from-primary to-primary/80 text-white shadow-lg shadow-primary/20' :
                'text-gray-400 hover:bg-gray-800/50 hover:text-white'}`
                }>
                
                <item.icon
                  className={`mr-4 flex-shrink-0 h-5 w-5 ${
                  isActive ? 'text-white' : 'text-gray-500 group-hover:text-gray-300'}`
                  }
                  aria-hidden="true" />
                
                {item.name}
              </Link>);

          })}
        </nav>
      </div>

      <div className="flex-shrink-0 bg-gray-900/50 p-4 border-t border-gray-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-sm font-bold text-white font-akira shadow-lg">
              {user?.name?.charAt(0) || 'A'}
            </div>
            <div>
              <p className="text-sm font-semibold text-white font-degular">{user?.name || 'Admin'}</p>
              <p className="text-xs text-gray-400 font-modernist">
                {user?.role || 'Super Admin'}
              </p>
            </div>
          </div>
          <button
            onClick={() => logout()}
            className="text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-300 p-2 rounded-lg"
            title="Logout">
            
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </div>);

};

export default AdminSidebar;