-- ========================================
-- MELOSTREAM DATABASE EXTENSIONS
-- Chạy script này sau khi đã chạy schema.sql
-- ========================================

-- 1. THÊM CÁC BẢNG MỞ RỘNG
-- ========================================

-- Bảng Categories (Thể loại)
CREATE TABLE IF NOT EXISTS categories (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  color TEXT DEFAULT '#1DB954',
  icon TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Thêm relationship với songs
ALTER TABLE songs ADD COLUMN IF NOT EXISTS category_id UUID REFERENCES categories(id) ON DELETE SET NULL;
CREATE INDEX IF NOT EXISTS idx_songs_category_id ON songs(category_id);

-- Bảng Follows (Theo dõi nghệ sĩ)
CREATE TABLE IF NOT EXISTS follows (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  artist_id UUID REFERENCES artists(id) ON DELETE CASCADE,
  followed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, artist_id)
);

CREATE INDEX IF NOT EXISTS idx_follows_user_id ON follows(user_id);
CREATE INDEX IF NOT EXISTS idx_follows_artist_id ON follows(artist_id);

-- Bảng Downloads (Tải xuống)
CREATE TABLE IF NOT EXISTS downloads (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  song_id UUID REFERENCES songs(id) ON DELETE CASCADE,
  file_path TEXT,
  file_size BIGINT,
  download_quality TEXT DEFAULT 'standard',
  downloaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, song_id)
);

CREATE INDEX IF NOT EXISTS idx_downloads_user_id ON downloads(user_id);

-- Bảng Playlist Followers
CREATE TABLE IF NOT EXISTS playlist_followers (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  playlist_id UUID REFERENCES playlists(id) ON DELETE CASCADE,
  followed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, playlist_id)
);

CREATE INDEX IF NOT EXISTS idx_playlist_followers_user_id ON playlist_followers(user_id);
CREATE INDEX IF NOT EXISTS idx_playlist_followers_playlist_id ON playlist_followers(playlist_id);

-- Bảng Song Ratings (Đánh giá bài hát)
CREATE TABLE IF NOT EXISTS song_ratings (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  song_id UUID REFERENCES songs(id) ON DELETE CASCADE,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  review TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, song_id)
);

CREATE INDEX IF NOT EXISTS idx_song_ratings_song_id ON song_ratings(song_id);
CREATE INDEX IF NOT EXISTS idx_song_ratings_rating ON song_ratings(rating);

-- Bảng Listening History (Lịch sử nghe chi tiết)
CREATE TABLE IF NOT EXISTS listening_history (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  song_id UUID REFERENCES songs(id) ON DELETE CASCADE,
  duration_listened INTEGER DEFAULT 0, -- seconds
  completed BOOLEAN DEFAULT false,
  device_type TEXT,
  ip_address INET,
  played_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_listening_history_user_id ON listening_history(user_id);
CREATE INDEX IF NOT EXISTS idx_listening_history_played_at ON listening_history(played_at);

-- 2. ENABLE RLS CHO CÁC BẢNG MỚI
-- ========================================

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE follows ENABLE ROW LEVEL SECURITY;
ALTER TABLE downloads ENABLE ROW LEVEL SECURITY;
ALTER TABLE playlist_followers ENABLE ROW LEVEL SECURITY;
ALTER TABLE song_ratings ENABLE ROW LEVEL SECURITY;
ALTER TABLE listening_history ENABLE ROW LEVEL SECURITY;

-- 3. TẠO RLS POLICIES
-- ========================================

-- Categories Policies
CREATE POLICY "Anyone can view categories" ON categories
  FOR SELECT USING (true);

-- Follows Policies
CREATE POLICY "Users can view their own follows" ON follows
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own follows" ON follows
  FOR ALL USING (auth.uid() = user_id);

-- Downloads Policies
CREATE POLICY "Users can view their own downloads" ON downloads
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own downloads" ON downloads
  FOR ALL USING (auth.uid() = user_id);

-- Playlist Followers Policies
CREATE POLICY "Users can view their own playlist follows" ON playlist_followers
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own playlist follows" ON playlist_followers
  FOR ALL USING (auth.uid() = user_id);

-- Song Ratings Policies
CREATE POLICY "Anyone can view song ratings" ON song_ratings
  FOR SELECT USING (true);

CREATE POLICY "Users can manage their own ratings" ON song_ratings
  FOR ALL USING (auth.uid() = user_id);

-- Listening History Policies
CREATE POLICY "Users can view their own listening history" ON listening_history
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own listening history" ON listening_history
  FOR ALL USING (auth.uid() = user_id);

-- 4. THÊM TRIGGERS CHO UPDATED_AT
-- ========================================

CREATE TRIGGER update_song_ratings_updated_at BEFORE UPDATE ON song_ratings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 5. THÊM SAMPLE DATA
-- ========================================

-- Categories mẫu
INSERT INTO categories (name, description, color, icon) VALUES
  ('Pop', 'Popular music genre', '#FF6B6B', 'musical-note'),
  ('Rock', 'Rock music genre', '#4ECDC4', 'guitar'),
  ('Electronic', 'Electronic dance music', '#45B7D1', 'radio'),
  ('Hip Hop', 'Hip hop and rap music', '#96CEB4', 'microphone'),
  ('Jazz', 'Jazz music genre', '#FFEAA7', 'saxophone'),
  ('Classical', 'Classical music', '#DDA0DD', 'piano'),
  ('Country', 'Country music', '#F4A460', 'banjo'),
  ('R&B', 'Rhythm and blues', '#FFB6C1', 'heart')
ON CONFLICT (name) DO NOTHING;

-- Cập nhật songs với category_id
UPDATE songs SET category_id = (SELECT id FROM categories WHERE name = 'Pop') 
WHERE genre = 'Pop' AND category_id IS NULL;

UPDATE songs SET category_id = (SELECT id FROM categories WHERE name = 'Rock') 
WHERE genre = 'Alternative Rock' AND category_id IS NULL;

UPDATE songs SET category_id = (SELECT id FROM categories WHERE name = 'Electronic') 
WHERE genre = 'Electronic' AND category_id IS NULL;
