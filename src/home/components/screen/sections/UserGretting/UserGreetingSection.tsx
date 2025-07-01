import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function UserGreetingSection() {
  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>Good morning!</Text>
      <Text style={styles.subtitle}>Welcome back to MeloStream</Text>
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