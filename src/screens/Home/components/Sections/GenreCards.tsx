import React, { useMemo } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { homeStyles } from '../../styles/HomeStyles';
import { Genre } from '../../types/HomeTypes';

interface GenreCardsProps {
  genres: Genre[];
}

const GenreCard = React.memo(({ item }: { item: Genre }) => (
  <TouchableOpacity style={[homeStyles.genreCard, { backgroundColor: item.color }]} activeOpacity={0.85}>
    <Image source={{ uri: item.icon, cache: 'force-cache' }} style={homeStyles.genreIcon} />
    <Text style={homeStyles.genreName}>{item.name}</Text>
  </TouchableOpacity>
));

const getItemLayout = (_: any, index: number) => ({
  length: 90 + 16, // height + margin
  offset: (90 + 16) * index,
  index,
});

const GenreCards: React.FC<GenreCardsProps> = React.memo(({ genres }) => {
  const memoGenres = useMemo(() => genres, [genres]);
  return (
    <View style={homeStyles.section}>
      <View style={homeStyles.sectionHeaderRow}>
        <Text style={homeStyles.sectionTitle}>Browse Genres</Text>
      </View>
      <FlatList
        data={memoGenres}
        renderItem={({ item }) => <GenreCard item={item} />}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={homeStyles.genreRow}
        contentContainerStyle={homeStyles.genreList}
        scrollEnabled={false}
        getItemLayout={getItemLayout}
        removeClippedSubviews
        initialNumToRender={4}
        windowSize={5}
      />
    </View>
  );
});

export { GenreCards };
