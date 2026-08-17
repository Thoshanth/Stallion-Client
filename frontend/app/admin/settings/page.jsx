'use client';

import React from 'react';

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-[#262626] px-6 py-8">
      <div className="mb-12">
        <h1 className="text-4xl lg:text-5xl font-bold text-white font-akira tracking-wider uppercase">
          SETTINGS
        </h1>
        <p className="mt-4 text-gray-300 font-degular text-lg lg:text-xl">
          Manage system settings and configurations.
        </p>
      </div>

      <div className="bg-gradient-to-br from-black/40 to-black/20 backdrop-blur-sm border border-gray-700/50 rounded-lg p-8">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-white mb-4 font-akira">COMING SOON</h2>
          <p className="text-gray-400 font-degular">Settings interface is under development.</p>
        </div>
      </div>
    </div>
  );
}