import React, { useMemo } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { homeStyles } from '../../styles/HomeStyles';
import { Track } from '../../types/HomeTypes';

interface RecommendedSectionProps {
  tracks: Track[];
}

const TrackCard = React.memo(({ item }: { item: Track }) => (
  <TouchableOpacity style={homeStyles.trackCard} activeOpacity={0.8}>
    <Image source={{ uri: item.artwork, cache: 'force-cache' }} style={homeStyles.trackArtwork} />
    <Text style={homeStyles.trackTitle} numberOfLines={1}>
      {item.title}
    </Text>
    <Text style={homeStyles.trackArtist} numberOfLines={1}>
      {item.artist}
    </Text>
  </TouchableOpacity>
));

const getItemLayout = (_: any, index: number) => ({
  length: 110 + 12, // width + marginRight
  offset: (110 + 12) * index,
  index,
});

const RecommendedSection: React.FC<RecommendedSectionProps> = React.memo(({ tracks }) => {
  const memoTracks = useMemo(() => tracks, [tracks]);
  return (
    <View style={homeStyles.section}>
      <View style={homeStyles.sectionHeaderRow}>
        <Text style={homeStyles.sectionTitle}>Recommended For You</Text>
      </View>
      <FlatList
        data={memoTracks}
        renderItem={({ item }) => <TrackCard item={item} />}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={homeStyles.horizontalList}
        getItemLayout={getItemLayout}
        removeClippedSubviews
        initialNumToRender={6}
        windowSize={5}
      />
    </View>
  );
});

export { RecommendedSection };
