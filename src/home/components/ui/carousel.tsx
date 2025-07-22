import React from 'react';
import { ScrollView, ViewStyle } from 'react-native';

interface CarouselProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export default function Carousel({ children, style }: CarouselProps) {
  return (
    <ScrollView
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      style={style}
    >
      {children}
    </ScrollView>
  );
}
  