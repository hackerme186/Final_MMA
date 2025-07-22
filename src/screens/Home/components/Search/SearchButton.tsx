import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { TouchableOpacity } from 'react-native';

interface SearchButtonProps {
  onPress?: () => void;
}

export const SearchButton: React.FC<SearchButtonProps> = ({ onPress }) => (
  <TouchableOpacity onPress={onPress} style={{ backgroundColor: '#232323', borderRadius: 20, padding: 8 }}>
    <Ionicons name="search" size={22} color="#1DB954" />
  </TouchableOpacity>
); 