import React from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import { FeatureSection } from './sections/FeatureSection'
import { NewReleasesSection } from './sections/NewReleasesSection'
import { RecentlyPlayedSection } from './sections/RecentlyPlayedSection'
import { UserGreetingSection } from './sections/UserGretting'

export default function Home() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <UserGreetingSection />
      <FeatureSection />
      <RecentlyPlayedSection />
      <NewReleasesSection />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
})
