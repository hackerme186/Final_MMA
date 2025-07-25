export interface Track {
  url: string;
  title: string;
  artist: string;
  artwork: string;
  id?: string;
  album?: string;
  duration?: number;
  rating?: number; // 0 = not liked, 1 = liked
  playlist?: string[];
}

export interface Playlist {
  name: string;
  tracks: Track[];
  artworkPreview: string;
  id?: string;
  description?: string;
  createdAt?: string;
}

export interface Artist {
  name: string;
  tracks: Track[];
  artworkPreview?: string;
  followers?: string;
}

export interface LibraryStats {
  totalTracks: number;
  totalPlaylists: number;
  totalArtists: number;
  likedTracks: number;
  downloadedTracks: number;
}

export type TrackWithPlaylist = Track & { 
  playlist?: string[];
  isDownloaded?: boolean;
  downloadDate?: string;
  localPath?: string;
}
