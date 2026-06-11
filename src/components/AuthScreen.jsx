import React, { useState } from 'react';
import { Music } from 'lucide-react';

export default function AuthScreen({ onSignIn, onSignUp }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (isSignUp) {
        if (!displayName.trim()) throw new Error('Display name is required');
        if (password.length < 6) throw new Error('Password must be at least 6 characters');
        await onSignUp(email, password, displayName.trim());
      } else {
        await onSignIn(email, password);
      }
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#121212] via-[#1a1a2e] to-[#16213e] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-center gap-3 mb-10">
          <div className="w-12 h-12 bg-gradient-to-br from-[#1DB954] to-[#1aa34a] rounded-xl flex items-center justify-center shadow-lg shadow-[#1DB954]/20">
            <Music className="w-7 h-7 text-white" />
          </div>
          <span className="text-3xl font-bold text-white tracking-tight">SoundHub</span>
        </div>

        <div className="bg-[#181818] rounded-2xl p-8 shadow-2xl border border-[#282828]">
          <h2 className="text-2xl font-bold text-white mb-2">
            {isSignUp ? 'Create your account' : 'Welcome back'}
          </h2>
          <p className="text-[#B3B3B3] mb-8">
            {isSignUp ? 'Start your premium music journey' : 'Sign in to continue listening'}
          </p>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 mb-6 text-red-400 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {isSignUp && (
              <div>
                <label className="block text-sm font-medium text-[#B3B3B3] mb-2">Display name</label>
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full bg-[#282828] border border-[#404040] rounded-lg px-4 py-3 text-white placeholder-[#666] focus:outline-none focus:border-[#1DB954] focus:ring-1 focus:ring-[#1DB954] transition-colors"
                  placeholder="What should we call you?"
                />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-[#B3B3B3] mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#282828] border border-[#404040] rounded-lg px-4 py-3 text-white placeholder-[#666] focus:outline-none focus:border-[#1DB954] focus:ring-1 focus:ring-[#1DB954] transition-colors"
                placeholder="you@example.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#B3B3B3] mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#282828] border border-[#404040] rounded-lg px-4 py-3 text-white placeholder-[#666] focus:outline-none focus:border-[#1DB954] focus:ring-1 focus:ring-[#1DB954] transition-colors"
                placeholder="Enter your password"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#1DB954] text-black font-semibold py-3 px-4 rounded-lg hover:bg-[#1ed760] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Please wait...' : isSignUp ? 'Sign Up' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => { setIsSignUp(!isSignUp); setError(''); }}
              className="text-[#B3B3B3] hover:text-white text-sm transition-colors"
            >
              {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
