export interface User {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface Song {
  id: string;
  title: string;
  artist: string;
  album?: string;
  duration: number;
  cover_url: string;
  audio_url: string;
  genre?: string;
  release_date?: string;
  created_at: string;
  updated_at: string;
}

export interface Playlist {
  id: string;
  name: string;
  description?: string;
  cover_url?: string;
  user_id: string;
  is_public: boolean;
  created_at: string;
  updated_at: string;
  songs?: Song[];
}

export interface PlaylistSong {
  id: string;
  playlist_id: string;
  song_id: string;
  position: number;
  added_at: string;
  song?: Song;
}

export interface UserPlaylist {
  id: string;
  user_id: string;
  playlist_id: string;
  created_at: string;
  playlist?: Playlist;
}

export interface RecentlyPlayed {
  id: string;
  user_id: string;
  song_id: string;
  played_at: string;
  song?: Song;
}

export interface LikedSong {
  id: string;
  user_id: string;
  song_id: string;
  created_at: string;
  song?: Song;
}

export interface Artist {
  id: string;
  name: string;
  bio?: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface Album {
  id: string;
  title: string;
  artist_id: string;
  cover_url: string;
  release_date?: string;
  created_at: string;
  updated_at: string;
  artist?: Artist;
  songs?: Song[];
} 