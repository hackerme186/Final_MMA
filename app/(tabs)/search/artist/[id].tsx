import { MaterialIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSpotifyToken } from '../../../../src/hooks/useSpotifyToken';

interface Artist {
  id: string;
  name: string;
  images: { url: string }[];
  followers: { total: number };
  genres: string[];
}

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

export default function ArtistScreen() {
  const { id } = useLocalSearchParams();
  const { token, loading: tokenLoading, error: tokenError } = useSpotifyToken();
  const [artist, setArtist] = useState<Artist | null>(null);
  const [topTracks, setTopTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!token || !id) return;

    const fetchArtistData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch artist info
        const artistRes = await fetch(`https://api.spotify.com/v1/artists/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!artistRes.ok) {
          throw new Error(`HTTP ${artistRes.status}: ${artistRes.statusText}`);
        }

        const artistData = await artistRes.json();
        setArtist(artistData);

        // Fetch top tracks
        const tracksRes = await fetch(`https://api.spotify.com/v1/artists/${id}/top-tracks?market=US`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (tracksRes.ok) {
          const tracksData = await tracksRes.json();
          setTopTracks(tracksData.tracks);
        }
      } catch (e) {
        console.error('Error fetching artist data:', e);
        setError(e instanceof Error ? e.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchArtistData();
  }, [token, id]);

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
        <Text style={styles.loadingText}>Đang tải thông tin nghệ sĩ...</Text>
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

  if (!artist) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Artist not found</Text>
        <TouchableOpacity style={styles.retryButton} onPress={() => router.back()}>
          <Text style={styles.retryText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <MaterialIcons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Artist</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Artist Info */}
      <View style={styles.artistInfo}>
        <Image 
          source={{ uri: artist.images[0]?.url }} 
          style={styles.artistImage}
        />
        <Text style={styles.artistName}>{artist.name}</Text>
        <Text style={styles.followerCount}>
          {artist.followers.total.toLocaleString()} followers
        </Text>
        <Text style={styles.genres}>
          {artist.genres.slice(0, 3).join(', ')}
        </Text>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.followButton}>
          <Text style={styles.followButtonText}>Follow</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.playButton}>
          <MaterialIcons name="play-arrow" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Top Tracks */}
      {topTracks.length > 0 && (
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Popular</Text>
            <TouchableOpacity 
              style={styles.seeAllButton}
              onPress={() => router.push(`/(tabs)/search/artist/${id}/songs`)}
            >
              <Text style={styles.seeAllText}>See all songs</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={topTracks}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            renderItem={({ item, index }) => (
              <TouchableOpacity style={styles.trackItem}>
                <Text style={styles.trackNumber}>{index + 1}</Text>
                <Image 
                  source={{ uri: item.album.images[0]?.url }} 
                  style={styles.trackImage}
                />
                <View style={styles.trackInfo}>
                  <Text style={styles.trackName} numberOfLines={1}>{item.name}</Text>
                  <Text style={styles.trackArtist} numberOfLines={1}>
                    {item.artists.map(a => a.name).join(', ')}
                  </Text>
                </View>
                <TouchableOpacity style={styles.trackPlayButton}>
                  <MaterialIcons name="play-arrow" size={20} color="#fff" />
                </TouchableOpacity>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </ScrollView>
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
  artistInfo: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  artistImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 16,
  },
  artistName: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  followerCount: {
    color: '#b3b3b3',
    fontSize: 16,
    marginBottom: 8,
  },
  genres: {
    color: '#b3b3b3',
    fontSize: 14,
    textAlign: 'center',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  followButton: {
    backgroundColor: '#1DB954',
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 20,
    marginRight: 16,
  },
  followButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  playButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#1DB954',
    justifyContent: 'center',
    alignItems: 'center',
  },
  section: {
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  seeAllButton: {
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  seeAllText: {
    color: '#1DB954',
    fontSize: 14,
    fontWeight: '500',
  },
  trackItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  trackNumber: {
    color: '#b3b3b3',
    fontSize: 16,
    width: 30,
    textAlign: 'center',
  },
  trackImage: {
    width: 40,
    height: 40,
    borderRadius: 4,
    marginLeft: 12,
    marginRight: 12,
  },
  trackInfo: {
    flex: 1,
  },
  trackName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  trackArtist: {
    color: '#b3b3b3',
    fontSize: 14,
    marginTop: 2,
  },
  trackPlayButton: {
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