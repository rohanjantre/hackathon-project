import React, { useState, useEffect } from 'react';
import { Search, Bell, HelpCircle, Sun, Moon, Menu } from 'lucide-react';
import { Logo } from '../ui/logo';
import { useAuth } from '../../hooks/useAuth';

export const TopBar: React.FC = () => {
  const { user } = useAuth();
  
  // Theme state
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark') || 
             (!document.documentElement.classList.contains('light') && true);
    }
    return true;
  });

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
    }
  };

  return (
    <header className="h-16 bg-[#0f172a] border-b border-slate-800 flex items-center justify-between px-4 shrink-0">
      <div className="flex items-center gap-6">
        <button className="text-slate-400 hover:text-white">
          <Menu className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-2">
          <Logo size="sm" />
          <span className="text-slate-500 text-sm ml-2 hidden md:block">Industrial Intelligence Platform</span>
        </div>
      </div>

      <div className="flex-1 max-w-xl mx-8 hidden md:block">
        <div className="relative group">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            placeholder="Search across assets, documents, insights..." 
            className="w-full bg-[#1e293b] border border-slate-700/50 rounded-lg pl-10 pr-12 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-slate-800 text-slate-400 rounded border border-slate-700">⌘</kbd>
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-slate-800 text-slate-400 rounded border border-slate-700">K</kbd>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative text-slate-400 hover:text-white transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full leading-none">12</span>
        </button>
        <button className="text-slate-400 hover:text-white transition-colors">
          <HelpCircle className="w-5 h-5" />
        </button>
        <button 
          onClick={toggleTheme}
          className="text-slate-400 hover:text-white transition-colors p-1.5 rounded-md hover:bg-slate-800/50"
          title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
        
        <div className="h-8 w-px bg-slate-700 mx-2"></div>
        
        <div className="flex items-center gap-3 cursor-pointer group">
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-bold shadow-glow">
            {user?.name?.substring(0,2).toUpperCase() || 'RK'}
          </div>
          <div className="hidden sm:block text-left leading-tight">
            <p className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">{user?.name || 'Rohit Kumar'}</p>
            <p className="text-xs text-slate-500">{(user as any)?.role === 'admin' ? 'Plant Manager' : 'Operator'}</p>
          </div>
        </div>
      </div>
    </header>
  );
};
