import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface Genre {
  id: string;
  name: string;
  color: string;
}

interface GenreCardProps {
  genre: Genre;
}

export const GenreCard: React.FC<GenreCardProps> = ({ genre }) => (
  <View style={[styles.card, { backgroundColor: genre.color }] }>
    <Text style={styles.name}>{genre.name}</Text>
  </View>
);

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 8,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    height: 90,
    minWidth: 140,
    maxWidth: '48%',
    overflow: 'hidden',
    elevation: 2,
  },
  name: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
}); 