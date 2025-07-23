import { supabase } from '../../supabase';

export interface Follow {
  id: string;
  user_id: string;
  artist_id: string;
  followed_at: string;
}

export const followService = {
  // Theo dõi nghệ sĩ
  async followArtist(artistId: string) {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('follows')
        .insert([{
          user_id: user.id,
          artist_id: artistId
        }])
        .select()
        .single();

      if (error) throw error;
      return { follow: data, error: null };
    } catch (error) {
      return { follow: null, error };
    }
  },

  // Bỏ theo dõi nghệ sĩ
  async unfollowArtist(artistId: string) {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { error } = await supabase
        .from('follows')
        .delete()
        .eq('user_id', user.id)
        .eq('artist_id', artistId);

      if (error) throw error;
      return { error: null };
    } catch (error) {
      return { error };
    }
  },

  // Kiểm tra đã theo dõi nghệ sĩ chưa
  async isFollowingArtist(artistId: string) {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return { isFollowing: false, error: null };

      const { data, error } = await supabase
        .from('follows')
        .select('id')
        .eq('user_id', user.id)
        .eq('artist_id', artistId)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      return { isFollowing: !!data, error: null };
    } catch (error) {
      return { isFollowing: false, error };
    }
  },

  // Lấy danh sách nghệ sĩ đang theo dõi
  async getFollowedArtists() {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('follows')
        .select(`
          *,
          artists (
            id,
            name,
            bio,
            avatar_url
          )
        `)
        .eq('user_id', user.id)
        .order('followed_at', { ascending: false });

      if (error) throw error;
      return { follows: data, error: null };
    } catch (error) {
      return { follows: null, error };
    }
  },

  // Lấy followers của một nghệ sĩ
  async getArtistFollowers(artistId: string) {
    try {
      const { data, error } = await supabase
        .from('follows')
        .select(`
          *,
          profiles (
            id,
            full_name,
            avatar_url
          )
        `)
        .eq('artist_id', artistId)
        .order('followed_at', { ascending: false });

      if (error) throw error;
      return { followers: data, error: null };
    } catch (error) {
      return { followers: null, error };
    }
  },

  // Lấy số lượng followers của nghệ sĩ
  async getArtistFollowerCount(artistId: string) {
    try {
      const { count, error } = await supabase
        .from('follows')
        .select('*', { count: 'exact', head: true })
        .eq('artist_id', artistId);

      if (error) throw error;
      return { count: count || 0, error: null };
    } catch (error) {
      return { count: 0, error };
    }
  },

  // Lấy nghệ sĩ trending (nhiều người follow gần đây)
  async getTrendingArtists(limit: number = 10) {
    try {
      const { data, error } = await supabase
        .from('follows')
        .select(`
          artist_id,
          artists (
            id,
            name,
            bio,
            avatar_url
          )
        `)
        .gte('followed_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString())
        .order('followed_at', { ascending: false })
        .limit(limit);

      if (error) throw error;

      // Group by artist and count follows
      const artistCounts = data.reduce((acc: any, follow: any) => {
        const artistId = follow.artist_id;
        if (!acc[artistId]) {
          acc[artistId] = {
            artist: follow.artists,
            followCount: 0
          };
        }
        acc[artistId].followCount++;
        return acc;
      }, {});

      const trending = Object.values(artistCounts)
        .sort((a: any, b: any) => b.followCount - a.followCount)
        .slice(0, limit);

      return { artists: trending, error: null };
    } catch (error) {
      return { artists: null, error };
    }
  }
};
