import React from 'react';
import { Image, Pressable, StyleSheet } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { ThemedText } from '../ThemedText';

export interface AlbumCardProps {
  cover: any;
  title: string;
  artist: string;
  year?: string | number;
  onPress?: () => void;
  accessibilityLabel?: string;
}

export const AlbumCard: React.FC<AlbumCardProps> = ({
  cover,
  title,
  artist,
  year,
  onPress,
  accessibilityLabel,
}) => {
  return (
    <Pressable
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
      onPress={onPress}
      accessibilityLabel={accessibilityLabel || `${title} của ${artist}`}
      accessibilityHint="Nhấn để xem chi tiết album"
    >
      <Animated.View entering={FadeIn} exiting={FadeOut} style={styles.coverWrapper}>
        <Image source={cover} style={styles.cover} />
      </Animated.View>
      <ThemedText style={styles.title} numberOfLines={1}>{title}</ThemedText>
      <ThemedText style={styles.artist} numberOfLines={1}>{artist}</ThemedText>
      {year && <ThemedText style={styles.year}>{year}</ThemedText>}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 120,
    backgroundColor: '#181818',
    borderRadius: 16,
    padding: 12,
    alignItems: 'center',
    marginRight: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  pressed: {
    opacity: 0.85,
    transform: [{ scale: 0.97 }],
  },
  coverWrapper: {
    marginBottom: 8,
  },
  cover: {
    width: 80,
    height: 80,
    borderRadius: 12,
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 2,
    width: '100%',
  },
  artist: {
    color: '#aaa',
    fontSize: 14,
    width: '100%',
  },
  year: {
    color: '#888',
    fontSize: 12,
    marginTop: 2,
  },
}); 