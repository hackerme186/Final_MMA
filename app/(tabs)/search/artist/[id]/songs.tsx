import { MaterialIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSpotifyToken } from '../../../../../src/hooks/useSpotifyToken';

interface Track {
  id: string;
  name: string;
  album: {
    name: string;
    images: { url: string }[];
  };
  artists: { name: string }[];
  duration_ms: number;
}

export default function ArtistSongsScreen() {
  const { id } = useLocalSearchParams();
  const { token, loading: tokenLoading, error: tokenError } = useSpotifyToken();
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!token || !id) return;

    const fetchArtistSongs = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch artist's albums first
        const albumsRes = await fetch(`https://api.spotify.com/v1/artists/${id}/albums?include_groups=album,single&market=US&limit=50`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!albumsRes.ok) {
          throw new Error(`HTTP ${albumsRes.status}: ${albumsRes.statusText}`);
        }

        const albumsData = await albumsRes.json();
        const allTracks: Track[] = [];

        // Fetch tracks from each album
        for (const album of albumsData.items) {
          const tracksRes = await fetch(`https://api.spotify.com/v1/albums/${album.id}/tracks?market=US`, {
            headers: { Authorization: `Bearer ${token}` },
          });

          if (tracksRes.ok) {
            const tracksData = await tracksRes.json();
            const albumTracks = tracksData.items.map((track: any) => ({
              ...track,
              album: {
                name: album.name,
                images: album.images,
              },
            }));
            allTracks.push(...albumTracks);
          }
        }

        // Remove duplicates based on track ID
        const uniqueTracks = allTracks.filter((track, index, self) => 
          index === self.findIndex(t => t.id === track.id)
        );

        setTracks(uniqueTracks);
      } catch (e) {
        console.error('Error fetching artist songs:', e);
        setError(e instanceof Error ? e.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchArtistSongs();
  }, [token, id]);

  const formatDuration = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  if (tokenLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator color="#fff" size="large" />
        <Text style={styles.loadingText}>Đang lấy token Spotify...</Text>
      </View>
    );
  }

  if (tokenError) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Lỗi token: {tokenError}</Text>
      </View>
    );
  }

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator color="#fff" size="large" />
        <Text style={styles.loadingText}>Đang tải danh sách bài hát...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={() => router.back()}>
          <Text style={styles.retryText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <MaterialIcons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Songs</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Songs List */}
      <FlatList
        data={tracks}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <TouchableOpacity style={styles.songItem}>
            <Text style={styles.songNumber}>{index + 1}</Text>
            <Image 
              source={{ uri: item.album.images[0]?.url }} 
              style={styles.songImage}
            />
            <View style={styles.songInfo}>
              <Text style={styles.songName} numberOfLines={1}>{item.name}</Text>
              <Text style={styles.songArtist} numberOfLines={1}>
                {item.artists.map(a => a.name).join(', ')}
              </Text>
            </View>
            <View style={styles.songMeta}>
              <Text style={styles.songDuration}>{formatDuration(item.duration_ms)}</Text>
              <TouchableOpacity style={styles.playButton}>
                <MaterialIcons name="play-arrow" size={20} color="#fff" />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 50,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  placeholder: {
    width: 40,
  },
  listContainer: {
    paddingHorizontal: 16,
  },
  songItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#333',
  },
  songNumber: {
    color: '#b3b3b3',
    fontSize: 16,
    width: 30,
    textAlign: 'center',
  },
  songImage: {
    width: 48,
    height: 48,
    borderRadius: 4,
    marginLeft: 12,
    marginRight: 12,
  },
  songInfo: {
    flex: 1,
  },
  songName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  songArtist: {
    color: '#b3b3b3',
    fontSize: 14,
    marginTop: 2,
  },
  songMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  songDuration: {
    color: '#b3b3b3',
    fontSize: 14,
    marginRight: 12,
  },
  playButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#1DB954',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  loadingText: {
    color: '#fff',
    fontSize: 16,
    marginTop: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    paddingHorizontal: 20,
  },
  errorText: {
    color: '#ff6b6b',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#1DB954',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  retryText: {
    color: '#fff',
    fontWeight: 'bold',
  },
}); 