import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
// import { useState } from 'react';
import { Dimensions, FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
// import { followService } from '../services/followService';
import LoadingScreen from './components/LoadingScreen';

const { width } = Dimensions.get('window');
const ITEM_SIZE = (width - 64) / 4; // 4 items per row, 16px padding each side

const artists = [
  { id: '1', name: 'One Republic', avatar_url: null },
  { id: '2', name: 'Coldplay', avatar_url: null },
  { id: '3', name: 'The Chainsmokers', avatar_url: null },
  { id: '4', name: 'Linkin Park', avatar_url: null },
  { id: '5', name: 'Sia', avatar_url: null },
  { id: '6', name: 'Ellie Goulding', avatar_url: null },
  { id: '7', name: 'Katy Perry', avatar_url: null },
  { id: '8', name: 'Maroon 5', avatar_url: null },
];

export default function ArtistsScreen() {
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

  const filteredArtists = searchQuery.trim() === ''
    ? artists
    : artists.filter(artist =>
        artist.name.toLowerCase().includes(searchQuery.toLowerCase())
      );

  const handleUnfollowArtist = async (artistId: string) => {
    // const result = await followService.unfollowArtist(artistId);
    // if (!result.error) {
    //   // Remove from local state
    //   setFollowedArtists(prev => prev.filter(artist => artist.id !== artistId));
    // }
    console.log('Unfollow artist:', artistId);
  };

  const handleAddArtist = () => {
    // TODO: Navigate to discover artists screen
    console.log('Add new artist');
  };

  // Add the "Add More" item to the filtered artists
  const displayArtists = [...filteredArtists, { id: 'add-more', name: 'Add More', isAdd: true }];

  if (isLoading) {
    return <LoadingScreen />;
  }
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={goBackWithLoading}>
          <Ionicons name="arrow-back" size={26} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.header}>Artists Following</Text>
      </View>
      <Text style={styles.subHeader}>{artists.length} artists following</Text>
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
        data={displayArtists}
        keyExtractor={(item) => item.id}
        numColumns={4}
        columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: 18 }}
        renderItem={({ item }) => (
          <View style={styles.artistItem}>
            {(item as any).isAdd ? (
              <TouchableOpacity style={styles.addMoreCircle} onPress={handleAddArtist}>
                <Ionicons name="add" size={32} color="#fff" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onLongPress={() => handleUnfollowArtist(item.id)}>
                <Image
                  source={(item as any).avatar_url ? { uri: (item as any).avatar_url } : require('../../assets/images/partial-react-logo.png')}
                  style={styles.artistImage}
                />
              </TouchableOpacity>
            )}
            <Text style={styles.artistName} numberOfLines={1}>{item.name}</Text>
          </View>
        )}
        style={{ marginTop: 8 }}
        ListEmptyComponent={
          artists.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Ionicons name="person-outline" size={64} color="#666" />
              <Text style={styles.emptyText}>No artists followed yet</Text>
              <Text style={styles.emptySubtext}>Follow artists to see them here</Text>
            </View>
          ) : null
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
  artistItem: {
    alignItems: 'center',
    width: ITEM_SIZE,
  },
  artistImage: {
    width: ITEM_SIZE,
    height: ITEM_SIZE,
    borderRadius: ITEM_SIZE / 2,
    marginBottom: 6,
    backgroundColor: '#333',
  },
  addMoreCircle: {
    width: ITEM_SIZE,
    height: ITEM_SIZE,
    borderRadius: ITEM_SIZE / 2,
    backgroundColor: '#232526',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
    borderWidth: 1,
    borderColor: '#444',
  },
  artistName: {
    color: '#fff',
    fontSize: 13,
    textAlign: 'center',
    width: ITEM_SIZE,
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