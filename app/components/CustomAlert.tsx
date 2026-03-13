"use client";

import React from "react";
import { useAlert } from "../context/AlertContext";

export default function CustomAlert() {
  const { alert, hideAlert } = useAlert();

  if (!alert.visible) return null;

  const typeConfig = {
    success: {
      bg: "bg-green-500",
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="3">
          <path d="M5 13l4 4L19 7" />
        </svg>
      ),
    },
    error: {
      bg: "bg-red-500",
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="3">
          <path d="M6 18L18 6M6 6l12 12" />
        </svg>
      ),
    },
    warning: {
      bg: "bg-orange-500",
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="3">
          <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      ),
    },
    info: {
      bg: "bg-blue-500",
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="3">
          <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  };

  const config = typeConfig[alert.type];

  return (
    <div className="fixed top-10 left-1/2 -translate-x-1/2 z-[9999] w-[90%] max-w-[400px] animate-[slideDown_0.5s_ease_forwards]">
      <div className="bg-white/80 backdrop-blur-xl border border-white/20 p-5 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] flex items-center gap-4 relative overflow-hidden group">
        {/* Progress Bar Background */}
        <div className="absolute bottom-0 left-0 h-1 bg-gray-100 w-full opacity-50"></div>
        
        {/* Type Icon */}
        <div className={`${config.bg} text-white p-2 rounded-xl scale-95 transition-transform group-hover:scale-100`}>
          {config.icon}
        </div>

        {/* Message */}
        <div className="flex-1">
          <p className="text-gray-900 font-black text-sm tracking-tight leading-tight">
            {alert.message}
          </p>
        </div>

        {/* Close Button */}
        <button 
          onClick={hideAlert}
          className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-600"
        >
          <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <style jsx>{`
        @keyframes slideDown {
          from { transform: translate(-50%, -20px); opacity: 0; }
          to { transform: translate(-50%, 0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
