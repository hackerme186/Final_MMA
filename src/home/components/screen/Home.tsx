import React from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import { FeatureSection } from './sections/FeatureSection'
import { UserGreetingSection } from './sections/UserGretting'

export default function Home() {
  return (
    <ScrollView style={styles.container}>
      <UserGreetingSection />
      <FeatureSection />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
})
