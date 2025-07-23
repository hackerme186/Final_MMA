import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
// import { useState } from 'react';
import { Dimensions, FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSupabase } from '../hooks/useSupabase';
import LoadingScreen from './components/LoadingScreen';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2; // 2 cards per row, 24px padding each side

export default function PlaylistsScreen() {
  const navigation = useNavigation();
  const { playlists } = useSupabase();
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

  const filteredPlaylists = searchQuery.trim() === ''
    ? playlists
    : playlists.filter(playlist =>
        playlist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        playlist.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );

  const handleCreatePlaylist = () => {
    console.log('Create new playlist');
  };
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={goBackWithLoading}>
          <Ionicons name="arrow-back" size={26} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.header}>Playlists</Text>
      </View>
      <Text style={styles.subHeader}>{playlists.length} playlists</Text>
      <View style={styles.searchRow}>
        <Ionicons name="search" size={20} color="#aaa" style={{ marginLeft: 8 }} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          placeholderTextColor="#aaa"
          value={searchQuery}
          onChangeText={() => {}}
        />
        <TouchableOpacity onPress={handleCreatePlaylist}>
          <Ionicons name="add" size={26} color="#fff" />
        </TouchableOpacity>
      </View>
      <Text style={styles.sectionTitle}>Your Playlists</Text>
      <FlatList
        data={filteredPlaylists}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} activeOpacity={0.85}>
            <Image
              source={item.cover_url ? { uri: item.cover_url } : require('../../assets/images/partial-react-logo.png')}
              style={styles.cardImage}
            />
            <Text style={styles.cardTitle} numberOfLines={1}>{item.name}</Text>
            <Text style={styles.cardSubtitle} numberOfLines={1}>
              {item.is_public ? 'Public Playlist' : 'Private Playlist'}
            </Text>
          </TouchableOpacity>
        )}
        style={{ marginTop: 8 }}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="musical-notes-outline" size={64} color="#666" />
            <Text style={styles.emptyText}>No playlists yet</Text>
            <Text style={styles.emptySubtext}>Create your first playlist</Text>
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
  sectionTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    marginLeft: 2,
  },
  card: {
    width: CARD_WIDTH,
    backgroundColor: '#232526',
    borderRadius: 12,
    marginBottom: 16,
    padding: 10,
    alignItems: 'center',
  },
  cardImage: {
    width: CARD_WIDTH - 20,
    height: CARD_WIDTH - 20,
    borderRadius: 10,
    marginBottom: 8,
    backgroundColor: '#333',
  },
  cardTitle: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
    marginBottom: 2,
    textAlign: 'center',
  },
  cardSubtitle: {
    color: '#aaa',
    fontSize: 13,
    textAlign: 'center',
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
    paddingHorizontal: 20,
  },
  emptyText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
    textAlign: 'center',
  },
  emptySubtext: {
    color: '#aaa',
    fontSize: 14,
    marginTop: 4,
    textAlign: 'center',
  },
});
