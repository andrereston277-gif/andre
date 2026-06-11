import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Bell, LogOut } from 'lucide-react';

export default function TopBar({ profile, onSignOut }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const initials = profile?.display_name
    ? profile.display_name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : 'U';

  return (
    <div className="sticky top-0 z-30 flex items-center justify-between px-8 py-4 bg-gradient-to-b from-[#121212]/80 to-transparent backdrop-blur-md">
      <div className="flex items-center gap-2">
        <button className="w-8 h-8 rounded-full bg-black/60 flex items-center justify-center text-white hover:bg-black/80 transition-colors">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button className="w-8 h-8 rounded-full bg-black/60 flex items-center justify-center text-white/30 cursor-not-allowed">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <div className="flex items-center gap-4">
        <button className="w-8 h-8 rounded-full hover:bg-[#282828] flex items-center justify-center text-[#B3B3B3] hover:text-white transition-colors">
          <Bell className="w-4 h-4" />
        </button>

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 bg-black/60 hover:bg-[#282828] rounded-full pl-1 pr-3 py-1 transition-colors"
          >
            <div className="w-7 h-7 rounded-full bg-[#1DB954] flex items-center justify-center text-xs font-bold text-black">
              {initials}
            </div>
            <span className="text-sm font-medium text-white max-w-[100px] truncate">
              {profile?.display_name || 'User'}
            </span>
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-[#282828] rounded-md shadow-xl border border-[#404040] py-1 animate-in fade-in">
              <button
                onClick={() => { onSignOut(); setDropdownOpen(false); }}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-[#B3B3B3] hover:text-white hover:bg-[#333] transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
