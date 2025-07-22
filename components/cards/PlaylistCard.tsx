import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, Pressable, StyleSheet } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { ThemedText } from '../ThemedText';

export interface PlaylistCardProps {
  cover: any;
  title: string;
  trackCount: number;
  creator: string;
  onPress?: () => void;
  onShare?: () => void;
  accessibilityLabel?: string;
}

export const PlaylistCard: React.FC<PlaylistCardProps> = ({
  cover,
  title,
  trackCount,
  creator,
  onPress,
  onShare,
  accessibilityLabel,
}) => {
  return (
    <Pressable
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
      onPress={onPress}
      accessibilityLabel={accessibilityLabel || `${title} của ${creator}`}
      accessibilityHint="Nhấn để xem chi tiết playlist"
    >
      <Animated.View entering={FadeIn} exiting={FadeOut} style={styles.coverWrapper}>
        <Image source={cover} style={styles.cover} />
        <Pressable
          style={styles.shareButton}
          onPress={e => {
            e.stopPropagation();
            onShare && onShare();
          }}
          accessibilityLabel="Chia sẻ playlist"
          accessibilityHint="Nhấn để chia sẻ playlist này"
        >
          <Ionicons name="share-social-outline" size={20} color="#fff" />
        </Pressable>
      </Animated.View>
      <ThemedText style={styles.title} numberOfLines={1}>{title}</ThemedText>
      <ThemedText style={styles.meta} numberOfLines={1}>{trackCount} bài hát • {creator}</ThemedText>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 120,
    backgroundColor: '#232323',
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
    position: 'relative',
  },
  cover: {
    width: 80,
    height: 80,
    borderRadius: 12,
  },
  shareButton: {
    position: 'absolute',
    top: 4,
    right: 4,
    zIndex: 2,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 12,
    padding: 2,
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 2,
    width: '100%',
  },
  meta: {
    color: '#aaa',
    fontSize: 13,
    width: '100%',
  },
}); 