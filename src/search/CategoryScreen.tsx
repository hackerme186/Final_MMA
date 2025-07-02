import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSpotifyToken } from '../hooks/useSpotifyToken';

export default function CategoryScreen() {
  const { name } = useLocalSearchParams();
  const router = useRouter();
  const { token } = useSpotifyToken();
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!token) return;
    setLoading(true);
    setError('');
    setAlbums([]);
    fetch('https://api.spotify.com/v1/browse/new-releases?limit=20', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async res => {
        if (!res.ok) throw new Error('Không lấy được album mới phát hành.');
        return res.json();
      })
      .then(data => {
        if (!data.albums?.items || data.albums.items.length === 0) {
          setError('Không có album mới phát hành.');
        } else {
          setAlbums(data.albums.items);
        }
      })
      .catch(e => setError(e.message || 'Đã xảy ra lỗi khi lấy dữ liệu album.'))
      .finally(() => setLoading(false));
  }, [token]);

  if (loading) return <ActivityIndicator style={{ marginTop: 40 }} color="#1db954" size="large" />;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>Album mới phát hành {name ? `- ${name}` : ''}</Text>
      </View>
      {error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <FlatList
          data={albums}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={styles.albumItem}>
              {item.images?.[0]?.url ? (
                <Image source={{ uri: item.images[0].url }} style={styles.albumImage} />
              ) : (
                <View style={[styles.albumImage, { backgroundColor: '#333' }]} />
              )}
              <View style={styles.albumInfo}>
                <Text style={styles.albumName} numberOfLines={1}>{item.name}</Text>
                <Text style={styles.albumArtist} numberOfLines={1}>{item.artists?.map(a => a.name).join(', ')}</Text>
              </View>
            </View>
          )}
          contentContainerStyle={{ padding: 12, paddingTop: 24 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#181818' },
  header: { flexDirection: 'row', alignItems: 'center', marginTop: 16, marginBottom: 8 },
  backButton: { padding: 8, marginRight: 8 },
  title: { color: '#fff', fontWeight: 'bold', fontSize: 20 },
  errorText: { color: '#ff6b6b', fontSize: 16, margin: 16, textAlign: 'center' },
  albumItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#232323',
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 14,
    marginBottom: 14,
  },
  albumImage: {
    width: 54,
    height: 54,
    borderRadius: 10,
    backgroundColor: '#333',
    marginRight: 14,
  },
  albumInfo: { flex: 1, justifyContent: 'center' },
  albumName: { color: '#fff', fontSize: 16, fontWeight: 'bold', marginBottom: 2 },
  albumArtist: { color: '#aaa', fontSize: 13 },
}); 