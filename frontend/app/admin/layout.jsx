'use client';

import React from 'react';
import { AuthProvider } from '@/lib/AuthContext';
import { useAuth } from '@/lib/AuthContext';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

const AdminLayoutContent = ({ children }) => {
  const { user, loading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user && pathname !== '/admin/login') {
      router.push('/admin/login');
    }
  }, [user, loading, pathname, router]);

  // If we are on the login page, don't show the sidebar or require auth
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  // Show loading state while checking auth
  if (loading) {
    return (
      <div className="min-h-screen bg-[#1a1a1a] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          <p className="text-gray-400 font-degular text-lg">Loading...</p>
        </div>
      </div>);

  }

  // If not logged in and not on login page (AuthContext handles redirect, but just in case)
  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#1a1a1a] flex">
      {/* Sidebar - fixed width */}
      <AdminSidebar />
      
      {/* Main Content - takes up remaining space and offsets for sidebar */}
      <div className="flex-1 ml-64">
        <main>{children}</main>
      </div>
    </div>);

};

export default function AdminLayout({
  children


}) {
  return (
    <AuthProvider>
      <AdminLayoutContent>{children}</AdminLayoutContent>
    </AuthProvider>);

}