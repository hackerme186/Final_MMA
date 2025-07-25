import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

const NOW_PLAYING_BAR_HEIGHT = 64;
const TAB_BAR_HEIGHT = 60;

// Mock data for downloaded songs
const downloadedSongs = [
  { id: '1', title: 'Inside Out', artist: 'The Chainsmokers, Charlee', cover: 'https://api.a0.dev/assets/image?text=Inside%20Out&aspect=1:1&seed=123' },
  { id: '2', title: 'Young', artist: 'The Chainsmokers', cover: 'https://api.a0.dev/assets/image?text=Young&aspect=1:1&seed=124' },
  { id: '3', title: 'Beach House', artist: 'The Chainsmokers - Sick', cover: 'https://api.a0.dev/assets/image?text=Beach%20House&aspect=1:1&seed=125' },
  { id: '4', title: 'Kill You Slowly', artist: 'The Chainsmokers - World', cover: 'https://api.a0.dev/assets/image?text=Kill%20You%20Slowly&aspect=1:1&seed=126' },
  { id: '5', title: 'Setting Fires', artist: 'The Chainsmokers, XYLO', cover: 'https://api.a0.dev/assets/image?text=Setting%20Fires&aspect=1:1&seed=127' },
  { id: '6', title: 'Somebody', artist: 'The Chainsmokers, Drew', cover: 'https://api.a0.dev/assets/image?text=Somebody&aspect=1:1&seed=128' },
  { id: '7', title: 'Thunder', artist: 'Imagine Dragons - Summer', cover: 'https://api.a0.dev/assets/image?text=Thunder&aspect=1:1&seed=129' },
  { id: '8', title: 'High On Life', artist: 'Martin Garrix, Bonn - High On', cover: 'https://api.a0.dev/assets/image?text=High%20On%20Life&aspect=1:1&seed=130' },
  { id: '9', title: 'FRIENDS', artist: 'Marshmello, Anne-Marie', cover: 'https://api.a0.dev/assets/image?text=FRIENDS&aspect=1:1&seed=131' },
  { id: '10', title: 'Carry On', artist: 'Kygo', cover: 'https://api.a0.dev/assets/image?text=Carry%20On&aspect=1:1&seed=132' },
];

export function DownloadsScreen() {
  const navigation = useNavigation<any>();
  const [searchQuery, setSearchQuery] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedSong, setSelectedSong] = useState<any>(null);
  
  const goBack = () => {
    navigation.goBack();
  };
  
  const openDeleteModal = (song: any) => {
    setSelectedSong(song);
    setShowDeleteModal(true);
  };
  
  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setSelectedSong(null);
  };
  
  const deleteSong = () => {
    // In a real app, we would delete the song here
    closeDeleteModal();
  };
  
  const renderSongItem = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.songItem}>
      <Image source={{ uri: item.cover }} style={styles.songCover} />
      <View style={styles.songInfo}>
        <Text style={styles.songTitle}>{item.title}</Text>
        <Text style={styles.songArtist}>{item.artist}</Text>
      </View>
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.downloadButton}>
          <Ionicons name="checkmark-circle" size={22} color="#1DB954" />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.moreButton}
          onPress={() => openDeleteModal(item)}
        >
          <Ionicons name="ellipsis-vertical" size={20} color="#888" />
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
        <Text style={styles.headerTitle}>Downloads</Text>
      </View>
      
      <Text style={styles.songCount}>210 songs downloaded</Text>
      
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
        data={downloadedSongs}
        renderItem={renderSongItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.songsList}
      />
      
      {showDeleteModal && (
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={closeDeleteModal} style={styles.closeButton}>
                <Ionicons name="close" size={24} color="white" />
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Remove Download</Text>
              <View style={styles.emptySpace} />
            </View>
            <Text style={styles.modalText}>
              Are you sure you want to remove "{selectedSong?.title}" from your downloads?
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={[styles.modalButton, styles.cancelButton]} 
                onPress={closeDeleteModal}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.modalButton, styles.deleteButton]} 
                onPress={deleteSong}
              >
                <Text style={styles.deleteButtonText}>Remove</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
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
    paddingBottom: TAB_BAR_HEIGHT + 20,
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
  songArtist: {
    fontSize: 14,
    color: '#b3b3b3',
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  downloadButton: {
    padding: 8,
    marginRight: 4,
  },
  moreButton: {
    padding: 8,
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: '#282828',
    borderRadius: 8,
    padding: 20,
    width: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  closeButton: {
    padding: 4,
  },
  emptySpace: {
    width: 24,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  modalText: {
    fontSize: 16,
    color: '#b3b3b3',
    textAlign: 'center',
    marginBottom: 24,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
    width: '48%',
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#333',
  },
  deleteButton: {
    backgroundColor: '#1DB954',
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
});
