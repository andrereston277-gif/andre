import React from 'react';
import { Play, Music } from 'lucide-react';

function formatPlays(plays) {
  if (plays >= 1000000) return `${(plays / 1000000).toFixed(1)}M`;
  if (plays >= 1000) return `${(plays / 1000).toFixed(0)}K`;
  return `${plays}`;
}

function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diff / 86400000);
  if (days < 1) return 'Today';
  if (days < 7) return `${days}d ago`;
  if (days < 30) return `${Math.floor(days / 7)}w ago`;
  return `${Math.floor(days / 30)}mo ago`;
}

export default function PlaylistCard({ playlist, onPlay, size = 'normal' }) {
  const isSmall = size === 'small';
  const isLarge = size === 'large';

  if (isLarge) {
    return (
      <div className="group relative rounded-xl overflow-hidden cursor-pointer">
        <div className="relative h-64 overflow-hidden">
          {playlist.image_url ? (
            <img src={playlist.image_url} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#1DB954] to-[#1aa34a]" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <p className="text-xs font-semibold text-[#1DB954] uppercase tracking-wider mb-1">Featured</p>
            <h3 className="text-2xl font-bold text-white mb-1">{playlist.title}</h3>
            <p className="text-sm text-white/70 line-clamp-1">{playlist.description}</p>
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); onPlay(playlist); }}
            className="absolute right-4 bottom-4 w-12 h-12 rounded-full bg-[#1DB954] flex items-center justify-center shadow-lg shadow-black/40 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:scale-105 hover:bg-[#1ed760]"
          >
            <Play className="w-5 h-5 text-black fill-black ml-0.5" />
          </button>
        </div>
      </div>
    );
  }

  if (isSmall) {
    return (
      <div className="group flex items-center gap-3 bg-[#181818] hover:bg-[#282828] rounded-md overflow-hidden transition-all duration-200 cursor-pointer h-14">
        <div className="w-14 h-14 flex-shrink-0 overflow-hidden">
          {playlist.image_url ? (
            <img src={playlist.image_url} alt="" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-[#282828] flex items-center justify-center">
              <Music className="w-4 h-4 text-[#666]" />
            </div>
          )}
        </div>
        <p className="text-sm font-medium text-white truncate flex-1 pr-2">{playlist.title}</p>
        <button
          onClick={(e) => { e.stopPropagation(); onPlay(playlist); }}
          className="w-8 h-8 rounded-full bg-[#1DB954] flex items-center justify-center shadow-lg opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:scale-105 flex-shrink-0 mr-3"
        >
          <Play className="w-3.5 h-3.5 text-black fill-black ml-0.5" />
        </button>
      </div>
    );
  }

  return (
    <div className="group bg-[#181818] hover:bg-[#282828] p-4 rounded-lg transition-all duration-300 cursor-pointer hover:shadow-xl hover:shadow-black/20">
      <div className="relative aspect-square rounded-md overflow-hidden mb-3">
        {playlist.image_url ? (
          <img src={playlist.image_url} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#1DB954] to-[#1aa34a] flex items-center justify-center">
            <Music className="w-12 h-12 text-white opacity-30" />
          </div>
        )}
        <button
          onClick={(e) => { e.stopPropagation(); onPlay(playlist); }}
          className="absolute right-2 bottom-2 w-10 h-10 rounded-full bg-[#1DB954] flex items-center justify-center shadow-lg shadow-black/40 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:scale-105 hover:bg-[#1ed760]"
        >
          <Play className="w-4 h-4 text-black fill-black ml-0.5" />
        </button>
      </div>
      <h3 className="text-sm font-bold text-white truncate mb-0.5">{playlist.title}</h3>
      <p className="text-xs text-[#B3B3B3] line-clamp-2 leading-relaxed">{playlist.description}</p>
      <div className="mt-2 text-[11px] text-[#666]">
        {formatPlays(playlist.plays)} plays · {timeAgo(playlist.created_at)}
      </div>
    </div>
  );
}
