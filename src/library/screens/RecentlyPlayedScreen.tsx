import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { Alert, FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSupabase } from '../../hooks/useSupabase';

import type { StackNavigationProp } from '@react-navigation/stack';

type RecentlyPlayedScreenProps = {
  navigation: StackNavigationProp<any>;
};

export function RecentlyPlayedScreen({ navigation }: RecentlyPlayedScreenProps) {
  const { recentlyPlayed, fetchRecentlyPlayed, addToRecentlyPlayed, clearRecentlyPlayed } = useSupabase();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredSongs, setFilteredSongs] = useState<SongItem[]>([]);
  const [groupBy, setGroupBy] = useState('all'); // all, today, week, month
  const [selectedSongId, setSelectedSongId] = useState<string | number | null>(null);

  interface SongItem {
    id: string | number;
    played_at: string;
    song: {
      id: string | number;
      title: string;
      artist: string;
      artwork?: string;
    };
  }

  useEffect(() => {
    let filtered: SongItem[] = Array.isArray(recentlyPlayed)
      ? recentlyPlayed.map((item: any) => ({
          id: item.id,
          played_at: item.played_at,
          song: {
            id: item.song?.id,
            title: item.song?.title,
            artist: item.song?.artist,
            artwork: item.song?.artwork,
          },
        }))
      : [];
    
    // Apply search filter
    if (searchQuery.trim() !== '') {
      filtered = filtered.filter(
        item => 
          item.song?.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.song?.artist.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply time-based grouping
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    
    filtered = filtered.filter(item => {
      const playedAt = new Date(item.played_at);
      switch (groupBy) {
        case 'today':
          return playedAt >= today;
        case 'week':
          return playedAt >= weekAgo;
        case 'month':
          return playedAt >= monthAgo;
        default:
          return true;
      }
    });
    
    setFilteredSongs(filtered);
  }, [searchQuery, recentlyPlayed, groupBy]);

  const handlePlaySong = (item: SongItem) => {
    setSelectedSongId(item.song.id);
    addToRecentlyPlayed(String(item.song.id));
    // Navigate without animation using replace
    navigation.replace('Player', { songId: item.song.id });
  };

  const handleClearHistory = () => {
    Alert.alert(
      'Clear History',
      'Are you sure you want to clear your recently played history?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Clear', 
          style: 'destructive',
          onPress: () => clearRecentlyPlayed()
        }
      ]
    );
  };

  const formatPlayedTime = (playedAt: string | number | Date) => {
    const now = new Date();
    const played = new Date(playedAt);
    const diffInMinutes = Math.floor((now.getTime() - played.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    
    return played.toLocaleDateString();
  };

  const getGroupByLabel = () => {
    switch (groupBy) {
      case 'today': return 'Today';
      case 'week': return 'This Week';
      case 'month': return 'This Month';
      default: return 'All Time';
    }
  };

  interface SongItem {
    id: string | number;
    played_at: string;
    song: {
      id: string | number;
      title: string;
      artist: string;
      artwork?: string;
    };
  }

  const renderSongItem = ({
    item,
  }: {
    item: SongItem;
    index: number;
  }) => {
    const isSelected = selectedSongId === item.song.id;

    return (
      <TouchableOpacity
        style={styles.songItem}
        onPress={() => handlePlaySong(item)}
      >
        <Image
          source={{ uri: item.song?.artwork || 'https://via.placeholder.com/60' }}
          style={styles.songImage}
        />
        <View style={styles.songInfo}>
          <Text
            style={[
              styles.songTitle,
              { color: isSelected ? '#1DB954' : '#fff' }
            ]}
            numberOfLines={1}
          >
            {item.song?.title}
          </Text>
          <Text style={styles.songArtist} numberOfLines={1}>{item.song?.artist}</Text>
          <Text style={styles.playedTime}>{formatPlayedTime(item.played_at)}</Text>
        </View>
        <TouchableOpacity style={styles.moreButton}>
          <Ionicons name="ellipsis-vertical" size={20} color="#999" />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  const renderGroupByOptions = () => (
    <View style={styles.groupByContainer}>
      {['all', 'today', 'week', 'month'].map(option => (
        <TouchableOpacity
          key={option}
          style={[
            styles.groupByButton,
            groupBy === option && styles.groupByButtonActive
          ]}
          onPress={() => setGroupBy(option)}
        >
          <Text style={[
            styles.groupByText,
            groupBy === option && styles.groupByTextActive
          ]}>
            {option === 'all' ? 'All Time' : 
             option === 'today' ? 'Today' :
             option === 'week' ? 'This Week' : 'This Month'}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.songCount}>{filteredSongs.length} songs played</Text>
        
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color="#999" />
            </TouchableOpacity>
          )}
        </View>

        {renderGroupByOptions()}

        <TouchableOpacity 
          style={styles.clearButton}
          onPress={handleClearHistory}
        >
          <Ionicons name="trash-outline" size={16} color="#E22134" />
          <Text style={styles.clearButtonText}>Clear History</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredSongs}
        renderItem={renderSongItem}
        keyExtractor={item => `${item.id}-${item.played_at}`}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="time-outline" size={64} color="#666" />
            <Text style={styles.emptyText}>No recently played songs</Text>
            <Text style={styles.emptySubtext}>
              Songs you play will appear here
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  header: {
    padding: 16,
  },
  songCount: {
    color: '#B3B3B3',
    fontSize: 14,
    marginBottom: 12,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2A2A2A',
    borderRadius: 4,
    paddingHorizontal: 12,
    height: 40,
    marginBottom: 16,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
  },
  groupByContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  groupByButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#2A2A2A',
    marginRight: 8,
  },
  groupByButtonActive: {
    backgroundColor: '#1DB954',
  },
  groupByText: {
    color: '#fff',
    fontSize: 14,
  },
  groupByTextActive: {
    color: '#000',
    fontWeight: '600',
  },
  clearButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(226, 33, 52, 0.1)',
  },
  clearButtonText: {
    color: '#E22134',
    fontSize: 14,
    marginLeft: 4,
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
  songImage: {
    width: 60,
    height: 60,
    borderRadius: 4,
    marginRight: 12,
  },
  songInfo: {
    flex: 1,
  },
  songTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  songArtist: {
    color: '#B3B3B3',
    fontSize: 14,
    marginBottom: 2,
  },
  playedTime: {
    color: '#666',
    fontSize: 12,
  },
  moreButton: {
    padding: 8,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtext: {
    color: '#999',
    fontSize: 14,
    textAlign: 'center',
  },
});
