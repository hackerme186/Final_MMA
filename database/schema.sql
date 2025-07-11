-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create profiles table (extends auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create artists table
CREATE TABLE IF NOT EXISTS artists (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  bio TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create albums table
CREATE TABLE IF NOT EXISTS albums (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  artist_id UUID REFERENCES artists(id) ON DELETE CASCADE,
  cover_url TEXT,
  release_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create songs table
CREATE TABLE IF NOT EXISTS songs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  artist TEXT NOT NULL,
  artist_id UUID REFERENCES artists(id) ON DELETE SET NULL,
  album TEXT,
  album_id UUID REFERENCES albums(id) ON DELETE SET NULL,
  duration INTEGER NOT NULL, -- in seconds
  cover_url TEXT,
  audio_url TEXT NOT NULL,
  genre TEXT,
  track_number INTEGER,
  play_count INTEGER DEFAULT 0,
  release_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create playlists table
CREATE TABLE IF NOT EXISTS playlists (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  cover_url TEXT,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  is_public BOOLEAN DEFAULT false,
  follower_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create playlist_songs junction table
CREATE TABLE IF NOT EXISTS playlist_songs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  playlist_id UUID REFERENCES playlists(id) ON DELETE CASCADE,
  song_id UUID REFERENCES songs(id) ON DELETE CASCADE,
  position INTEGER NOT NULL,
  added_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(playlist_id, song_id)
);

-- Create recently_played table
CREATE TABLE IF NOT EXISTS recently_played (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  song_id UUID REFERENCES songs(id) ON DELETE CASCADE,
  played_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, song_id)
);

-- Create liked_songs table
CREATE TABLE IF NOT EXISTS liked_songs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  song_id UUID REFERENCES songs(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, song_id)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_songs_artist_id ON songs(artist_id);
CREATE INDEX IF NOT EXISTS idx_songs_album_id ON songs(album_id);
CREATE INDEX IF NOT EXISTS idx_songs_genre ON songs(genre);
CREATE INDEX IF NOT EXISTS idx_songs_play_count ON songs(play_count);
CREATE INDEX IF NOT EXISTS idx_playlists_user_id ON playlists(user_id);
CREATE INDEX IF NOT EXISTS idx_playlists_is_public ON playlists(is_public);
CREATE INDEX IF NOT EXISTS idx_playlist_songs_playlist_id ON playlist_songs(playlist_id);
CREATE INDEX IF NOT EXISTS idx_playlist_songs_position ON playlist_songs(position);
CREATE INDEX IF NOT EXISTS idx_recently_played_user_id ON recently_played(user_id);
CREATE INDEX IF NOT EXISTS idx_recently_played_played_at ON recently_played(played_at);
CREATE INDEX IF NOT EXISTS idx_liked_songs_user_id ON liked_songs(user_id);

-- Create function to increment play count
CREATE OR REPLACE FUNCTION increment_play_count(song_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE songs 
  SET play_count = play_count + 1 
  WHERE id = song_id;
END;
$$ LANGUAGE plpgsql;

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers to automatically update updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_artists_updated_at BEFORE UPDATE ON artists
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_albums_updated_at BEFORE UPDATE ON albums
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_songs_updated_at BEFORE UPDATE ON songs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_playlists_updated_at BEFORE UPDATE ON playlists
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create function to handle new user registration
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email)
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user registration
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Enable Row Level Security (RLS)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE artists ENABLE ROW LEVEL SECURITY;
ALTER TABLE albums ENABLE ROW LEVEL SECURITY;
ALTER TABLE songs ENABLE ROW LEVEL SECURITY;
ALTER TABLE playlists ENABLE ROW LEVEL SECURITY;
ALTER TABLE playlist_songs ENABLE ROW LEVEL SECURITY;
ALTER TABLE recently_played ENABLE ROW LEVEL SECURITY;
ALTER TABLE liked_songs ENABLE ROW LEVEL SECURITY;

-- Create RLS policies

-- Profiles policies
CREATE POLICY "Users can view their own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Artists policies (public read access)
CREATE POLICY "Anyone can view artists" ON artists
  FOR SELECT USING (true);

-- Albums policies (public read access)
CREATE POLICY "Anyone can view albums" ON albums
  FOR SELECT USING (true);

-- Songs policies (public read access)
CREATE POLICY "Anyone can view songs" ON songs
  FOR SELECT USING (true);

-- Playlists policies
CREATE POLICY "Anyone can view public playlists" ON playlists
  FOR SELECT USING (is_public = true OR auth.uid() = user_id);

CREATE POLICY "Users can create their own playlists" ON playlists
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own playlists" ON playlists
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own playlists" ON playlists
  FOR DELETE USING (auth.uid() = user_id);

-- Playlist songs policies
CREATE POLICY "Users can view songs in accessible playlists" ON playlist_songs
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM playlists 
      WHERE playlists.id = playlist_songs.playlist_id 
      AND (playlists.is_public = true OR playlists.user_id = auth.uid())
    )
  );

