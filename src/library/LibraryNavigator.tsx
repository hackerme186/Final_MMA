import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import ArtistsScreen from './ArtistsScreen';
import DownloadsScreen from './DownloadsScreen';
import LibraryScreen from './LibraryScreen';
import LikedSongsScreen from './LikedSongsScreen';
import PlaylistDetailScreen from './PlaylistDetailScreen';
import PlaylistsScreen from './PlaylistsScreen';

const Stack = createStackNavigator();

export default function LibraryNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="LibraryScreen"
      screenOptions={{
        headerShown: false,
        // Disable gesture navigation
        gestureEnabled: false,
        // Remove all transition animations - instant navigation
        transitionSpec: {
          open: {
            animation: 'timing',
            config: {
              duration: 0, // Instant transition
            },
          },
          close: {
            animation: 'timing',
            config: {
              duration: 0, // Instant transition
            },
          },
        },
        cardStyleInterpolator: () => ({
          cardStyle: {
            opacity: 1,
          },
        }),
      }}
    >
      <Stack.Screen name="LibraryScreen" component={LibraryScreen} />
      <Stack.Screen name="LikedSongsScreen" component={LikedSongsScreen} />
      <Stack.Screen name="DownloadsScreen" component={DownloadsScreen} />
      <Stack.Screen name="PlaylistsScreen" component={PlaylistsScreen} />
      <Stack.Screen name="PlaylistDetailScreen" component={PlaylistDetailScreen} />
      <Stack.Screen name="ArtistsScreen" component={ArtistsScreen} />
    </Stack.Navigator>
  );
}
