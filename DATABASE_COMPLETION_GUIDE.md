# 🎵 Hướng Dẫn Hoàn Thiện Database MeloStream

## 📊 Phân Tích Cấu Trúc Hiện Tại

### ✅ Bảng Đã Có:

- **profiles**: Thông tin người dùng (✅ Hoàn chỉnh)
- **artists**: Nghệ sĩ (✅ Hoàn chỉnh)
- **albums**: Album (✅ Hoàn chỉnh)
- **songs**: Bài hát (✅ Hoàn chỉnh)
- **playlists**: Playlist (✅ Hoàn chỉnh)
- **playlist_songs**: Quan hệ playlist-song (✅ Hoàn chỉnh)
- **recently_played**: Lịch sử phát (✅ Hoàn chỉnh)
- **liked_songs**: Bài hát yêu thích (✅ Hoàn chỉnh)

### 🔄 Relationships Hiện Tại:

```
profiles (1) ←→ (N) playlists
profiles (1) ←→ (N) recently_played
profiles (1) ←→ (N) liked_songs

artists (1) ←→ (N) albums
artists (1) ←→ (N) songs

albums (1) ←→ (N) songs

playlists (N) ←→ (N) songs (qua playlist_songs)
```

## 🎯 Bước 1: Thêm Các Bảng Mở Rộng

### 1.1 Bảng Categories (Thể loại)

```sql
-- Tạo bảng categories
CREATE TABLE IF NOT EXISTS categories (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  color TEXT DEFAULT '#1DB954',
  icon TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Thêm relationship với songs
ALTER TABLE songs ADD COLUMN category_id UUID REFERENCES categories(id) ON DELETE SET NULL;
CREATE INDEX IF NOT EXISTS idx_songs_category_id ON songs(category_id);
```

### 1.2 Bảng Follows (Theo dõi nghệ sĩ)

```sql
-- Tạo bảng follows
CREATE TABLE IF NOT EXISTS follows (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  artist_id UUID REFERENCES artists(id) ON DELETE CASCADE,
  followed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, artist_id)
);

CREATE INDEX IF NOT EXISTS idx_follows_user_id ON follows(user_id);
CREATE INDEX IF NOT EXISTS idx_follows_artist_id ON follows(artist_id);
```

### 1.3 Bảng Downloads (Tải xuống)

```sql
-- Tạo bảng downloads
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
```

## 🎯 Bước 2: Thêm Chức Năng Nâng Cao

### 2.1 Bảng Playlist Followers

```sql
-- Tạo bảng playlist_followers
CREATE TABLE IF NOT EXISTS playlist_followers (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  playlist_id UUID REFERENCES playlists(id) ON DELETE CASCADE,
  followed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, playlist_id)
);

CREATE INDEX IF NOT EXISTS idx_playlist_followers_user_id ON playlist_followers(user_id);
CREATE INDEX IF NOT EXISTS idx_playlist_followers_playlist_id ON playlist_followers(playlist_id);
```

### 2.2 Bảng Song Ratings (Đánh giá bài hát)

```sql
-- Tạo bảng song_ratings
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
```

### 2.3 Bảng Listening History (Lịch sử nghe chi tiết)

```sql
-- Tạo bảng listening_history
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
```

## 🎯 Bước 3: Thêm RLS Policies Cho Bảng Mới

### 3.1 Categories Policies

```sql
-- Enable RLS
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

-- Anyone can view categories
CREATE POLICY "Anyone can view categories" ON categories
  FOR SELECT USING (true);
```

### 3.2 Follows Policies

```sql
-- Enable RLS
ALTER TABLE follows ENABLE ROW LEVEL SECURITY;

-- Users can view their own follows
CREATE POLICY "Users can view their own follows" ON follows
  FOR SELECT USING (auth.uid() = user_id);

-- Users can manage their own follows
CREATE POLICY "Users can manage their own follows" ON follows
  FOR ALL USING (auth.uid() = user_id);
```

### 3.3 Downloads Policies

```sql
-- Enable RLS
ALTER TABLE downloads ENABLE ROW LEVEL SECURITY;

-- Users can view their own downloads
CREATE POLICY "Users can view their own downloads" ON downloads
  FOR SELECT USING (auth.uid() = user_id);

-- Users can manage their own downloads
CREATE POLICY "Users can manage their own downloads" ON downloads
  FOR ALL USING (auth.uid() = user_id);
```

