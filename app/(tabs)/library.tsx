import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function LibraryTab() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Library Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0D0D0D',
  },
  text: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
}); 