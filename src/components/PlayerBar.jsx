import React, { useState } from 'react';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Shuffle,
  Repeat,
  Repeat1,
  Volume2,
  Volume1,
  VolumeX,
  ListMusic,
  Mic2,
  Music,
} from 'lucide-react';

function formatDuration(seconds) {
  if (!seconds) return '0:00';
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export default function PlayerBar({
  currentTrack,
  isPlaying,
  progress,
  onPlayPause,
  onNext,
  onPrev,
  shuffle,
  repeatMode,
  onToggleShuffle,
  onToggleRepeat,
  volume,
  onVolumeChange,
}) {
  const [prevVolume, setPrevVolume] = useState(70);

  const handleMute = () => {
    if (volume > 0) {
      setPrevVolume(volume);
      onVolumeChange(0);
    } else {
      onVolumeChange(prevVolume);
    }
  };

  const VolumeIcon = volume === 0 ? VolumeX : volume < 50 ? Volume1 : Volume2;
  const RepeatIcon = repeatMode === 2 ? Repeat1 : Repeat;
  const elapsed = currentTrack?.duration ? Math.floor((progress / 100) * currentTrack.duration) : 0;

  return (
    <div className="fixed bottom-0 left-0 right-0 h-[72px] bg-[#181818] border-t border-[#282828]/60 z-40 px-4 flex items-center">
      {/* Left: Track Info */}
      <div className="flex items-center gap-3 w-[280px] min-w-0">
        <div className="w-14 h-14 rounded-md overflow-hidden flex-shrink-0 bg-[#282828]">
          {currentTrack?.image_url ? (
            <img src={currentTrack.image_url} alt="" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Music className="w-5 h-5 text-[#666]" />
            </div>
          )}
        </div>
        <div className="min-w-0">
          <p className="text-sm font-medium text-white truncate hover:underline cursor-pointer">
            {currentTrack?.title || 'No track playing'}
          </p>
          <p className="text-xs text-[#B3B3B3] truncate hover:text-white hover:underline cursor-pointer">
            {currentTrack?.artist || '—'}
          </p>
        </div>
      </div>

      {/* Center: Controls + Progress */}
      <div className="flex-1 flex flex-col items-center justify-center max-w-[600px] mx-auto">
        <div className="flex items-center gap-4 mb-1">
          <button
            onClick={onToggleShuffle}
            className={`p-1 transition-colors ${shuffle ? 'text-[#1DB954]' : 'text-[#B3B3B3] hover:text-white'}`}
          >
            <Shuffle className="w-4 h-4" />
          </button>
          <button onClick={onPrev} className="text-[#B3B3B3] hover:text-white transition-colors p-1">
            <SkipBack className="w-4 h-4" fill="currentColor" />
          </button>
          <button
            onClick={onPlayPause}
            className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:scale-105 transition-transform"
          >
            {isPlaying ? (
              <Pause className="w-4 h-4 text-black" fill="black" />
            ) : (
              <Play className="w-4 h-4 text-black fill-black ml-0.5" />
            )}
          </button>
          <button onClick={onNext} className="text-[#B3B3B3] hover:text-white transition-colors p-1">
            <SkipForward className="w-4 h-4" fill="currentColor" />
          </button>
          <button
            onClick={onToggleRepeat}
            className={`p-1 transition-colors ${repeatMode > 0 ? 'text-[#1DB954]' : 'text-[#B3B3B3] hover:text-white'}`}
          >
            <RepeatIcon className="w-4 h-4" />
          </button>
        </div>

        <div className="w-full flex items-center gap-2">
          <span className="text-[11px] text-[#B3B3B3] w-9 text-right tabular-nums">{formatDuration(elapsed)}</span>
          <div className="flex-1 h-1 bg-[#404040] rounded-full group cursor-pointer relative">
            <div
              className="h-full bg-white group-hover:bg-[#1DB954] rounded-full transition-colors relative"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow" />
            </div>
          </div>
          <span className="text-[11px] text-[#B3B3B3] w-9 tabular-nums">{formatDuration(currentTrack?.duration)}</span>
        </div>
      </div>

      {/* Right: Volume + Extras */}
      <div className="flex items-center gap-2 w-[280px] justify-end">
        <button className="p-1.5 text-[#B3B3B3] hover:text-white transition-colors">
          <Mic2 className="w-4 h-4" />
        </button>
        <button className="p-1.5 text-[#B3B3B3] hover:text-white transition-colors">
          <ListMusic className="w-4 h-4" />
        </button>
        <div className="flex items-center gap-1.5 ml-2">
          <button onClick={handleMute} className="p-1 text-[#B3B3B3] hover:text-white transition-colors">
            <VolumeIcon className="w-4 h-4" />
          </button>
          <div className="w-24 h-1 bg-[#404040] rounded-full group cursor-pointer relative">
            <div
              className="h-full bg-white group-hover:bg-[#1DB954] rounded-full transition-colors relative"
              style={{ width: `${volume}%` }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