### 3.4 Playlist Followers Policies

```sql
-- Enable RLS
ALTER TABLE playlist_followers ENABLE ROW LEVEL SECURITY;

-- Users can view their own playlist follows
CREATE POLICY "Users can view their own playlist follows" ON playlist_followers
  FOR SELECT USING (auth.uid() = user_id);

-- Users can manage their own playlist follows
CREATE POLICY "Users can manage their own playlist follows" ON playlist_followers
  FOR ALL USING (auth.uid() = user_id);
```

### 3.5 Song Ratings Policies

```sql
-- Enable RLS
ALTER TABLE song_ratings ENABLE ROW LEVEL SECURITY;

-- Anyone can view ratings
CREATE POLICY "Anyone can view song ratings" ON song_ratings
  FOR SELECT USING (true);

-- Users can manage their own ratings
CREATE POLICY "Users can manage their own ratings" ON song_ratings
  FOR ALL USING (auth.uid() = user_id);
```

### 3.6 Listening History Policies

```sql
-- Enable RLS
ALTER TABLE listening_history ENABLE ROW LEVEL SECURITY;

-- Users can view their own listening history
CREATE POLICY "Users can view their own listening history" ON listening_history
  FOR SELECT USING (auth.uid() = user_id);

-- Users can manage their own listening history
CREATE POLICY "Users can manage their own listening history" ON listening_history
  FOR ALL USING (auth.uid() = user_id);
```

## 🎯 Bước 4: Thêm Functions Hữu Ích

### 4.1 Function Tính Toán Thống Kê

```sql
-- Function để lấy top songs theo play count
CREATE OR REPLACE FUNCTION get_top_songs(limit_count INTEGER DEFAULT 10)
RETURNS TABLE (
  id UUID,
  title TEXT,
  artist TEXT,
  play_count INTEGER,
  avg_rating NUMERIC
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    s.id,
    s.title,
    s.artist,
    s.play_count,
    COALESCE(AVG(sr.rating), 0) as avg_rating
  FROM songs s
  LEFT JOIN song_ratings sr ON s.id = sr.song_id
  GROUP BY s.id, s.title, s.artist, s.play_count
  ORDER BY s.play_count DESC, avg_rating DESC
  LIMIT limit_count;
END;
$$ LANGUAGE plpgsql;
```

### 4.2 Function Recommendations

```sql
-- Function để recommend songs dựa trên listening history
CREATE OR REPLACE FUNCTION get_recommended_songs(user_uuid UUID, limit_count INTEGER DEFAULT 10)
RETURNS TABLE (
  id UUID,
  title TEXT,
  artist TEXT,
  similarity_score NUMERIC
) AS $$
BEGIN
  RETURN QUERY
  WITH user_genres AS (
    SELECT s.genre, COUNT(*) as listen_count
    FROM listening_history lh
    JOIN songs s ON lh.song_id = s.id
    WHERE lh.user_id = user_uuid
    GROUP BY s.genre
    ORDER BY listen_count DESC
    LIMIT 3
  ),
  similar_songs AS (
    SELECT s.id, s.title, s.artist, s.genre,
           ROW_NUMBER() OVER (PARTITION BY s.genre ORDER BY s.play_count DESC) as rn
    FROM songs s
    WHERE s.genre IN (SELECT genre FROM user_genres)
    AND s.id NOT IN (
      SELECT song_id FROM listening_history WHERE user_id = user_uuid
    )
  )
  SELECT ss.id, ss.title, ss.artist,
         (4.0 - ss.rn::NUMERIC / 10.0) as similarity_score
  FROM similar_songs ss
  WHERE ss.rn <= 5
  ORDER BY similarity_score DESC
  LIMIT limit_count;
END;
$$ LANGUAGE plpgsql;
```

## 🎯 Bước 5: Tạo Views Hữu Ích

### 5.1 View Song Details

