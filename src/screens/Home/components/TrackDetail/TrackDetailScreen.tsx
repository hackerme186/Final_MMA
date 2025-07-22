import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Track } from '../../types/HomeTypes';

interface TrackDetailScreenProps {
  track: Track;
  onLyricsPress?: () => void;
}
export const TrackDetailScreen: React.FC<TrackDetailScreenProps> = ({ track, onLyricsPress }) => (
  <View style={styles.container}>
    <Image source={{ uri: track.cover }} style={styles.cover} />
    <Text style={styles.title}>{track.title}</Text>
    <Text style={styles.artist}>{track.artist}</Text>
    <TouchableOpacity style={styles.playButton}>
      <Text style={styles.playText}>Play</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.lyricsButton} onPress={onLyricsPress}>
      <Text style={styles.lyricsText}>Lyrics</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0D0D0D', alignItems: 'center', padding: 20 },
  cover: { width: 160, height: 160, borderRadius: 16, marginBottom: 16 },
  title: { color: '#fff', fontSize: 24, fontWeight: 'bold', marginBottom: 4 },
  artist: { color: '#b3b3b3', fontSize: 15, marginBottom: 16 },
  playButton: { backgroundColor: '#1DB954', borderRadius: 20, paddingVertical: 10, paddingHorizontal: 32, marginTop: 16 },
  playText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  lyricsButton: { marginTop: 16, padding: 8 },
  lyricsText: { color: '#1DB954', fontSize: 16, fontWeight: 'bold' },
}); 