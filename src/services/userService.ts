import { supabase } from '../../supabase';
import { Song, User } from '../types';

export interface UserResponse {
  user: User | null;
  error: string | null;
}

export interface UpdateUserData {
  full_name?: string;
  avatar_url?: string;
}

export const userService = {
  // Lấy thông tin user theo ID
  async getUserById(id: string): Promise<UserResponse> {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        return { user: null, error: error.message };
      }

      return { user: data, error: null };
    } catch (error) {
      return { user: null, error: 'An unexpected error occurred' };
    }
  },

  // Cập nhật thông tin user
  async updateUser(id: string, data: UpdateUserData): Promise<UserResponse> {
    try {
      const { data: user, error } = await supabase
        .from('profiles')
        .update(data)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        return { user: null, error: error.message };
      }

      return { user, error: null };
    } catch (error) {
      return { user: null, error: 'An unexpected error occurred' };
    }
  },

  // Lấy bài hát đã phát gần đây
  async getRecentlyPlayed(userId: string, limit: number = 10): Promise<{ songs: Song[]; error: string | null }> {
    try {
      const { data, error } = await supabase
        .from('recently_played')
        .select(`
          *,
          songs (*)
        `)
        .eq('user_id', userId)
        .order('played_at', { ascending: false })
        .limit(limit);

      if (error) {
        return { songs: [], error: error.message };
      }

      const songs = data?.map(item => item.songs).filter(Boolean) || [];
      return { songs, error: null };
    } catch (error) {
      return { songs: [], error: 'An unexpected error occurred' };
    }
  },

  // Thêm bài hát vào lịch sử phát gần đây
  async addToRecentlyPlayed(userId: string, songId: string): Promise<{ error: string | null }> {
    try {
      // Kiểm tra xem bài hát đã có trong lịch sử chưa
      const { data: existing } = await supabase
        .from('recently_played')
        .select('id')
        .eq('user_id', userId)
        .eq('song_id', songId)
        .single();

      if (existing) {
        // Cập nhật thời gian phát
        const { error } = await supabase
          .from('recently_played')
          .update({ played_at: new Date().toISOString() })
          .eq('id', existing.id);

        return { error: error?.message || null };
      } else {
        // Thêm mới vào lịch sử
        const { error } = await supabase
          .from('recently_played')
          .insert([
            {
              user_id: userId,
              song_id: songId,
              played_at: new Date().toISOString(),
            },
          ]);

        return { error: error?.message || null };
      }
    } catch (error) {
      return { error: 'An unexpected error occurred' };
    }
  },

  // Lấy bài hát yêu thích
  async getLikedSongs(userId: string): Promise<{ songs: Song[]; error: string | null }> {
    try {
      const { data, error } = await supabase
        .from('liked_songs')
        .select(`
          *,
          songs (*)
        `)
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) {
        return { songs: [], error: error.message };
      }

      const songs = data?.map(item => item.songs).filter(Boolean) || [];
      return { songs, error: null };
    } catch (error) {
      return { songs: [], error: 'An unexpected error occurred' };
    }
  },

  // Thêm bài hát vào danh sách yêu thích
  async likeSong(userId: string, songId: string): Promise<{ error: string | null }> {
    try {
      const { error } = await supabase
        .from('liked_songs')
        .insert([
          {
            user_id: userId,
            song_id: songId,
          },
        ]);

      return { error: error?.message || null };
    } catch (error) {
      return { error: 'An unexpected error occurred' };
    }
  },

  // Bỏ thích bài hát
  async unlikeSong(userId: string, songId: string): Promise<{ error: string | null }> {
    try {
      const { error } = await supabase
        .from('liked_songs')
        .delete()
        .eq('user_id', userId)
        .eq('song_id', songId);

      return { error: error?.message || null };
    } catch (error) {
      return { error: 'An unexpected error occurred' };
    }
  },

  // Kiểm tra xem bài hát đã được thích chưa
  async isSongLiked(userId: string, songId: string): Promise<{ liked: boolean; error: string | null }> {
    try {
      const { data, error } = await supabase
        .from('liked_songs')
        .select('id')
        .eq('user_id', userId)
        .eq('song_id', songId)
        .single();

      if (error && error.code !== 'PGRST116') { // PGRST116 là "not found"
        return { liked: false, error: error.message };
      }

      return { liked: !!data, error: null };
    } catch (error) {
      return { liked: false, error: 'An unexpected error occurred' };
    }
  },

  // Lấy thống kê người dùng
  async getUserStats(userId: string): Promise<{ stats: any; error: string | null }> {
    try {
      // Đếm số bài hát yêu thích
      const { count: likedCount } = await supabase
        .from('liked_songs')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', userId);

      // Đếm số playlist
      const { count: playlistCount } = await supabase
        .from('playlists')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', userId);

      // Đếm số bài hát đã phát gần đây
      const { count: recentCount } = await supabase
        .from('recently_played')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', userId);

      const stats = {
        likedSongs: likedCount || 0,
        playlists: playlistCount || 0,
        recentlyPlayed: recentCount || 0,
      };

      return { stats, error: null };
    } catch (error) {
      return { stats: null, error: 'An unexpected error occurred' };
    }
  },

  // Xóa lịch sử phát gần đây
  async clearRecentlyPlayed(userId: string): Promise<{ error: string | null }> {
    try {
      const { error } = await supabase
        .from('recently_played')
        .delete()
        .eq('user_id', userId);

      return { error: error?.message || null };
    } catch (error) {
      return { error: 'An unexpected error occurred' };
    }
  },

  // Lấy các nghệ sĩ yêu thích (dựa trên bài hát đã thích)
  async getFavoriteArtists(userId: string, limit: number = 5): Promise<{ artists: any[]; error: string | null }> {
    try {
      const { data, error } = await supabase
        .from('liked_songs')
        .select(`
          songs!inner (
            artist_id,
            artists!inner (
              id,
              name,
              avatar_url
            )
          )
        `)
        .eq('user_id', userId);

      if (error) {
        return { artists: [], error: error.message };
      }

      // Nhóm theo nghệ sĩ và đếm số bài hát
      const artistCounts = data?.reduce((acc: any, item: any) => {
        const artist = item.songs.artists;
        if (artist) {
          acc[artist.id] = acc[artist.id] || { ...artist, songCount: 0 };
          acc[artist.id].songCount += 1;
        }
        return acc;
      }, {});

      const artists = Object.values(artistCounts || {})
        .sort((a: any, b: any) => b.songCount - a.songCount)
        .slice(0, limit);

      return { artists, error: null };
    } catch (error) {
      return { artists: [], error: 'An unexpected error occurred' };
    }
  },
};
