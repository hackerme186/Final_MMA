import { supabase } from '../../supabase';

export interface Download {
  id: string;
  user_id: string;
  song_id: string;
  file_path?: string;
  file_size?: number;
  download_quality: string;
  downloaded_at: string;
}

export const downloadService = {
  // Thêm bài hát vào downloads
  async addDownload(songId: string, filePath?: string, fileSize?: number, quality: string = 'standard') {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('downloads')
        .insert([{
          user_id: user.id,
          song_id: songId,
          file_path: filePath,
          file_size: fileSize,
          download_quality: quality
        }])
        .select()
        .single();

      if (error) throw error;
      return { download: data, error: null };
    } catch (error) {
      return { download: null, error };
    }
  },

  // Xóa download
  async removeDownload(songId: string) {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { error } = await supabase
        .from('downloads')
        .delete()
        .eq('user_id', user.id)
        .eq('song_id', songId);

      if (error) throw error;
      return { error: null };
    } catch (error) {
      return { error };
    }
  },

  // Kiểm tra bài hát đã download chưa
  async isDownloaded(songId: string) {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return { isDownloaded: false, error: null };

      const { data, error } = await supabase
        .from('downloads')
        .select('id')
        .eq('user_id', user.id)
        .eq('song_id', songId)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      return { isDownloaded: !!data, error: null };
    } catch (error) {
      return { isDownloaded: false, error };
    }
  },

  // Lấy danh sách bài hát đã download
  async getDownloadedSongs() {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('downloads')
        .select(`
          *,
          songs (
            id,
            title,
            artist,
            album,
            duration,
            cover_url,
            audio_url,
            genre
          )
        `)
        .eq('user_id', user.id)
        .order('downloaded_at', { ascending: false });

      if (error) throw error;
      return { downloads: data, error: null };
    } catch (error) {
      return { downloads: null, error };
    }
  },

  // Cập nhật thông tin download
  async updateDownload(songId: string, updates: Partial<Download>) {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('downloads')
        .update(updates)
        .eq('user_id', user.id)
        .eq('song_id', songId)
        .select()
        .single();

      if (error) throw error;
      return { download: data, error: null };
    } catch (error) {
      return { download: null, error };
    }
  },

  // Lấy thống kê downloads
  async getDownloadStats() {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('downloads')
        .select('file_size, download_quality')
        .eq('user_id', user.id);

      if (error) throw error;

      const stats = {
        totalDownloads: data.length,
        totalSize: data.reduce((sum, d) => sum + (d.file_size || 0), 0),
        qualityBreakdown: data.reduce((acc: any, d) => {
          acc[d.download_quality] = (acc[d.download_quality] || 0) + 1;
          return acc;
        }, {})
      };

      return { stats, error: null };
    } catch (error) {
      return { stats: null, error };
    }
  },

  // Xóa tất cả downloads
  async clearAllDownloads() {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { error } = await supabase
        .from('downloads')
        .delete()
        .eq('user_id', user.id);

      if (error) throw error;
      return { error: null };
    } catch (error) {
      return { error };
    }
  },

  // Lấy downloads theo quality
  async getDownloadsByQuality(quality: string) {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('downloads')
        .select(`
          *,
          songs (
            id,
            title,
            artist,
            album,
            duration,
            cover_url
          )
        `)
        .eq('user_id', user.id)
        .eq('download_quality', quality)
        .order('downloaded_at', { ascending: false });

      if (error) throw error;
      return { downloads: data, error: null };
    } catch (error) {
      return { downloads: null, error };
    }
  }
};
