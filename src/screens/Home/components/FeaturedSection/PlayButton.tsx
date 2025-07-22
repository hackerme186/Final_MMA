import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

interface PlayButtonProps {
  onPress?: () => void;
}

export const PlayButton: React.FC<PlayButtonProps> = ({ onPress }) => (
  <TouchableOpacity style={styles.playButton} onPress={onPress}>
    <Text style={styles.playText}>Play</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  playButton: {
    backgroundColor: '#1DB954',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 24,
    alignSelf: 'flex-start',
  },
  playText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
}); 