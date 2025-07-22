import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { homeStyles } from '../../styles/HomeStyles';

export const SearchButton: React.FC = () => (
  <TouchableOpacity style={homeStyles.searchButton}>
    <Ionicons name="search" size={22} color="#fff" />
  </TouchableOpacity>
); 