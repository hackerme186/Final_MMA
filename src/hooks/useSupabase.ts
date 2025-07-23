import { useCallback, useEffect } from 'react';
import { supabase } from '../../supabase';
import { authService } from '../services/authService';
import { playlistService } from '../services/playlistService';
import { songService } from '../services/songService';
import { userService } from '../services/userService';
import { Album, Artist, Playlist, Song } from '../types';

export function useSupabase() {
  // const [user, setUser] = useState<User | null>(null);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState<string | null>(null);
  // const [songs, setSongs] = useState<Song[]>([]);
  // const [playlists, setPlaylists] = useState<Playlist[]>([]);
  // const [recentlyPlayed, setRecentlyPlayed] = useState<Song[]>([]);
  // const [likedSongs, setLikedSongs] = useState<Song[]>([]);
  // const [artists, setArtists] = useState<Artist[]>([]);
  // const [albums, setAlbums] = useState<Album[]>([]);

  // Mock data for demo
  const user = null;
  const loading = false;
  const error = null;

  const songs: Song[] = [
    { id: '1', title: 'Blinding Lights', artist: 'The Weeknd', album: 'After Hours', duration: 200, cover_url: null, audio_url: '', genre: 'Pop', play_count: 1000000, release_date: '2020-01-01', track_number: 1 },
    { id: '2', title: 'Watermelon Sugar', artist: 'Harry Styles', album: 'Fine Line', duration: 174, cover_url: null, audio_url: '', genre: 'Pop', play_count: 800000, release_date: '2020-05-01', track_number: 2 },
    { id: '3', title: 'Levitating', artist: 'Dua Lipa', album: 'Future Nostalgia', duration: 203, cover_url: null, audio_url: '', genre: 'Pop', play_count: 900000, release_date: '2020-03-01', track_number: 3 },
  ];

  const playlists: Playlist[] = [
    { id: '1', name: 'My Favorites', description: 'Best songs ever', cover_url: null, is_public: true, user_id: 'user1', created_at: '2024-01-01', updated_at: '2024-01-01' },
    { id: '2', name: 'Chill Vibes', description: 'Relaxing music', cover_url: null, is_public: false, user_id: 'user1', created_at: '2024-01-02', updated_at: '2024-01-02' },
    { id: '3', name: 'Workout Mix', description: 'High energy songs', cover_url: null, is_public: true, user_id: 'user1', created_at: '2024-01-03', updated_at: '2024-01-03' },
  ];

  const recentlyPlayed: Song[] = songs.slice(0, 2);
  const likedSongs: Song[] = songs.slice(0, 3);

  const artists: Artist[] = [
    { id: '1', name: 'The Weeknd', bio: 'Canadian singer', avatar_url: null, created_at: '2024-01-01' },
    { id: '2', name: 'Harry Styles', bio: 'British singer', avatar_url: null, created_at: '2024-01-01' },
    { id: '3', name: 'Dua Lipa', bio: 'British-Albanian singer', avatar_url: null, created_at: '2024-01-01' },
  ];

  const albums: Album[] = [
    { id: '1', title: 'After Hours', artist_id: '1', cover_url: null, release_date: '2020-03-20', created_at: '2024-01-01' },
    { id: '2', title: 'Fine Line', artist_id: '2', cover_url: null, release_date: '2019-12-13', created_at: '2024-01-01' },
    { id: '3', title: 'Future Nostalgia', artist_id: '3', cover_url: null, release_date: '2020-03-27', created_at: '2024-01-01' },
  ];

  // Authentication functions
  const signUp = useCallback(async (email: string, password: string, fullName?: string) => {
    setLoading(true);
    const result = await authService.signUp({ email, password, full_name: fullName });
    if (result.user) {
      setUser(result.user);
    }
    setLoading(false);
    return result;
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    setLoading(true);
    const result = await authService.signIn({ email, password });
    if (result.user) {
      setUser(result.user);
    }
    setLoading(false);
    return result;
  }, []);

  const signOut = useCallback(async () => {
    setLoading(true);
    const result = await authService.signOut();
    if (!result.error) {
      setUser(null);
      setSongs([]);
      setPlaylists([]);
      setRecentlyPlayed([]);
      setLikedSongs([]);
    }
    setLoading(false);
    return result;
  }, []);

  // Song functions
  const fetchSongs = useCallback(async () => {
    if (!user) return;
    const result = await songService.getAllSongs();
    if (!result.error) {
      setSongs(result.songs);
    }
  }, [user]);

  const fetchPopularSongs = useCallback(async (limit: number = 10) => {
    const result = await songService.getPopularSongs(limit);
    return result;
  }, []);

  const fetchLatestSongs = useCallback(async (limit: number = 10) => {
    const result = await songService.getLatestSongs(limit);
    return result;
  }, []);

  const searchSongs = useCallback(async (query: string) => {
    const result = await songService.searchSongs(query);
    return result;
  }, []);

  const getSongById = useCallback(async (id: string) => {
    const result = await songService.getSongById(id);
    return result;
  }, []);

  const incrementPlayCount = useCallback(async (songId: string) => {
    const result = await songService.incrementPlayCount(songId);
    return result;
  }, []);

  // Playlist functions
  const fetchUserPlaylists = useCallback(async () => {
    if (!user) return;
    const result = await playlistService.getUserPlaylists(user.id);
    if (!result.error) {
      setPlaylists(result.playlists);
    }
  }, [user]);

  const fetchPublicPlaylists = useCallback(async () => {
    const result = await playlistService.getPublicPlaylists();
    return result;
  }, []);

  const createPlaylist = useCallback(async (name: string, description?: string, isPublic?: boolean) => {
    if (!user) return { playlist: null, error: 'User not authenticated' };
    const result = await playlistService.createPlaylist(user.id, {
      name,
      description,
      is_public: isPublic,
    });
    if (!result.error) {
      await fetchUserPlaylists();
    }
    return result;
  }, [user, fetchUserPlaylists]);

  const getPlaylistById = useCallback(async (id: string) => {
    const result = await playlistService.getPlaylistById(id);
    return result;
  }, []);

  const getPlaylistSongs = useCallback(async (playlistId: string) => {
    const result = await playlistService.getPlaylistSongs(playlistId);
    return result;
  }, []);

  const addSongToPlaylist = useCallback(async (playlistId: string, songId: string) => {
    const result = await playlistService.addSongToPlaylist(playlistId, songId);
    return result;
  }, []);

  const removeSongFromPlaylist = useCallback(async (playlistId: string, songId: string) => {
    const result = await playlistService.removeSongFromPlaylist(playlistId, songId);
    return result;
  }, []);

  // User functions
  const fetchRecentlyPlayed = useCallback(async () => {
    if (!user) return;
    const result = await userService.getRecentlyPlayed(user.id);
    if (!result.error) {
      setRecentlyPlayed(result.songs);
    }
  }, [user]);

  const fetchLikedSongs = useCallback(async () => {
    if (!user) return;
    const result = await userService.getLikedSongs(user.id);
    if (!result.error) {
      setLikedSongs(result.songs);
    }
  }, [user]);

  const addToRecentlyPlayed = useCallback(async (songId: string) => {
    if (!user) return { error: 'User not authenticated' };
    const result = await userService.addToRecentlyPlayed(user.id, songId);
    if (!result.error) {
      await fetchRecentlyPlayed();
    }
    return result;
  }, [user, fetchRecentlyPlayed]);

  const likeSong = useCallback(async (songId: string) => {
    if (!user) return { error: 'User not authenticated' };
    const result = await userService.likeSong(user.id, songId);
    if (!result.error) {
      await fetchLikedSongs();
    }
    return result;
  }, [user, fetchLikedSongs]);

  const unlikeSong = useCallback(async (songId: string) => {
    if (!user) return { error: 'User not authenticated' };
    const result = await userService.unlikeSong(user.id, songId);
    if (!result.error) {
      await fetchLikedSongs();
    }
    return result;
  }, [user, fetchLikedSongs]);

  const isSongLiked = useCallback(async (songId: string) => {
    if (!user) return { liked: false, error: 'User not authenticated' };
    const result = await userService.isSongLiked(user.id, songId);
    return result;
  }, [user]);

  const getUserStats = useCallback(async () => {
    if (!user) return { stats: null, error: 'User not authenticated' };
    const result = await userService.getUserStats(user.id);
    return result;
  }, [user]);

  // Artist and Album functions
  const fetchArtists = useCallback(async () => {
    const result = await songService.getAllArtists();
    if (!result.error) {
      setArtists(result.artists);
    }
  }, []);

  const fetchAlbums = useCallback(async () => {
    const result = await songService.getAllAlbums();
    if (!result.error) {
      setAlbums(result.albums);
    }
  }, []);

  const getArtistById = useCallback(async (id: string) => {
    const result = await songService.getArtistById(id);
    return result;
  }, []);

  const getAlbumById = useCallback(async (id: string) => {
    const result = await songService.getAlbumById(id);
    return result;
  }, []);

  // Initialize data when user changes
  useEffect(() => {
    if (user) {
      fetchSongs();
      fetchUserPlaylists();
      fetchRecentlyPlayed();
      fetchLikedSongs();
    }
  }, [user, fetchSongs, fetchUserPlaylists, fetchRecentlyPlayed, fetchLikedSongs]);

  // Set up auth state listener
  useEffect(() => {
    const { data: { subscription } } = authService.onAuthStateChange((user) => {
      // setUser(user);
      // setLoading(false);
    });

    // Get initial user
    authService.getCurrentUser().then((result) => {
      // setUser(result.user);
      // setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    // setLoading(false);
  }, []);

  return {
    supabase,
    loading,
    error,
    user,
    songs,
    playlists,
    recentlyPlayed,
    likedSongs,
    artists,
    albums,
    signUp,
    signIn,
    signOut,
    fetchSongs,
    fetchPopularSongs,
    fetchLatestSongs,
    searchSongs,
    getSongById,
    incrementPlayCount,
    fetchUserPlaylists,
    fetchPublicPlaylists,
    createPlaylist,
    getPlaylistById,
    getPlaylistSongs,
    addSongToPlaylist,
    removeSongFromPlaylist,
    fetchRecentlyPlayed,
    fetchLikedSongs,
    addToRecentlyPlayed,
    likeSong,
    unlikeSong,
    isSongLiked,
    getUserStats,
    fetchArtists,
    fetchAlbums,
    getArtistById,
    getAlbumById,
  };
} 