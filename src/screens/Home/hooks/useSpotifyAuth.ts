import { useCallback, useState } from 'react';

const CLIENT_ID = 'YOUR_SPOTIFY_CLIENT_ID';
const CLIENT_SECRET = 'YOUR_SPOTIFY_CLIENT_SECRET';
const TOKEN_URL = 'https://accounts.spotify.com/api/token';

export const useSpotifyAuth = () => {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchToken = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const creds = btoa(`${CLIENT_ID}:${CLIENT_SECRET}`);
      const res = await fetch(TOKEN_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${creds}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'grant_type=client_credentials',
      });
      if (res.status === 429) throw new Error('Rate limited by Spotify API');
      if (!res.ok) throw new Error('Failed to fetch Spotify token');
      const data = await res.json();
      setToken(data.access_token);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return { token, loading, error, fetchToken };
}; 