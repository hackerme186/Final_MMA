import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { ActivityIndicator, Image, Pressable, StyleSheet, View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { ThemedText } from '../ThemedText';

export interface TrackCardProps {
  artwork: any;
  title: string;
  artist: string;
  loading?: boolean;
  onPlay?: () => void;
  onLike?: () => void;
  liked?: boolean;
  accessibilityLabel?: string;
}

export const TrackCard: React.FC<TrackCardProps> = ({
  artwork,
  title,
  artist,
  loading = false,
  onPlay,
  onLike,
  liked = false,
  accessibilityLabel,
}) => {
  const [pressed, setPressed] = useState(false);

  return (
    <Pressable
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
      onPress={onPlay}
      accessibilityLabel={accessibilityLabel || `${title} của ${artist}`}
      accessibilityHint="Nhấn để phát bài hát"
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
    >
      <View style={styles.artworkWrapper}>
        <Image source={artwork} style={styles.artwork} />
        {loading && (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator color="#fff" />
          </View>
        )}
        {pressed && !loading && (
          <Animated.View
            style={styles.playOverlay}
            entering={FadeIn}
            exiting={FadeOut}
          >
            <Ionicons name="play-circle" size={48} color="#1DB954" accessibilityLabel="Phát" />
          </Animated.View>
        )}
        <Pressable
          style={styles.likeButton}
          onPress={e => {
            e.stopPropagation();
            onLike && onLike();
          }}
          accessibilityLabel={liked ? 'Bỏ thích' : 'Thích'}
          accessibilityHint="Nhấn để thích hoặc bỏ thích bài hát"
        >
          <Ionicons
            name={liked ? 'heart' : 'heart-outline'}
            size={24}
            color={liked ? '#1DB954' : '#fff'}
          />
        </Pressable>
      </View>
      <ThemedText style={styles.title} numberOfLines={1}>{title}</ThemedText>
      <ThemedText style={styles.artist} numberOfLines={1}>{artist}</ThemedText>
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
  artworkWrapper: {
    position: 'relative',
    marginBottom: 8,
  },
  artwork: {
    width: 80,
    height: 80,
    borderRadius: 12,
  },
  playOverlay: {
    position: 'absolute',
    top: 16,
    left: 16,
    right: 16,
    bottom: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.35)',
    borderRadius: 12,
  },
  likeButton: {
    position: 'absolute',
    top: 4,
    right: 4,
    zIndex: 2,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 12,
    padding: 2,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    zIndex: 3,
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
}); 