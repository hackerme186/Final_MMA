import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Mock data for artists following
const mockArtists = [
  {
    id: '1',
    name: 'KOBASOLO',
    image: 'https://i.scdn.co/image/ab67616d0000b273f7b3d3e1b2c4d5e6f7g8h9i0',
    followers: '1.2M',
  },
  {
    id: '2', 
    name: 'Rokudenashi',
    image: 'https://i.scdn.co/image/ab67616d0000b273a1b2c3d4e5f6g7h8i9j0k1l2',
    followers: '850K',
  },
  {
    id: '3',
    name: 'Harry Styles',
    image: 'https://i.scdn.co/image/ab67616d0000b273b2c3d4e5f6g7h8i9j0k1l2m3',
    followers: '45M',
  },
];

export function ArtistsFollowingScreen() {
  const renderArtistItem = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.artistItem}>
      <Image source={{ uri: item.image }} style={styles.artistImage} />
      <View style={styles.artistInfo}>
        <Text style={styles.artistName}>{item.name}</Text>
        <Text style={styles.artistFollowers}>{item.followers} followers</Text>
      </View>
      <TouchableOpacity style={styles.followButton}>
        <Text style={styles.followButtonText}>Following</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Following Artists</Text>
        <Text style={styles.subtitle}>{mockArtists.length} artists</Text>
      </View>

      <FlatList
        data={mockArtists}
        renderItem={renderArtistItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    padding: 20,
    paddingTop: 60,
  },
  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    color: '#b3b3b3',
    fontSize: 16,
  },
  listContainer: {
    paddingHorizontal: 20,
  },
  artistItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  artistImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  artistInfo: {
    flex: 1,
  },
  artistName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  artistFollowers: {
    color: '#b3b3b3',
    fontSize: 14,
  },
  followButton: {
    borderWidth: 1,
    borderColor: '#1DB954',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  followButtonText: {
    color: '#1DB954',
    fontSize: 14,
    fontWeight: '600',
  },
});
