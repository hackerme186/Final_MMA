import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

const NOW_PLAYING_BAR_HEIGHT = 64;
const TAB_BAR_HEIGHT = 60;

// Mock data for playlists
const playlists = [
  { 
    id: '1', 
    name: 'Recents', 
    items: [
      { id: 'p1-1', name: 'Maroon 5 Songs', cover: 'https://api.a0.dev/assets/image?text=Maroon%205&aspect=1:1&seed=201' },
      { id: 'p1-2', name: 'Phonk Madness', cover: 'https://api.a0.dev/assets/image?text=Phonk&aspect=1:1&seed=202' },
    ]
  },
  { 
    id: '2', 
    name: 'Made For You', 
    items: [
      { id: 'p2-1', name: 'Gryffin Collection', cover: 'https://api.a0.dev/assets/image?text=Gryffin&aspect=1:1&seed=203' },
      { id: 'p2-2', name: 'John Wick Chapter 4', cover: 'https://api.a0.dev/assets/image?text=John%20Wick&aspect=1:1&seed=204' },
    ]
  },
  { 
    id: '3', 
    name: 'Recently Added', 
    items: [
      { id: 'p3-1', name: 'Chill Vibes', cover: 'https://api.a0.dev/assets/image?text=Chill&aspect=1:1&seed=205' },
      { id: 'p3-2', name: 'Workout Mix', cover: 'https://api.a0.dev/assets/image?text=Workout&aspect=1:1&seed=206' },
    ]
  },
];

export function PlaylistsScreen() {
  const navigation = useNavigation<any>();
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState('');
  
  const goBack = () => {
    navigation.goBack();
  };
  
  const openCreateModal = () => {
    setShowCreateModal(true);
  };
  
  const closeCreateModal = () => {
    setShowCreateModal(false);
    setNewPlaylistName('');
  };
  
  const createPlaylist = () => {
    // In a real app, we would create the playlist here
    closeCreateModal();
  };
  
  const handlePlaylistPress = (playlist: any) => {
    navigation.navigate('PlaylistDetail', { 
      id: playlist.id, 
      name: playlist.name 
    });
  };
  
  const renderPlaylistItem = ({ item }: { item: any }) => (
    <TouchableOpacity 
      style={styles.playlistItem}
      onPress={() => handlePlaylistPress(item)}
    >
      <Image source={{ uri: item.cover }} style={styles.playlistCover} />
      <Text style={styles.playlistName}>{item.name}</Text>
      <Text style={styles.playlistType}>Playlist • Yourself</Text>
    </TouchableOpacity>
  );
  
  const renderPlaylistSection = ({ item }: { item: any }) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{item.name}</Text>
      <FlatList
        data={item.items}
        renderItem={renderPlaylistItem}
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalList}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack} style={styles.backButton}>
          <Ionicons name="chevron-back" size={28} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Playlists</Text>
      </View>
      
      <Text style={styles.playlistCount}>12 playlists</Text>
      
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
        <TouchableOpacity 
          style={styles.createButton}
          onPress={openCreateModal}
        >
          <Ionicons name="add" size={24} color="white" />
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={playlists}
        renderItem={renderPlaylistSection}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.playlistsList}
      />
      
      {showCreateModal && (
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={closeCreateModal} style={styles.closeButton}>
                <Ionicons name="close" size={24} color="white" />
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Create Playlist</Text>
              <View style={styles.emptySpace} />
            </View>
            <TextInput
              style={styles.modalInput}
              placeholder="Playlist name"
              placeholderTextColor="#888"
              value={newPlaylistName}
              onChangeText={setNewPlaylistName}
              autoFocus
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={[styles.modalButton, styles.cancelButton]} 
                onPress={closeCreateModal}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.modalButton, styles.createPlaylistButton]} 
                onPress={createPlaylist}
              >
                <Text style={styles.createButtonText}>Create</Text>
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
  playlistCount: {
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
  createButton: {
    marginLeft: 12,
    padding: 8,
  },
  playlistsList: {
    paddingBottom: TAB_BAR_HEIGHT + 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 16,
    marginBottom: 16,
  },
  horizontalList: {
    paddingLeft: 16,
  },
  playlistItem: {
    width: 160,
    marginRight: 16,
  },
  playlistCover: {
    width: 160,
    height: 160,
    borderRadius: 8,
    marginBottom: 8,
  },
  playlistName: {
    fontSize: 14,
    fontWeight: '600',
    color: 'white',
    marginBottom: 4,
  },
  playlistType: {
    fontSize: 12,
    color: '#b3b3b3',
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
  modalInput: {
    backgroundColor: '#333',
    borderRadius: 4,
    padding: 12,
    color: 'white',
    fontSize: 16,
    marginBottom: 24,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  createPlaylistButton: {
    backgroundColor: '#1DB954',
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  createButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
});
