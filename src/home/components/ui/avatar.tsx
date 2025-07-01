"use client";

import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

interface AvatarProps {
  src?: string
  alt?: string
  className?: string
}

export function Avatar({ src, alt, className }: AvatarProps) {
  return (
    <View style={[styles.avatar, className]}>
      {src ? (
        <Image source={{ uri: src }} style={styles.image} />
      ) : (
        <View style={styles.placeholder} />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  placeholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#333',
  },
})