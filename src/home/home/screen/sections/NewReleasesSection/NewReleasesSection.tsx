import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, ActivityIndicator } from 'react-native'
import { songAPI, Song } from '@/API'

interface Category {
  id: string
  name: string
  selected: boolean
}

export default function NewReleasesSection() {
  const [categories, setCategories] = useState<Category[]>([
    { id: "all", name: "All", selected: true },
    { id: "pop", name: "Pop", selected: false },
    { id: "rock", name: "Rock", selected: false },
    { id: "hip-hop", name: "Hip Hop", selected: false },
    { id: "electronic", name: "Electronic", selected: false },
    { id: "jazz", name: "Jazz", selected: false },
  ])
  const [songs, setSongs] = useState<Song[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchSongs()
  }, [])

  const fetchSongs = async () => {
    try {
      const data = await songAPI.getAllSongs()
      // Sort by creation date to get newest first
      const sortedSongs = data.sort((a, b) => 
        new Date(b.created_at || '').getTime() - new Date(a.created_at || '').getTime()
      )
      setSongs(sortedSongs.slice(0, 20)) // Get latest 20 songs
    } catch (err: any) {
      setError(err.message || 'Lỗi khi tải bài hát mới')
    } finally {
      setLoading(false)
    }
  }

  const handleCategoryPress = (categoryId: string) => {
    setCategories(prev => 
      prev.map(cat => ({
        ...cat,
        selected: cat.id === categoryId
      }))
    )
  }

  const getFilteredSongs = () => {
    const selectedCategory = categories.find(cat => cat.selected)
    if (selectedCategory?.id === 'all') return songs
    // In a real app, you would filter by category/genre
    return songs
  }

  if (loading) {
    return <ActivityIndicator style={{ margin: 16 }} color="#1DB954" />
  }

  if (error) {
    return <Text style={{ color: 'red', margin: 16 }}>{error}</Text>
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>New Releases</Text>
      
      {/* Categories */}
      <FlatList
        data={categories}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.categoryButton, item.selected && styles.selectedCategory]}
            onPress={() => handleCategoryPress(item.id)}
          >
            <Text style={[styles.categoryText, item.selected && styles.selectedCategoryText]}>
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.categoriesContainer}
      />

      {/* Songs */}
      <FlatList
        data={getFilteredSongs()}
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
        contentContainerStyle={styles.songsContainer}
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
  categoriesContainer: {
    paddingBottom: 16,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: 'transparent',
  },
  selectedCategory: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  categoryText: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 16,
    fontWeight: '500',
  },
  selectedCategoryText: {
    color: '#fff',
  },
  songsContainer: {
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
