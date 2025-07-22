import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const MiniPlayer = () => (
  <View style={styles.container}>
    <Text style={styles.text}>Mini Player (Persistent Controls)</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    height: 60,
    backgroundColor: '#181818',
    borderTopWidth: 1,
    borderTopColor: '#282828',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: { color: '#fff' },
}); 