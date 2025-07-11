import { supabase } from '../../supabase';
import { Playlist, Song } from '../types';

export interface PlaylistResponse {
  playlists: Playlist[];
  error: string | null;
}

export interface PlaylistDetailResponse {
  playlist: Playlist | null;
  error: string | null;
}

export interface CreatePlaylistData {
  name: string;
  description?: string;
  cover_url?: string;
  is_public?: boolean;
}

export const playlistService = {
  // Lấy tất cả playlist của user
  async getUserPlaylists(userId: string): Promise<PlaylistResponse> {
    try {
      const { data, error } = await supabase
        .from('playlists')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) {
        return { playlists: [], error: error.message };
      }

      return { playlists: data || [], error: null };
    } catch (error) {
      return { playlists: [], error: 'An unexpected error occurred' };
    }
  },

  // Lấy playlist công khai
  async getPublicPlaylists(): Promise<PlaylistResponse> {
    try {
      const { data, error } = await supabase
        .from('playlists')
        .select(`
          *,
          profiles!playlists_user_id_fkey (
            id,
            full_name,
            avatar_url
          )
        `)
        .eq('is_public', true)
        .order('created_at', { ascending: false });

      if (error) {
        return { playlists: [], error: error.message };
      }

      return { playlists: data || [], error: null };
    } catch (error) {
      return { playlists: [], error: 'An unexpected error occurred' };
    }
  },

  // Lấy playlist theo ID
  async getPlaylistById(id: string): Promise<PlaylistDetailResponse> {
    try {
      const { data, error } = await supabase
        .from('playlists')
        .select(`
          *,
          profiles!playlists_user_id_fkey (
            id,
            full_name,
            avatar_url
          )
        `)
        .eq('id', id)
        .single();

      if (error) {
        return { playlist: null, error: error.message };
      }

      return { playlist: data, error: null };
    } catch (error) {
      return { playlist: null, error: 'An unexpected error occurred' };
    }
  },

  // Tạo playlist mới
  async createPlaylist(userId: string, data: CreatePlaylistData): Promise<PlaylistDetailResponse> {
    try {
      const { data: playlist, error } = await supabase
        .from('playlists')
        .insert([
          {
            name: data.name,
            description: data.description,
            cover_url: data.cover_url,
            user_id: userId,
            is_public: data.is_public ?? false,
          },
        ])
        .select()
        .single();

      if (error) {
        return { playlist: null, error: error.message };
      }

      return { playlist, error: null };
    } catch (error) {
      return { playlist: null, error: 'An unexpected error occurred' };
    }
  },

  // Cập nhật playlist
  async updatePlaylist(id: string, data: Partial<CreatePlaylistData>): Promise<PlaylistDetailResponse> {
    try {
      const { data: playlist, error } = await supabase
        .from('playlists')
        .update(data)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        return { playlist: null, error: error.message };
      }

      return { playlist, error: null };
    } catch (error) {
      return { playlist: null, error: 'An unexpected error occurred' };
    }
  },

  // Xóa playlist
  async deletePlaylist(id: string): Promise<{ error: string | null }> {
    try {
      const { error } = await supabase
        .from('playlists')
        .delete()
        .eq('id', id);

      return { error: error?.message || null };
    } catch (error) {
      return { error: 'An unexpected error occurred' };
    }
  },

  // Lấy danh sách bài hát trong playlist
  async getPlaylistSongs(playlistId: string): Promise<{ songs: Song[]; error: string | null }> {
    try {
      const { data, error } = await supabase
        .from('playlist_songs')
        .select(`
          *,
          songs (*)
        `)
        .eq('playlist_id', playlistId)
        .order('position', { ascending: true });

      if (error) {
        return { songs: [], error: error.message };
      }

      const songs = data?.map(item => item.songs).filter(Boolean) || [];
      return { songs, error: null };
    } catch (error) {
      return { songs: [], error: 'An unexpected error occurred' };
    }
  },

  // Thêm bài hát vào playlist
  async addSongToPlaylist(playlistId: string, songId: string): Promise<{ error: string | null }> {
    try {
      // Lấy vị trí cuối cùng trong playlist
      const { data: lastPosition } = await supabase
        .from('playlist_songs')
        .select('position')
        .eq('playlist_id', playlistId)
        .order('position', { ascending: false })
        .limit(1)
        .single();

      const newPosition = (lastPosition?.position || 0) + 1;

      const { error } = await supabase
        .from('playlist_songs')
        .insert([
          {
            playlist_id: playlistId,
            song_id: songId,
            position: newPosition,
          },
        ]);

      return { error: error?.message || null };
    } catch (error) {
      return { error: 'An unexpected error occurred' };
    }
  },

  // Xóa bài hát khỏi playlist
  async removeSongFromPlaylist(playlistId: string, songId: string): Promise<{ error: string | null }> {
    try {
      const { error } = await supabase
        .from('playlist_songs')
        .delete()
        .eq('playlist_id', playlistId)
        .eq('song_id', songId);

      return { error: error?.message || null };
    } catch (error) {
      return { error: 'An unexpected error occurred' };
    }
  },

  // Cập nhật thứ tự bài hát trong playlist
  async updatePlaylistSongOrder(playlistId: string, songId: string, newPosition: number): Promise<{ error: string | null }> {
    try {
      const { error } = await supabase
        .from('playlist_songs')
        .update({ position: newPosition })
        .eq('playlist_id', playlistId)
        .eq('song_id', songId);

      return { error: error?.message || null };
    } catch (error) {
      return { error: 'An unexpected error occurred' };
    }
  },

  // Tìm kiếm playlist
  async searchPlaylists(query: string): Promise<PlaylistResponse> {
    try {
      const { data, error } = await supabase
        .from('playlists')
        .select(`
          *,
          profiles!playlists_user_id_fkey (
            id,
            full_name,
            avatar_url
          )
        `)
        .or(`name.ilike.%${query}%,description.ilike.%${query}%`)
        .eq('is_public', true)
        .order('created_at', { ascending: false });

      if (error) {
        return { playlists: [], error: error.message };
      }

      return { playlists: data || [], error: null };
    } catch (error) {
      return { playlists: [], error: 'An unexpected error occurred' };
    }
  },

  // Lấy playlist phổ biến
  async getPopularPlaylists(limit: number = 10): Promise<PlaylistResponse> {
    try {
      const { data, error } = await supabase
        .from('playlists')
        .select(`
          *,
          profiles!playlists_user_id_fkey (
            id,
            full_name,
            avatar_url
          )
        `)
        .eq('is_public', true)
        .order('follower_count', { ascending: false })
        .limit(limit);

      if (error) {
        return { playlists: [], error: error.message };
      }

      return { playlists: data || [], error: null };
    } catch (error) {
      return { playlists: [], error: 'An unexpected error occurred' };
    }
  },
};
