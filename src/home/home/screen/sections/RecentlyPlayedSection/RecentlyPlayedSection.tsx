import { Song, songAPI } from '@/API'
import { useAuth } from '@/context/AuthContext'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, View } from 'react-native'

export default function RecentlyPlayedSection() {
  const { user } = useAuth()
  const [recentSongs, setRecentSongs] = useState<Song[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchRecentlyPlayed = async () => {
      if (!user?.id) {
        setLoading(false)
        return
      }

      try {
        const songs = await songAPI.getRecentlyPlayed(user.id, 10)
        setRecentSongs(songs)
      } catch (err: any) {
        setError(err.message || 'Lỗi khi tải bài hát đã phát gần đây')
      } finally {
        setLoading(false)
      }
    }

    fetchRecentlyPlayed()
  }, [user?.id])

  if (loading) {
    return <ActivityIndicator style={{ margin: 16 }} color="#1DB954" />
  }

  if (error) {
    return <Text style={{ color: 'red', margin: 16 }}>{error}</Text>
  }

  if (recentSongs.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Recently Played</Text>
        <Text style={styles.emptyText}>No recently played songs</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recently Played</Text>
      <FlatList
        data={recentSongs}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.songCard}>
            <Image
              source={{ uri: item.artwork || 'https://via.placeholder.com/120' }}
              style={styles.artwork}
            />
            <Text style={styles.songTitle} numberOfLines={1}>
              {item.title}
            </Text>
            <Text style={styles.artistName} numberOfLines={1}>
              {item.artist}
            </Text>
          </View>
        )}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
  },
  emptyText: {
    color: '#b3b3b3',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  listContainer: {
    paddingRight: 16,
  },
  songCard: {
    width: 120,
    marginRight: 16,
  },
  artwork: {
    width: 120,
    height: 120,
    borderRadius: 8,
    marginBottom: 8,
  },
  songTitle: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },
  artistName: {
    color: '#b3b3b3',
    fontSize: 12,
  },
})
