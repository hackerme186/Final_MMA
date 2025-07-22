import React from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SpotifyPlaylist } from '../../types/SpotifyTypes';

interface PlaylistGridSectionProps {
  playlists: SpotifyPlaylist[];
}

export const PlaylistGridSection: React.FC<PlaylistGridSectionProps> = ({ playlists }) => (
  <View style={styles.container}>
    <Text style={styles.title}>Your Playlists</Text>
    <FlatList
      data={playlists}
      numColumns={2}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity style={styles.card} activeOpacity={0.8}>
          <Image source={{ uri: item.images[0]?.url }} style={styles.cover} />
          <Text style={styles.playlistName} numberOfLines={1}>{item.name}</Text>
        </TouchableOpacity>
      )}
      columnWrapperStyle={{ justifyContent: 'space-between' }}
      contentContainerStyle={{ paddingHorizontal: 16 }}
      scrollEnabled={false}
    />
  </View>
);

const styles = StyleSheet.create({
  container: { marginBottom: 24 },
  title: { color: '#fff', fontSize: 18, fontWeight: 'bold', marginLeft: 16, marginBottom: 8 },
  card: { flex: 1, margin: 8, backgroundColor: '#232323', borderRadius: 12, alignItems: 'center', padding: 10 },
  cover: { width: 120, height: 120, borderRadius: 8, marginBottom: 8, backgroundColor: '#333' },
  playlistName: { color: '#fff', fontSize: 15, fontWeight: '600', width: '100%', textAlign: 'center' },
}); 