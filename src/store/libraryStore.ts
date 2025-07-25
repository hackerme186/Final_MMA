import React from 'react';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import libraryData from '../../assets/data/library.json';
import { Track } from '../types/library';

interface LibraryState {
  tracks: Track[];
  toggleTrackFavorite: (track: Track) => void;
}

// Transform library data to include rating info
const initialTracks: Track[] = libraryData.map((track) => ({
  ...track,
  isFavorite: false, // Default not favorite
}));

export const useLibraryStore = create<LibraryState>()(
  persist(
    (set, get) => ({
      tracks: initialTracks,

      toggleTrackFavorite: (track) =>
        set((state) => ({
          tracks: state.tracks.map((currentTrack) => {
            if (currentTrack.url === track.url) {
              return {
                ...currentTrack,
                isFavorite: !currentTrack.isFavorite,
              };
            }
            return currentTrack;
          }),
        })),
    }),
    {
      name: 'music-library-storage',
    }
  )
);

// Selector hooks
export const useTracks = () => useLibraryStore((state) => state.tracks);
export const useFavorites = () => {
  const tracks = useLibraryStore((state) => state.tracks);
  return React.useMemo(() => tracks.filter(track => track.isFavorite), [tracks]);
};
export const useToggleTrackFavorite = () => useLibraryStore((state) => state.toggleTrackFavorite);

// Helper functions
export const getTrackById = (id: string) => {
  const tracks = useLibraryStore.getState().tracks;
  return tracks.find(track => track.id === id);
};

export const getTrackByUrl = (url: string) => {
  const tracks = useLibraryStore.getState().tracks;
  return tracks.find(track => track.url === url);
};

export const searchTracks = (query: string) => {
  const tracks = useLibraryStore.getState().tracks;
  if (!query.trim()) return tracks;
  
  const lowercaseQuery = query.toLowerCase();
  return tracks.filter(
    (track) =>
      track.title.toLowerCase().includes(lowercaseQuery) ||
      track.artist.toLowerCase().includes(lowercaseQuery) ||
      track.album.toLowerCase().includes(lowercaseQuery)
  );
};

export const getLibraryStats = () => {
  const tracks = useLibraryStore.getState().tracks;
  return {
    totalTracks: tracks.length,
    favoriteTracks: tracks.filter((track) => track.isFavorite).length,
    totalDuration: tracks.reduce((total, track) => total + track.duration, 0),
  };
};

export const useLibraryStats = () => {
  const tracks = useLibraryStore((state) => state.tracks);
  return React.useMemo(() => ({
    totalTracks: tracks.length,
    favoriteTracks: tracks.filter((track) => track.isFavorite).length,
    totalDuration: tracks.reduce((total, track) => total + track.duration, 0),
  }), [tracks]);
};
