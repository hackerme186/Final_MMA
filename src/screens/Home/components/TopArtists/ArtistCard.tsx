import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Artist } from '../../types/HomeTypes';

interface ArtistCardProps {
  artist: Artist;
}

export const ArtistCard: React.FC<ArtistCardProps> = ({ artist }) => (
  <View style={styles.artistCard}>
    <Image source={{ uri: artist.avatar }} style={styles.artistImage} />
    <Text style={styles.artistName}>{artist.name}</Text>
  </View>
);

const styles = StyleSheet.create({
  artistCard: {
    alignItems: 'center',
    marginRight: 16,
  },
  artistImage: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginBottom: 6,
    borderWidth: 2,
    borderColor: '#1DB954',
  },
  artistName: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '500',
  },
}); 