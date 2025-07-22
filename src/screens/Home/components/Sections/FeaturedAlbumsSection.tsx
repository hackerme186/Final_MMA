import React from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SpotifyAlbum } from '../../types/SpotifyTypes';

interface FeaturedAlbumsSectionProps {
  albums: SpotifyAlbum[];
}

export const FeaturedAlbumsSection: React.FC<FeaturedAlbumsSectionProps> = ({ albums }) => (
  <View style={styles.container}>
    <Text style={styles.title}>Featured Albums</Text>
    <FlatList
      data={albums}
      horizontal
      keyExtractor={item => item.id}
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => (
        <TouchableOpacity style={styles.banner} activeOpacity={0.85}>
          <Image source={{ uri: item.images[0]?.url }} style={styles.cover} />
          <View style={styles.info}>
            <Text style={styles.albumName} numberOfLines={1}>{item.name}</Text>
            <Text style={styles.artist} numberOfLines={1}>{item.artists.map(a => a.name).join(', ')}</Text>
          </View>
        </TouchableOpacity>
      )}
      contentContainerStyle={{ paddingLeft: 16, paddingRight: 8 }}
    />
  </View>
);

const styles = StyleSheet.create({
  container: { marginBottom: 24 },
  title: { color: '#fff', fontSize: 18, fontWeight: 'bold', marginLeft: 16, marginBottom: 8 },
  banner: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#181818', borderRadius: 18, marginRight: 16, padding: 12, shadowColor: '#000', shadowOpacity: 0.15, shadowRadius: 8, elevation: 3, minWidth: 260 },
  cover: { width: 80, height: 80, borderRadius: 12, marginRight: 16 },
  info: { flex: 1 },
  albumName: { color: '#fff', fontSize: 16, fontWeight: 'bold', marginBottom: 4 },
  artist: { color: '#b3b3b3', fontSize: 14 },
}); 