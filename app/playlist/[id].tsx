import React from 'react';
import { PlaylistDetailScreen } from '../../src/screens/Home/components/PlaylistDetail/PlaylistDetailScreen';
import { mockHomeData } from '../../src/screens/Home/mockHomeData';

const mockPlaylist = {
  id: '1',
  name: 'My Playlist',
  cover: 'https://i.imgur.com/1.jpg',
  tracks: mockHomeData.recentlyPlayed,
};

export default function PlaylistDetailRoute() {
  // const { id } = useLocalSearchParams(); // Có thể dùng id để fetch playlist thật
  return <PlaylistDetailScreen playlist={mockPlaylist} />;
} 