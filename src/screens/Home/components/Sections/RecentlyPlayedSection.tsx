import React from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import { SpotifyTrack } from '../../types/SpotifyTypes';

interface RecentlyPlayedSectionProps {
  tracks: SpotifyTrack[];
}

export const RecentlyPlayedSection: React.FC<RecentlyPlayedSectionProps> = ({ tracks }) => (
  <View style={styles.container}>
    <View style={styles.headerRow}>
      <Text style={styles.title}>Recently Played</Text>
      <Text style={styles.seeMore}>See more</Text>
    </View>
    <FlatList
      data={tracks}
      horizontal
      keyExtractor={item => item.id}
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Image source={{ uri: item.album.images[0]?.url }} style={styles.cover} />
          <Text style={styles.trackName} numberOfLines={1}>{item.name}</Text>
        </View>
      )}
    />
  </View>
);

const styles = StyleSheet.create({
  container: { marginBottom: 24 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 16, marginBottom: 8 },
  title: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  seeMore: { color: '#1DB954', fontSize: 14, fontWeight: '500' },
  card: { width: 110, marginRight: 12, backgroundColor: '#232323', borderRadius: 16, padding: 10, alignItems: 'center' },
  cover: { width: 80, height: 80, borderRadius: 12, marginBottom: 8, backgroundColor: '#333' },
  trackName: { color: '#fff', fontSize: 15, fontWeight: '600', width: '100%', textAlign: 'center' },
}); 