import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { ArtistProfileScreen } from '../../src/screens/Home/components/ArtistProfile/ArtistProfileScreen';
import { mockHomeData } from '../../src/screens/Home/mockHomeData';

export default function ArtistProfileRoute() {
  const { id } = useLocalSearchParams();
  const artist = mockHomeData.topArtists.find(a => a.id === id) || mockHomeData.topArtists[0];
  // Giả sử tracks là recentlyPlayed, có thể thay bằng tracks của artist nếu có
  return <ArtistProfileScreen artist={artist} tracks={mockHomeData.recentlyPlayed} />;
} 