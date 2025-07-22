import { HomeData } from './types/HomeTypes';
import { SpotifyPlaylist, SpotifyTrack } from './types/SpotifyTypes';

export const mockHomeData: HomeData = {
  user: { name: "John", avatar: "https://i.imgur.com/1.jpg" },
  topArtists: [
    { id: "1", name: "Taylor Swift", avatar: "https://i.imgur.com/1.jpg", followerCount: 15000000, isFollowed: true },
    { id: "2", name: "Ed Sheeran", avatar: "https://i.imgur.com/2.jpg", followerCount: 12000000, isFollowed: false },
    { id: "3", name: "Adele", avatar: "https://i.imgur.com/3.jpg", followerCount: 9000000, isFollowed: false },
  ],
  featuredAlbum: {
    id: "1",
    title: "Midnights",
    artist: "Taylor Swift",
    coverArt: "https://i.imgur.com/1989.jpg",
    year: 2022,
    trackCount: 13,
  },
  recentlyPlayed: [
    { id: "1", title: "Anti-Hero", artist: "Taylor Swift", cover: "https://i.imgur.com/1.jpg" },
    { id: "2", title: "Shape of You", artist: "Ed Sheeran", cover: "https://i.imgur.com/2.jpg" },
    { id: "3", title: "Easy On Me", artist: "Adele", cover: "https://i.imgur.com/3.jpg" },
  ],
  recommendations: [
    { id: "4", title: "Stay", artist: "Justin Bieber", cover: "https://i.imgur.com/4.jpg" },
    { id: "5", title: "Levitating", artist: "Dua Lipa", cover: "https://i.imgur.com/5.jpg" },
  ],
};

export const mockRecentlyPlayed: SpotifyTrack[] = [
  {
    id: '1',
    name: 'Inside Out',
    artists: [{ name: 'The Chainsmokers' }],
    album: {
      id: 'a1',
      name: 'Memories...Do Not Open',
      images: [{ url: 'https://i.imgur.com/1.jpg', width: 300, height: 300 }],
    },
    duration_ms: 210000,
    preview_url: null,
  },
  {
    id: '2',
    name: 'Young',
    artists: [{ name: 'The Chainsmokers' }],
    album: {
      id: 'a1',
      name: 'Memories...Do Not Open',
      images: [{ url: 'https://i.imgur.com/2.jpg', width: 300, height: 300 }],
    },
    duration_ms: 200000,
    preview_url: null,
  },
  {
    id: '3',
    name: 'Beach House',
    artists: [{ name: 'The Chainsmokers' }],
    album: {
      id: 'a1',
      name: 'Memories...Do Not Open',
      images: [{ url: 'https://i.imgur.com/3.jpg', width: 300, height: 300 }],
    },
    duration_ms: 190000,
    preview_url: null,
  },
];

export const mockPlaylists: SpotifyPlaylist[] = [
  {
    id: 'p1',
    name: 'Top Hits 2024',
    description: 'Best of 2024',
    images: [{ url: 'https://i.imgur.com/4.jpg', width: 300, height: 300 }],
    tracks: { total: 20 },
  },
  {
    id: 'p2',
    name: 'Chill Vibes',
    description: 'Relax and chill',
    images: [{ url: 'https://i.imgur.com/5.jpg', width: 300, height: 300 }],
    tracks: { total: 18 },
  },
  {
    id: 'p3',
    name: 'Workout Mix',
    description: 'Energy for your workout',
    images: [{ url: 'https://i.imgur.com/6.jpg', width: 300, height: 300 }],
    tracks: { total: 22 },
  },
  {
    id: 'p4',
    name: 'Focus Flow',
    description: 'Stay focused',
    images: [{ url: 'https://i.imgur.com/7.jpg', width: 300, height: 300 }],
    tracks: { total: 15 },
  },
];

export const mockAlbums = [
  {
    id: 'a1',
    name: 'Memories...Do Not Open',
    images: [{ url: 'https://i.imgur.com/1.jpg', width: 300, height: 300 }],
    artists: [{ id: 'ar1', name: 'The Chainsmokers', images: [] }],
    release_date: '2017-04-07',
    total_tracks: 12,
  },
  {
    id: 'a2',
    name: 'World War Joy',
    images: [{ url: 'https://i.imgur.com/2.jpg', width: 300, height: 300 }],
    artists: [{ id: 'ar1', name: 'The Chainsmokers', images: [] }],
    release_date: '2019-12-06',
    total_tracks: 10,
  },
];

export const mockMixes = mockPlaylists.slice(0, 3); 