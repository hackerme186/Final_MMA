import { MaterialIcons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSpotifyToken } from '../hooks/useSpotifyToken';

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
  album: { images: { url: string }[] };
  artists: { name: string }[];
}

const ArtistScreen = () => {
  const route = useRoute<any>();
  const { artistId } = route.params;
  const { token, loading: tokenLoading } = useSpotifyToken();
  const [artist, setArtist] = useState<Artist | null>(null);
  const [topTracks, setTopTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token || !artistId) return;
    setLoading(true);
    const fetchArtist = async () => {
      try {
        const res = await fetch(`https://api.spotify.com/v1/artists/${artistId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setArtist(data);
      } catch (e) {
        setArtist(null);
      }
    };
    const fetchTopTracks = async () => {
      try {
        const res = await fetch(`https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=US`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setTopTracks(data.tracks || []);
      } catch (e) {
        setTopTracks([]);
      }
    };
    Promise.all([fetchArtist(), fetchTopTracks()]).finally(() => setLoading(false));
  }, [token, artistId]);

  if (loading || tokenLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator color="#fff" size="large" />
      </View>
    );
  }
  if (!artist) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Không tìm thấy nghệ sĩ.</Text>
      </View>
    );
  }
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: artist.images?.[0]?.url || undefined }}
          style={styles.artistImage}
        />
        <View style={styles.headerOverlay} />
        <TouchableOpacity style={styles.backBtn} onPress={() => (route.params?.navigation?.goBack ? route.params.navigation.goBack() : null)}>
          <MaterialIcons name="arrow-back" size={28} color="#fff" />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.artistLabel}>Artist</Text>
          <Text style={styles.artistName}>{artist.name}</Text>
        </View>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.listeners}>{(artist.followers?.total/1000000).toFixed(1)} L monthly listeners</Text>
        <TouchableOpacity style={styles.followBtn}>
          <Text style={styles.followText}>Follow</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.shareBtn}>
          <MaterialIcons name="share" size={22} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.playBtn}>
          <MaterialIcons name="play-arrow" size={28} color="#181818" />
        </TouchableOpacity>
      </View>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Popular releases</Text>
        <TouchableOpacity>
          <Text style={styles.seeMore}>See more</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={topTracks}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.songItem}>
            <Image source={{ uri: item.album.images?.[0]?.url }} style={styles.songImage} />
            <View style={styles.songInfo}>
              <Text style={styles.songTitle} numberOfLines={1}>{item.name}</Text>
              <Text style={styles.songArtist} numberOfLines={1}>{item.artists?.[0]?.name}</Text>
            </View>
            <TouchableOpacity>
              <MaterialIcons name="more-vert" size={22} color="#fff" />
            </TouchableOpacity>
          </View>
        )}
        scrollEnabled={false}
        style={{ marginBottom: 16 }}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#181818' },
  header: { height: 220, position: 'relative', justifyContent: 'flex-end' },
  artistImage: { ...StyleSheet.absoluteFillObject, width: undefined, height: undefined, resizeMode: 'cover', opacity: 0.95 },
  headerOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.35)' },
  backBtn: { position: 'absolute', top: 36, left: 16, zIndex: 2, backgroundColor: 'rgba(0,0,0,0.4)', borderRadius: 20, padding: 4 },
  headerContent: { position: 'absolute', left: 20, bottom: 24 },
  artistLabel: { color: '#fff', fontSize: 15, opacity: 0.8, marginBottom: 2 },
  artistName: { color: '#fff', fontSize: 28, fontWeight: 'bold', marginBottom: 2 },
  infoRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 18, marginTop: 18, marginBottom: 8 },
  listeners: { color: '#fff', fontSize: 15, flex: 1 },
  followBtn: { backgroundColor: '#232323', borderRadius: 18, paddingHorizontal: 18, paddingVertical: 6, marginRight: 10 },
  followText: { color: '#fff', fontWeight: 'bold', fontSize: 15 },
  shareBtn: { backgroundColor: '#232323', borderRadius: 18, padding: 8, marginRight: 10 },
  playBtn: { backgroundColor: '#1db954', borderRadius: 20, padding: 8 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 18, marginTop: 18, marginBottom: 8 },
  sectionTitle: { color: '#fff', fontWeight: 'bold', fontSize: 18 },
  seeMore: { color: '#1db954', fontWeight: 'bold', fontSize: 15 },
  songItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#232323', borderRadius: 14, paddingVertical: 10, paddingHorizontal: 14, marginBottom: 14 },
  songImage: { width: 54, height: 54, borderRadius: 10, backgroundColor: '#333', marginRight: 14 },
  songInfo: { flex: 1, justifyContent: 'center' },
  songTitle: { color: '#fff', fontSize: 16, fontWeight: 'bold', marginBottom: 2 },
  songArtist: { color: '#aaa', fontSize: 13 },
  centerContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#181818' },
  errorText: { color: '#ff6b6b', fontSize: 16, textAlign: 'center' },
});

export default ArtistScreen;
