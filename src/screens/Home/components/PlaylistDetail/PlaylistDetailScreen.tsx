import React from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import { Track } from '../../types/HomeTypes';

interface Playlist {
  id: string;
  name: string;
  cover: string;
  tracks: Track[];
}

interface PlaylistDetailScreenProps {
  playlist: Playlist;
}
export const PlaylistDetailScreen: React.FC<PlaylistDetailScreenProps> = ({ playlist }) => (
  <View style={styles.container}>
    <Image source={{ uri: playlist.cover }} style={styles.cover} />
    <Text style={styles.title}>{playlist.name}</Text>
    <Text style={styles.sectionTitle}>Tracks</Text>
    <FlatList
      data={playlist.tracks}
      keyExtractor={item => item.id}
      renderItem={({ item, index }) => (
        <View style={styles.trackItem}>
          <Text style={styles.trackIndex}>{index + 1}</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.trackTitle}>{item.title}</Text>
            <Text style={styles.trackArtist}>{item.artist}</Text>
          </View>
        </View>
      )}
    />
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0D0D0D', alignItems: 'center', padding: 20 },
  cover: { width: 160, height: 160, borderRadius: 16, marginBottom: 16 },
  title: { color: '#fff', fontSize: 24, fontWeight: 'bold', marginBottom: 4 },
  sectionTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold', marginBottom: 8, alignSelf: 'flex-start' },
  trackItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 10, backgroundColor: '#181818', borderRadius: 8, padding: 8 },
  trackIndex: { color: '#b3b3b3', fontSize: 15, width: 24, textAlign: 'center', marginRight: 8 },
  trackTitle: { color: '#fff', fontSize: 15, fontWeight: '600' },
  trackArtist: { color: '#b3b3b3', fontSize: 13 },
}); 