import { Stack } from 'expo-router';
import React from 'react';
import { FloatingPlayer } from '../src/components/FloatingPlayer';
import { AuthProvider } from '../src/context/AuthContext';
import { PlayerProvider } from '../src/context/PlayerContext';

export default function RootLayout() {
  return (
    <AuthProvider>
      <PlayerProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="artist/[id]" />
          <Stack.Screen name="album/[id]" />
          <Stack.Screen name="track/[id]" />
          <Stack.Screen name="playlist/[id]" />
          <Stack.Screen name="lyrics/[trackId]" />
          <Stack.Screen name="search" />
        </Stack>
        <FloatingPlayer />
      </PlayerProvider>
    </AuthProvider>
  );
}
