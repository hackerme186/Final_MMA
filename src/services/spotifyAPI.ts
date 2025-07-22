import { SpotifyArtist, SpotifyTrack, SpotifyUser } from '../screens/Home/types/SpotifyTypes';

const BASE_URL = 'https://api.spotify.com/v1';

export async function fetchSpotifyUser(token: string): Promise<SpotifyUser> {
  const res = await fetch(`${BASE_URL}/me`, { headers: { Authorization: `Bearer ${token}` } });
  if (!res.ok) throw new Error('Failed to fetch user');
  return res.json();
}

export async function fetchTopArtists(token: string): Promise<SpotifyArtist[]> {
  const res = await fetch(`${BASE_URL}/me/top/artists?limit=10`, { headers: { Authorization: `Bearer ${token}` } });
  if (!res.ok) throw new Error('Failed to fetch top artists');
  const data = await res.json();
  return data.items;
}

export async function fetchRecentlyPlayed(token: string): Promise<SpotifyTrack[]> {
  const res = await fetch(`${BASE_URL}/me/player/recently-played?limit=10`, { headers: { Authorization: `Bearer ${token}` } });
  if (!res.ok) throw new Error('Failed to fetch recently played');
  const data = await res.json();
  return data.items.map((item: any) => item.track);
} 