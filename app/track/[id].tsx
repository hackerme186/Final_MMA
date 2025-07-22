import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { TrackDetailScreen } from '../../src/screens/Home/components/TrackDetail/TrackDetailScreen';
import { mockHomeData } from '../../src/screens/Home/mockHomeData';

export default function TrackDetailRoute() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const track = mockHomeData.recentlyPlayed.find(t => t.id === id) || mockHomeData.recentlyPlayed[0];
  return <TrackDetailScreen track={track} onLyricsPress={() => router.push(`/lyrics/${track.id}`)} />;
} 