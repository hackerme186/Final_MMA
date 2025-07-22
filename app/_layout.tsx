import { Stack } from 'expo-router';
import React from 'react';
import { AuthProvider } from '../src/context/AuthContext';

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="artist/[id]" />
        <Stack.Screen name="album/[id]" />
        <Stack.Screen name="track/[id]" />
        <Stack.Screen name="playlist/[id]" />
        <Stack.Screen name="lyrics/[trackId]" />
        <Stack.Screen name="search" />
      </Stack>
    </AuthProvider>
  );
}
