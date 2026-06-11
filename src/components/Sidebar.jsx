import React, { useState } from 'react';
import {
  Home,
  Search,
  Library,
  Plus,
  Heart,
  ChevronDown,
  ChevronRight,
  Music,
} from 'lucide-react';

export default function Sidebar({ onNavigate, activeView, onOpenCreatePlaylist, userPlaylists }) {
  const [libraryExpanded, setLibraryExpanded] = useState(true);

  return (
    <aside className="fixed left-0 top-0 w-60 h-screen bg-black flex flex-col z-50">
      <div className="p-6 pb-4">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-8 bg-gradient-to-br from-[#1DB954] to-[#1aa34a] rounded-lg flex items-center justify-center">
            <Music className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-white tracking-tight">SoundHub</span>
        </div>

        {/* Main Nav */}
        <nav className="space-y-1">
          <button
            onClick={() => onNavigate('home')}
            className={`w-full flex items-center gap-4 px-3 py-2.5 rounded-lg transition-colors ${
              activeView === 'home' ? 'text-white bg-[#282828]' : 'text-[#B3B3B3] hover:text-white hover:bg-[#1a1a1a]'
            }`}
          >
            <Home className="w-5 h-5" />
            <span className="font-semibold text-sm">Home</span>
          </button>
          <button
            onClick={() => onNavigate('search')}
            className={`w-full flex items-center gap-4 px-3 py-2.5 rounded-lg transition-colors ${
              activeView === 'search' ? 'text-white bg-[#282828]' : 'text-[#B3B3B3] hover:text-white hover:bg-[#1a1a1a]'
            }`}
          >
            <Search className="w-5 h-5" />
            <span className="font-semibold text-sm">Search</span>
          </button>
        </nav>
      </div>

      {/* Library Section */}
      <div className="flex-1 flex flex-col min-h-0 border-t border-[#282828]">
        <div className="px-6 pt-4 pb-2">
          <button
            onClick={() => setLibraryExpanded(!libraryExpanded)}
            className="w-full flex items-center justify-between text-[#B3B3B3] hover:text-white transition-colors"
          >
            <div className="flex items-center gap-2">
              <Library className="w-5 h-5" />
              <span className="font-semibold text-sm">Your Library</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={(e) => { e.stopPropagation(); onOpenCreatePlaylist(); }}
                className="hover:bg-[#1a1a1a] rounded-full p-1 transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
              {libraryExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </div>
          </button>
        </div>

        {libraryExpanded && (
          <div className="flex-1 overflow-y-auto px-3 pb-4 scrollbar-thin">
            {/* Liked Songs */}
            <button
              onClick={() => onNavigate('liked')}
              className={`w-full flex items-center gap-3 p-2.5 rounded-lg transition-colors group ${
                activeView === 'liked' ? 'bg-[#282828]' : 'hover:bg-[#1a1a1a]'
              }`}
            >
              <div className="w-12 h-12 rounded-md bg-gradient-to-br from-[#450af5] to-[#8e8ee5] flex items-center justify-center flex-shrink-0">
                <Heart className="w-5 h-5 text-white fill-white" />
              </div>
              <div className="text-left min-w-0">
                <p className="text-sm font-medium text-white truncate">Liked Songs</p>
                <p className="text-xs text-[#B3B3B3]">Playlist</p>
              </div>
            </button>

            {/* User Playlists */}
            {userPlaylists.map((pl) => (
              <button
                key={pl.id}
                onClick={() => onNavigate('playlist', pl.id)}
                className="w-full flex items-center gap-3 p-2.5 rounded-lg hover:bg-[#1a1a1a] transition-colors group"
              >
                <div className="w-12 h-12 rounded-md overflow-hidden flex-shrink-0">
                  {pl.image_url ? (
                    <img src={pl.image_url} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-[#282828] flex items-center justify-center">
                      <Music className="w-5 h-5 text-[#B3B3B3]" />
                    </div>
                  )}
                </div>
                <div className="text-left min-w-0">
                  <p className="text-sm font-medium text-white truncate">{pl.title}</p>
                  <p className="text-xs text-[#B3B3B3]">Playlist</p>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
}
