import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';

interface LyricsScreenProps {
  lyrics: string;
}
export const LyricsScreen: React.FC<LyricsScreenProps> = ({ lyrics }) => (
  <ScrollView style={styles.container}>
    <Text style={styles.lyrics}>{lyrics}</Text>
  </ScrollView>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0D0D0D', padding: 20 },
  lyrics: { color: '#fff', fontSize: 18, lineHeight: 28 },
}); 