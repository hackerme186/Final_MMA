import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
// import { useState } from 'react';
import { Dimensions, FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
// import { downloadService } from '../services/downloadService';
import LoadingScreen from './components/LoadingScreen';

const { width } = Dimensions.get('window');

const downloads = [
  { id: '1', title: 'Inside Out', artist: 'The Chainsmokers, Charlee', cover_url: null, downloaded: true },
  { id: '2', title: 'Young', artist: 'The Chainsmokers', cover_url: null, downloaded: true },
  { id: '3', title: 'Beach House', artist: 'The Chainsmokers - Sick', cover_url: null, downloaded: true },
  { id: '4', title: 'Kills You Slowly', artist: 'The Chainsmokers - World', cover_url: null, downloaded: true },
  { id: '5', title: 'Setting Fires', artist: 'The Chainsmokers, XYLO', cover_url: null, downloaded: true },
];

export default function DownloadsScreen() {
  const navigation = useNavigation();
  // const [searchQuery, setSearchQuery] = useState('');
  // const [isLoading, setIsLoading] = useState(false);
  const searchQuery = '';
  const isLoading = false;

  const goBackWithLoading = () => {
    // setIsLoading(true);
    setTimeout(() => {
      navigation.goBack();
      // setIsLoading(false);
    }, 200);
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  const filteredSongs = searchQuery.trim() === ''
    ? downloads
    : downloads.filter(song =>
        song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        song.artist.toLowerCase().includes(searchQuery.toLowerCase())
      );

  const handleRemoveDownload = (songId: string) => {
    console.log('Remove download:', songId);
  };

  if (isLoading) {
    return <LoadingScreen />;
  }
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={goBackWithLoading}>
          <Ionicons name="arrow-back" size={26} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.header}>Downloads</Text>
      </View>
      <Text style={styles.subHeader}>{downloads.length} songs downloaded</Text>
      <View style={styles.searchRow}>
        <Ionicons name="search" size={20} color="#aaa" style={{ marginLeft: 8 }} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          placeholderTextColor="#aaa"
          value={searchQuery}
          onChangeText={() => {}}
        />
        <TouchableOpacity>
          <MaterialIcons name="sort" size={22} color="#fff" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={filteredSongs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.songRow}>
            <Image
              source={(item as any).cover_url ? { uri: (item as any).cover_url } : require('../../assets/images/partial-react-logo.png')}
              style={styles.songImage}
            />
            <View style={{ flex: 1 }}>
              <Text style={styles.songTitle} numberOfLines={1}>{item.title}</Text>
              <Text style={styles.songArtist} numberOfLines={1}>{item.artist}</Text>
            </View>
            <Ionicons name="checkmark-circle" size={22} color="#1DB954" style={{ marginRight: 8 }} />
            <TouchableOpacity onPress={() => handleRemoveDownload(item.id)}>
              <Ionicons name="download" size={22} color="#ff4444" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.songMenuBtn}>
              <MaterialIcons name="more-vert" size={22} color="#fff" />
            </TouchableOpacity>
          </View>
        )}
        style={{ marginTop: 8 }}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="download-outline" size={64} color="#666" />
            <Text style={styles.emptyText}>No downloads yet</Text>
            <Text style={styles.emptySubtext}>Downloaded songs will appear here</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181818',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  header: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: 16,
  },
  subHeader: {
    color: '#aaa',
    fontSize: 15,
    marginBottom: 12,
    marginLeft: 2,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#232526',
    borderRadius: 8,
    marginBottom: 12,
    height: 38,
  },
  searchInput: {
    flex: 1,
    color: '#fff',
    fontSize: 15,
    paddingHorizontal: 8,
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
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#fff',
    fontSize: 16,
    marginTop: 12,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
  },
  emptySubtext: {
    color: '#aaa',
    fontSize: 14,
    marginTop: 4,
  },
});
