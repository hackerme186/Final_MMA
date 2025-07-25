import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const NOW_PLAYING_BAR_HEIGHT = 64;
const TAB_BAR_HEIGHT = 60;

// Mock data for artists
const artists = [
  { id: '1', name: 'One Republic', cover: 'https://api.a0.dev/assets/image?text=One%20Republic&aspect=1:1&seed=301', followers: '12.5M' },
  { id: '2', name: 'Coldplay', cover: 'https://api.a0.dev/assets/image?text=Coldplay&aspect=1:1&seed=302', followers: '45.8M' },
  { id: '3', name: 'The Chainsmokers', cover: 'https://api.a0.dev/assets/image?text=Chainsmokers&aspect=1:1&seed=303', followers: '22.3M' },
  { id: '4', name: 'Linkin Park', cover: 'https://api.a0.dev/assets/image?text=Linkin%20Park&aspect=1:1&seed=304', followers: '30.1M' },
  { id: '5', name: 'Sia', cover: 'https://api.a0.dev/assets/image?text=Sia&aspect=1:1&seed=305', followers: '18.7M' },
  { id: '6', name: 'Ellie Goulding', cover: 'https://api.a0.dev/assets/image?text=Ellie%20Goulding&aspect=1:1&seed=306', followers: '15.2M' },
  { id: '7', name: 'Katy Perry', cover: 'https://api.a0.dev/assets/image?text=Katy%20Perry&aspect=1:1&seed=307', followers: '50.3M' },
  { id: '8', name: 'Maroon 5', cover: 'https://api.a0.dev/assets/image?text=Maroon%205&aspect=1:1&seed=308', followers: '38.9M' },
  { id: '9', name: 'Adel Mane', cover: 'https://api.a0.dev/assets/image?text=Adel%20Mane&aspect=1:1&seed=309', followers: '5.4M' },
];

export function ArtistsScreen() {
  const navigation = useNavigation<any>();
  
  const goBack = () => {
    navigation.goBack();
  };
  
  const handleArtistPress = (artist: any) => {
    // Navigate to artist detail screen
    navigation.navigate('ArtistDetail', { artistId: artist.id, artistName: artist.name });
  };
  
  const renderArtistItem = ({ item }: { item: any }) => (
    <TouchableOpacity 
      style={styles.artistItem}
      onPress={() => handleArtistPress(item)}
    >
      <Image source={{ uri: item.cover }} style={styles.artistImage} />
      <Text style={styles.artistName}>{item.name}</Text>
      <View style={styles.followContainer}>
        <Text style={styles.followCount}>{item.followers} followers</Text>
        <TouchableOpacity style={styles.followButton}>
          <Ionicons name="add" size={16} color="white" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack} style={styles.backButton}>
          <Ionicons name="chevron-back" size={28} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Artists Following</Text>
      </View>
      
      <Text style={styles.artistCount}>8 artists following</Text>
      
      <View style={styles.sortContainer}>
        <TouchableOpacity style={styles.sortButton}>
          <Text style={styles.sortButtonText}>Recently Added</Text>
          <Ionicons name="chevron-down" size={16} color="#b3b3b3" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.sortButton}>
          <Ionicons name="swap-vertical" size={20} color="white" />
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={artists}
        renderItem={renderArtistItem}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={styles.artistsList}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  artistCount: {
    fontSize: 14,
    color: '#b3b3b3',
    marginLeft: 16,
    marginBottom: 16,
  },
  sortContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  sortButtonText: {
    color: '#b3b3b3',
    marginRight: 4,
    fontSize: 14,
  },
  artistsList: {
    paddingHorizontal: 8,
    paddingBottom: TAB_BAR_HEIGHT + 20,
  },
  artistItem: {
    width: '50%',
    padding: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  artistImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 12,
  },
  artistName: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
    textAlign: 'center',
    marginBottom: 4,
  },
  followContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  followCount: {
    fontSize: 12,
    color: '#b3b3b3',
    marginRight: 8,
  },
  followButton: {
    backgroundColor: '#333',
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
