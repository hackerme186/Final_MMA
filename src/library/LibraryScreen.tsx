import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Dimensions, FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSupabase } from '../hooks/useSupabase';
import { Song } from '../types';

// Định nghĩa type cho Stack Navigator
export type LibraryStackParamList = {
  LibraryScreen: undefined;
  LikedSongsScreen: undefined;
  DownloadsScreen: undefined;
  PlaylistsScreen: undefined;
  PlaylistDetailScreen: undefined;
  ArtistsScreen: undefined;
};

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2; // 2 cards per row, 24px padding each side

export default function LibraryScreen() {
  const navigation = useNavigation();
  const { likedSongs, recentlyPlayed: recentSongs, playlists } = useSupabase();
  // const [isLoading, setIsLoading] = useState(false);
  const isLoading = false;

  const navigateWithLoading = (screenName: string) => {
    // setIsLoading(true);
    setTimeout(() => {
      navigation.navigate(screenName as never);
      // setIsLoading(false);
    }, 300);
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  const libraryItems = [
    {
      key: 'liked',
      title: 'Liked Songs',
      subtitle: `${likedSongs.length} songs`,
      icon: <Ionicons name="heart" size={28} color="#fff" />,
      bg: ['#232526', '#414345'],
      navigateTo: 'LikedSongsScreen',
    },
    {
      key: 'downloads',
      title: 'Downloads',
      subtitle: '0 songs',
      icon: <Ionicons name="download" size={28} color="#fff" />,
      bg: ['#232526', '#414345'],
      navigateTo: 'DownloadsScreen',
    },
    {
      key: 'playlists',
      title: 'Playlists',
      subtitle: `${playlists.length} playlists`,
      icon: <Ionicons name="musical-notes" size={28} color="#fff" />,
      bg: ['#232526', '#414345'],
      navigateTo: 'PlaylistsScreen',
    },
    {
      key: 'artists',
      title: 'Artists',
      subtitle: '0 artists',
      icon: <Ionicons name="person" size={28} color="#fff" />,
      bg: ['#232526', '#414345'],
      navigateTo: 'ArtistsScreen',
    },
  ];
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 24 }}>
      <Text style={styles.header}>Your Library</Text>
      <View style={styles.gridContainer}>
        {libraryItems.map((item) => (
          <TouchableOpacity
            key={item.key}
            style={styles.card}
            activeOpacity={0.8}
            onPress={() => navigateWithLoading(item.navigateTo)}
          >
            <View style={styles.iconWrap}>{item.icon}</View>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.sectionHeaderRow}>
        <Text style={styles.sectionHeader}>Recently Played</Text>
        <TouchableOpacity>
          <Text style={styles.seeMore}>See more</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={recentSongs.slice(0, 6)}
        keyExtractor={(item: Song) => item.id}
        renderItem={({ item }) => (
          <View style={styles.songRow}>
            <Image
              source={item.artwork ? { uri: item.artwork } : require('../../assets/images/partial-react-logo.png')}
              style={styles.songImage}
            />
            <View style={{ flex: 1 }}>
              <Text style={styles.songTitle} numberOfLines={1}>{item.title}</Text>
              <Text style={styles.songArtist} numberOfLines={1}>{item.artist}</Text>
            </View>
            <TouchableOpacity style={styles.songMenuBtn}>
              <MaterialIcons name="more-vert" size={22} color="#fff" />
            </TouchableOpacity>
          </View>
        )}
        scrollEnabled={false}
        style={{ marginTop: 8 }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181818',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  header: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  card: {
    width: CARD_WIDTH,
    height: 90,
    backgroundColor: '#232526',
    borderRadius: 12,
    marginBottom: 16,
    padding: 14,
    justifyContent: 'center',
  },
  iconWrap: {
    marginBottom: 8,
  },
  cardTitle: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  cardSubtitle: {
    color: '#aaa',
    fontSize: 13,
    marginTop: 2,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionHeader: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  seeMore: {
    color: '#aaa',
    fontSize: 14,
  },
  songRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  songImage: {
    width: 44,
    height: 44,
    borderRadius: 6,
    marginRight: 12,
    backgroundColor: '#333',
  },
  songTitle: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '500',
  },
  songArtist: {
    color: '#aaa',
    fontSize: 13,
    marginTop: 2,
  },
  songMenuBtn: {
    padding: 8,
  },
});
