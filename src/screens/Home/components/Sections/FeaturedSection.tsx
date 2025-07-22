import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { SpotifyTrack } from '../../types/SpotifyTypes';

interface FeaturedSectionProps {
  tracks: SpotifyTrack[];
}

export const FeaturedSection: React.FC<FeaturedSectionProps> = ({ tracks }) => {
  if (!tracks || tracks.length === 0) return null;
  const featured = tracks[0];
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Featuring Today</Text>
      <View style={styles.banner}>
        <Image source={{ uri: featured.album.images[0]?.url }} style={styles.image} />
        <View style={styles.info}>
          <Text style={styles.trackName}>{featured.name}</Text>
          <Text style={styles.artist}>{featured.artists.map(a => a.name).join(', ')}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginBottom: 24 },
  title: { color: '#fff', fontSize: 18, fontWeight: 'bold', marginLeft: 16, marginBottom: 8 },
  banner: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#181818', borderRadius: 18, marginHorizontal: 16, padding: 12, shadowColor: '#000', shadowOpacity: 0.15, shadowRadius: 8, elevation: 3 },
  image: { width: 90, height: 90, borderRadius: 12, marginRight: 16 },
  info: { flex: 1 },
  trackName: { color: '#fff', fontSize: 18, fontWeight: 'bold', marginBottom: 4 },
  artist: { color: '#b3b3b3', fontSize: 15 },
}); 