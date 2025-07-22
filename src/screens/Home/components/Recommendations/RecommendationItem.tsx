import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Track } from '../../types/HomeTypes';

interface RecommendationItemProps {
  track: Track;
}

export const RecommendationItem: React.FC<RecommendationItemProps> = ({ track }) => (
  <View style={styles.card}>
    <Image source={{ uri: track.cover }} style={styles.cover} />
    <Text style={styles.title} numberOfLines={1}>{track.title}</Text>
    <Text style={styles.artist} numberOfLines={1}>{track.artist}</Text>
  </View>
);

const styles = StyleSheet.create({
  card: {
    width: 110,
    marginRight: 12,
    backgroundColor: '#232323',
    borderRadius: 16,
    padding: 10,
    alignItems: 'center',
  },
  cover: {
    width: 80,
    height: 80,
    borderRadius: 12,
    marginBottom: 8,
    backgroundColor: '#333',
  },
  title: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 2,
    width: '100%',
    textAlign: 'center',
  },
  artist: {
    color: '#b3b3b3',
    fontSize: 13,
    width: '100%',
    textAlign: 'center',
  },
}); 