'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAuth } from '@/lib/AuthContext';
import { login as loginApi } from '@/lib/authApi';
import { useRouter } from 'next/navigation';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters')
});



export default function LoginPage() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { checkAuth } = useAuth();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      setError(null);
      await loginApi(data.email, data.password);
      await checkAuth(); // Refetch user data into context
      router.push('/admin');
    } catch (err) {
      console.error('Login error:', err);
      
      let errorMessage = 'Invalid credentials. Please try again.';
      
      // Check for network errors
      if (err.code === 'ERR_NETWORK' || err.message?.includes('Network Error')) {
        errorMessage = 'Unable to connect to server. Please check your internet connection or contact support.';
      } else if (err.code === 'ECONNREFUSED') {
        errorMessage = 'Server is currently unavailable. Please try again later.';
      } else if (err.response?.status === 401) {
        errorMessage = 'Invalid email or password. Please check your credentials.';
      } else if (err.response?.status === 429) {
        errorMessage = 'Too many login attempts. Please try again later.';
      } else if (err.response?.data?.error) {
        errorMessage = err.response.data.error;
      } else if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      }
      
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-white font-akira tracking-wider uppercase">
          Stallion CMS
        </h2>
        <p className="mt-2 text-center text-sm text-gray-400 font-degular">
          Sign in to manage your empire
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-gray-900 py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-gray-800">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {error &&
            <div className="bg-red-900/50 border border-red-500 text-red-200 px-4 py-3 rounded-md text-sm font-degular">
                {error}
              </div>
            }
            
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-300 font-degular">
                
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  {...register('email')}
                  className="appearance-none block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm transition-colors" />
                
                {errors.email &&
                <p className="mt-2 text-sm text-red-400">{errors.email.message}</p>
                }
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-300 font-degular">
                
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  {...register('password')}
                  className="appearance-none block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm transition-colors" />
                
                {errors.password &&
                <p className="mt-2 text-sm text-red-400">{errors.password.message}</p>
                }
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-degular">
                
                {isLoading ? 'Signing in...' : 'Sign in'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>);

}