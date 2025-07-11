import { Song, songAPI } from '@/API'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native'

export default function FeatureSection() {
  const [songs, setSongs] = useState<Song[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const data = await songAPI.getAllSongs()
        setSongs(data)
      } catch (err: any) {
        setError(err.message || 'Lỗi khi tải bài hát')
      } finally {
        setLoading(false)
      }
    }
    fetchSongs()
  }, [])

  if (loading) {
    return <ActivityIndicator style={{ margin: 16 }} color="#1DB954" />
  }

  if (error) {
    return <Text style={{ color: 'red', margin: 16 }}>{error}</Text>
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Featured</Text>
      <Text style={styles.subtitle}>Discover new music</Text>
      <FlatList
        data={songs}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Text style={styles.song}>{item.title} - {item.artist}</Text>
        )}
        style={{ marginTop: 12 }}
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
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#b3b3b3',
  },
  song: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 8,
  },
})
