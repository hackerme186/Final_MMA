import React from 'react';
import { FlatList, Text, View } from 'react-native';
import { Track } from '../../types/HomeTypes';
import { RecommendationItem } from './RecommendationItem';

interface Props {
  tracks: Track[];
}
export const RecommendationList: React.FC<Props> = ({ tracks }) => (
  <View style={{ marginVertical: 16 }}>
    <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold', marginBottom: 8 }}>Recommended For You</Text>
    <FlatList
      data={tracks}
      horizontal
      keyExtractor={item => item.id}
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => <RecommendationItem track={item} />}
    />
  </View>
); 