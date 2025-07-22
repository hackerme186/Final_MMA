import React from 'react';
import { FlatList, Text, View } from 'react-native';
import { Track } from '../../types/HomeTypes';
import { TrackItem } from './TrackItem';

interface Props {
  tracks: Track[];
}
export const RecentlyPlayed: React.FC<Props> = ({ tracks }) => (
  <View style={{ marginVertical: 16 }}>
    <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold', marginBottom: 8 }}>Recently Played</Text>
    <FlatList
      data={tracks}
      horizontal
      keyExtractor={item => item.id}
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => <TrackItem track={item} />}
    />
  </View>
); 