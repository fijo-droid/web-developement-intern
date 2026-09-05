import React from 'react';
import { LayoutDashboard, LogOut, Shield } from 'lucide-react';

export default function Navbar({ email, onSignOut }) {
  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <div className="icon-badge w-9 h-9 rounded-xl flex items-center justify-center text-white">
              <Shield className="w-4 h-4" />
            </div>
            <div className="flex items-center gap-2">
              <LayoutDashboard className="w-5 h-5 text-blue-600 hidden sm:block" />
              <span className="font-bold text-lg text-slate-800 tracking-tight">
                Employee<span className="text-blue-600">Hub</span>
              </span>
            </div>
          </div>

          {/* User Info & Sign Out */}
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="hidden sm:flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold uppercase">
                {email ? email.charAt(0) : 'U'}
              </div>
              <span className="text-sm text-slate-600 font-medium max-w-[160px] truncate">
                {email}
              </span>
            </div>

            <button
              id="sign-out-btn"
              onClick={onSignOut}
              className="flex items-center gap-2 px-3 py-2 bg-slate-100 hover:bg-red-50
                         text-slate-600 hover:text-red-600 border border-slate-200
                         hover:border-red-200 rounded-xl text-xs font-semibold
                         transition-all duration-200"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
