import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import {
  Alert,
  FlatList,
  Image,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { useSupabase } from '../../hooks/useSupabase';

export function PlaylistDetailScreen({ route, navigation }: { route: any; navigation: any }) {
  const { id, name } = route.params;
  const {
    getPlaylistSongs,
    removeFromPlaylist,
    updatePlaylist,
    deletePlaylist,
    addToRecentlyPlayed
  } = useSupabase();

  const [playlist, setPlaylist] = useState<any>(null);
  const [songs, setSongs] = useState<any[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(name);
  const [editDescription, setEditDescription] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    loadPlaylistData();
  }, [id]);

  const loadPlaylistData = async () => {
    try {
      const result = await getPlaylistSongs(id);
      const playlistSongs = result.songs || [];
      setSongs(playlistSongs);
      // In a real app, you would also fetch playlist details
      setPlaylist({
        id,
        name: editName,
        description: editDescription,
        cover_url: 'https://via.placeholder.com/300',
        song_count: playlistSongs.length
      });
    } catch (error) {
      console.error('Error loading playlist:', error);
    }
  };

  const handlePlaySong = (song: any, index: number) => {
    addToRecentlyPlayed(song.id);
    navigation.navigate('Player', {
      songId: song.id,
      playlist: songs,
      currentIndex: index
    });
  };

  const handleRemoveSong = async (songId: string) => {
    Alert.alert(
      'Remove Song',
      'Are you sure you want to remove this song from the playlist?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Remove', 
          style: 'destructive',
          onPress: async () => {
            await removeFromPlaylist(id, songId);
            loadPlaylistData();
          }
        }
      ]
    );
  };

  const handleEditPlaylist = async () => {
    try {
      await updatePlaylist(id, {
        name: editName,
        description: editDescription
      });
      setShowEditModal(false);
      loadPlaylistData();
    } catch (error) {
      console.error('Error updating playlist:', error);
    }
  };

  const handleDeletePlaylist = () => {
    Alert.alert(
      'Delete Playlist',
      'Are you sure you want to delete this playlist? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: async () => {
            await deletePlaylist(id);
            navigation.goBack();
          }
        }
      ]
    );
  };

  const renderSongItem = ({ item, index }: { item: any; index: number }) => (
    <TouchableOpacity 
      style={styles.songItem}
      onPress={() => handlePlaySong(item, index)}
    >
      <Text style={styles.songNumber}>{index + 1}</Text>
      <Image 
        source={{ uri: item.artwork || 'https://via.placeholder.com/50' }} 
        style={styles.songImage} 
      />
      <View style={styles.songInfo}>
        <Text style={styles.songTitle} numberOfLines={1}>{item.title}</Text>
        <Text style={styles.songArtist} numberOfLines={1}>{item.artist}</Text>
      </View>
      <TouchableOpacity 
        style={styles.removeButton}
        onPress={() => handleRemoveSong(item.id)}
      >
        <Ionicons name="close" size={20} color="#999" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.moreButton}>
        <Ionicons name="ellipsis-vertical" size={20} color="#999" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  if (!playlist) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.moreButton}
          onPress={() => setShowEditModal(true)}
        >
          <Ionicons name="ellipsis-vertical" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Playlist Info */}
      <View style={styles.playlistInfo}>
        <Image 
          source={{ uri: playlist.cover_url }} 
          style={styles.playlistCover} 
        />
        <Text style={styles.playlistName}>{playlist.name}</Text>
        <Text style={styles.playlistDescription}>{playlist.description}</Text>
        <Text style={styles.songCount}>{playlist.song_count} songs</Text>
        
        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity 
            style={styles.playButton}
            onPress={() => songs.length > 0 && handlePlaySong(songs[0], 0)}
          >
            <Ionicons name="play" size={24} color="#fff" />
            <Text style={styles.playButtonText}>Play</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.shuffleButton}>
            <Ionicons name="shuffle" size={20} color="#fff" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.downloadButton}>
            <Ionicons name="download-outline" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Songs List */}
      <FlatList
        data={songs}
        renderItem={renderSongItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.songsList}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No songs in this playlist</Text>
            <TouchableOpacity 
              style={styles.addSongsButton}
              onPress={() => {
                // Navigate to search tab instead
                console.log('Navigate to search tab');
              }}
            >
              <Text style={styles.addSongsText}>Add songs</Text>
            </TouchableOpacity>
          </View>
        }
      />

      {/* Edit Modal */}
      <Modal
        visible={showEditModal}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setShowEditModal(false)}>
              <Text style={styles.modalCancel}>Cancel</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Edit Playlist</Text>
            <TouchableOpacity onPress={handleEditPlaylist}>
              <Text style={styles.modalSave}>Save</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.modalContent}>
            <TextInput
              style={styles.input}
              value={editName}
              onChangeText={setEditName}
              placeholder="Playlist name"
              placeholderTextColor="#999"
            />
            <TextInput
              style={[styles.input, styles.descriptionInput]}
              value={editDescription}
              onChangeText={setEditDescription}
              placeholder="Description (optional)"
              placeholderTextColor="#999"
              multiline
            />
            
            <TouchableOpacity 
              style={styles.deleteButton}
              onPress={handleDeletePlaylist}
            >
              <Text style={styles.deleteButtonText}>Delete Playlist</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
  },
  loadingText: {
    color: '#fff',
    fontSize: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 16,
  },
  backButton: {
    padding: 8,
  },
  playlistInfo: {
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  playlistCover: {
    width: 200,
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },
  playlistName: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  playlistDescription: {
    color: '#B3B3B3',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 8,
  },
  songCount: {
    color: '#B3B3B3',
    fontSize: 14,
    marginBottom: 24,
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  playButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1DB954',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
  },
  playButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  shuffleButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  downloadButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  songsList: {
    paddingHorizontal: 16,
  },
  songItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#333',
  },
  songNumber: {
    width: 30,
    color: '#B3B3B3',
    fontSize: 14,
    textAlign: 'center',
  },
  songImage: {
    width: 50,
    height: 50,
    borderRadius: 4,
    marginRight: 12,
  },
  songInfo: {
    flex: 1,
  },
  songTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  songArtist: {
    color: '#B3B3B3',
    fontSize: 14,
  },
  removeButton: {
    padding: 8,
    marginRight: 8,
  },
  moreButton: {
    padding: 8,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    color: '#B3B3B3',
    fontSize: 16,
    marginBottom: 16,
  },
  addSongsButton: {
    backgroundColor: '#1DB954',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
  },
  addSongsText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#121212',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: '#333',
  },
  modalCancel: {
    color: '#fff',
    fontSize: 16,
  },
  modalTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  modalSave: {
    color: '#1DB954',
    fontSize: 16,
    fontWeight: '600',
  },
  modalContent: {
    padding: 16,
  },
  input: {
    backgroundColor: '#2A2A2A',
    color: '#fff',
    fontSize: 16,
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  descriptionInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  deleteButton: {
    backgroundColor: '#E22134',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 24,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});
