import React, { useState, useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';
import {
  Home,
  Search,
  Music,
  Plus,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
} from 'lucide-react';

export default function MusicStreamingApp() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [progress, setProgress] = useState(42);
  const contentRef = useRef(null);

  // Initialize Lenis smooth scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    if (contentRef.current) {
      lenis.scrollTo(contentRef.current, {
        offset: 0,
        immediate: true,
      });
    }

    return () => lenis.destroy();
  }, []);

  // Mock playlist data
  const playlists = [
    {
      id: 1,
      title: 'Midnight Jazz',
      description: 'Smooth jazz classics for late-night vibes and relaxation',
      plays: 45200,
    },
    {
      id: 2,
      title: 'Electric Dreams',
      description: 'Synthwave and electronic beats that transport you elsewhere',
      plays: 128900,
    },
    {
      id: 3,
      title: 'Golden Hour',
      description: 'Indie folk and acoustic tracks for sunset moments',
      plays: 67400,
    },
    {
      id: 4,
      title: 'Neon Nights',
      description: 'High-energy electronic and dance tracks for peak energy',
      plays: 234100,
    },
    {
      id: 5,
      title: 'Ambient Escape',
      description: 'Atmospheric soundscapes and ambient music for focus',
      plays: 89300,
    },
    {
      id: 6,
      title: 'Soul Classics',
      description: 'Timeless soul and R&B records from legendary artists',
      plays: 156800,
    },
  ];

  const tracks = [
    { id: 1, title: 'Midnight Echoes', artist: 'Luna & Stars' },
    { id: 2, title: 'Neon Pulse', artist: 'Synth Wave Collective' },
    { id: 3, title: 'Golden Horizon', artist: 'The Acoustic Wanderers' },
  ];

  const currentTrack = tracks[currentTrackIndex];

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % tracks.length);
  };

  const handlePrev = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + tracks.length) % tracks.length);
  };

  return (
    <div className="flex h-screen bg-[#121212] font-inter overflow-hidden">
      {/* SIDEBAR */}
      <aside className="fixed left-0 top-0 w-60 h-screen bg-black border-r border-[#282828] flex flex-col p-6 z-50">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-12">
          <div className="w-8 h-8 bg-gradient-to-br from-[#1DB954] to-[#1aa34a] rounded-lg flex items-center justify-center">
            <Music className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-white tracking-tight">
            SoundHub
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-4">
          <a
            href="#"
            className="flex items-center gap-4 px-4 py-3 text-[#B3B3B3] hover:text-white transition-colors rounded-lg hover:bg-[#282828]"
          >
            <Home className="w-5 h-5" />
            <span className="font-medium">Home</span>
          </a>
          <a
            href="#"
            className="flex items-center gap-4 px-4 py-3 text-[#B3B3B3] hover:text-white transition-colors rounded-lg hover:bg-[#282828]"
          >
            <Search className="w-5 h-5" />
            <span className="font-medium">Search</span>
          </a>
          <a
            href="#"
            className="flex items-center gap-4 px-4 py-3 text-[#B3B3B3] hover:text-white transition-colors rounded-lg hover:bg-[#282828]"
          >
            <Music className="w-5 h-5" />
            <span className="font-medium">Your Library</span>
          </a>
        </nav>

        {/* Create Playlist Button */}
        <button className="w-full flex items-center justify-center gap-2 bg-[#1DB954] text-black font-semibold py-3 px-4 rounded-lg hover:bg-[#1ed760] transition-all duration-200 transform hover:scale-105">
          <Plus className="w-5 h-5" />
          Create Playlist
        </button>
      </aside>

      {/* MAIN CONTENT */}
      <main className="ml-60 mr-0 mb-24 h-screen overflow-y-auto flex flex-col">
        <div ref={contentRef} className="flex-1 p-8">
          {/* Greeting Section */}
          <div className="mb-12">
            <h1 className="text-5xl font-bold text-white mb-2">Good Evening</h1>
            <p className="text-[#B3B3B3]">
              {new Date().toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>

          {/* Playlist Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {playlists.map((playlist) => (
              <div
                key={playlist.id}
                className="card-hover group bg-[#282828] rounded-xl p-5 cursor-pointer transition-all duration-300"
              >
                {/* Image Placeholder */}
                <div className="w-full aspect-square bg-gradient-to-br from-[#1DB954] to-[#1aa34a] rounded-lg mb-4 flex items-center justify-center group-hover:shadow-lg transition-shadow">
                  <Music className="w-16 h-16 text-white opacity-40" />
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold text-white mb-2 line-clamp-1">
                  {playlist.title}
                </h3>
                <p className="text-[#B3B3B3] text-sm line-clamp-2 mb-3 leading-relaxed">
                  {playlist.description}
                </p>

                {/* Meta */}
                <div className="text-xs text-[#B3B3B3] flex items-center gap-2">
                  <span className="font-medium">
                    {(playlist.plays / 1000).toFixed(0)}K plays
                  </span>
                  <span>•</span>
                  <span>Added 2 weeks ago</span>
                </div>
              </div>
            ))}
          </div>

          {/* Spacing for player bar */}
          <div className="h-8"></div>
        </div>
      </main>

      {/* PLAYER BAR */}
      <div className="fixed bottom-0 left-0 right-0 h-24 bg-[#181818] border-t border-[#282828] z-40 px-8 py-4 flex items-center justify-between">
        {/* Track Info */}
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold text-white truncate">
            {currentTrack.title}
          </h4>
          <p className="text-xs text-[#B3B3B3] truncate">{currentTrack.artist}</p>
        </div>

        {/* Player Controls - Center */}
        <div className="flex items-center gap-6 mx-8">
          {/* Previous */}
          <button
            onClick={handlePrev}
            className="text-[#B3B3B3] hover:text-white transition-colors"
          >
            <SkipBack className="w-5 h-5" />
          </button>

          {/* Play Button with Neumorphism */}
          <button
            onClick={handlePlayPause}
            className={`play-button relative w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
              isPlaying
                ? 'active bg-[#1DB954]'
                : 'bg-[#1DB954] hover:bg-[#1ed760]'
            }`}
            style={{
              boxShadow:
                isPlaying
                  ? '0 8px 24px rgba(29, 185, 84, 0.4), inset -2px -2px 8px rgba(0, 0, 0, 0.3), inset 2px 2px 8px rgba(255, 255, 255, 0.1)'
                  : '0 6px 20px rgba(29, 185, 84, 0.35), inset -1px -1px 6px rgba(0, 0, 0, 0.2), inset 1px 1px 6px rgba(255, 255, 255, 0.08)',
            }}
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 text-black fill-black" />
            ) : (
              <Play className="w-5 h-5 text-black fill-black ml-0.5" />
            )}
          </button>

          {/* Next */}
          <button
            onClick={handleNext}
            className="text-[#B3B3B3] hover:text-white transition-colors"
          >
            <SkipForward className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="flex-1 max-w-xs mx-8">
          <div className="flex items-center gap-3">
            <span className="text-xs text-[#B3B3B3] w-8">2:18</span>
            <div className="flex-1 h-1 bg-[#404040] rounded-full overflow-hidden cursor-pointer group">
              <div
                className="h-full bg-[#1DB954] rounded-full transition-all group-hover:h-1.5"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <span className="text-xs text-[#B3B3B3] w-8">5:30</span>
          </div>
        </div>

        {/* Volume Control */}
        <div className="flex items-center gap-3">
          <Volume2 className="w-5 h-5 text-[#B3B3B3]" />
          <div className="w-24 h-1 bg-[#404040] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#1DB954]"
              style={{ width: '70%' }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
