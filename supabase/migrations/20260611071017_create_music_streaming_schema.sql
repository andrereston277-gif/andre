/*
# Create Music Streaming Schema (single-tenant, no auth)

1. New Tables
- `playlists`
  - `id` (uuid, primary key)
  - `title` (text, not null) — playlist name
  - `description` (text) — playlist description
  - `plays` (integer, default 0) — total play count
  - `image_url` (text) — optional cover art URL
  - `created_at` (timestamptz, default now())
- `tracks`
  - `id` (uuid, primary key)
  - `title` (text, not null) — track name
  - `artist` (text, not null) — artist name
  - `album` (text) — optional album name
  - `duration` (integer) — duration in seconds
  - `image_url` (text) — optional cover art URL
  - `created_at` (timestamptz, default now())
- `playlist_tracks`
  - `id` (uuid, primary key)
  - `playlist_id` (uuid, foreign key to playlists, cascade delete)
  - `track_id` (uuid, foreign key to tracks, cascade delete)
  - `position` (integer, not null) — track order within playlist
  - `created_at` (timestamptz, default now())
  - UNIQUE constraint on (playlist_id, track_id) — no duplicate tracks per playlist
  - UNIQUE constraint on (playlist_id, position) — no position conflicts

2. Indexes
- `idx_playlist_tracks_playlist` on playlist_tracks(playlist_id) — fast playlist lookups
- `idx_playlist_tracks_position` on playlist_tracks(playlist_id, position) — ordered track retrieval

3. Security
- RLS enabled on all tables.
- Public CRUD access (anon + authenticated) since this is a single-tenant app with no sign-in.

4. Notes
1. This schema supports the existing SoundHub UI features: browsing playlists, viewing tracks, and playback.
2. The playlist_tracks junction table enables many-to-many relationships with explicit ordering.
3. No user_id columns since no auth was requested.
*/

CREATE TABLE IF NOT EXISTS playlists (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  plays integer NOT NULL DEFAULT 0,
  image_url text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE playlists ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_playlists" ON playlists;
CREATE POLICY "anon_select_playlists" ON playlists FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_playlists" ON playlists;
CREATE POLICY "anon_insert_playlists" ON playlists FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_playlists" ON playlists;
CREATE POLICY "anon_update_playlists" ON playlists FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_playlists" ON playlists;
CREATE POLICY "anon_delete_playlists" ON playlists FOR DELETE
  TO anon, authenticated USING (true);

CREATE TABLE IF NOT EXISTS tracks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  artist text NOT NULL,
  album text,
  duration integer,
  image_url text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE tracks ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_tracks" ON tracks;
CREATE POLICY "anon_select_tracks" ON tracks FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_tracks" ON tracks;
CREATE POLICY "anon_insert_tracks" ON tracks FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_tracks" ON tracks;
CREATE POLICY "anon_update_tracks" ON tracks FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_tracks" ON tracks;
CREATE POLICY "anon_delete_tracks" ON tracks FOR DELETE
  TO anon, authenticated USING (true);

CREATE TABLE IF NOT EXISTS playlist_tracks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  playlist_id uuid NOT NULL REFERENCES playlists(id) ON DELETE CASCADE,
  track_id uuid NOT NULL REFERENCES tracks(id) ON DELETE CASCADE,
  position integer NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE (playlist_id, track_id),
  UNIQUE (playlist_id, position)
);

ALTER TABLE playlist_tracks ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_playlist_tracks" ON playlist_tracks;
CREATE POLICY "anon_select_playlist_tracks" ON playlist_tracks FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_playlist_tracks" ON playlist_tracks;
CREATE POLICY "anon_insert_playlist_tracks" ON playlist_tracks FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_playlist_tracks" ON playlist_tracks;
CREATE POLICY "anon_update_playlist_tracks" ON playlist_tracks FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_playlist_tracks" ON playlist_tracks;
CREATE POLICY "anon_delete_playlist_tracks" ON playlist_tracks FOR DELETE
  TO anon, authenticated USING (true);

CREATE INDEX IF NOT EXISTS idx_playlist_tracks_playlist ON playlist_tracks(playlist_id);
CREATE INDEX IF NOT EXISTS idx_playlist_tracks_position ON playlist_tracks(playlist_id, position);