```sql
-- View để lấy thông tin chi tiết bài hát
CREATE OR REPLACE VIEW song_details AS
SELECT
  s.id,
  s.title,
  s.artist,
  s.album,
  s.duration,
  s.cover_url,
  s.audio_url,
  s.genre,
  s.play_count,
  s.release_date,
  a.name as artist_name,
  a.avatar_url as artist_avatar,
  al.title as album_title,
  al.cover_url as album_cover,
  COALESCE(AVG(sr.rating), 0) as avg_rating,
  COUNT(sr.id) as rating_count,
  COUNT(ls.id) as like_count
FROM songs s
LEFT JOIN artists a ON s.artist_id = a.id
LEFT JOIN albums al ON s.album_id = al.id
LEFT JOIN song_ratings sr ON s.id = sr.song_id
LEFT JOIN liked_songs ls ON s.id = ls.song_id
GROUP BY s.id, s.title, s.artist, s.album, s.duration, s.cover_url,
         s.audio_url, s.genre, s.play_count, s.release_date,
         a.name, a.avatar_url, al.title, al.cover_url;
```

### 5.2 View User Statistics

```sql
-- View thống kê người dùng
CREATE OR REPLACE VIEW user_statistics AS
SELECT
  p.id as user_id,
  p.full_name,
  COUNT(DISTINCT ls.song_id) as liked_songs_count,
  COUNT(DISTINCT pl.id) as playlists_count,
  COUNT(DISTINCT f.artist_id) as following_artists_count,
  COUNT(DISTINCT d.song_id) as downloaded_songs_count,
  COUNT(DISTINCT lh.song_id) as unique_songs_played,
  SUM(lh.duration_listened) as total_listening_time
FROM profiles p
LEFT JOIN liked_songs ls ON p.id = ls.user_id
LEFT JOIN playlists pl ON p.id = pl.user_id
LEFT JOIN follows f ON p.id = f.user_id
LEFT JOIN downloads d ON p.id = d.user_id
LEFT JOIN listening_history lh ON p.id = lh.user_id
GROUP BY p.id, p.full_name;
```

## 🎯 Bước 6: Thêm Sample Data

### 6.1 Categories Data

```sql
-- Thêm categories mẫu
INSERT INTO categories (name, description, color, icon) VALUES
  ('Pop', 'Popular music genre', '#FF6B6B', 'musical-note'),
  ('Rock', 'Rock music genre', '#4ECDC4', 'guitar'),
  ('Electronic', 'Electronic dance music', '#45B7D1', 'radio'),
  ('Hip Hop', 'Hip hop and rap music', '#96CEB4', 'microphone'),
  ('Jazz', 'Jazz music genre', '#FFEAA7', 'saxophone'),
  ('Classical', 'Classical music', '#DDA0DD', 'piano'),
  ('Country', 'Country music', '#F4A460', 'banjo'),
  ('R&B', 'Rhythm and blues', '#FFB6C1', 'heart');

-- Cập nhật songs với category_id
UPDATE songs SET category_id = (SELECT id FROM categories WHERE name = 'Pop')
WHERE genre = 'Pop';

UPDATE songs SET category_id = (SELECT id FROM categories WHERE name = 'Rock')
WHERE genre = 'Alternative Rock';

UPDATE songs SET category_id = (SELECT id FROM categories WHERE name = 'Electronic')
WHERE genre = 'Electronic';
```

## 🎯 Bước 7: Tạo Services TypeScript

### 7.1 Category Service

```typescript
// src/services/categoryService.ts
import { supabase } from "../../supabase";

export interface Category {
  id: string;
  name: string;
  description?: string;
  color: string;
  icon?: string;
  created_at: string;
}

export const categoryService = {
  async getCategories() {
    try {
      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .order("name");

      if (error) throw error;
      return { categories: data, error: null };
    } catch (error) {
      return { categories: null, error };
    }
  },

  async getSongsByCategory(categoryId: string) {
    try {
      const { data, error } = await supabase
        .from("songs")
        .select(
          `
          *,
          artists (name, avatar_url),
          albums (title, cover_url)
        `
        )
        .eq("category_id", categoryId)
        .order("play_count", { ascending: false });

      if (error) throw error;
      return { songs: data, error: null };
    } catch (error) {
      return { songs: null, error };
    }
  },
};
```
