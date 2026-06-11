import React from 'react';
import PlaylistCard from './PlaylistCard';

function ScrollRow({ title, children }) {
  return (
    <section className="mb-10">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-white hover:underline cursor-pointer">{title}</h2>
        <button className="text-sm font-semibold text-[#B3B3B3] hover:text-white transition-colors">Show all</button>
      </div>
      <div className="flex gap-5 overflow-x-auto pb-4 -mx-2 px-2 scrollbar-hide">
        {children}
      </div>
    </section>
  );
}

export default function Dashboard({ playlists, profile, onPlayPlaylist }) {
  const firstName = profile?.display_name?.split(' ')[0] || 'there';

  const greeting = (() => {
    const h = new Date().getHours();
    if (h < 12) return 'Good morning';
    if (h < 18) return 'Good afternoon';
    return 'Good evening';
  })();

  const featured = playlists[0];
  const quickAccess = playlists.slice(0, 6);
  const madeForYou = playlists.slice(1, 5);
  const topMixes = playlists.slice(2);
  const recentlyPlayed = [...playlists].reverse();

  return (
    <div className="p-6 pb-32">
      <h1 className="text-3xl font-bold text-white mb-6">
        {greeting}, {firstName}
      </h1>

      {/* Quick access row */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-10">
        {quickAccess.map((pl) => (
          <PlaylistCard key={pl.id} playlist={pl} onPlay={onPlayPlaylist} size="small" />
        ))}
      </div>

      {/* Featured banner */}
      {featured && (
        <section className="mb-10">
          <PlaylistCard playlist={featured} onPlay={onPlayPlaylist} size="large" />
        </section>
      )}

      <ScrollRow title="Made For You">
        {madeForYou.map((pl) => (
          <div key={pl.id} className="flex-shrink-0 w-[180px]">
            <PlaylistCard playlist={pl} onPlay={onPlayPlaylist} />
          </div>
        ))}
      </ScrollRow>

      <ScrollRow title="Your Top Mixes">
        {topMixes.map((pl) => (
          <div key={pl.id} className="flex-shrink-0 w-[180px]">
            <PlaylistCard playlist={pl} onPlay={onPlayPlaylist} />
          </div>
        ))}
      </ScrollRow>

      <ScrollRow title="Recently Played">
        {recentlyPlayed.map((pl) => (
          <div key={pl.id} className="flex-shrink-0 w-[180px]">
            <PlaylistCard playlist={pl} onPlay={onPlayPlaylist} />
          </div>
        ))}
      </ScrollRow>
    </div>
  );
}
