
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { usePlayer } from '../context/PlayerContext';
import { useLibraryStats, useToggleTrackFavorite, useTracks } from '../store/libraryStore';
import { useQueueStore } from '../store/queueStore';

// Using real data from library.json

export function LibraryScreen() {
  const navigation = useNavigation<any>();

  // Get data from Zustand store
  const tracks = useTracks();
  const stats = useLibraryStats();
  const toggleTrackFavorite = useToggleTrackFavorite();

  // Player context
  const { playTrack, currentTrack } = usePlayer();
  const { setQueue } = useQueueStore();

  const navigateToScreen = (screenName: string) => {
    navigation.navigate(screenName);
  };

  const handlePlaySong = async (song: any) => {
    try {
      // Set queue with all tracks and current track index
      const currentIndex = tracks.findIndex(track => track.id === song.id);
      setQueue(tracks, currentIndex);

      // Play the selected track
      await playTrack(song);
    } catch (error) {
      console.error('Failed to play song:', error);
    }
  };

  const renderRecentItem = ({ item }: { item: any }) => {
    const isPlaying = currentTrack?.id === item.id;
    const isFavorite = item.rating === 1;

    return (
      <TouchableOpacity
        style={styles.recentItem}
        onPress={() => handlePlaySong(item)}
      >
        <Image source={{ uri: item.artwork || item.cover }} style={styles.recentCover} />
        <View style={styles.recentInfo}>
          <Text style={[styles.recentTitle, isPlaying && styles.activeTitle]}>
            {item.title}
          </Text>
          <Text style={styles.recentArtist}>{item.artist}</Text>
        </View>
        <View style={styles.recentActions}>
          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={() => toggleTrackFavorite(item)}
          >
            <Ionicons
              name={isFavorite ? "heart" : "heart-outline"}
              size={20}
              color={isFavorite ? "#1DB954" : "#888"}
            />
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
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Your Library</Text>
        </View>

        <View style={styles.categoryGrid}>
          <TouchableOpacity
            style={styles.categoryCard}
            onPress={() => navigateToScreen('LikedSongs')}
          >
            <View style={styles.categoryIcon}>
              <Ionicons name="heart" size={24} color="white" />
            </View>
            <Text style={styles.categoryTitle}>Liked Songs</Text>
            <Text style={styles.categorySubtitle}>{stats.likedTracks} songs</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.categoryCard}
            onPress={() => navigateToScreen('Downloads')}
          >
            <View style={styles.categoryIcon}>
              <Ionicons name="arrow-down-circle" size={24} color="white" />
            </View>
            <Text style={styles.categoryTitle}>Downloads</Text>
            <Text style={styles.categorySubtitle}>210 songs</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.categoryCard}
            onPress={() => navigateToScreen('Playlists')}
          >
            <View style={styles.categoryIcon}>
              <MaterialIcons name="playlist-play" size={24} color="white" />
            </View>
            <Text style={styles.categoryTitle}>Playlists</Text>
            <Text style={styles.categorySubtitle}>{stats.totalPlaylists} playlists</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.categoryCard}
            onPress={() => navigation.navigate('ArtistsScreen')}
          >
            <View style={styles.categoryIcon}>
              <MaterialIcons name="people" size={24} color="white" />
            </View>
            <Text style={styles.categoryTitle}>Artists</Text>
            <Text style={styles.categorySubtitle}>8 artists</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recently Played</Text>
          </View>

          <FlatList
            data={tracks.slice(0, 6)} // Show first 6 songs from library
            renderItem={renderRecentItem}
            keyExtractor={item => item.url} // Use URL as key since no ID
            scrollEnabled={false}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  scrollViewContent: {
    paddingBottom: 60, // Default padding for tab bar
  },
  header: {
    padding: 16,
    paddingBottom: 8,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 8,
  },
  categoryCard: {
    width: '45%',
    backgroundColor: '#282828',
    borderRadius: 8,
    padding: 16,
    margin: '2.5%',
  },
  categoryIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  categorySubtitle: {
    fontSize: 12,
    color: '#b3b3b3',
  },
  section: {
    padding: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  seeMore: {
    fontSize: 14,
    color: '#b3b3b3',
  },
  recentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  recentCover: {
    width: 50,
    height: 50,
    borderRadius: 4,
  },
  recentInfo: {
    flex: 1,
    marginLeft: 12,
  },
  recentTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: 'white',
  },
  activeTitle: {
    color: '#1DB954',
  },
  recentArtist: {
    fontSize: 14,
    color: '#b3b3b3',
  },
  recentActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  favoriteButton: {
    padding: 8,
    marginRight: 4,
  },
  moreButton: {
    padding: 8,
  },
});

