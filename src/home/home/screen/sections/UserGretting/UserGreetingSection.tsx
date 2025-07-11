import { userAPI, UserProfile } from '@/API'
import { useAuth } from '@/context/AuthContext'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'

export default function UserGreetingSection() {
  const { user } = useAuth()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user?.id) return
      
      setLoading(true)
      try {
        const userProfile = await userAPI.getProfile(user.id)
        setProfile(userProfile)
      } catch (error) {
        console.error('Error fetching profile:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [user?.id])

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good morning!'
    if (hour < 18) return 'Good afternoon!'
    return 'Good evening!'
  }

  if (loading) {
    return <ActivityIndicator style={{ margin: 16 }} color="#1DB954" />
  }

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>{getGreeting()}</Text>
      <Text style={styles.subtitle}>
        Welcome back, {profile?.username || user?.email || 'User'}!
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#b3b3b3',
  },
}) 