CREATE POLICY "Users can manage songs in their own playlists" ON playlist_songs
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM playlists 
      WHERE playlists.id = playlist_songs.playlist_id 
      AND playlists.user_id = auth.uid()
    )
  );

-- Recently played policies
CREATE POLICY "Users can view their own recently played" ON recently_played
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own recently played" ON recently_played
  FOR ALL USING (auth.uid() = user_id);

-- Liked songs policies
CREATE POLICY "Users can view their own liked songs" ON liked_songs
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own liked songs" ON liked_songs
  FOR ALL USING (auth.uid() = user_id);

-- Insert sample data
INSERT INTO artists (name, bio, avatar_url) VALUES
  ('Maroon 5', 'American pop rock band', 'https://example.com/maroon5.jpg'),
  ('Coldplay', 'British rock band', 'https://example.com/coldplay.jpg'),
  ('Imagine Dragons', 'American pop rock band', 'https://example.com/imaginedragons.jpg'),
  ('The Chainsmokers', 'American DJ duo', 'https://example.com/chainsmokers.jpg'),
  ('Calvin Harris', 'Scottish DJ and record producer', 'https://example.com/calvinharris.jpg');

INSERT INTO albums (title, artist_id, cover_url, release_date) VALUES
  ('V', (SELECT id FROM artists WHERE name = 'Maroon 5'), 'https://example.com/v.jpg', '2014-08-29'),
  ('Parachutes', (SELECT id FROM artists WHERE name = 'Coldplay'), 'https://example.com/parachutes.jpg', '2000-07-10'),
  ('Night Visions', (SELECT id FROM artists WHERE name = 'Imagine Dragons'), 'https://example.com/nightvisions.jpg', '2012-09-04'),
  ('Memories... Do Not Open', (SELECT id FROM artists WHERE name = 'The Chainsmokers'), 'https://example.com/memories.jpg', '2017-04-07'),
  ('18 Months', (SELECT id FROM artists WHERE name = 'Calvin Harris'), 'https://example.com/18months.jpg', '2012-10-26');

INSERT INTO songs (title, artist, artist_id, album, album_id, duration, cover_url, audio_url, genre, track_number) VALUES
  ('Sugar', 'Maroon 5', (SELECT id FROM artists WHERE name = 'Maroon 5'), 'V', (SELECT id FROM albums WHERE title = 'V'), 235, 'https://example.com/sugar.jpg', 'https://example.com/sugar.mp3', 'Pop', 1),
  ('Yellow', 'Coldplay', (SELECT id FROM artists WHERE name = 'Coldplay'), 'Parachutes', (SELECT id FROM albums WHERE title = 'Parachutes'), 266, 'https://example.com/yellow.jpg', 'https://example.com/yellow.mp3', 'Alternative Rock', 1),
  ('Radioactive', 'Imagine Dragons', (SELECT id FROM artists WHERE name = 'Imagine Dragons'), 'Night Visions', (SELECT id FROM albums WHERE title = 'Night Visions'), 187, 'https://example.com/radioactive.jpg', 'https://example.com/radioactive.mp3', 'Alternative Rock', 1),
  ('Closer', 'The Chainsmokers', (SELECT id FROM artists WHERE name = 'The Chainsmokers'), 'Memories... Do Not Open', (SELECT id FROM albums WHERE title = 'Memories... Do Not Open'), 264, 'https://example.com/closer.jpg', 'https://example.com/closer.mp3', 'Electronic', 1),
  ('We Found Love', 'Calvin Harris', (SELECT id FROM artists WHERE name = 'Calvin Harris'), '18 Months', (SELECT id FROM albums WHERE title = '18 Months'), 215, 'https://example.com/wefoundlove.jpg', 'https://example.com/wefoundlove.mp3', 'Electronic', 1); 