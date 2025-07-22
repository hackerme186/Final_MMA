import React from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SpotifyPlaylist } from '../../types/SpotifyTypes';

interface MixesSectionProps {
  mixes: SpotifyPlaylist[];
}

export const MixesSection: React.FC<MixesSectionProps> = ({ mixes }) => (
  <View style={styles.container}>
    <Text style={styles.title}>Mixes for you</Text>
    <FlatList
      data={mixes}
      horizontal
      keyExtractor={item => item.id}
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => (
        <TouchableOpacity style={styles.card} activeOpacity={0.8}>
          <Image source={{ uri: item.images[0]?.url }} style={styles.cover} />
          <Text style={styles.mixName} numberOfLines={1}>{item.name}</Text>
        </TouchableOpacity>
      )}
      contentContainerStyle={{ paddingLeft: 16, paddingRight: 8 }}
    />
  </View>
);

const styles = StyleSheet.create({
  container: { marginBottom: 24 },
  title: { color: '#fff', fontSize: 18, fontWeight: 'bold', marginLeft: 16, marginBottom: 8 },
  card: { width: 120, marginRight: 12, backgroundColor: '#232323', borderRadius: 16, padding: 10, alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.12, shadowRadius: 4, elevation: 2 },
  cover: { width: 80, height: 80, borderRadius: 12, marginBottom: 8, backgroundColor: '#333' },
  mixName: { color: '#fff', fontSize: 15, fontWeight: '600', width: '100%', textAlign: 'center' },
}); 