export interface UserProfile {
  name: string;
  avatar: string;
}

export interface Artist {
  id: string;
  name: string;
  avatar: string;
  followerCount: number;
  isFollowed: boolean;
}

export interface Album {
  id: string;
  title: string;
  artist: string;
  coverArt: string;
  year: number;
  trackCount: number;
}

export interface Track {
  id: string;
  title: string;
  artist: string;
  cover: string;
  duration?: number;
}

export interface HomeData {
  user: UserProfile;
  topArtists: Artist[];
  featuredAlbum: Album;
  recentlyPlayed: Track[];
  recommendations: Track[];
} 