import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface RecentSearch {
  id: string;
  name: string;
  type: 'artist' | 'track' | 'album' | 'playlist';
  subtitle?: string;
  image?: string;
}

interface SearchResult {
  id: string;
  name: string;
  image?: string;
  type: 'artist' | 'track' | 'album' | 'playlist';
  artist?: string;
}

const RECENT_KEY = 'recent_searches';

export default function SearchDetailScreen() {
  const navigation = useNavigation();
  const [search, setSearch] = useState('');
  const [recentSearches, setRecentSearches] = useState<RecentSearch[]>([]);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const searchInputRef = useRef<TextInput>(null);

  useEffect(() => {
    AsyncStorage.getItem(RECENT_KEY).then(data => {
      if (data) setRecentSearches(JSON.parse(data));
    });
    setTimeout(() => {
      searchInputRef.current?.focus();
    }, 300);
  }, []);

  useEffect(() => {
    if (!search) {
      setSearchResults([]);
      setSearchLoading(false);
      return;
    }
    setSearchLoading(true);
    const timeout = setTimeout(async () => {
      try {
        // TODO: Thay bằng API thật nếu cần
        setSearchResults([]); // Để trống, bạn có thể tích hợp API ở đây
      } catch (e) {
        setSearchResults([]);
      } finally {
        setSearchLoading(false);
      }
    }, 400);
    return () => clearTimeout(timeout);
  }, [search]);

  const handleRecentPress = (item: RecentSearch) => {
    setSearch(item.name);
  };

  const handleRemoveRecent = (id: string) => {
    setRecentSearches(prev => {
      const updated = prev.filter(item => item.id !== id);
      AsyncStorage.setItem(RECENT_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const handleClearRecent = () => {
    setRecentSearches([]);
    AsyncStorage.removeItem(RECENT_KEY);
  };

  return (
    <View style={styles.container}>
      {/* Header với nút back và input search */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={26} color="#fff" />
        </TouchableOpacity>
        <TextInput
          ref={searchInputRef}
          style={styles.searchInput}
          placeholder="Search songs, artist, album or playlist..."
          placeholderTextColor="#888"
          value={search}
          onChangeText={setSearch}
          underlineColorAndroid="transparent"
        />
      </View>
      {/* Recent searches */}
      {(!search || searchResults.length === 0) && recentSearches.length > 0 && (
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
      {/* Search results */}
      {searchLoading ? (
        <Text style={styles.loadingText}>Loading...</Text>
      ) : searchResults.length > 0 ? (
        <FlatList
          data={searchResults}
          keyExtractor={item => item.id + item.type}
          renderItem={({ item }: { item: SearchResult }) => (
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
            </View>
          )}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181818',
    paddingTop: 0,
    paddingHorizontal: 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#181818',
    paddingTop: 40,
    paddingHorizontal: 12,
    paddingBottom: 8,
  },
  backButton: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
    backgroundColor: '#232323',
    borderRadius: 18,
    paddingHorizontal: 16,
    height: 44,
  },
  recentPanel: {
    backgroundColor: '#232323',
    borderRadius: 18,
    margin: 12,
    paddingHorizontal: 16,
    paddingVertical: 18,
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
  loadingText: {
    color: '#fff',
    fontSize: 16,
    marginTop: 16,
    textAlign: 'center',
  },
  songItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#232323',
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 14,
    marginBottom: 14,
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
}); 