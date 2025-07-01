import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function FeatureSection() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Featured</Text>
      <Text style={styles.subtitle}>Discover new music</Text>
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
})
