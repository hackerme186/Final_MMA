import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';

export const ActionButtons = () => (
  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
    <TouchableOpacity style={{ marginRight: 8 }}>
      <Ionicons name="notifications-outline" size={24} color="#fff" />
    </TouchableOpacity>
    <TouchableOpacity style={{ marginRight: 8 }}>
      <Ionicons name="search" size={24} color="#1DB954" />
    </TouchableOpacity>
    <TouchableOpacity>
      <Image
        source={{ uri: 'https://i.imgur.com/1.jpg' }}
        style={{ width: 32, height: 32, borderRadius: 16, backgroundColor: '#232323' }}
      />
    </TouchableOpacity>
  </View>
); 