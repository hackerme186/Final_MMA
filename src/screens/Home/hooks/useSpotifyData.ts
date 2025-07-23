import { useEffect } from 'react';
// import { useState } from 'react';
import { authenticateWithSpotify } from '../../../services/authService';
import { fetchRecentlyPlayed, fetchSpotifyUser, fetchTopArtists } from '../../../services/spotifyAPI';
import { SpotifyArtist, SpotifyTrack } from '../types/SpotifyTypes';

export const useSpotifyData = () => {
  // const [token, setToken] = useState<string | null>(null);
  // const [user, setUser] = useState<SpotifyUser | null>(null);
  // const [artists, setArtists] = useState<SpotifyArtist[]>([]);
  // const [tracks, setTracks] = useState<SpotifyTrack[]>([]);
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState<string | null>(null);

  // Mock data
  const token = null;
  const user = null;
  const artists: SpotifyArtist[] = [];
  const tracks: SpotifyTrack[] = [];
  const loading = false;
  const error = null;

  const login = async () => {
    // setLoading(true);
    // setError(null);
    try {
      const accessToken = await authenticateWithSpotify();
      // setToken(accessToken);
    } catch (e: any) {
      // setError(e.message);
    } finally {
      // setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) return;
    // setLoading(true);
    Promise.all([
      fetchSpotifyUser(token),
      fetchTopArtists(token),
      fetchRecentlyPlayed(token)
    ])
      .then(([user, artists, tracks]) => {
        // setUser(user);
        // setArtists(artists);
        // setTracks(tracks);
      })
      .catch(e => {
        // setError(e.message)
      })
      .finally(() => {
        // setLoading(false)
      });
  }, [token]);

  return { token, user, artists, tracks, loading, error, login };
}; 