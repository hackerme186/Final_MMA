// API endpoints and configurations
export const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'https://api.example.com';

export const API_ENDPOINTS = {
  songs: '/songs',
  playlists: '/playlists',
  artists: '/artists',
  albums: '/albums',
  users: '/users',
  auth: '/auth',
};

export const API_CONFIG = {
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
};

import { Session } from '@supabase/supabase-js';
import { supabase } from '../../supabase';

// Types
export interface Song {
  id: string
  title: string
  artist: string
  album: string
  duration: number
  url: string
  artwork?: string
  created_at?: string
  updated_at?: string
}

export interface Playlist {
  id: string
  name: string
  description?: string
  user_id: string
  songs?: Song[]
  created_at?: string
  updated_at?: string
}

export interface UserProfile {
  id: string
  email: string
  username?: string
  avatar_url?: string
  created_at?: string
  updated_at?: string
}

// Auth API
export const authAPI = {
  // Sign in with email and password
  signIn: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (error) throw error
    return data
  },

  // Sign up with email and password
  signUp: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })
    if (error) throw error
    return data
  },

  // Sign out
  signOut: async () => {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  },

  // Get current session
  getSession: async () => {
    const { data, error } = await supabase.auth.getSession()
    if (error) throw error
    return data.session
  },

  // Listen to auth changes
  onAuthStateChange: (callback: (event: string, session: Session | null) => void) => {
    return supabase.auth.onAuthStateChange(callback)
  },
}

// User API
export const userAPI = {
  // Get user profile
  getProfile: async (userId: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()
    
    if (error) throw error
    return data as UserProfile
  },

  // Update user profile
  updateProfile: async (userId: string, updates: Partial<UserProfile>) => {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId)
      .select()
      .single()
    
    if (error) throw error
    return data as UserProfile
  },

  // Create user profile
  createProfile: async (profile: Omit<UserProfile, 'created_at' | 'updated_at'>) => {
    const { data, error } = await supabase
      .from('profiles')
      .insert(profile)
      .select()
      .single()
    
    if (error) throw error
    return data as UserProfile
  },
}

// Song API
export const songAPI = {
  // Get all songs
  getAllSongs: async () => {
    const { data, error } = await supabase
      .from('songs')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data as Song[]
  },

  // Get song by ID
  getSongById: async (songId: string) => {
    const { data, error } = await supabase
      .from('songs')
      .select('*')
      .eq('id', songId)
      .single()
    
    if (error) throw error
    return data as Song
  },

  // Search songs
  searchSongs: async (query: string) => {
    const { data, error } = await supabase
      .from('songs')
      .select('*')
      .or(`title.ilike.%${query}%,artist.ilike.%${query}%,album.ilike.%${query}%`)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data as Song[]
  },

  // Get songs by artist
  getSongsByArtist: async (artist: string) => {
    const { data, error } = await supabase
      .from('songs')
      .select('*')
      .eq('artist', artist)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data as Song[]
  },

  // Get recently played songs for user
  getRecentlyPlayed: async (userId: string, limit = 10) => {
    const { data, error } = await supabase
      .from('recently_played')
      .select(`
        song_id,
        songs (*)
      `)
      .eq('user_id', userId)
      .order('played_at', { ascending: false })
      .limit(limit)
    
    if (error) throw error
    return data.map(item => item.songs) as Song[]
  },

  // Add song to recently played
  addToRecentlyPlayed: async (userId: string, songId: string) => {
    const { error } = await supabase
      .from('recently_played')
      .upsert({
        user_id: userId,
        song_id: songId,
        played_at: new Date().toISOString(),
      })
    
    if (error) throw error
  },
}

// Playlist API
export const playlistAPI = {
  // Get user playlists
  getUserPlaylists: async (userId: string) => {
    const { data, error } = await supabase
      .from('playlists')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data as Playlist[]
  },

  // Get playlist by ID with songs
  getPlaylistById: async (playlistId: string) => {
    const { data, error } = await supabase
      .from('playlists')
      .select(`
        *,
        playlist_songs (
          song_id,
          songs (*)
        )
      `)
      .eq('id', playlistId)
      .single()
    
    if (error) throw error
    return data as Playlist & {
      playlist_songs: { song_id: string; songs: Song }[]
    }
  },

  // Create playlist
  createPlaylist: async (playlist: Omit<Playlist, 'id' | 'created_at' | 'updated_at'>) => {
    const { data, error } = await supabase
      .from('playlists')
      .insert(playlist)
      .select()
      .single()
    
    if (error) throw error
    return data as Playlist
  },

  // Update playlist
  updatePlaylist: async (playlistId: string, updates: Partial<Playlist>) => {
    const { data, error } = await supabase
      .from('playlists')
      .update(updates)
      .eq('id', playlistId)
      .select()
      .single()
    
    if (error) throw error
    return data as Playlist
  },

  // Delete playlist
  deletePlaylist: async (playlistId: string) => {
    const { error } = await supabase
      .from('playlists')
      .delete()
      .eq('id', playlistId)
    
    if (error) throw error
  },

  // Add song to playlist
  addSongToPlaylist: async (playlistId: string, songId: string) => {
    const { error } = await supabase
      .from('playlist_songs')
      .insert({
        playlist_id: playlistId,
        song_id: songId,
      })
    
    if (error) throw error
  },

  // Remove song from playlist
  removeSongFromPlaylist: async (playlistId: string, songId: string) => {
    const { error } = await supabase
      .from('playlist_songs')
      .delete()
      .eq('playlist_id', playlistId)
      .eq('song_id', songId)
    
    if (error) throw error
  },
}

// Favorites API
export const favoritesAPI = {
  // Get user favorites
  getUserFavorites: async (userId: string) => {
    const { data, error } = await supabase
      .from('favorites')
      .select(`
        song_id,
        songs (*)
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data.map(item => item.songs) as Song[]
  },

  // Add song to favorites
  addToFavorites: async (userId: string, songId: string) => {
    const { error } = await supabase
      .from('favorites')
      .insert({
        user_id: userId,
        song_id: songId,
      })
    
    if (error) throw error
  },

  // Remove song from favorites
  removeFromFavorites: async (userId: string, songId: string) => {
    const { error } = await supabase
      .from('favorites')
      .delete()
      .eq('user_id', userId)
      .eq('song_id', songId)
    
    if (error) throw error
  },

  // Check if song is favorited
  isFavorited: async (userId: string, songId: string) => {
    const { data, error } = await supabase
      .from('favorites')
      .select('*')
      .eq('user_id', userId)
      .eq('song_id', songId)
      .single()
    
    if (error && error.code !== 'PGRST116') throw error
    return !!data
  },
}

// Export all APIs
export default {
  auth: authAPI,
  user: userAPI,
  song: songAPI,
  playlist: playlistAPI,
  favorites: favoritesAPI,
} 