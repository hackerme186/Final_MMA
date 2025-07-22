import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Album } from '../../types/HomeTypes';
import { PlayButton } from './PlayButton';

interface AlbumBannerProps {
  album: Album;
}

export const AlbumBanner: React.FC<AlbumBannerProps> = ({ album }) => (
  <View style={styles.banner}>
    <Image source={{ uri: album.coverArt }} style={styles.image} />
    <View style={styles.info}>
      <Text style={styles.title}>{album.title}</Text>
      <Text style={styles.artist}>{album.artist}</Text>
      <PlayButton />
    </View>
  </View>
);

const styles = StyleSheet.create({
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#181818',
    borderRadius: 18,
    marginVertical: 16,
    padding: 12,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 12,
    marginRight: 16,
  },
  info: {
    flex: 1,
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  artist: {
    color: '#b3b3b3',
    fontSize: 15,
    marginBottom: 10,
  },
}); 