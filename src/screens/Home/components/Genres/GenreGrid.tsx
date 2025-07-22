import React from 'react';
import { FlatList, Text, View } from 'react-native';
import { GenreCard } from './GenreCard';

interface Genre {
  id: string;
  name: string;
  color: string;
}

interface Props {
  genres: Genre[];
}
export const GenreGrid: React.FC<Props> = ({ genres }) => (
  <View style={{ marginVertical: 16 }}>
    <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold', marginBottom: 8 }}>Genres</Text>
    <FlatList
      data={genres}
      numColumns={2}
      keyExtractor={item => item.id}
      renderItem={({ item }) => <GenreCard genre={item} />}
      contentContainerStyle={{ paddingHorizontal: 8 }}
      columnWrapperStyle={{ justifyContent: 'space-between' }}
      scrollEnabled={false}
    />
  </View>
); 