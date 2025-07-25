import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import {
    Dimensions,
    FlatList,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { useSupabase } from '../../hooks/useSupabase';

const { width } = Dimensions.get('window');

export function ArtistDetailScreen({ route, navigation }) {
  const { id, name } = route.params;
  const { 
    getArtistSongs, 
    getArtistAlbums, 
    followArtist, 
    unfollowArtist,
    addToRecentlyPlayed 
  } = useSupabase();
  
  const [artist, setArtist] = useState(null);
  const [songs, setSongs] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const [activeTab, setActiveTab] = useState('songs'); // songs, albums, about

  useEffect(() => {
    loadArtistData();
  }, [id]);

  const loadArtistData = async () => {
    try {
      // Mock artist data - in a real app, you would fetch from API
      setArtist({
        id,
        name,
        image_url: 'https://via.placeholder.com/300',
        bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        followers: 1234567,
        monthly_listeners: 987654,
        verified: true
      });

      const artistSongs = await getArtistSongs(id);
      setSongs(artistSongs);

      const artistAlbums = await getArtistAlbums(id);
      setAlbums(artistAlbums);

      // Check if following (mock)
      setIsFollowing(Math.random() > 0.5);
    } catch (error) {
      console.error('Error loading artist data:', error);
    }
  };

  const handleFollowToggle = async () => {
    try {
      if (isFollowing) {
        await unfollowArtist(id);
      } else {
        await followArtist(id);
      }
      setIsFollowing(!isFollowing);
    } catch (error) {
      console.error('Error toggling follow:', error);
    }
  };

  const handlePlaySong = (song, index) => {
    addToRecentlyPlayed(song.id);
    navigation.navigate('Player', { 
      songId: song.id,
      playlist: songs,
      currentIndex: index
    });
  };

  const handlePlayAllSongs = () => {
    if (songs.length > 0) {
      handlePlaySong(songs[0], 0);
    }
  };

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const renderSongItem = ({ item, index }) => (
    <TouchableOpacity 
      style={styles.songItem}
      onPress={() => handlePlaySong(item, index)}
    >
      <Text style={styles.songNumber}>{index + 1}</Text>
      <Image 
        source={{ uri: item.artwork || 'https://via.placeholder.com/50' }} 
        style={styles.songImage} 
      />
      <View style={styles.songInfo}>
        <Text style={styles.songTitle} numberOfLines={1}>{item.title}</Text>
        <Text style={styles.songPlays}>{formatNumber(item.plays || 0)} plays</Text>
      </View>
      <TouchableOpacity style={styles.moreButton}>
        <Ionicons name="ellipsis-vertical" size={20} color="#999" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const renderAlbumItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.albumItem}
      onPress={() => navigation.navigate('AlbumDetail', { 
        id: item.id,
        name: item.title
      })}
    >
      <Image 
        source={{ uri: item.cover_url || 'https://via.placeholder.com/120' }} 
        style={styles.albumImage} 
      />
      <Text style={styles.albumTitle} numberOfLines={1}>{item.title}</Text>
      <Text style={styles.albumYear}>{item.release_year || '2023'}</Text>
    </TouchableOpacity>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'songs':
        return (
          <FlatList
            data={songs}
            renderItem={renderSongItem}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.tabContent}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No songs available</Text>
              </View>
            }
          />
        );
      
      case 'albums':
        return (
          <FlatList
            data={albums}
            renderItem={renderAlbumItem}
            keyExtractor={item => item.id}
            numColumns={2}
            contentContainerStyle={styles.tabContent}
            columnWrapperStyle={styles.albumRow}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No albums available</Text>
              </View>
            }
          />
        );
      
      case 'about':
        return (
          <ScrollView style={styles.tabContent}>
            <View style={styles.aboutSection}>
              <Text style={styles.aboutTitle}>About</Text>
              <Text style={styles.aboutText}>{artist?.bio}</Text>
              
              <View style={styles.statsContainer}>
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>{formatNumber(artist?.followers || 0)}</Text>
                  <Text style={styles.statLabel}>Followers</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>{formatNumber(artist?.monthly_listeners || 0)}</Text>
                  <Text style={styles.statLabel}>Monthly Listeners</Text>
                </View>
              </View>
            </View>
          </ScrollView>
        );
      
      default:
        return null;
    }
  };

  if (!artist) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.moreButton}>
          <Ionicons name="ellipsis-vertical" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Artist Info */}
      <View style={styles.artistInfo}>
        <Image 
          source={{ uri: artist.image_url }} 
          style={styles.artistImage} 
        />
        <View style={styles.artistNameContainer}>
          <Text style={styles.artistName}>{artist.name}</Text>
          {artist.verified && (
            <Ionicons name="checkmark-circle" size={20} color="#1DB954" />
          )}
        </View>
        <Text style={styles.monthlyListeners}>
          {formatNumber(artist.monthly_listeners)} monthly listeners
        </Text>
        
        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity 
            style={[
              styles.followButton,
              isFollowing && styles.followingButton
            ]}
            onPress={handleFollowToggle}
          >
            <Text style={[
              styles.followButtonText,
              isFollowing && styles.followingButtonText
            ]}>
              {isFollowing ? 'Following' : 'Follow'}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.playButton}
            onPress={handlePlayAllSongs}
          >
            <Ionicons name="play" size={24} color="#fff" />
            <Text style={styles.playButtonText}>Play</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.shuffleButton}>
            <Ionicons name="shuffle" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        {['songs', 'albums', 'about'].map(tab => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tab,
              activeTab === tab && styles.activeTab
            ]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[
              styles.tabText,
              activeTab === tab && styles.activeTabText
            ]}>
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Tab Content */}
      {renderTabContent()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
  },
  loadingText: {
    color: '#fff',
    fontSize: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 16,
  },
  backButton: {
    padding: 8,
  },
  moreButton: {
    padding: 8,
  },
  artistInfo: {
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  artistImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 16,
  },
  artistNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  artistName: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginRight: 8,
  },
  monthlyListeners: {
    color: '#B3B3B3',
    fontSize: 14,
    marginBottom: 24,
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  followButton: {
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#fff',
  },
  followingButton: {
    backgroundColor: '#1DB954',
    borderColor: '#1DB954',
  },
  followButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  followingButtonText: {
    color: '#000',
  },
  playButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1DB954',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
  },
  playButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  shuffleButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: '#333',
  },
  tab: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginRight: 20,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#1DB954',
  },
  tabText: {
    color: '#999',
    fontSize: 16,
    fontWeight: '500',
  },
  activeTabText: {
    color: '#fff',
  },
  tabContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  songItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#333',
  },
  songNumber: {
    width: 30,
    color: '#B3B3B3',
    fontSize: 14,
    textAlign: 'center',
  },
  songImage: {
    width: 50,
    height: 50,
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
  songPlays: {
    color: '#B3B3B3',
    fontSize: 14,
  },
  albumRow: {
    justifyContent: 'space-between',
  },
  albumItem: {
    width: '48%',
    marginBottom: 20,
  },
  albumImage: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 8,
    marginBottom: 8,
  },
  albumTitle: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },
  albumYear: {
    color: '#B3B3B3',
    fontSize: 12,
  },
  aboutSection: {
    paddingBottom: 40,
  },
  aboutTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  aboutText: {
    color: '#B3B3B3',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 24,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    color: '#B3B3B3',
    fontSize: 14,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    color: '#999',
    fontSize: 16,
  },
});
