import React, { useState, useEffect, useRef, useCallback } from 'react';
import Lenis from '@studio-freight/lenis';
import { Loader2 } from 'lucide-react';
import { supabase } from './lib/supabase';
import { useAuth } from './hooks/useAuth';
import AuthScreen from './components/AuthScreen';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import PlayerBar from './components/PlayerBar';
import Dashboard from './components/Dashboard';
import CreatePlaylistModal from './components/CreatePlaylistModal';

export default function MusicStreamingApp() {
  const { user, profile, loading: authLoading, signIn, signUp, signOut } = useAuth();
  const [playlists, setPlaylists] = useState([]);
  const [userPlaylists, setUserPlaylists] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [shuffle, setShuffle] = useState(false);
  const [repeatMode, setRepeatMode] = useState(0);
  const [volume, setVolume] = useState(70);
  const [activeView, setActiveView] = useState('home');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [dataLoading, setDataLoading] = useState(true);
  const progressInterval = useRef(null);
  const nextRef = useRef(null);

  const fetchPlaylists = useCallback(async () => {
    const { data } = await supabase
      .from('playlists')
      .select('*')
      .or(`user_id.is.null,user_id.eq.${user?.id || '00000000-0000-0000-0000-000000000000'}`)
      .order('created_at', { ascending: false });
    return data || [];
  }, [user]);

  const fetchUserPlaylists = useCallback(async () => {
    if (!user) return [];
    const { data } = await supabase
      .from('playlists')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });
    return data || [];
  }, [user]);

  useEffect(() => {
    if (!user) return;
    (async () => {
      try {
        const [pl, upl, tr] = await Promise.all([
          fetchPlaylists(),
          fetchUserPlaylists(),
          supabase.from('tracks').select('*').order('created_at'),
        ]);
        setPlaylists(pl);
        setUserPlaylists(upl);
        const allTracks = tr.data || [];
        setTracks(allTracks);
      } catch {
        // empty states handle this
      } finally {
        setDataLoading(false);
      }
    })();
  }, [user, fetchPlaylists, fetchUserPlaylists]);

  const handleNext = useCallback(() => {
    if (shuffle) {
      setCurrentTrackIndex(Math.floor(Math.random() * tracks.length));
    } else {
      setCurrentTrackIndex((prev) => (prev + 1) % Math.max(tracks.length, 1));
    }
    setProgress(0);
  }, [shuffle, tracks.length]);

  const handlePrev = useCallback(() => {
    if (progress > 10) {
      setProgress(0);
    } else {
      setCurrentTrackIndex((prev) => (prev - 1 + Math.max(tracks.length, 1)) % Math.max(tracks.length, 1));
      setProgress(0);
    }
  }, [progress, tracks.length]);

  nextRef.current = handleNext;

  // Progress simulation
  useEffect(() => {
    if (!isPlaying) {
      clearInterval(progressInterval.current);
      return;
    }
    progressInterval.current = setInterval(() => {
      setProgress((p) => p + 0.3);
    }, 1000);
    return () => clearInterval(progressInterval.current);
  }, [isPlaying]);

  // Auto-advance
  useEffect(() => {
    if (progress >= 100 && nextRef.current) {
      nextRef.current();
    }
  }, [progress]);

  // Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smooth: true });
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  const handlePlayPlaylist = async (playlist) => {
    const { data: pt } = await supabase
      .from('playlist_tracks')
      .select('track_id, tracks(*)')
      .eq('playlist_id', playlist.id)
      .order('position');
    if (pt?.length) {
      const plsTracks = pt.map((p) => p.tracks).filter(Boolean);
      setTracks(plsTracks);
      setCurrentTrackIndex(0);
      setIsPlaying(true);
      setProgress(0);
    }
  };

  const handleCreatePlaylist = async ({ title, description }) => {
    const { error } = await supabase.from('playlists').insert({
      title,
      description: description || null,
      user_id: user.id,
    });
    if (error) throw error;
    const [upl, pl] = await Promise.all([fetchUserPlaylists(), fetchPlaylists()]);
    setUserPlaylists(upl);
    setPlaylists(pl);
  };

  const currentTrack = tracks[currentTrackIndex] || null;

  if (authLoading) {
    return (
      <div className="h-screen bg-[#121212] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#1DB954] animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <AuthScreen onSignIn={signIn} onSignUp={signUp} />;
  }

  return (
    <div className="flex h-screen bg-[#121212] font-inter overflow-hidden">
      <Sidebar
        activeView={activeView}
        onNavigate={setActiveView}
        onOpenCreatePlaylist={() => setShowCreateModal(true)}
        userPlaylists={userPlaylists}
      />

      <main className="ml-60 flex-1 h-screen overflow-y-auto">
        <TopBar profile={profile} onSignOut={signOut} />

        {dataLoading ? (
          <div className="flex items-center justify-center py-32">
            <Loader2 className="w-8 h-8 text-[#1DB954] animate-spin" />
          </div>
        ) : (
          <Dashboard
            playlists={playlists}
            profile={profile}
            onPlayPlaylist={handlePlayPlaylist}
          />
        )}
      </main>

      <PlayerBar
        currentTrack={currentTrack}
        isPlaying={isPlaying}
        progress={progress}
        onPlayPause={() => setIsPlaying(!isPlaying)}
        onNext={handleNext}
        onPrev={handlePrev}
        shuffle={shuffle}
        repeatMode={repeatMode}
        onToggleShuffle={() => setShuffle(!shuffle)}
        onToggleRepeat={() => setRepeatMode((m) => (m + 1) % 3)}
        volume={volume}
        onVolumeChange={setVolume}
      />

      {showCreateModal && (
        <CreatePlaylistModal
          onClose={() => setShowCreateModal(false)}
          onCreate={handleCreatePlaylist}
        />
      )}
    </div>
  );
}
