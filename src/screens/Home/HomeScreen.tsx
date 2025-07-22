import React from 'react';
import { SafeAreaView, ScrollView, StatusBar } from 'react-native';
import { HomeHeader } from './components/HomeHeader/HomeHeader';
import { FeaturedAlbumsSection } from './components/sections/FeaturedAlbumsSection';
import { MixesSection } from './components/sections/MixesSection';
import { PlaylistGridSection } from './components/sections/PlaylistGridSection';
import { RecentlyPlayedSection } from './components/sections/RecentlyPlayedSection';
import { mockAlbums, mockMixes, mockPlaylists, mockRecentlyPlayed } from './mockHomeData';

export default function HomeScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0D0D0D' }}>
      <StatusBar barStyle="light-content" backgroundColor="#0D0D0D" />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <HomeHeader />
        <FeaturedAlbumsSection albums={mockAlbums} />
        <MixesSection mixes={mockMixes} />
        <RecentlyPlayedSection tracks={mockRecentlyPlayed} />
        <PlaylistGridSection playlists={mockPlaylists} />
      </ScrollView>
    </SafeAreaView>
  );
} 