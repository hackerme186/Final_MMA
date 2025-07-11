
import { useEffect, useState } from 'react';
import SpotifyTokenService from '../services/spotifyTokenService';

export const useSpotifyToken = () => {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const tokenService = SpotifyTokenService.getInstance();

  const getToken = async () => {
    try {
      setLoading(true);
      setError(null);
      const validToken = await tokenService.getValidToken();
      setToken(validToken);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Không thể lấy token');
    } finally {
      setLoading(false);
    }
  };

  const refreshToken = async () => {
    await getToken();
  };

  useEffect(() => {
    getToken();
  }, []);

  return {
    token,
    loading,
    error,
    refreshToken,
  };
}; 
