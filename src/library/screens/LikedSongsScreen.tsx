import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { usePlayer } from '../../context/PlayerContext';
import { useFavorites } from '../../store/libraryStore';
import { useQueueStore } from '../../store/queueStore';

// Using real data from Zustand store

export function LikedSongsScreen() {
  const navigation = useNavigation<any>();
  const [searchQuery, setSearchQuery] = useState('');

  // Get favorites and player context
  const { favorites, toggleTrackFavorite } = useFavorites();
  const { playTrack, currentTrack } = usePlayer();
  const { setQueue } = useQueueStore();

  const goBack = () => {
    navigation.goBack();
  };

  const handlePlaySong = async (song: any) => {
    try {
      // Set queue with favorites and current track index
      const currentIndex = favorites.findIndex(track => track.id === song.id);
      setQueue(favorites, currentIndex);

      // Play the selected track
      await playTrack(song);
    } catch (error) {
      console.error('Failed to play song:', error);
    }
  };
  
  const renderSongItem = ({ item }: { item: any }) => {
    const isPlaying = currentTrack?.id === item.id;

    return (
      <TouchableOpacity
        style={styles.songItem}
        onPress={() => handlePlaySong(item)}
      >
        <Image source={{ uri: item.artwork }} style={styles.songCover} />
        <View style={styles.songInfo}>
          <Text style={[styles.songTitle, isPlaying && styles.activeSongTitle]}>
            {item.title}
          </Text>
          <Text style={styles.songArtist}>{item.artist}</Text>
        </View>
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={styles.heartButton}
            onPress={() => toggleTrackFavorite(item)}
          >
            <Ionicons name="heart" size={22} color="#1DB954" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.moreButton}>
            <Ionicons name="ellipsis-vertical" size={20} color="#888" />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack} style={styles.backButton}>
          <Ionicons name="chevron-back" size={28} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Liked Songs</Text>
      </View>
      
      <Text style={styles.songCount}>120 liked songs</Text>
      
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#888" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            placeholderTextColor="#888"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <TouchableOpacity style={styles.sortButton}>
          <Ionicons name="swap-vertical" size={24} color="white" />
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={favorites} // Use favorites from Zustand store
        renderItem={renderSongItem}
        keyExtractor={item => item.url} // Use URL as key
        contentContainerStyle={styles.songsList}
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
  songCount: {
    fontSize: 14,
    color: '#b3b3b3',
    marginLeft: 16,
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333',
    borderRadius: 4,
    paddingHorizontal: 12,
    height: 40,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    color: 'white',
    fontSize: 16,
  },
  sortButton: {
    marginLeft: 12,
    padding: 8,
  },
  songsList: {
    paddingHorizontal: 16,
    paddingBottom: 80, // Tab bar height + padding
  },
  songItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  songCover: {
    width: 50,
    height: 50,
    borderRadius: 4,
  },
  songInfo: {
    flex: 1,
    marginLeft: 12,
  },
  songTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: 'white',
  },
  activeSongTitle: {
    color: '#1DB954',
  },
  songArtist: {
    fontSize: 14,
    color: '#b3b3b3',
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  heartButton: {
    padding: 8,
    marginRight: 4,
  },
  moreButton: {
    padding: 8,
  },
});
