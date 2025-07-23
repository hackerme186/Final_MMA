-- ========================================
-- MELOSTREAM DATABASE FUNCTIONS & VIEWS
-- Chạy script này sau extensions.sql
-- ========================================

-- 1. FUNCTIONS THỐNG KÊ VÀ RECOMMENDATION
-- ========================================

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

-- Function để lấy trending songs (dựa trên recent plays)
CREATE OR REPLACE FUNCTION get_trending_songs(days_back INTEGER DEFAULT 7, limit_count INTEGER DEFAULT 20)
RETURNS TABLE (
  id UUID,
  title TEXT,
  artist TEXT,
  recent_plays BIGINT,
  trend_score NUMERIC
) AS $$
BEGIN
  RETURN QUERY
  WITH recent_activity AS (
    SELECT 
      lh.song_id,
      COUNT(*) as recent_plays,
      COUNT(DISTINCT lh.user_id) as unique_listeners
    FROM listening_history lh
    WHERE lh.played_at >= NOW() - INTERVAL '1 day' * days_back
    GROUP BY lh.song_id
  )
  SELECT 
    s.id,
    s.title,
    s.artist,
    ra.recent_plays,
    (ra.recent_plays::NUMERIC * 0.7 + ra.unique_listeners::NUMERIC * 0.3) as trend_score
  FROM songs s
  JOIN recent_activity ra ON s.id = ra.song_id
  ORDER BY trend_score DESC
  LIMIT limit_count;
END;
$$ LANGUAGE plpgsql;

-- Function để search songs với ranking
CREATE OR REPLACE FUNCTION search_songs(search_term TEXT, limit_count INTEGER DEFAULT 20)
RETURNS TABLE (
  id UUID,
  title TEXT,
  artist TEXT,
  album TEXT,
  relevance_score NUMERIC
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    s.id,
    s.title,
    s.artist,
    s.album,
    (
      CASE 
        WHEN LOWER(s.title) = LOWER(search_term) THEN 100
        WHEN LOWER(s.title) LIKE LOWER(search_term || '%') THEN 90
        WHEN LOWER(s.title) LIKE LOWER('%' || search_term || '%') THEN 80
        ELSE 0
      END +
      CASE 
        WHEN LOWER(s.artist) = LOWER(search_term) THEN 80
        WHEN LOWER(s.artist) LIKE LOWER(search_term || '%') THEN 70
        WHEN LOWER(s.artist) LIKE LOWER('%' || search_term || '%') THEN 60
        ELSE 0
      END +
      CASE 
        WHEN LOWER(s.album) = LOWER(search_term) THEN 60
        WHEN LOWER(s.album) LIKE LOWER(search_term || '%') THEN 50
        WHEN LOWER(s.album) LIKE LOWER('%' || search_term || '%') THEN 40
        ELSE 0
      END +
      (s.play_count::NUMERIC / 1000) -- Bonus for popularity
    ) as relevance_score
  FROM songs s
  WHERE 
    LOWER(s.title) LIKE LOWER('%' || search_term || '%') OR
    LOWER(s.artist) LIKE LOWER('%' || search_term || '%') OR
    LOWER(s.album) LIKE LOWER('%' || search_term || '%')
  ORDER BY relevance_score DESC
  LIMIT limit_count;
END;
$$ LANGUAGE plpgsql;

-- 2. VIEWS HỮU ÍCH
-- ========================================

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
  s.track_number,
  a.name as artist_name,
  a.avatar_url as artist_avatar,
  al.title as album_title,
  al.cover_url as album_cover,
  c.name as category_name,
  c.color as category_color,
  COALESCE(AVG(sr.rating), 0) as avg_rating,
  COUNT(sr.id) as rating_count,
  COUNT(ls.id) as like_count
FROM songs s
LEFT JOIN artists a ON s.artist_id = a.id
LEFT JOIN albums al ON s.album_id = al.id
LEFT JOIN categories c ON s.category_id = c.id
LEFT JOIN song_ratings sr ON s.id = sr.song_id
LEFT JOIN liked_songs ls ON s.id = ls.song_id
GROUP BY s.id, s.title, s.artist, s.album, s.duration, s.cover_url, 
         s.audio_url, s.genre, s.play_count, s.release_date, s.track_number,
         a.name, a.avatar_url, al.title, al.cover_url, c.name, c.color;

-- View thống kê người dùng
CREATE OR REPLACE VIEW user_statistics AS
SELECT 
  p.id as user_id,
  p.full_name,
  p.email,
  COUNT(DISTINCT ls.song_id) as liked_songs_count,
  COUNT(DISTINCT pl.id) as playlists_count,
  COUNT(DISTINCT f.artist_id) as following_artists_count,
  COUNT(DISTINCT d.song_id) as downloaded_songs_count,
  COUNT(DISTINCT lh.song_id) as unique_songs_played,
  COALESCE(SUM(lh.duration_listened), 0) as total_listening_time,
  COUNT(DISTINCT DATE(lh.played_at)) as active_days
FROM profiles p
LEFT JOIN liked_songs ls ON p.id = ls.user_id
LEFT JOIN playlists pl ON p.id = pl.user_id
LEFT JOIN follows f ON p.id = f.user_id
LEFT JOIN downloads d ON p.id = d.user_id
LEFT JOIN listening_history lh ON p.id = lh.user_id
GROUP BY p.id, p.full_name, p.email;

-- View playlist với thông tin chi tiết
CREATE OR REPLACE VIEW playlist_details AS
SELECT 
  p.id,
  p.name,
  p.description,
  p.cover_url,
  p.is_public,
  p.created_at,
  p.updated_at,
  pr.full_name as owner_name,
  pr.avatar_url as owner_avatar,
  COUNT(ps.song_id) as song_count,
  COALESCE(SUM(s.duration), 0) as total_duration,
  COUNT(pf.user_id) as follower_count
FROM playlists p
LEFT JOIN profiles pr ON p.user_id = pr.id
LEFT JOIN playlist_songs ps ON p.id = ps.playlist_id
LEFT JOIN songs s ON ps.song_id = s.id
LEFT JOIN playlist_followers pf ON p.id = pf.playlist_id
GROUP BY p.id, p.name, p.description, p.cover_url, p.is_public, 
         p.created_at, p.updated_at, pr.full_name, pr.avatar_url;

-- View artist với thống kê
CREATE OR REPLACE VIEW artist_statistics AS
SELECT 
  a.id,
  a.name,
  a.bio,
  a.avatar_url,
  a.created_at,
  COUNT(DISTINCT al.id) as album_count,
  COUNT(DISTINCT s.id) as song_count,
  COALESCE(SUM(s.play_count), 0) as total_plays,
  COUNT(DISTINCT f.user_id) as follower_count,
  COALESCE(AVG(sr.rating), 0) as avg_rating
FROM artists a
LEFT JOIN albums al ON a.id = al.artist_id
LEFT JOIN songs s ON a.id = s.artist_id
LEFT JOIN follows f ON a.id = f.artist_id
LEFT JOIN song_ratings sr ON s.id = sr.song_id
GROUP BY a.id, a.name, a.bio, a.avatar_url, a.created_at;
