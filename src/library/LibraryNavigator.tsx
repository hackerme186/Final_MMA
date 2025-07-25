import { createStackNavigator } from '@react-navigation/stack';
import { LibraryScreen } from './LibraryScreen';
import { ArtistDetailScreen } from './screens/ArtistDetailScreen';
import { ArtistsScreen } from './screens/ArtistsScreen';
import { DownloadsScreen } from './screens/DownloadsScreen';
import { LikedSongsScreen } from './screens/LikedSongsScreen';
import { PlaylistDetailScreen } from './screens/PlaylistDetailScreen';
import { PlaylistsScreen } from './screens/PlaylistsScreen';
import { RecentlyPlayedScreen } from './screens/RecentlyPlayedScreen';

const Stack = createStackNavigator();

export function LibraryNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#121212',
          shadowColor: 'transparent',
          elevation: 0,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen
        name="Library"
        component={LibraryScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="LikedSongs"
        component={LikedSongsScreen}
        options={{ title: 'Liked Songs' }}
      />
      <Stack.Screen
        name="Downloads"
        component={DownloadsScreen}
      />
      <Stack.Screen
        name="Playlists"
        component={PlaylistsScreen}
      />
      <Stack.Screen
        name="ArtistsScreen"
        component={ArtistsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RecentlyPlayed"
        component={RecentlyPlayedScreen}
        options={{ title: 'Recently Played' }}
      />
      <Stack.Screen
        name="PlaylistDetail"
        component={PlaylistDetailScreen}
        options={({ route }: { route: any }) => ({ title: route.params?.name || 'Playlist' })}
      />
      <Stack.Screen
        name="ArtistDetail"
        component={ArtistDetailScreen}
        options={({ route }: { route: any }) => ({ title: route.params?.name || 'Artist' })}
      />

    </Stack.Navigator>
  );
}
