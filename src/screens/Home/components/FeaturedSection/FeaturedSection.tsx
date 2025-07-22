import React from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import { SpotifyTrack } from '../../types/SpotifyTypes';

interface FeaturedSectionProps {
  tracks: SpotifyTrack[];
}

export const FeaturedSection: React.FC<FeaturedSectionProps> = ({ tracks }) => {
  if (!tracks || tracks.length === 0) return null;
  const featured = tracks[0];
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Featuring Today</Text>
      <View style={styles.banner}>
        <Image source={{ uri: featured.album.images[0]?.url }} style={styles.image} />
        <View style={styles.info}>
          <Text style={styles.title}>{featured.name}</Text>
          <Text style={styles.artist}>{featured.artists.map(a => a.name).join(', ')}</Text>
        </View>
      </View>
      <Text style={styles.subTitle}>Hot Tracks</Text>
      <FlatList
        data={tracks.slice(1, 5)}
        horizontal
        keyExtractor={item => item.id}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.trackCard}>
            <Image source={{ uri: item.album.images[0]?.url }} style={styles.trackImage} />
            <Text style={styles.trackName} numberOfLines={1}>{item.name}</Text>
            <Text style={styles.trackArtist} numberOfLines={1}>{item.artists.map(a => a.name).join(', ')}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginVertical: 16 },
  sectionTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold', marginBottom: 8, marginLeft: 16 },
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#181818',
    borderRadius: 18,
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
  },
  image: { width: 90, height: 90, borderRadius: 12, marginRight: 16 },
  info: { flex: 1 },
  title: { color: '#fff', fontSize: 18, fontWeight: 'bold', marginBottom: 4 },
  artist: { color: '#b3b3b3', fontSize: 15, marginBottom: 4 },
  subTitle: { color: '#fff', fontSize: 16, fontWeight: '600', marginLeft: 16, marginBottom: 8 },
  trackCard: {
    width: 110,
    marginRight: 12,
    backgroundColor: '#232323',
    borderRadius: 16,
    padding: 10,
    alignItems: 'center',
  },
  trackImage: { width: 64, height: 64, borderRadius: 8, marginBottom: 6, backgroundColor: '#333' },
  trackName: { color: '#fff', fontSize: 14, fontWeight: '600', marginBottom: 2, width: '100%', textAlign: 'center' },
  trackArtist: { color: '#b3b3b3', fontSize: 12, width: '100%', textAlign: 'center' },
}); 