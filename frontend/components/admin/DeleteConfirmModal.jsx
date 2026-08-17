'use client';

import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

export default function DeleteConfirmModal({ isOpen, onClose, onConfirm, title, message }) {
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
        <div className="inline-block w-full max-w-md my-8 overflow-hidden text-left align-middle transition-all transform bg-gradient-to-br from-gray-900 to-black shadow-2xl rounded-lg border border-red-900/50">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-gray-700 bg-gradient-to-r from-red-900/20 to-transparent">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-red-500/20 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-red-400" />
              </div>
              <h3 className="text-xl font-bold text-white font-akira tracking-wider uppercase">
                {title || 'CONFIRM DELETE'}
              </h3>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white hover:bg-gray-800 transition-all duration-300 p-2 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="px-6 py-6">
            <p className="text-gray-300 font-degular text-base leading-relaxed">
              {message || 'Are you sure you want to delete this item? This action cannot be undone.'}
            </p>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-4 px-6 py-5 border-t border-gray-700 bg-gradient-to-r from-transparent to-red-900/10">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 text-base font-medium text-gray-300 bg-gray-800 border border-gray-600 rounded-lg hover:bg-gray-700 hover:text-white transition-all duration-300 font-degular"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-8 py-3 text-base font-semibold text-white bg-red-600 rounded-lg hover:bg-red-500 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 font-modernist tracking-wide"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
