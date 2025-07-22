import React from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import { Artist, Track } from '../../types/HomeTypes';

interface ArtistProfileScreenProps {
  artist: Artist;
  tracks: Track[];
}

export const ArtistProfileScreen: React.FC<ArtistProfileScreenProps> = ({ artist, tracks }) => (
  <View style={styles.container}>
    <Image source={{ uri: artist.avatar }} style={styles.avatar} />
    <Text style={styles.name}>{artist.name}</Text>
    <Text style={styles.follower}>{artist.followerCount.toLocaleString()} followers</Text>
    <Text style={styles.sectionTitle}>Popular Songs</Text>
    <FlatList
      data={tracks}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <View style={styles.trackItem}>
          <Image source={{ uri: item.cover }} style={styles.trackCover} />
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
  container: {
    flex: 1,
    backgroundColor: '#0D0D0D',
    alignItems: 'center',
    padding: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
    borderWidth: 3,
    borderColor: '#1DB954',
  },
  name: {
    color: '#fff',
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  follower: {
    color: '#b3b3b3',
    fontSize: 15,
    marginBottom: 16,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    alignSelf: 'flex-start',
  },
  trackItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    backgroundColor: '#181818',
    borderRadius: 12,
    padding: 8,
  },
  trackCover: {
    width: 48,
    height: 48,
    borderRadius: 8,
    marginRight: 12,
  },
  trackTitle: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
  trackArtist: {
    color: '#b3b3b3',
    fontSize: 13,
  },
}); 