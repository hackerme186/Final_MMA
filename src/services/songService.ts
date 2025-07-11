import { supabase } from '../../supabase';
import { Album, Artist, Song } from '../types';

export interface SongResponse {
  songs: Song[];
  error: string | null;
}

export interface SongDetailResponse {
  song: Song | null;
  error: string | null;
}

export const songService = {
  // Lấy tất cả bài hát
  async getAllSongs(): Promise<SongResponse> {
    try {
      const { data, error } = await supabase
        .from('songs')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        return { songs: [], error: error.message };
      }

      return { songs: data || [], error: null };
    } catch (error) {
      return { songs: [], error: 'An unexpected error occurred' };
    }
  },

  // Lấy bài hát theo ID
  async getSongById(id: string): Promise<SongDetailResponse> {
    try {
      const { data, error } = await supabase
        .from('songs')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        return { song: null, error: error.message };
      }

      return { song: data, error: null };
    } catch (error) {
      return { song: null, error: 'An unexpected error occurred' };
    }
  },

  // Lấy bài hát theo thể loại
  async getSongsByGenre(genre: string): Promise<SongResponse> {
    try {
      const { data, error } = await supabase
        .from('songs')
        .select('*')
        .eq('genre', genre)
        .order('created_at', { ascending: false });

      if (error) {
        return { songs: [], error: error.message };
      }

      return { songs: data || [], error: null };
    } catch (error) {
      return { songs: [], error: 'An unexpected error occurred' };
    }
  },

  // Tìm kiếm bài hát
  async searchSongs(query: string): Promise<SongResponse> {
    try {
      const { data, error } = await supabase
        .from('songs')
        .select('*')
        .or(`title.ilike.%${query}%,artist.ilike.%${query}%,album.ilike.%${query}%`)
        .order('created_at', { ascending: false });

      if (error) {
        return { songs: [], error: error.message };
      }

      return { songs: data || [], error: null };
    } catch (error) {
      return { songs: [], error: 'An unexpected error occurred' };
    }
  },

  // Lấy bài hát theo nghệ sĩ
  async getSongsByArtist(artistId: string): Promise<SongResponse> {
    try {
      const { data, error } = await supabase
        .from('songs')
        .select('*')
        .eq('artist_id', artistId)
        .order('created_at', { ascending: false });

      if (error) {
        return { songs: [], error: error.message };
      }

      return { songs: data || [], error: null };
    } catch (error) {
      return { songs: [], error: 'An unexpected error occurred' };
    }
  },

  // Lấy bài hát theo album
  async getSongsByAlbum(albumId: string): Promise<SongResponse> {
    try {
      const { data, error } = await supabase
        .from('songs')
        .select('*')
        .eq('album_id', albumId)
        .order('track_number', { ascending: true });

      if (error) {
        return { songs: [], error: error.message };
      }

      return { songs: data || [], error: null };
    } catch (error) {
      return { songs: [], error: 'An unexpected error occurred' };
    }
  },

  // Lấy bài hát phổ biến
  async getPopularSongs(limit: number = 10): Promise<SongResponse> {
    try {
      const { data, error } = await supabase
        .from('songs')
        .select('*')
        .order('play_count', { ascending: false })
        .limit(limit);

      if (error) {
        return { songs: [], error: error.message };
      }

      return { songs: data || [], error: null };
    } catch (error) {
      return { songs: [], error: 'An unexpected error occurred' };
    }
  },

  // Lấy bài hát mới nhất
  async getLatestSongs(limit: number = 10): Promise<SongResponse> {
    try {
      const { data, error } = await supabase
        .from('songs')
        .select('*')
        .order('release_date', { ascending: false })
        .limit(limit);

      if (error) {
        return { songs: [], error: error.message };
      }

      return { songs: data || [], error: null };
    } catch (error) {
      return { songs: [], error: 'An unexpected error occurred' };
    }
  },

  // Cập nhật số lượt phát
  async incrementPlayCount(songId: string): Promise<{ error: string | null }> {
    try {
      const { error } = await supabase.rpc('increment_play_count', {
        song_id: songId,
      });

      return { error: error?.message || null };
    } catch (error) {
      return { error: 'An unexpected error occurred' };
    }
  },

  // Lấy tất cả nghệ sĩ
  async getAllArtists(): Promise<{ artists: Artist[]; error: string | null }> {
    try {
      const { data, error } = await supabase
        .from('artists')
        .select('*')
        .order('name', { ascending: true });

      if (error) {
        return { artists: [], error: error.message };
      }

      return { artists: data || [], error: null };
    } catch (error) {
      return { artists: [], error: 'An unexpected error occurred' };
    }
  },

  // Lấy nghệ sĩ theo ID
  async getArtistById(id: string): Promise<{ artist: Artist | null; error: string | null }> {
    try {
      const { data, error } = await supabase
        .from('artists')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        return { artist: null, error: error.message };
      }

      return { artist: data, error: null };
    } catch (error) {
      return { artist: null, error: 'An unexpected error occurred' };
    }
  },

  // Lấy tất cả album
  async getAllAlbums(): Promise<{ albums: Album[]; error: string | null }> {
    try {
      const { data, error } = await supabase
        .from('albums')
        .select(`
          *,
          artists (*)
        `)
        .order('release_date', { ascending: false });

      if (error) {
        return { albums: [], error: error.message };
      }

      return { albums: data || [], error: null };
    } catch (error) {
      return { albums: [], error: 'An unexpected error occurred' };
    }
  },

  // Lấy album theo ID
  async getAlbumById(id: string): Promise<{ album: Album | null; error: string | null }> {
    try {
      const { data, error } = await supabase
        .from('albums')
        .select(`
          *,
          artists (*),
          songs (*)
        `)
        .eq('id', id)
        .single();

      if (error) {
        return { album: null, error: error.message };
      }

      return { album: data, error: null };
    } catch (error) {
      return { album: null, error: 'An unexpected error occurred' };
    }
  },
};
