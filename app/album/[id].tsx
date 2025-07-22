import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { AlbumDetailScreen } from '../../src/screens/Home/components/AlbumDetail/AlbumDetailScreen';
import { mockHomeData } from '../../src/screens/Home/mockHomeData';

export default function AlbumDetailRoute() {
  const { id } = useLocalSearchParams();
  const album = mockHomeData.featuredAlbum;
  // Giả sử tracks là recentlyPlayed, có thể thay bằng tracks của album nếu có
  return <AlbumDetailScreen album={album} tracks={mockHomeData.recentlyPlayed} />;
} 