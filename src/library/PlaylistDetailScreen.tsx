import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');

const playlist = {
  title: 'Phonk Madness',
  subtitle: 'Playlist · Myself',
  image: require('../../assets/images/partial-react-logo.png'),
  songs: [
    { title: 'Inside Out', artist: 'The Chainsmokers, Charlee', image: require('../../assets/images/partial-react-logo.png') },
    { title: 'Young', artist: 'The Chainsmokers', image: require('../../assets/images/partial-react-logo.png') },
    { title: 'Beach House', artist: 'The Chainsmokers - Sick', image: require('../../assets/images/partial-react-logo.png') },
    { title: 'Kills You Slowly', artist: 'The Chainsmokers - World', image: require('../../assets/images/partial-react-logo.png') },
    { title: 'Setting Fires', artist: 'The Chainsmokers, XYLO', image: require('../../assets/images/partial-react-logo.png') },
  ],
};

export default function PlaylistDetailScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <TouchableOpacity>
          <Ionicons name="arrow-back" size={26} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.header}>Playlist</Text>
      </View>
      <View style={styles.coverWrap}>
        <Image source={playlist.image} style={styles.coverImage} />
        <Text style={styles.playlistTitle}>{playlist.title}</Text>
        <Text style={styles.playlistSubtitle}>{playlist.subtitle}</Text>
        <TouchableOpacity style={styles.playBtn}>
          <Ionicons name="play" size={22} color="#fff" />
          <Text style={styles.playBtnText}>Play</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={playlist.songs}
        keyExtractor={(_, idx) => idx.toString()}
        renderItem={({ item }) => (
          <View style={styles.songRow}>
            <Image source={item.image} style={styles.songImage} />
            <View style={{ flex: 1 }}>
              <Text style={styles.songTitle} numberOfLines={1}>{item.title}</Text>
              <Text style={styles.songArtist} numberOfLines={1}>{item.artist}</Text>
            </View>
            <TouchableOpacity style={styles.songMenuBtn}>
              <MaterialIcons name="more-vert" size={22} color="#fff" />
            </TouchableOpacity>
          </View>
        )}
        style={{ marginTop: 8 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181818',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  header: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 16,
  },
  coverWrap: {
    alignItems: 'center',
    marginBottom: 18,
  },
  coverImage: {
    width: width * 0.45,
    height: width * 0.45,
    borderRadius: 16,
    marginBottom: 12,
    backgroundColor: '#333',
  },
  playlistTitle: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 20,
    marginBottom: 2,
  },
  playlistSubtitle: {
    color: '#aaa',
    fontSize: 14,
    marginBottom: 10,
  },
  playBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1DB954',
    borderRadius: 20,
    paddingHorizontal: 18,
    paddingVertical: 7,
    marginBottom: 8,
  },
  playBtnText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
    marginLeft: 8,
  },
  songRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  songImage: {
    width: 44,
    height: 44,
    borderRadius: 6,
    marginRight: 12,
    backgroundColor: '#333',
  },
  songTitle: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '500',
  },
  songArtist: {
    color: '#aaa',
    fontSize: 13,
    marginTop: 2,
  },
  songMenuBtn: {
    padding: 8,
  },
});
