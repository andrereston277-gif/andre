import React, { useState } from 'react';
import { X } from 'lucide-react';

export default function CreatePlaylistModal({ onClose, onCreate }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) { setError('Title is required'); return; }
    setLoading(true);
    setError('');
    try {
      await onCreate({ title: title.trim(), description: description.trim() });
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-[#282828] rounded-xl w-full max-w-lg p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Create Playlist</h2>
          <button onClick={onClose} className="text-[#B3B3B3] hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 mb-4 text-red-400 text-sm">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#B3B3B3] mb-1.5">Name</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="My awesome playlist"
              className="w-full bg-[#181818] border border-[#404040] rounded-lg px-4 py-2.5 text-white placeholder-[#666] focus:outline-none focus:border-[#1DB954] focus:ring-1 focus:ring-[#1DB954] transition-colors text-sm"
              autoFocus
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#B3B3B3] mb-1.5">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What's this playlist about?"
              rows={3}
              className="w-full bg-[#181818] border border-[#404040] rounded-lg px-4 py-2.5 text-white placeholder-[#666] focus:outline-none focus:border-[#1DB954] focus:ring-1 focus:ring-[#1DB954] transition-colors text-sm resize-none"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#1DB954] text-black font-semibold py-2.5 rounded-lg hover:bg-[#1ed760] transition-all disabled:opacity-50 text-sm"
          >
            {loading ? 'Creating...' : 'Create'}
          </button>
        </form>
      </div>
    </div>
  );
}
