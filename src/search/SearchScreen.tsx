import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSpotifyToken } from '../hooks/useSpotifyToken';

interface Artist {
  id: string;
  name: string;
  image?: string;
}
interface Category {
  id: string;
  name: string;
  icons: { url: string }[];
}
interface SearchResult {
  id: string;
  name: string;
  image?: string;
  type: 'artist' | 'track' | 'album';
  artist?: string;
}
interface RecentSearch {
  id: string;
  name: string;
  type: 'artist' | 'track' | 'album';
  subtitle?: string;
  image?: string;
}

const RECENT_KEY = 'recent_searches';

const SearchScreen = () => {
  const { token, loading: tokenLoading, error: tokenError, refreshToken } = useSpotifyToken();
  const [search, setSearch] = useState('');
  const [artists, setArtists] = useState<Artist[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [showRecent, setShowRecent] = useState(false);
  const [recentSearches, setRecentSearches] = useState<RecentSearch[]>([]);
  const [categoriesError, setCategoriesError] = useState<string>('');
  const searchInputRef = useRef(null);
  const router = useRouter();

  // Load recent searches from AsyncStorage
  useEffect(() => {
    AsyncStorage.getItem(RECENT_KEY).then(data => {
      if (data) setRecentSearches(JSON.parse(data));
    });
  }, []);

  // Lấy trending artists và browse categories khi load màn hình
  useEffect(() => {
    if (tokenLoading) return; // Chờ token loading xong
    
    const fetchArtists = async () => {
      try {
        console.log('Fetching artists...');
        if (!token) {
          throw new Error('Không có token Spotify');
        }
        const res = await fetch('https://api.spotify.com/v1/browse/new-releases?country=US&limit=10', {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        console.log('Artists API response status:', res.status);
        if (!res.ok) {
          console.error('Artists API error:', res.status, res.statusText);
          const errorText = await res.text();
          console.error('Artists error response:', errorText);
          throw new Error(`HTTP ${res.status}: ${res.statusText}`);
        }
        
        const data = await res.json();
        console.log('Artists API response data keys:', Object.keys(data));
        console.log('Artists albums count:', data.albums?.items?.length || 0);
        
        const uniqueArtists: Artist[] = [];
        const artistMap: Record<string, boolean> = {};
        data.albums?.items?.forEach((album: any) => {
          album.artists.forEach((artist: any) => {
            if (!artistMap[artist.id]) {
              artistMap[artist.id] = true;
              uniqueArtists.push({
                id: artist.id,
                name: artist.name,
                image: album.images[0]?.url,
              });
            }
          });
        });
        setArtists(uniqueArtists.slice(0, 8));
        console.log('Artists set successfully:', uniqueArtists.length);
      } catch (e) {
        console.error('Error fetching artists:', e);
        setArtists([]);
      }
    };
    
    const fetchCategories = async () => {
      try {
        console.log('Fetching categories...');
        if (!token) {
          throw new Error('Không có token Spotify');
        }
        console.log('Using token:', token.substring(0, 20) + '...');
        
        const res = await fetch('https://api.spotify.com/v1/browse/categories?country=US&limit=8', {
          headers: { 
            'Authorization': `Bearer ${token}`
          },
        });
        
        console.log('Categories API response status:', res.status);
        console.log('Categories API response headers:', Object.fromEntries(res.headers.entries()));
        
        let text = await res.text();
        let data;
        try {
          data = JSON.parse(text);
        } catch (err) {
          data = text;
        }
        console.log('Categories API response body:', data);
        
        if (res.ok && data.categories?.items) {
          console.log('Categories items found:', data.categories.items.length);
          setCategories(data.categories.items as Category[]);
          setCategoriesError('');
        } else {
          console.error('No categories in response. Full response:', data);
          setCategories([]);
          setCategoriesError('No categories data in response');
        }
      } catch (e) {
        console.error('Error fetching categories:', e);
        setCategories([]);
        setCategoriesError(e instanceof Error ? e.message : 'Unknown error');
      }
    };
    
    Promise.all([fetchArtists(), fetchCategories()]).finally(() => {
      setLoading(false);
      console.log('Initial data loading completed');
    });
  }, [token, tokenLoading]);

  // Tìm kiếm khi nhập từ khóa
  useEffect(() => {
    if (!search || tokenLoading) {
      setSearchResults([]);
      setSearchLoading(false);
      return;
    }
    setSearchLoading(true);
    const timeout = setTimeout(async () => {
      try {
        if (!token) {
          throw new Error('Không có token Spotify');
        }
        const res = await fetch(
          `https://api.spotify.com/v1/search?q=${encodeURIComponent(search)}&type=track,artist,album&limit=10`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const data = await res.json();
        const results: SearchResult[] = [];
        data.artists?.items?.forEach((item: any) => results.push({
          id: item.id,
          name: item.name,
          image: item.images?.[0]?.url,
          type: 'artist',
        }));
        data.tracks?.items?.forEach((item: any) => results.push({
          id: item.id,
          name: item.name,
          image: item.album?.images?.[0]?.url,
          type: 'track',
          artist: item.artists?.[0]?.name,
        }));
        data.albums?.items?.forEach((item: any) => results.push({
          id: item.id,
          name: item.name,
          image: item.images?.[0]?.url,
          type: 'album',
          artist: item.artists?.[0]?.name,
        }));
        setSearchResults(results);
        // Lưu vào recent searches
        if (results.length > 0) {
          const first = results[0];
          const newRecent: RecentSearch = {
            id: first.id,
            name: first.name,
            type: first.type,
            subtitle: first.type === 'track' ? `Song • ${first.artist}` : first.type === 'album' ? `Album • ${first.artist}` : first.type.charAt(0).toUpperCase() + first.type.slice(1),
            image: first.image,
          };
          setRecentSearches(prev => {
            const filtered = prev.filter(item => item.id !== newRecent.id);
            const updated = [newRecent, ...filtered].slice(0, 10);
            AsyncStorage.setItem(RECENT_KEY, JSON.stringify(updated));
            return updated;
          });
        }
      } catch (e) {
        setSearchResults([]);
      } finally {
        setSearchLoading(false);
      }
    }, 400);
    return () => clearTimeout(timeout);
  }, [search, token, tokenLoading]);

  // Khi chọn recent search
  const handleRecentPress = (item: RecentSearch) => {
    setSearch(item.name);
  };

  // Xóa một item
  const handleRemoveRecent = (id: string) => {
    setRecentSearches(prev => {
      const updated = prev.filter(item => item.id !== id);
      AsyncStorage.setItem(RECENT_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  // Xóa toàn bộ
  const handleClearRecent = () => {
    setRecentSearches([]);
    AsyncStorage.removeItem(RECENT_KEY);
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBarWrapper}>
        <MaterialIcons name="search" size={22} color="#888" style={{ marginLeft: 10, marginRight: 8 }} />
        <TextInput
          ref={searchInputRef}
          style={styles.searchBarInput}
          placeholder="Search songs, artist, album or..."
          placeholderTextColor="#888"
          value={search}
          onChangeText={setSearch}
          underlineColorAndroid="transparent"
          onFocus={() => setShowRecent(true)}
          onBlur={() => setTimeout(() => setShowRecent(false), 200)}
        />
      </View>
      {showRecent && recentSearches.length > 0 && (
        <View style={styles.recentPanel}>
          <Text style={styles.recentTitle}>Recent searches</Text>
          <FlatList
            data={recentSearches}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <View style={styles.recentItem}>
                {item.image ? (
                  <Image source={{ uri: item.image }} style={styles.recentImage} />
                ) : (
                  <View style={[styles.recentImage, { backgroundColor: '#333' }]} />
                )}
                <View style={{ flex: 1, marginLeft: 12 }}>
                  <TouchableOpacity onPress={() => handleRecentPress(item)}>
                    <Text style={styles.recentName} numberOfLines={1}>{item.name}</Text>
                    <Text style={styles.recentSubtitle} numberOfLines={1}>{item.subtitle}</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={() => handleRemoveRecent(item.id)}>
                  <MaterialIcons name="close" size={22} color="#aaa" />
                </TouchableOpacity>
              </View>
            )}
            style={{ marginBottom: 8, marginTop: 8 }}
          />
          <TouchableOpacity onPress={handleClearRecent}>
            <Text style={styles.recentClear}>Clear history</Text>
          </TouchableOpacity>
        </View>
      )}
      {searchLoading ? (
        <ActivityIndicator color="#fff" size="large" style={{ marginTop: 40 }} />
      ) : searchResults.length > 0 ? (
        <FlatList
          key="search"
          data={searchResults}
          keyExtractor={item => item.id + item.type}
          renderItem={({ item }) => (
            <View style={styles.songItem}>
              {item.image ? (
                <Image source={{ uri: item.image }} style={styles.songImage} />
              ) : (
                <View style={[styles.songImage, { backgroundColor: '#333' }]} />
              )}
              <View style={styles.songInfo}>
                <Text style={styles.songTitle} numberOfLines={1}>{item.name}</Text>
                <Text style={styles.songArtist} numberOfLines={1}>{item.artist}</Text>
              </View>
              <TouchableOpacity style={styles.playButton} activeOpacity={0.7}>
                <MaterialIcons name="play-arrow" size={24} color="#fff" />
              </TouchableOpacity>
            </View>
          )}
          contentContainerStyle={{ padding: 12, paddingTop: 24 }}
          ListHeaderComponent={
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
              <TouchableOpacity onPress={() => setSearch('')} style={{ marginRight: 8, padding: 4 }}>
                <MaterialIcons name="arrow-back" size={24} color="#fff" />
              </TouchableOpacity>
              <Text style={styles.sectionTitle}>Search results</Text>
            </View>
          }
        />
      ) : tokenLoading ? (
        <View style={styles.centerContainer}>
          <ActivityIndicator color="#fff" size="large" />
          <Text style={styles.loadingText}>Đang lấy token Spotify...</Text>
        </View>
      ) : tokenError ? (
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>Lỗi: {tokenError}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={refreshToken}>
            <Text style={styles.retryText}>Thử lại</Text>
          </TouchableOpacity>
        </View>
      ) : loading ? (
        <ActivityIndicator color="#fff" size="large" style={{ marginTop: 40 }} />
      ) : (
        <FlatList
          key="browse"
          data={categories}
          numColumns={2}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingTop: 8, paddingBottom: 32 }}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          ListHeaderComponent={
            <>
              <Text style={styles.sectionTitle}>Trending artists</Text>
              <FlatList
                data={artists}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item: Artist) => item.id}
                contentContainerStyle={{ paddingLeft: 4, paddingRight: 8 }}
                style={{ marginBottom: 16, marginTop: 8 }}
                renderItem={({ item }: { item: Artist }) => (
                  <TouchableOpacity
                    onPress={() => router.push({
                      pathname: "/(tabs)/search/artist/[id]",
                      params: { id: item.id }
                    })}
                    style={styles.artistContainer}
                    activeOpacity={0.8}
                  >
                    <View style={styles.artistImageWrapper}>
                      {item.image ? (
                        <Image source={{ uri: item.image }} style={styles.artistImage} />
                      ) : (
                        <View style={[styles.artistImage, { backgroundColor: '#333', justifyContent: 'center', alignItems: 'center' }]} />
                      )}
                      <MaterialIcons name="trending-up" size={18} color="#fff" style={styles.trendingIcon} />
                    </View>
                    <Text style={styles.artistName} numberOfLines={1}>{item.name}</Text>
                  </TouchableOpacity>
                )}
              />
              <Text style={styles.sectionTitle}>Browse</Text>
            </>
          }
          renderItem={({ item: cat }) => {
            return (
              <TouchableOpacity
                style={styles.browseCard}
                activeOpacity={0.85}
                onPress={() => router.push({
                  pathname: '/(tabs)/search/category/[id]',
                  params: { id: cat.id, name: cat.name }
                })}
              >
                {cat.icons?.[0]?.url ? (
                  <Image source={{ uri: cat.icons[0].url }} style={styles.browseImage} />
                ) : null}
                <View style={styles.browseOverlay} />
                <Text style={styles.browseText}>{cat.name ? cat.name.toUpperCase() : ''}</Text>
              </TouchableOpacity>
            );
          }}
          ListEmptyComponent={
            loading ? (
              <ActivityIndicator color="#fff" size="large" style={{ marginTop: 40 }} />
            ) : categoriesError && categoriesError !== '' ? (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>Error loading categories: {categoriesError}</Text>
                <TouchableOpacity 
                  style={styles.retryButton}
                  onPress={async () => {
                    setLoading(true);
                    setCategoriesError('');
                    try {
                      if (!token) {
                        throw new Error('Không có token Spotify');
                      }
                      const res = await fetch('https://api.spotify.com/v1/browse/categories?country=US&limit=8', {
                        headers: { Authorization: `Bearer ${token}` },
                      });
                      const data = await res.json();
                      if (data.categories?.items) {
                        setCategories(data.categories.items);
                        setCategoriesError('');
                      }
                    } catch (e) {
                      setCategoriesError(e instanceof Error ? e.message : 'Unknown error');
                    } finally {
                      setLoading(false);
                    }
                  }}
                >
                  <Text style={styles.retryText}>Retry</Text>
                </TouchableOpacity>
              </View>
            ) : null
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181818',
    paddingTop: 40,
    paddingHorizontal: 12,
  },
  searchBarWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#232323',
    borderRadius: 18,
    paddingHorizontal: 8,
    height: 44,
    marginBottom: 18,
    marginTop: 8,
  },
  searchBarInput: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
    paddingVertical: 0,
    paddingHorizontal: 0,
    height: 44,
  },
  sectionTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 8,
    marginTop: 8,
  },
  artistContainer: {
    alignItems: 'center',
    marginRight: 18,
    width: 72,
  },
  artistImageWrapper: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#222',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#232323',
  },
  artistImage: {
    width: 56,
    height: 56,
    borderRadius: 28,
    resizeMode: 'cover',
  },
  artistName: {
    color: '#fff',
    fontSize: 13,
    textAlign: 'center',
    width: 72,
    fontWeight: '500',
    marginTop: 2,
  },
  browseGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  browseCard: {
    width: '48%',
    aspectRatio: 2.2,
    borderRadius: 18,
    marginBottom: 16,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#333',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  browseImage: {
    ...StyleSheet.absoluteFillObject,
    width: undefined,
    height: undefined,
    resizeMode: 'cover',
    opacity: 0.8,
  },
  browseOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
  browseText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    position: 'absolute',
    left: 16,
    bottom: 16,
    letterSpacing: 1,
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  songItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#232323',
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 14,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 1,
  },
  songImage: {
    width: 54,
    height: 54,
    borderRadius: 10,
    backgroundColor: '#333',
    marginRight: 14,
  },
  songInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  songTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  songArtist: {
    color: '#aaa',
    fontSize: 13,
  },
  playButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#1db954',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    shadowColor: '#1db954',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  trendingIcon: {
    position: 'absolute',
    right: -8,
    bottom: -8,
    backgroundColor: '#232323',
    borderRadius: 10,
    padding: 2,
    elevation: 2,
  },
  recentPanel: {
    backgroundColor: '#181818',
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 18,
    marginTop: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
  recentTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 17,
    marginBottom: 10,
  },
  recentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  recentImage: {
    width: 44,
    height: 44,
    borderRadius: 8,
    backgroundColor: '#333',
  },
  recentName: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
  recentSubtitle: {
    color: '#aaa',
    fontSize: 13,
    marginTop: 2,
  },
  recentClear: {
    color: '#888',
    fontWeight: 'bold',
    fontSize: 15,
    alignSelf: 'flex-end',
    marginTop: 8,
    opacity: 0.7,
  },
  errorContainer: {
    backgroundColor: '#232323',
    borderRadius: 12,
    padding: 16,
    marginTop: 8,
    alignItems: 'center',
  },
  errorText: {
    color: '#ff6b6b',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 12,
  },
  retryButton: {
    backgroundColor: '#1db954',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  retryText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  loadingText: {
    color: '#fff',
    fontSize: 16,
    marginTop: 16,
    textAlign: 'center',
  },
});

export default SearchScreen;

