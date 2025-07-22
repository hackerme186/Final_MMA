import React from 'react';
import { FlatList, View } from 'react-native';
import { Artist } from '../../types/HomeTypes';
import { ArtistCard } from './ArtistCard';

interface Props {
  artists: Artist[];
}
export const ArtistCarousel: React.FC<Props> = ({ artists }) => (
  <View style={{ marginVertical: 16 }}>
    <FlatList
      data={artists}
      horizontal
      keyExtractor={item => item.id}
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => <ArtistCard artist={item} />}
    />
  </View>
); 