import { useEffect, useState } from 'react';

interface Song {
  url: string;
  title: string;
  artist: string;
  artwork: string;
}

export function useLibraryData() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadLibraryData();
  }, []);

  const loadLibraryData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Import the JSON data
      const libraryData = require('../../assets/data/library.json');
      
      // Clean up the data (remove trailing commas, etc.)
      const cleanedData = libraryData.filter((song: any) => 
        song && song.url && song.title && song.artist && song.artwork
      );
      
      setSongs(cleanedData);
    } catch (err) {
      console.error('Error loading library data:', err);
      setError('Failed to load library data');
    } finally {
      setLoading(false);
    }
  };

  return {
    songs,
    loading,
    error,
    reload: loadLibraryData,
  };
}
