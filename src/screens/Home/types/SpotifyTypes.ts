export interface SpotifyUser {
  id: string;
  display_name: string;
  images: { url: string }[];
  email: string;
}

export interface SpotifyArtist {
  id: string;
  name: string;
  images: { url: string }[];
  followers: { total: number };
}

export interface SpotifyAlbum {
  id: string;
  name: string;
  images: { url: string }[];
  artists: SpotifyArtist[];
  release_date: string;
  total_tracks: number;
}

export interface SpotifyTrack {
  id: string;
  name: string;
  artists: Array<{
    id: string;
    name: string;
  }>;
  album: {
    id: string;
    name: string;
    images: Array<{
      url: string;
      width: number;
      height: number;
    }>;
  };
  duration_ms: number;
  preview_url: string | null;
}

export interface SpotifyPlaylist {
  id: string;
  name: string;
  description: string;
  images: Array<{
    url: string;
    width: number;
    height: number;
  }>;
  tracks: {
    total: number;
  };
} 